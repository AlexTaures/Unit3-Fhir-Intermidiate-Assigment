const { L03_3_T01A,L03_3_T02A,L03_3_T03A,
    L3_GetExpectedResult } = require('../L3_test_runner');

/*
Tests for U3-L03_1:MedicationRequest - Make it FHIR compliant
U3-L03_3_T01A:MedicationRequest - Direct Get - Validate
U3-L03_3_T02A:MedicationRequest - Verify the display element for Requester
U3-L03_3_T03A:MedicationRequest - Verify added warning message for opioids
*/
describe("U3-L03-3:Tests for Medication Request", function () {
    it("U3-L03_3_T01A:Direct Get & Validate" ,
    async function () {
        result=await L03_3_T01A();
        const expected=L3_GetExpectedResult("L03_3_T01A");
        expect(result).toEqual(expected);

    });
    it("U3-L03_3_T02A:Display for Requester" ,
    async function () {
        result=await L03_3_T02A();
        const expected=L3_GetExpectedResult("L03_3_T02A");
        expect(result).toEqual(expected);

    });
    it("U3-L03_3_T03A:Message for Opioids" ,
    async function () {
        result=await L03_3_T03A();
        const expected=L3_GetExpectedResult("L03_3_T03A");
        expect(result).toEqual(expected);

    });
    
});

