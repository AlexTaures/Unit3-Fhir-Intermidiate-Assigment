/*eslint no-unused-vars: "warn"*/
//We only support one resource type
//patient
//And only search by id, by specific criteria
//UID generator for bundles
const uuidv4 = require('uuid').v4;
//FHIR specific stuff: Server, resources: Patient, Bundle, OperationOutcome and Entry
const { RESOURCES } = require('@asymmetrik/node-fhir-server-core').constants;
const FHIRServer = require('@asymmetrik/node-fhir-server-core');
const getPatient = require('@asymmetrik/node-fhir-server-core/src/server/resources/4_0_0/schemas/patient');
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

//This is for patient searches (direct read is special, below)
module.exports.search = (args, context, logger) => new Promise(async (resolve, reject) => {
    let { base_version, _content, _format, _id, _lastUpdated, _profile, _query, _security, _tag } = args;
    let { _INCLUDE, _REVINCLUDE, _SORT, _COUNT, _SUMMARY, _ELEMENTS, _CONTAINED, _CONTAINEDTYPED } = args;
    let baseUrl = GetBaseUrl(context);
    // These are the parameters we can search for : name, identifier, family, gender and birthDate
    let name = args['name'];
    let iden = args['identifier'];
    let fami = args['family'];
    let gend = args['gender'];
    let birt = args['birthdate'];
    let coun = context.req.query['_count'];
    let page = context.req.query['_page'];
    let idx = args['_id'];
    var ErrorMessage = "";
    const supported = ["base_version","name", "identifier", "family", "gender", "birthdate", "_count", "_page", "_id"];
    
    for (let key of Object.keys(args)) {
        if (supported.includes(key) == false) {
            ErrorMessage = "Unknown search parameter \"" + key + "\" for resource type \"Patient\". Valid search parameters for this search are: ["+ supported.join(",")+"]";
            break;
        }
    }
    if (ErrorMessage != "") {
        //Bundle and Entry definitions
        let OO = new getOperationOutcome();
        OO.issue=[{
        severity: "error",
        code : "processing",
        diagnostics:  ErrorMessage}];
        OO.text= {
            "status": "generated",
            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><h1>Operation Outcome</h1><table border=\"0\"><tr><td style=\"font-weight: bold;\">ERROR</td><td>[]</td><td><pre>"+ErrorMessage+"</pre></td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>"
          }
           
        console.log(JSON.stringify(OO));
        resolve(OO);

    }
    else {
        const legPersons = await legacyApi.getLegacyData('person')
        const legPersonIdentifiers = await legacyApi.getLegacyData('person_identifier');
        const legIdentifierTypes = await legacyApi.getLegacyData('identifier_type');
        var criteria = [];
        // If the family name is a parameter in this specific request...
        if (fami) {
            criteria.push({ PRSN_LAST_NAME: fami });
        }
        // If the gender is a parameter...
        if (gend) {
            criteria.push({ PRSN_GENDER: gend });
        }
        // If the birth date is a parameter...

        if (birt) {
            criteria.push({ PRSN_BIRTH_DATE: birt });
        }
        // If the _id is a parameter
        if (idx) {
            criteria.push({ prsn_id: idx });
        }
        var legAllPersons = legPersons;
        // if identifier is a parameter
        if (iden) {
            IdentifierCriteria = [];
            //Extract the two parts of the token: system / value

            var parts = iden.split("|");
            var MySystem = "";
            var MyValue = "";
            if (parts.length > 1) {
                MySystem = parts[0];
                MyValue = parts[1];

            }
            if (parts.length = 0) {
                MyValue = iden;
            }
            if (MySystem != "") {
                //Extract the identifier type code from the system
                //it's in the end
                it_code = MySystem.substring(MySystem.lastIndexOf('/') + 1);
                //Find it in the list of identifiers
                var dt = legIdentifierTypes.filter(function (item) {
                    return (it_code.toLowerCase() === item.identifier_code.toLowerCase())
                });
                //Extract the legacy id for the identifier type 
                var it_id = dt[0].identifier_type_id;
                IdentifierCriteria.push({ identifier_type_id: it_id });
            }
            if (MyValue != "") {
                IdentifierCriteria.push({ value: MyValue });
            }
            if (IdentifierCriteria.length > 0) {
                var lpiFiltered = legPersonIdentifiers.filter(function (item) {
                    for (const ite of IdentifierCriteria) {
                        var key = Object.keys(ite)[0].toLowerCase();
                        var val = Object.values(ite)[0];
                        if (item[key] === undefined || item[key] != val)
                            return false;
                    }
                    return true;
                });
                legAllPersons = legPersons.filter(function (item) {
                    enc = false;
                    for (const fil of lpiFiltered) {
                        if (item.PRSN_ID == fil.prsn_id) {
                            enc = true;
                            break;
                        }
                    }
                    return enc;
                });
                console.log(JSON.stringify(legAllPersons));
            }
        }

        var legFiltered = legAllPersons.filter(function (item) {
            for (const ite of criteria) {
                var key = Object.keys(ite)[0];
                var val = Object.values(ite)[0];
                if (item[key] === undefined || item[key] != val)
                    return false;
            }
            return true;
        });

        result = GetPatients(legFiltered, legPersonIdentifiers, legIdentifierTypes, context, coun, page);
        resolve(result);
    }
}
)


module.exports.searchById = (args, context, logger) => new Promise(async (resolve, reject) => {
    //	logger.info('Patient >>> searchById');
    let { base_version, id } = args;
    let baseUrl = GetBaseUrl(context);

    const legPersons = await legacyApi.getLegacyData('person')
    const legPersonIdentifiers = await legacyApi.getLegacyData('person_identifier');
    const legIdentifierTypes = await legacyApi.getLegacyData('identifier_type');
    var criteria = [];
    criteria.push({ PRSN_ID: id });
    var legFiltered = legPersons.filter(function (item) {
        for (const ite of criteria) {
            var key = Object.keys(ite)[0];
            var val = Object.values(ite)[0];
            if (item[key] === undefined || item[key] != val)
                return false;
        }
        return true;
    });
    coun = 1;
    page = 1;
    const result = GetPatients(legFiltered, legPersonIdentifiers, legIdentifierTypes, context, coun, page);
    if (result && result.entry && result.entry[0]) {
        resolve(result.entry[0].resource);
    } else {
        reject(new Error('Patient not found'));
    }
})

//This is the specific search for all patients matching the query
//
function GetPatients(legPerson, legPersonIdentifiers, legIdentifierTypes, context, coun, page) {


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

    if (legPerson.length > 0) {
        TotalCount = legPerson.length;
        if (offset + limit > TotalCount) {
            limit = coun;
            offset = 0;
        }
        legPerson.forEach(
            MyPerson => {
                //We map from legacy person to patient
                MyPatient = PersonToPatientMapper(MyPerson);
                //Add the identifiers
                MyPatient = PersonIdentifierToPatientIdentifierMapper(MyPatient, legPersonIdentifiers, legIdentifierTypes);
                //And save the result in an array
                result.push(MyPatient);
            });
        //With all the patients we have in the result.array
        //we assemble the entries
        let entries = result.map(patient =>
            new BundleEntry({
                fullUrl: baseUrl + 'Patient/' + patient.id,
                resource: patient
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
        var OriginalQuery = baseUrl + "Patient";
        var LinkQuery = baseUrl + "Patient";
        var parNum = 0;
        var linkParNum = 0;
        //This is to reassemble the query
        for (var param in context.req.query) {
            console.log(param);
            console.log(context.req.query[param]);
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
// Person to Patient mapper
// This funcion receives a legacy person and returns a FHIR Patient
// 
function PersonToPatientMapper(MyPerson) {

    let R = new getPatient();
    if (MyPerson) {
        //Logical server id
        R.id = MyPerson.PRSN_ID.toString();
        //We only have family, given and text
        //If we have more than one given, we will adjust later
        R.name = [{
            use: "official",
            family: MyPerson.PRSN_LAST_NAME,
            given: [MyPerson.PRSN_FIRST_NAME],

            text: MyPerson.PRSN_FIRST_NAME + " " + MyPerson.PRSN_LAST_NAME

        }];
        //Mapping of gender is not needed because it's the same codes
        R.gender = MyPerson.PRSN_GENDER;
        //BirthDate no conversion needed
        R.birthDate = MyPerson.PRSN_BIRTH_DATE;
        //If there is second name then we add the given
        //and adjust the text element
        if (MyPerson.PRSN_SECOND_NAME != "") {
            R.name[0].given.push(MyPerson.PRSN_SECOND_NAME);
            R.name[0].text = R.name.text = MyPerson.PRSN_FIRST_NAME + " " + MyPerson.PRSN_SECOND_NAME + " " + MyPerson.PRSN_LAST_NAME;

        }

        //We assemble the email address
        R.telecom = [{
            system: "email",
            value: MyPerson.PRSN_EMAIL
        }];
        //If there is a nick name, we add it
        if (MyPerson.PRSN_NICK_NAME != null) {
            legal_name = R.name[0];
            R.name = [
                legal_name,
                {
                    use: "nickname",
                    given: [MyPerson.PRSN_NICK_NAME]
                }
            ];
        }
        //We begin with no identifiers - we'll add them later
        R.identifier = [];
        //Full text for the resource
        //NO automatic narrative

        R.text = {
            "status": "generated",
            "div": '<div xmlns="http://www.w3.org/1999/xhtml">' + R.name[0].text + "</div>"
        };
    }
    //And that's our resource
    return R;
}
//Providing special support for the person's identifiers 
function PersonIdentifierToPatientIdentifierMapper(R, legPersonIdentifiers, legIdentifierTypes) {

    const Myidentifiers = legPersonIdentifiers.filter(function (item) {
        return (parseInt(R.id) === item.prsn_id)
    });

    if (Myidentifiers) {
        // For each legacy identifier
        Myidentifiers.forEach(doc => {
            var dt = legIdentifierTypes.filter(function (item) {
                return (doc.identifier_type_id === item.identifier_type_id)
            });
            var docNumber = doc.value;
            var docTypeCode = dt[0].identifier_code;
            var oldCol = R.identifier;
            oldCol.push({
                use: "official",
                system: identifier_uri + "/" + docTypeCode,
                value: docNumber,
            })
            R.identifier = oldCol;

        }
        );
        return R;
    }
}
