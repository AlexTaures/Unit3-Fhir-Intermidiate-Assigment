
const { L01_1_T01, L01_1_T02, L01_1_T03,
    L01_2_T01, L01_2_T02, L01_2_T03,
    L01_2_T04, L01_2_T05, L1_GetExpectedResult } = require('../L1_test_runner');
/*
TEST_ID	DESCRIPTION
L01_1_Tests	Tests for U3-L01_1:Add Support for Searching Patient By Email
L01_1_T01	U3-L01_1_T01:Patient - verify email as search parameter in CapabilityStatement
L01_1_T02	U3-L01_1_T02:Patient - Search by email - existing
L01_1_T03	U3-L01_1_T03:Patient - Search by email - Not Exists
L01_2_Tests	Tests for U3-L01_1:Add Support for Searching Patient By Telecom
L01_2_T01	U3-L01_2_T01:Patient - Verify telecom as search parameter in CapabilityStatement
L01_2_T02	U3-L01_2_T02:Patient - Search by telecom - existing
L01_2_T03	U3-L01_2_T03:Patient - Search by telecom / not exists
L01_2_T04	U3-L01_2_T04:Patient - Search by telecom / phone - not supported
L01_2_T05	U3-L01_2_T05:Patient - Search by telecom w/o system
*/
describe("U3-L01-1:Patient - Add Support for Searching By Email", function () {
    it("U3-L01_1_T01:Patient - verify email as search parameter in CapabilityStatement",
        async function () {
            result = await L01_1_T01();
            const expected = L1_GetExpectedResult("L01_1_T01");
            expect(result).toEqual(expected);

        });
    it("U3-L01_1_T02:Patient - Search by email - existing", async function () {

        result = await L01_1_T02();
        const expected = L1_GetExpectedResult("L01_1_T02");
        expect(result).toEqual(expected);

    });
    it("U3-L01_1_T03:Patient - Search by email - non existing", async function () {
        result = await L01_1_T03();
        const expected = L1_GetExpectedResult("L01_1_T03");
        expect(result).toEqual(expected);

    });

});

describe("U3-L01-2:Patient - Add Support for Searching By Telecom", function () {

    it("U3-L01_2_T01:Patient - verify telecom as search parameter in CapabilityStatement",
        async function () {

            result = await L01_2_T01();
            const expected = L1_GetExpectedResult("L01_2_T01");
            expect(result).toEqual(expected);


        });
    it("U3-L01_2_T02:Patient - Search by telecom - existing", async function () {

        result = await L01_2_T02();
        const expected = L1_GetExpectedResult("L01_2_T02");
        expect(result).toEqual(expected);

    });
    it("U3-L01_2_T03:Patient - Search by telecom - non existing", async function () {
        result = await L01_2_T03();
        const expected = L1_GetExpectedResult("L01_2_T03");
        expect(result).toEqual(expected);

    });
    it("U3-L01_2_T04:Patient - Search by telecom - phone: not implemented", async function () {
        result = await L01_2_T04();
        const expected = L1_GetExpectedResult("L01_2_T04");
        expect(result).toEqual(expected);

    });
    it("U3-L01_2_T05:Patient - Search by telecom - w/o system", async function () {
        result = await L01_2_T05();
        const expected = L1_GetExpectedResult("L01_2_T05");
        expect(result).toEqual(expected);

    });

});
