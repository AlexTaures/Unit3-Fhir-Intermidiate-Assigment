const uuidv4 = require('uuid').v4;
//FHIR specific stuff: Server, resources: Patient, Bundle, OperationOutcome and Entry
const { RESOURCES } = require('@asymmetrik/node-fhir-server-core').constants;
const FHIRServer = require('@asymmetrik/node-fhir-server-core');
const getMedicationRequest = require('@asymmetrik/node-fhir-server-core/src/server/resources/4_0_0/schemas/medicationrequest');
const getBundle = require('@asymmetrik/node-fhir-server-core/src/server/resources/4_0_0/schemas/bundle');
const getOperationOutcome = require('@asymmetrik/node-fhir-server-core/src/server/resources/4_0_0/schemas/operationoutcome');
const getBundleEntry = require('@asymmetrik/node-fhir-server-core/src/server/resources/4_0_0/schemas/bundleentry');
const legacyApi = require('./legacy_api');
const identifier_uri = "http://fhirintermediatecourse.org";

//Meta data for FHIR R4
let getMeta = (base_version) => {
    return require(FHIRServer.resolveFromVersion(base_version, RESOURCES.META));
};
//How to search the address of our server, so we can return it in the fullURL for each Patient entry
function GetBaseUrl(context) {
    var baseUrl = "";
    const FHIRVersion = "/4_0_0/";
    var protocol = "http://";
    if (context.req.secure) { protocol = "https://"; }
    baseUrl = protocol + context.req.headers.host + FHIRVersion;
    return baseUrl;

};

module.exports.searchById = (args, context, logger) => new Promise(async (resolve, reject) => {

    let { base_version, id } = args;
    let baseUrl = GetBaseUrl(context);

    const legPersons = await legacyApi.getLegacyData('person')
    const legRx = await legacyApi.getLegacyData('rx');
    const legMeds = await legacyApi.getLegacyData('meds');

    var legFiltered = legRx.filter(function (item) {
        PatientId = item.patient_id;
        PrescriberId = item.prescriber_id;
        PrescriptionDate = item.prescription_date;
        RxNormCode = item.rxnorm_code;
        const ItemFantasyId =
            GetFantasyId(PatientId, PrescriberId, PrescriptionDate, RxNormCode);
        return (id == ItemFantasyId)
            ;
    });
    coun = 1;
    page = 1;
    result = GetMedicationRequests(legFiltered, legPersons, legMeds, context, coun, page);
    if (result) {
        mr = result.entry[0].resource;
        resolve(mr);
    }
    else {

        let OO = new getOperationOutcome();
        ErrorMessage = "HTTP 404 Not Found: Resource MedicationRequest/" + id + " is not known";
        OO.issue = [{
            severity: "error",
            code: "processing",
            diagnostics: ErrorMessage
        }];
        OO.text = {
            "status": "generated",
            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><h1>Operation Outcome</h1><table border=\"0\"><tr><td style=\"font-weight: bold;\">ERROR</td><td>[]</td><td><pre>" + ErrorMessage + "</pre></td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>"
        }

        resolve(OO);

    }

})

module.exports.search = (args, context, logger) => new Promise(async (resolve, reject) => {
    let { base_version, _content, _format, _id, _lastUpdated, _profile, _query, _security, _tag } = args;
    let { _INCLUDE, _REVINCLUDE, _SORT, _COUNT, _SUMMARY, _ELEMENTS, _CONTAINED, _CONTAINEDTYPED } = args;
    let baseUrl = GetBaseUrl(context);
    // These are the parameters we can search for : name, identifier, family, gender and birthDate
    let patient = args['patient'];
    let coun = context.req.query['_count'];
    let page = context.req.query['_page'];
    let idx = args['_id'];
    var ErrorMessage = "";
    const supported = ["base_version", "patient", "_count", "_page", "_id"];

    for (let key of Object.keys(args)) {
        if (supported.includes(key) == false) {
            ErrorMessage = "Unknown search parameter \"" + key + "\" for resource type \"Patient\". Valid search parameters for this search are: [" + supported.join(",") + "]";
            break;
        }
    }
    if (ErrorMessage != "") {
        //Bundle and Entry definitions
        let OO = new getOperationOutcome();
        OO.issue = [{
            severity: "error",
            code: "processing",
            diagnostics: ErrorMessage
        }];
        OO.text = {
            "status": "generated",
            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><h1>Operation Outcome</h1><table border=\"0\"><tr><td style=\"font-weight: bold;\">ERROR</td><td>[]</td><td><pre>" + ErrorMessage + "</pre></td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>"
        }

        resolve(OO);

    }
    else {
        const legRx = await legacyApi.getLegacyData('rx')
        const legPersons = await legacyApi.getLegacyData('person')
        const legMeds = await legacyApi.getLegacyData('meds');
        var criteria = [];
        // Requests for a specific patient
        if (patient) {
            criteria.push({ patient_id: patient });
        }
        // If the _id is a parameter
        if (idx) {
            criteria.push({ id: idx });
        }

        var legFiltered = legRx.filter(function (item) {
            for (const ite of criteria) {
                var key = Object.keys(ite)[0];
                var val = Object.values(ite)[0];
                if (key == "id") {
                    var PatientId = item.patient_id;
                    var PrescriberId = item.prescriber_id;
                    var PrescriptionDate = item.prescription_date;
                    var RxNormCode = item.rxnorm_code;
                    var id = GetFantasyId(PatientId, PrescriberId, PrescriptionDate, RxNormCode);
                    if (val != id) { return false }
                }
                else {

                    if (item[key] === undefined || item[key] != val) { return false; }
                }
            }
            return true;
        });

        result = GetMedicationRequests(legFiltered, legPersons, legMeds, context, coun, page);
        resolve(result);
    }
}
)

function GetMedicationRequests(legRxs, legPersons, legMeds, context, coun, page) {


    //Here we solve paginations issues: how many records per page, which page
    let offset = 0
    let limit = 0
    if (!coun) { coun = 5; }
    if (coun == "") { coun = 5; }
    let pageSize = parseInt(coun);

    if (!page) { page = 1; }
    if (page == "") { page = 1; }
    pageInt = parseInt(page);
    offset = (pageInt - 1) * pageSize;
    limit = pageSize;
    //Bundle and Entry definitions
    let BundleEntry = getBundleEntry;
    let Bundle = getBundle;
    //Our Base address
    let baseUrl = GetBaseUrl(context);

    result = [];
    entries = [];
    //Get total number of rows
    //because we want to know how many records in total we have
    //to report that in our searchset bundle

    if (legRxs.length > 0) {
        TotalCount = legRxs.length;
        if (offset + limit > TotalCount) {
            limit = coun;
            offset = 0;
        }
        legRxs.forEach(
            MyRx => {
                //We map from legacy to fhir
                MyMedicationRequest = RxToMedicationRequestMapper(MyRx, legPersons, legMeds);
                result.push(MyMedicationRequest);
            });
        //With all the medications requests we have in the result.array
        //we assemble the entries
        let entries = result.map(MedicationRequest =>
            new BundleEntry({
                fullUrl: baseUrl + 'MedicationRequest/' + MedicationRequest.id,
                resource: MedicationRequest
            }));
        //We assemble the bundle
        //With the type, total, entries, id, and meta
        let bundle = new Bundle({
            id: uuidv4(),
            meta: {
                lastUpdated: new Date()
            },
            type: "searchset",
            total: TotalCount.count,
            entry: entries

        });
        //And finally, we generate the link element
        //self (always), prev (if there is a previous page available)
        //next (if there is a next page available)
        var OriginalQuery = baseUrl + "MedicationRequest";
        var LinkQuery = baseUrl + "MedicationRequest";
        var parNum = 0;
        var linkParNum = 0;
        //This is to reassemble the query
        for (var param in context.req.query) {
            if (param != "base_version") {
                var sep = "&";
                parNum = parNum + 1;

                if (parNum == 1) { sep = "?"; }
                OriginalQuery = OriginalQuery + sep + param + "=" + context.req.query[param];


                if ((param != "_page") && (param != "_count")) {

                    var LinkSep = "&";
                    linkParNum = linkParNum + 1;
                    if (linkParNum == 1) { LinkSep = "?"; }
                    LinkQuery = LinkQuery + LinkSep + param + "=" + context.req.query[param];
                }

            }
        };
        //self is always there
        MyLinks = [{
            relation: "self",
            url: OriginalQuery
        }];
        //prev and next may or not exist
        if (pageInt > 1) {
            const prevPage = pageInt - 1;
            MyLinks.push({
                relation: "prev",
                url: LinkQuery + "&_count=" + coun + "&_page=" + prevPage.toString()
            });
        }
        MaxPages = (TotalCount.count / coun) + 1;
        MaxPages = parseInt(MaxPages);
        if (pageInt < MaxPages) {

            const nextPage = pageInt + 1;
            MyLinks.push({
                relation: "next",
                url: LinkQuery + "&_count=" + coun + "&_page=" + nextPage.toString()
            });
        }
        bundle.link = MyLinks;
        //Now we have all the required elements 
        //So we can return the complete bundle
        return (bundle);
    }
}
// Rx to Medication Request mapper
// This funcion receives a legacy rx and returns a FHIR MedicationRequest
// 
function RxToMedicationRequestMapper(MyRx, legPersons, legMeds) {

    patientName = "Unknown";
    const legPatient = legPersons.filter(reg => reg.PRSN_ID == MyRx.patient_id);
    if (legPatient) { patientName = legPatient[0].PRSN_LAST_NAME + " " + legPatient[0].PRSN_FIRST_NAME; }
    prescriberName = "Unknown";
    const legPrescriber = legPersons.filter(reg => reg.PRSN_ID == MyRx.prescriber_id);
    if (legPrescriber) { prescriberName = legPrescriber[0].PRSN_LAST_NAME + " " + legPrescriber[0].PRSN_FIRST_NAME; }
    let R = new getMedicationRequest();
    if (MyRx) {
        PatientId = MyRx.patient_id;
        PrescriberId = MyRx.prescriber_id;
        PrescriptionDate = MyRx.prescription_date;
        RxNormCode = MyRx.rxnorm_code
        R.id = GetFantasyId(PatientId, PrescriberId, PrescriptionDate, RxNormCode);
        R.authoredOn = MyRx.prescription_date;
        R.status = 'active';
        R.intent = 'order';
        R.medicationCodeableConcept =
        {
            coding: [{
                code: MyRx.rxnorm_code,
                display: MyRx.rxnorm_display,
                system: "http://www.nlm.nih.gov/research/umls/rxnorm"
            }]
        };
        R.subject = {
            reference: "Patient/" + MyRx.patient_id,
            display: patientName
        };
        R.requester = {
            reference: "Practitioner/" + MyRx.prescriber_id,
            display: prescriberName
        }
        MyDosage=[];
        if (MyRx.sig)
        {MyDosage.push({text:MyRx.sig});}
        R.dosageInstruction =MyDosage;
        
        var FullText = "Prescription for Patient " + patientName
            + " on " + MyRx.prescription_date
            + " by " + prescriberName
            + " of " + MyRx.rxnorm_code + ":" + MyRx.rxnorm_display;
        code=MyRx.rxnorm_code;
        var opi=isOpioid(legMeds,code);
        
        if (opi==true) {
            FullText = FullText + " - opioid -";
        }
        if (MyRx.sig) {
            FullText = FullText + " (" + MyRx.sig + ")";
        }
        R.text = {
            "status": "generated",
            "div": '<div xmlns="http://www.w3.org/1999/xhtml">' + FullText + "</div>"
        };
    }
    //And that's our resource
    return R;
}


function GetFantasyId(PatientId, PrescriberId, PrescriptionDate, RxNormCode) {

    let FantasyId =
        PatientId.toString() + "-" +
        PrescriberId.toString() + "-" +
        PrescriptionDate.replaceAll("-", "") +
        "-" + RxNormCode;

    let buff = new Buffer.from(FantasyId);
    let base64data = buff.toString('base64')
    ComposedIdB64 = base64data.replaceAll("=", ".");
    return ComposedIdB64;

}
function isOpioid(legMeds, rxNormCode) {
    aux = false;
    oneMed = legMeds.filter(reg => reg.code == rxNormCode);
    if (oneMed) {
        if (oneMed.length > 0) {
            aux = (oneMed[0].opioid == "yes")
        }
    }
    return aux;
}

