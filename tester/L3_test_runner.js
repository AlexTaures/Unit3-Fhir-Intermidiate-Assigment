const Client = require('fhir-kit-client');
const Axios = require('axios');
const Config = require('./config');
const ExpectedResults =
    [
        { key: "L03_3_T01A", value: "All OK" },
        { key: "L03_3_T02A", value: "Lewis Jerry" },
        { key: "L03_3_T03A", value: "WARNINGS - Limitations of use - Because of the risks associated with the use of opioids, [Product] should only be used in patients for whom other treatment options, including non-opioid analgesics, are ineffective, not tolerated or otherwise inadequate to provide appropriate management of pain" },
    ]
module.exports = {
    L03_3_T01A, L03_3_T02A, L03_3_T03A
    ,
    L3_GetExpectedResult, L3_GetAllTests, L3_RunTest
};
const baseUrl = Config.ServerEndpoint();
async function L3_RunTest(test) {
    var result = "";
    switch (test) {
        case "L03_3_T01A":
            result = await L03_3_T01A();
            break;
        case "L03_3_T02A":
            result = await L03_3_T02A();
            break;
        case "L03_3_T03A":
            result = await L03_3_T03A();
            break;
        default:
            result = "";
    }
    return result;
}
function L3_GetAllTests() {
    return ExpectedResults
}
function L3_GetExpectedResult(test) {
    var value = "";
    for (const MyKey of Object.keys(ExpectedResults)) {
        MyElement = ExpectedResults[MyKey];
        if (MyElement.key == test) {
            value = MyElement.value;
            break;
        }
    }
    return value;
}

async function L03_3_T01A() {
    //                                
    result = GetAndValidate(baseUrl, "Mi0yOC0yMDIyMTAxMC0xMDQ5NjIz");
    return result;
};
async function L03_3_T02A() {
    result = "-";
    try {
   
    reso = await GetMedicationRequest(baseUrl, "Mi0yOC0yMDIyMTAxMC0xMDQ5NjIz");
    if (reso.resourceType == "MedicationRequest") {
        if (reso.requester) {
            result = reso.requester.display;
        }
        else {
            result = "Requester element missing in MedicationRequest";
        }
    }
    else {
        result = "Unable to retrieve the MedicationRequest";
    }

} catch (error) {
    result = error.issue[0].diagnosis;
    }

    return result;
};
async function L03_3_T03A() {
    reso = await GetMedicationRequest(baseUrl, "Mi0yOC0yMDIyMTAxMC0xMDQ5NjIz");
    var result="Warning Message Not Found";
    msg = "WARNINGS - Limitations of use - Because of the risks associated with the use of opioids, [Product] should only be used in patients for whom other treatment options, including non-opioid analgesics, are ineffective, not tolerated or otherwise inadequate to provide appropriate management of pain";
    if (reso.resourceType == "MedicationRequest") {
        if (reso.dosageInstruction) {
            for (const oneSig of reso.dosageInstruction) {
                if (oneSig.text == msg) {
                    result = msg;
                    break;
                }
            }
        }
        else {
            result = "sig element missing in MedicationRequest";
        }
    }
    else {
        result = "Unable to retrieve the MedicationRequest";
    }
    return result; 
};

async function GetAndValidate(server, WhichId) {
   
    try {
   
        result = "";
    reso = await GetMedicationRequest(server, WhichId);

    if (reso.resourceType == "MedicationRequest") {
        const validationServer = Config.USCoreValidationServer();
        var status = ValidateUSCoreMedicationRequest(validationServer, reso);
        result = status;
    }
    else {
        if (reso.resourceType == "OperationOutcome") {
            result = reso.issue[0].diagnosis;
        }
    }
} catch (error) {
    console.log(JSON.stringify(error));
    status = error.issue[0].diagnosis;
    }

    return status;
}
async function GetMedicationRequest(server, WhichId) {
    const fhirClient = new Client({
        baseUrl: server
    });

    var MedicationRequestInfo = null;
    var getResponse = null;
    try {
        getResponse = await fhirClient
            .read({ resourceType: 'MedicationRequest', id: WhichId });

    } catch (error) {
        getResponse = error;
    }
    console.log(JSON.stringify(getResponse));
    if (getResponse.resourceType == "MedicationRequest") {

        { MedicationRequestInfo = getResponse; }
    }
    else {
        if (getResponse.resourceType == "OperationOutcome") { MedicationRequestInfo = getResponse; }
    }
    return MedicationRequestInfo;
}
async function ValidateUSCoreMedicationRequest(server, resourceText) {
    var urlFHIREndpoint = server;
    var ResourceClass = "MedicationRequest";
    var OperationName = "$validate";
    var FullURL = urlFHIREndpoint + "/" + ResourceClass + "/" + OperationName;
    //We call the FHIR endpoint with our parameters
    let result = await Axios.post(
        FullURL, resourceText, {
        headers: {
            "Content-Type": "application/fhir+json",
            "Accept": "application/fhir+json"
        }
    }
    );
    var msg = "Unexpected Error Validating on " + urlFHIREndpoint;
    if (result) {
        if (result.data) {
            const OutCome = result.data;
            msg = "";
            if (OutCome.resourceType == "OperationOutcome") {
                for (const OneIssue of OutCome.issue) {
                    msg = msg + OneIssue.details.text + " "
                }
            }
        }
    }
    msg = msg.trim();
    return msg;
}
