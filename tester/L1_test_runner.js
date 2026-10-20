const Client = require('fhir-kit-client');
const Config = require('./config');
const ExpectedResults=
    [
            {key:"L01_1_T01",value:"token"},
            {key:"L01_1_T02",value:"McEnroe John Patrick"},
            {key:"L01_1_T03",value:"<<NOT EXISTING>>"},
            {key:"L01_2_T01",value:"token"},
            {key:"L01_2_T02",value:"McEnroe John Patrick"},
            {key:"L01_2_T03",value:"<<NOT EXISTING>>"},
            {key:"L01_2_T04",value:"HTTP 501 Not Implemented: The underlying server only handles email addresses for the patients, thus search by system=phone is not implemented"},
            {key:"L01_2_T05",value:"Lange Dorothea"},
    ]      
    
module.exports = { 
    L01_1_T01,L01_1_T02,L01_1_T03,L01_2_T01,L01_2_T02,L01_2_T03, L01_2_T04, L01_2_T05 ,L1_GetExpectedResult,L1_GetAllTests,L1_RunTest};
const baseUrl = Config.ServerEndpoint();
async function L1_RunTest(test)
{
    var result="";
    switch(test) 
    {
        case "L01_1_T01":
            result=await L01_1_T01();
            break;
        case "L01_1_T02":
            result=await L01_1_T02();
            break;
        case "L01_1_T03":
            result=await L01_1_T03();
            break;
        case "L01_2_T01":
            result=await L01_2_T01();
            break;
        case "L01_2_T02":
            result=await L01_2_T02();
            break;
        case "L01_2_T03":
            result=await L01_2_T03();
            break;
        case "L01_2_T04":
            result=await L01_2_T04();
            break;
        case "L01_2_T05":
            result=await L01_2_T05();
            break;
        default:
            result="";        
    }
    return result;
}
function L1_GetAllTests()
{
    return ExpectedResults
}
function L1_GetExpectedResult(test)
{
    var value="";
    for (const MyKey of Object.keys(ExpectedResults))
    {
        MyElement= ExpectedResults[MyKey];
        if(MyElement.key==test)
        {
            value=MyElement.value;
            break;
        }
    }
    return value;
}

async function L01_1_T01() {
    result = await CheckParameterType('Patient','email');
    return result;

};

async function L01_1_T02() {
    result=await searchbymail('john.mcenroe@tennis.com');
    return result;
}
async function L01_1_T03() {
    result=await searchbymail('john.mcenroe@tennas.com');
    return result;
}
async function L01_2_T01() {
    result = await CheckParameterType('Patient','telecom');
    return result;
};
async function L01_2_T02() {
    result=await searchbytelecom('email|john.mcenroe@tennis.com');
    return result;
}
async function L01_2_T03() {
    result=await searchbytelecom('email|john.mcenroe@tennas.com');
    return result;
}
async function L01_2_T04() {
    try {
        result=await searchbytelecom('phone|5555-5555');    
    } catch (error) {
        let OO=error.response.data;
        result=OO.issue[0].diagnostics;
    }
    
    return result;
}
async function L01_2_T05() {
    result=await searchbytelecom('dorothea.lange@photographer.com');
    return result;
}
async function CheckParameterType(resource,type)
{
    const result = await L1_metadata(baseUrl);
    parameterType = L1_GetSearchParameterType(result, resource, type);
    return parameterType;
}
async function searchbytelecom(telecom)
{
    const resultE = await L1_SearchPatientByTelecom(baseUrl, telecom);
    var result="";
    if (Array.isArray(resultE))
    {
        const p = resultE[0].resource;
        result =  p.name[0].family +" "+p.name[0].given[0]
        if (p.name[0].given.length>1)
           {result=result+" "+p.name[0].given[1];}
    }
    else {
        if (resultE)
        {
            if (resultE.issue) 
            { result = resultE.issue[0].diagnostics; }
            else 
            { result = "<<NOT SUPPORTED>>" }
        }
        else
        {
            result="<<NOT EXISTING>>";
        }
    }
    return result;        
}

async function searchbymail(email)
{
    const resultE = await L1_SearchPatientByEmail(baseUrl, email);
    var result = "";
    if (Array.isArray(resultE)) {
        const p = resultE[0].resource;
        result =  p.name[0].family +" "+p.name[0].given[0]
        if (p.name[0].given.length>1)
           {result=result+" "+p.name[0].given[1];}
   
    }
    else {
        if (resultE)
        {
            if (resultE.issue) 
            { result = resultE.issue[0].diagnostics; }
            else 
            { result = "<<NOT SUPPORTED>>" }
        }
        else
        {
            result="<<NOT EXISTING>>";
        }
    }
    return result;
}
async function L1_metadata(server) {
    const fhirClient = new Client({
        baseUrl: server
    });
    var metadata = null;
    let response = await fhirClient.capabilityStatement();
    return response;

}
function L1_GetSearchParameterType(capabilityStatement, resourceName, searchParameterName) {
    var type = "";
    const result = capabilityStatement;
    if (result) {
        if (result.rest) {
            if (result.rest[0].mode) {
                mode = result.rest[0].mode;
                if (mode == "server") {
                    for (const reso of result.rest[0].resource) {
                        if (reso.type == resourceName) {
                            sps = reso.searchParam;
                            for (const sp of sps) {
                                if (sp.name == searchParameterName) {
                                    type = sp.type;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    return type;
}
async function L1_SearchPatientByEmail(server, MyEmail) {
    const fhirClient = new Client({
        baseUrl: server
    });

    var PatientInfo = null;
    let searchResponse = await fhirClient
        .search({ resourceType: 'Patient', searchParams: { email: MyEmail } });
    if (searchResponse.resourceType=="Bundle") {
        if (searchResponse.entry)
            {entries = searchResponse.entry;}
        else
            {entries = null;}
        PatientInfo = entries;
    }
    else
    {
        if (searchResponse.resourceType=="OperationOutcome")
        {PatientInfo=searchResponse;}
    }
    return PatientInfo;
}

async function L1_SearchPatientByTelecom(server, MyTelecom) {
    const fhirClient = new Client({
        baseUrl: server
    });

    var PatientInfo = null;
    let searchResponse = await fhirClient
        .search({ resourceType: 'Patient', searchParams: { telecom: MyTelecom } });
    if (searchResponse.resourceType=="Bundle") {
        if (searchResponse.entry)
            {entries = searchResponse.entry;}
        else
            {entries = null;}
        PatientInfo = entries;
    }
    else
    {
        if (searchResponse.resourceType=="OperationOutcome")
        {PatientInfo=searchResponse;}
    }
    return PatientInfo;
}

