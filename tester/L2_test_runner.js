const Client = require('fhir-kit-client');
const Config = require('./config');
const ExpectedResults =
    [
        { key: "L02_1_T01", value: "string" },
        { key: "L02_1_T02", value: "string" },
        { key: "L02_1_T03", value: "string" },
        { key: "L02_1_T04", value: "token" },
        { key: "L02_1_T05", value: "token" },
        { key: "L02_1_T06", value: "token" },
        { key: "L02_1_T07", value: "token" },
        { key: "L02_1_T08", value: "notsupported" },
        { key: "L02_1_T09", value: "read" },
        { key: "L02_1_T10", value: "search-type" },

        { key: "L02_2_T01", value: "McEnroe John Patrick" },
        { key: "L02_2_T02", value: "HTTP 404 Not Found: Resource Practitioner/1008 is not known" },
        { key: "L02_2_T03", value: "HTTP 400 Bad Request: The person you requested is not a practitioner - Lacks a NPI identifier" },

        { key: "L02_3_T01", value: "5:0" },
        { key: "L02_3_T02A", value: "0:0" },
        { key: "L02_3_T02B", value: "1:0" },
        { key: "L02_3_T03A", value: "0:0" },
        { key: "L02_3_T03B", value: "3:0" },
        { key: "L02_3_T04A", value: "5:0" },
        { key: "L02_3_T04B", value: "0:0" },

        { key: "L02_4_T01A", value: "1:0" },
        { key: "L02_4_T01B", value: "HTTP 400 Bad Request: Practitioners can only be found knowing the NPI identifier - You are specifying : PP" },
        { key: "L02_4_T01C", value: "0:0" },
        { key: "L02_4_T02A", value: "1:0" },
        { key: "L02_4_T02B", value: "0:0" },
        { key: "L02_4_T02C", value: "0:0" },

        { key: "L02_5_T01A", value: "1:0" },
        { key: "L02_5_T01B", value: "0:0" },
        { key: "L02_5_T02A", value: "HTTP 501 Not Implemented: The underlying server only handles email addresses for the practitioners, thus search by system=phone is not implemented" },
        { key: "L02_5_T02B", value: "1:0" },
        { key: "L02_5_T02C", value: "0:0" },
        { key: "L02_5_T02D", value: "1:0" }

    ]


module.exports = {
    L02_1_T01, L02_1_T02, L02_1_T03, L02_1_T04,
    L02_1_T05, L02_1_T06, L02_1_T07, L02_1_T08,
    L02_1_T09, L02_1_T10,
    L02_2_T01, L02_2_T02, L02_2_T03,
    L02_3_T01, L02_3_T02A, L02_3_T02B,
    L02_3_T03A, L02_3_T03B, L02_3_T04A, L02_3_T04B,
    L02_4_T01A, L02_4_T01B, L02_4_T02A, L02_4_T02B,
    L02_4_T02C, L02_4_T01C,
    L02_5_T01A, L02_5_T01B, L02_5_T02A, L02_5_T02B,
    L02_5_T02C, L02_5_T02C, L02_5_T02D,
    L2_GetExpectedResult, L2_GetAllTests, L2_RunTest
};

const baseUrl = Config.ServerEndpoint();
async function L2_RunTest(test) {
    var result = "";
    switch (test) {
        case "L02_1_T01":
            result = await L02_1_T01();
            break;
        case "L02_1_T02":
            result = await L02_1_T02();
            break;
        case "L02_1_T03":
            result = await L02_1_T03();
            break;
        case "L02_1_T04":
            result = await L02_1_T04();
            break;
        case "L02_1_T05":
            result = await L02_1_T05();
            break;
        case "L02_1_T06":
            result = await L02_1_T06();
            break;
        case "L02_1_T07":
            result = await L02_1_T07();
            break;
        case "L02_1_T08":
            result = await L02_1_T08();
            break;
        case "L02_1_T09":
            result = await L02_1_T09();
            break;
        case "L02_1_T10":
            result = await L02_1_T10();
            break;
        case "L02_2_T01":
            result = await L02_2_T01();
            break;

        case "L02_2_T02":
            result = await L02_2_T02();
            break;

        case "L02_2_T03":
            result = await L02_2_T03();
            break;

        case "L02_3_T01":
            result = await L02_3_T01();
            break;

        case "L02_3_T02A":
            result = await L02_3_T02A();
            break;

        case "L02_3_T02B":
            result = await L02_3_T02B();
            break;

        case "L02_3_T03A":
            result = await L02_3_T03A();
            break;

        case "L02_3_T03B":
            result = await L02_3_T03B();
            break;

        case "L02_3_T04A":
            result = await L02_3_T04A();
            break;

        case "L02_3_T04B":
            result = await L02_3_T04B();
            break;


        case "L02_4_T01A":
            result = await L02_4_T01A();
            break;

        case "L02_4_T01B":
            result = await L02_4_T01B();
            break;

        case "L02_4_T01C":
            result = await L02_4_T01C();
            break;

        case "L02_4_T02A":
            result = await L02_4_T02A();
            break;

        case "L02_4_T02B":
            result = await L02_4_T02B();
            break;

        case "L02_4_T02C":
            result = await L02_4_T02C();
            break;


        case "L02_5_T01A":
            result = await L02_5_T01A();
            break;

        case "L02_5_T01B":
            result = await L02_5_T01B();
            break;

        case "L02_5_T02A":
            result = await L02_5_T02A();
            break;

        case "L02_5_T02B":
            result = await L02_5_T02B();
            break;

        case "L02_5_T02C":
            result = await L02_5_T02C();
            break;

        case "L02_5_T02D":
            result = await L02_5_T02D();
            break;

        default:
            result = "";
    }
    return result;
}
function L2_GetAllTests() {
    return ExpectedResults
}
function L2_GetExpectedResult(test) {
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

async function L02_1_T01() {
    result = await CheckParameterType('Practitioner', 'name');
    return result;
};
async function L02_1_T02() {
    result = await CheckParameterType('Practitioner', 'family');
    return result;
};
async function L02_1_T03() {
    result = await CheckParameterType('Practitioner', 'given');
    return result;
};
async function L02_1_T04() {
    result = await CheckParameterType('Practitioner', '_id');
    return result;
};
async function L02_1_T05() {
    result = await CheckParameterType('Practitioner', 'email');
    return result;
};
async function L02_1_T06() {
    result = await CheckParameterType('Practitioner', 'telecom');
    return result;
};
async function L02_1_T07() {
    result = await CheckParameterType('Practitioner', 'identifier');
    return result;
};
async function L02_1_T08() {
    result = await CheckParameterType('Practitioner', 'birthdate');
    return result;
};
async function L02_1_T09() {
    result = await CheckInteraction('Practitioner', 'read');
    return result;
};
async function L02_1_T10() {
    result = await CheckInteraction('Practitioner', 'search-type');
    return result;
};
async function L02_2_T01() {
    result = await getdirect('10');
    return result;
};
async function L02_2_T02() {
    result = await getdirect('1008');
    return result;
};
async function L02_2_T03() {
    result = await getdirect('9');
    return result;
};

async function L02_3_T01() {
    MyParameters = {};
    result = await L2_CountPractitioners(baseUrl, MyParameters)

    return result;
};

async function L02_3_T02A() {

    MyParameters = { family: "Lennon" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};
async function L02_3_T02B() {
    MyParameters = { family: "McEnroe" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};
async function L02_3_T03A() {
    MyParameters = { name: "Lennon" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};
async function L02_3_T03B() {
    MyParameters = { name: "John" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};
async function L02_3_T04A() {
    MyParameters = { gender: "male" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)

    return result;
};
async function L02_3_T04B() {
    MyParameters = { gender: "female" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)

    return result;
};
async function L02_4_T01A() {
    MyParameters = { identifier: "http://fhirintermediatecourse.org/NPI|54323" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};
async function L02_4_T01B() {
    MyParameters = { identifier: "http://fhirintermediatecourse.org/PP|241922" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)

    return result;
};
async function L02_4_T01C() {
    MyParameters = { identifier: "http://fhirintermediatecourse.org/NPI|9999999" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)

    return result;
};
async function L02_4_T02A() {
    MyParameters = { _id: 10 };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};
async function L02_4_T02B() {
    MyParameters = { _id: 1008 };
    result = await L2_CountPractitioners(baseUrl, MyParameters)

    return result;
};
async function L02_4_T02C() {
    MyParameters = { _id: 9 };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};
async function L02_5_T01A() {
    MyParameters = { email: "john.mcenroe@tennis.com" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)

    return result;
};
async function L02_5_T01B() {
    MyParameters = { email: "john.mcenroe@tennas.com" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)

    return result;
};
async function L02_5_T02A() {
    MyParameters = { telecom: "phone|55555555" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)

    return result;
};
async function L02_5_T02B() {
    MyParameters = { telecom: "email|john.mcenroe@tennis.com" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};
async function L02_5_T02C() {
    MyParameters = { telecom: "email|john.mcenroe@tennas.com" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};
async function L02_5_T02D() {
    MyParameters = { telecom: "john.mcenroe@tennis.com" };
    result = await L2_CountPractitioners(baseUrl, MyParameters)
    return result;
};

async function CheckInteraction(resource, interaction) {
    const result = await L2_metadata(baseUrl);
    interaction = L2_GetInteraction(result, resource, interaction);
    return interaction;
}


async function CheckParameterType(resource, type) {
    const result = await L2_metadata(baseUrl);
    parameterType = L2_GetSearchParameterType(result, resource, type);
    return parameterType;
}

async function L2_metadata(server) {
    const fhirClient = new Client({
        baseUrl: server
    });
    var metadata = null;
    let response = await fhirClient.capabilityStatement();
    return response;

}
function L2_GetInteraction(capabilityStatement, resourceName, interaction) {
    var code = "";
    var reson = "";
    const result = capabilityStatement;
    if (result) {
        if (result.rest) {
            if (result.rest[0].mode) {
                mode = result.rest[0].mode;
                if (mode == "server") {
                    for (const reso of result.rest[0].resource) {
                        if (reso.type == resourceName) {
                            reson = reso.resourceName;
                            intes = reso.interaction;
                            for (const inte of intes) {
                                if (inte.code == interaction) {
                                    code = inte.code;
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
    if (reson == "") {
        type = "Resource '" + resourceName + "' not supported (not found in Capability Statement)";
    }
    else {
        if (code == "") { code = "notsupported"; }
    }
    return code;

}

function L2_GetSearchParameterType(capabilityStatement, resourceName, searchParameterName) {
    var type = "";
    var reson = "";
    const result = capabilityStatement;
    if (result) {
        if (result.rest) {
            if (result.rest[0].mode) {
                mode = result.rest[0].mode;
                if (mode == "server") {
                    for (const reso of result.rest[0].resource) {
                        if (reso.type == resourceName) {
                            reson = reso.resourceName;
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
    if (reson == "") {
        type = "Resource '" + resourceName + "' not supported (not found in Capability Statement)";
    }
    else {
        if (type == "") { type = "notsupported"; }
    }
    return type;
}
async function L2_GetPractitioner(server, WhichId) {
    const fhirClient = new Client({
        baseUrl: server
    });

    var PractitionerInfo = null;
    let getResponse = await fhirClient
        .read({ resourceType: 'Practitioner', id: WhichId });

    if (getResponse.resourceType == "Practitioner") {

        { PractitionerInfo = getResponse; }
    }
    else {
        if (getResponse.resourceType == "OperationOutcome") { PractitionerInfo = getResponse; }
    }
    return PractitionerInfo;
}
async function getdirect(id) {
    try {
    const resultE = await L2_GetPractitioner(baseUrl, id);
    var result = "";
    if (resultE.resourceType == "Practitioner") {
        const p = resultE;
        result = p.name[0].family + " " + p.name[0].given[0]
        if (p.name[0].given.length > 1) { result = result + " " + p.name[0].given[1]; }

    }
    else {
        if (resultE) {
            if (resultE.issue) { result = resultE.issue[0].diagnostics; }
            else { result = "<<NOT SUPPORTED>>" }
        }
        else {
            result = "<<NOT EXISTING>>";
        }
    }
        
} catch (error) {
    let OO=error.response.data;
    result=OO.issue[0].diagnostics;

}

    return result;
}
async function L2_CountPractitioners(server, MyParameters) {
    var tot = 0;
    var pra = 0;
    var result = "";
    try {
        
    const bun = await L2_SearchPractitioner(server, MyParameters);
    if (bun == null) {
        result = "0:0";
    }
    else {
        if (Array.isArray(bun) == true) {

            tot = bun.length;
            for (const ent of bun) {
                prac = ent.resource;

                for (const ide of prac.identifier) {
                    var ideSystem = ide.system.substring(ide.system.lastIndexOf('/') + 1);
                    if (ideSystem.toLowerCase() == "npi") {
                        pra++;
                        break;
                    }
                }

            }
            let dif = tot - pra;
            result = tot.toString() + ":" + dif.toString();
        }
        else {
            if (bun.resourceType = "OperationOutcome") {
                result = bun.issue[0].diagnostics;
            }
        }
    }
        } catch (error) {
            let bun=error.response.data;
            result = bun.issue[0].diagnostics;
        }

    return result;
}
async function L2_SearchPractitioner(server, MyParameters) {
    const fhirClient = new Client({
        baseUrl: server
    });

    var PractitionerInfo = null;
    let searchResponse = await fhirClient
        .search({ resourceType: 'Practitioner', searchParams: MyParameters });
    if (searchResponse.resourceType == "Bundle") {
        if (searchResponse.entry) { entries = searchResponse.entry; }
        else { entries = null; }
        PractitionerInfo = entries;
    }
    else {
        if (searchResponse.resourceType == "OperationOutcome") { PractitionerInfo = searchResponse; }
    }
    return PractitionerInfo;
}
