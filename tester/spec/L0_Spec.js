
const Config = require('../config');
const Client = require('../L0_demo');
const fs = require('fs');
const { triggerAsyncId } = require('async_hooks');
const baseUrl = Config.ServerEndpoint();
//Game Plan: Get Patient ID For John Paul Jones
//Only one named 'Jones' (family Name)
describe("L0_Demo_Tests", function () {
    it("L0_T01_Search Patient By Id", async function () {
        const PatientId = 9;
        const p = await Client.L0_SearchPatientById(baseUrl, PatientId);
        var expected = "{family}|Jones\n";
        expected += "{given}|John Paul\n";
        expected += "{birthDate}|1956-01-03\n";
        expected += "{gender}|male\n";
        var result = "{family}|" + p.name[0].family + "\n";
        result += "{given}|" + p.name[0].given[0] + " " + p.name[0].given[1] + "\n";
        result += "{birthDate}|" + p.birthDate + "\n";
        result += "{gender}|" + p.gender + "\n";
        expect(result).toEqual(expected);


    });
    it("L0_T02:Search Patient by Family", async function () {
        const PatientFamily = 'Jones';
        const resultE = await Client.L0_SearchPatientByFamily(baseUrl, PatientFamily);
        const p = resultE[0].resource;

        var expected = "{family}|Jones\n";
        expected += "{given}|John Paul\n";
        expected += "{birthDate}|1956-01-03\n";
        expected += "{gender}|male\n";
        var result = "{family}|" + p.name[0].family + "\n";
        result += "{given}|" + p.name[0].given[0] + " " + p.name[0].given[1] + "\n";
        result += "{birthDate}|" + p.birthDate + "\n";
        result += "{gender}|" + p.gender + "\n";
        expect(result).toEqual(expected);

    });

    it("L0_T03:Search Patient by NI Identifier", async function () {
        const PatientIdentifierSystem = 'http://fhirintermediatecourse.org/NI';
        const PatientIdentifierValue = '51393111';
        var expected = "{family}|Jones\n";
        expected += "{given}|John Paul\n";
        expected += "{birthDate}|1956-01-03\n";
        expected += "{gender}|male\n";
        try {
        const resultE = await Client.L0_SearchPatientByIdentifier(baseUrl, PatientIdentifierSystem, PatientIdentifierValue);
        const p = resultE[0].resource;

        
        var result = "{family}|" + p.name[0].family + "\n";
        result += "{given}|" + p.name[0].given[0] + " " + p.name[0].given[1] + "\n";
        result += "{birthDate}|" + p.birthDate + "\n";
        result += "{gender}|" + p.gender + "\n";
    } catch (error) {
        result=error.response.data.issue[0].diagnostics;        
    }
    
        expect(result).toEqual(expected);


    });


});
