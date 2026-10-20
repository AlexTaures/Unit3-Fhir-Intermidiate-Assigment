const { L02_1_T01,L02_1_T02,L02_1_T03,L02_1_T04,
    L02_1_T05,L02_1_T06,L02_1_T07,L02_1_T08,
    L02_1_T09,L02_1_T10,
    L02_2_T01,L02_2_T02,L02_2_T03,
    L02_3_T01,L02_3_T02A,L02_3_T02B,
    L02_3_T03A,L02_3_T03B,L02_3_T04A,L02_3_T04B,
    L02_4_T01A,L02_4_T01B,L02_4_T02A,L02_4_T02B,
    L02_4_T02C,L02_4_T01C,
    L02_5_T01A,L02_5_T01B,L02_5_T02A,L02_5_T02B,
    L02_5_T02C,L02_5_T02D,
   
    L2_GetExpectedResult } = require('../L2_test_runner');

/*
Tests for U3-L02_1:Practitioner - Verify Interactions and All Search Parameters
U3-L01_2_T01:metadata: Verify name as Search Param. for Practitioner
U3-L01_2_T02:metadata: Verify family as Search Param. for Practitioner
U3-L01_2_T03:metadata: Verify given as search parameter for Practitioner
U3-L01_2_T04:metadata: Verify _id as search parameter for Practitioner
U3-L01_2_T05:metadata: Verify email as search parameter for Practitioner
U3-L01_2_T06:metadata: Verify telecom as search parameter for Practitioner
U3-L01_2_T07:metadata: Verify identifier as search parameter for Practitioner
U3-L01_2_T08:metadata: Verify birthdate is NOT a search parameter for Practitioner
U3-L01_2_T09:metadata: Verify Practitioner/read as Interaction
U3-L01_2_T10:metadata: Verify Practitioner/search-type as Interaction
Tests for U3-L02_2:Practitioner - Direct Get (GetById)
U3-L02_2_T01:Direct Get to an existing practitioner
U3-L02_2_T02:Direct Get to an non-existing practitioner
U3-L02_2_T03:Direct Get to an existing person without NPI
Tests for U3-L02_3:Practitioner - Searches by Name & Gender
U3-L02_3_T01:Get All Practitioners - 5 found w/NPI
U3-L02_3_T02A:Search All Practitioners by Family Name Lennon- None
U3-L02_3_T02B:Search All Practitioners by Family Name = McEnroe- 1 match with NPI
U3-L02_3_T03A:Search All Practitioners by Name = Lennon- None
U3-L02_3_T03B:Search All Practitioners by Name = John- 3 match with NPI
U3-L02_3_T04A:Search All male Practitioners : 5
U3-L02_3_T04B:Search All female Practitioners : 0
Tests for U3-L02_4:Practitioner - Searches by Id & Identifier
U3-L02_4_T01A:Search by identifier / system=NPI - existing
U3-L02_4_T01B:Search by Identifier / but system not NPI
U3-L02_4_T01C:Search by identifier / NPI but does not exist
U3-L02_4_T02A:Search by _id : Existing Practitioner
U3-L02_4_T02B:Search by _id but the person is not a practitioner
U3-L02_4_T02C:Search by _id: non existing id
Tests for U3-L02_5:Practitioner - Searches by Email and Telecom
U3-L02_5_T01A:Practitioner - Search by email - existing
U3-L02_5_T01B:Practitioner / Search by email - not exists
U3-L02_5_T02A:Practitioner / Search By telecom - phone / not supported
U3-L02_5_T02B:Practitioner / Search By telecom - email / existing
U3-L02_5_T02C:Practitioner / Search By telecom - email / not existing
U3-L02_5_T02D:Practitioner / Search By telecom - w/o system / existing
*/
describe("U3-L02-1:Tests for Practitioner - Conformance Statement: Interactions and Search Parameters", function () {
    it("U3-L02_1_T01:metadata: Verify name as Search Param. for Practitioner" ,
    async function () {
        result=await L02_1_T01();
        const expected=L2_GetExpectedResult("L02_1_T01");
        expect(result).toEqual(expected);

    });

    it("U3-L01_2_T01:metadata: Verify name as Search Param. for Practitioner" ,
    async function () {
        result=await L02_1_T01();
        const expected=L2_GetExpectedResult("L02_1_T01");
        expect(result).toEqual(expected);

    });
it("U3-L01_2_T02:metadata: Verify family as Search Param. for Practitioner" ,
    async function () {
        result=await L02_1_T02();
        const expected=L2_GetExpectedResult("L02_1_T02");
        expect(result).toEqual(expected);

    });
it("U3-L01_2_T03:metadata: Verify given as search parameter for Practitioner" ,
    async function () {
        result=await L02_1_T03();
        const expected=L2_GetExpectedResult("L02_1_T03");
        expect(result).toEqual(expected);

    });
it("U3-L01_2_T04:metadata: Verify _id as search parameter for Practitioner" ,
    async function () {
        result=await L02_1_T04();
        const expected=L2_GetExpectedResult("L02_1_T04");
        expect(result).toEqual(expected);

    });
it("U3-L01_2_T05:metadata: Verify email as search parameter for Practitioner" ,
    async function () {
        result=await L02_1_T05();
        const expected=L2_GetExpectedResult("L02_1_T05");
        expect(result).toEqual(expected);

    });
it("U3-L01_2_T06:metadata: Verify telecom as search parameter for Practitioner" ,
    async function () {
        result=await L02_1_T06();
        const expected=L2_GetExpectedResult("L02_1_T06");
        expect(result).toEqual(expected);

    });
it("U3-L01_2_T07:metadata: Verify identifier as search parameter for Practitioner" ,
    async function () {
        result=await L02_1_T07();
        const expected=L2_GetExpectedResult("L02_1_T07");
        expect(result).toEqual(expected);

    });
it("U3-L01_2_T08:metadata: Verify birthdate is NOT a search parameter for Practitioner" ,
    async function () {
        result=await L02_1_T08();
        const expected=L2_GetExpectedResult("L02_1_T08");
        expect(result).toEqual(expected);

    });
it("U3-L01_2_T09:metadata: Verify Practitioner/read as Interaction" ,
    async function () {
        result=await L02_1_T09();
        const expected=L2_GetExpectedResult("L02_1_T09");
        expect(result).toEqual(expected);

    });
it("U3-L01_2_T10:metadata: Verify Practitioner/search-type as Interaction" ,
    async function () {
        result=await L02_1_T10();
        const expected=L2_GetExpectedResult("L02_1_T10");
        expect(result).toEqual(expected);

    });

});
describe("U3-L02-2:Tests for Practitioner - Direct GET", function () {

it("U3-L02_2_T01:Direct Get to an existing practitioner" ,
    async function () {
        result=await L02_2_T01();
        const expected=L2_GetExpectedResult("L02_2_T01");
        expect(result).toEqual(expected);

    });
it("U3-L02_2_T02:Direct Get to an non-existing practitioner" ,
    async function () {
        result=await L02_2_T02();
        const expected=L2_GetExpectedResult("L02_2_T02");
        expect(result).toEqual(expected);

    });
it("U3-L02_2_T03:Direct Get to an existing person without NPI" ,
    async function () {
        result=await L02_2_T03();
        const expected=L2_GetExpectedResult("L02_2_T03");
        expect(result).toEqual(expected);

    });
});

describe("U3-L02-3:Tests for Practitioner - Searches - All  & by Name, Family, Gender", function () {


it("U3-L02_3_T01:Get All Practitioners - 5 found w/NPI" ,
    async function () {
        result=await L02_3_T01();
        const expected=L2_GetExpectedResult("L02_3_T01");
        expect(result).toEqual(expected);

    });
it("U3-L02_3_T02A:Search All Practitioners by Family Name Lennon- None" ,
    async function () {
        result=await L02_3_T02A();
        const expected=L2_GetExpectedResult("L02_3_T02A");
        expect(result).toEqual(expected);

    });
it("U3-L02_3_T02B:Search All Practitioners by Family Name = McEnroe- 1 match with NPI" ,
    async function () {
        result=await L02_3_T02B();
        const expected=L2_GetExpectedResult("L02_3_T02B");
        expect(result).toEqual(expected);

    });
it("U3-L02_3_T03A:Search All Practitioners by Name = Lennon- None" ,
    async function () {
        result=await L02_3_T03A();
        const expected=L2_GetExpectedResult("L02_3_T03A");
        expect(result).toEqual(expected);

    });
it("U3-L02_3_T03B:Search All Practitioners by Name = John- 3 match with NPI" ,
    async function () {
        result=await L02_3_T03B();
        const expected=L2_GetExpectedResult("L02_3_T03B");
        expect(result).toEqual(expected);

    });
it("U3-L02_3_T04A:Search All male Practitioners : 5" ,
    async function () {
        result=await L02_3_T04A();
        const expected=L2_GetExpectedResult("L02_3_T04A");
        expect(result).toEqual(expected);

    });
it("U3-L02_3_T04B:Search All female Practitioners : 0" ,
    async function () {
        result=await L02_3_T04B();
        const expected=L2_GetExpectedResult("L02_3_T04B");
        expect(result).toEqual(expected);

    });
});
   
describe("U3-L02-4:Tests for Practitioner - Searches - Identifier-Only NPI is valid and _id", function () {

it("U3-L02_4_T01A:Search by identifier / system=NPI - existing" ,
    async function () {
        result=await L02_4_T01A();
        const expected=L2_GetExpectedResult("L02_4_T01A");
        expect(result).toEqual(expected);

    });




it("U3-L02_4_T01B:Search by Identifier / but system not NPI" ,
    async function () {
        result=await L02_4_T01B();
        const expected=L2_GetExpectedResult("L02_4_T01B");
        expect(result).toEqual(expected);

    });
it("U3-L02_4_T01C:Search by identifier / NPI but does not exist" ,
    async function () {
        result=await L02_4_T01C();
        const expected=L2_GetExpectedResult("L02_4_T01C");
        expect(result).toEqual(expected);

    });
it("U3-L02_4_T02A:Search by _id : Existing Practitioner" ,
    async function () {
        result=await L02_4_T02A();
        const expected=L2_GetExpectedResult("L02_4_T02A");
        expect(result).toEqual(expected);

    });
it("U3-L02_4_T02B:Search by _id but the person is not a practitioner" ,
    async function () {
        result=await L02_4_T02B();
        const expected=L2_GetExpectedResult("L02_4_T02B");
        expect(result).toEqual(expected);

    });
it("U3-L02_4_T02C:Search by _id: non existing id" ,
    async function () {
        result=await L02_4_T02C();
        const expected=L2_GetExpectedResult("L02_4_T02C");
        expect(result).toEqual(expected);

    });

});

describe("U3-L02-5:Tests for Practitioner - Searches by email and telecom", function () {

it("U3-L02_5_T01A:Practitioner - Search by email - existing" ,
    async function () {
        result=await L02_5_T01A();
        const expected=L2_GetExpectedResult("L02_5_T01A");
        expect(result).toEqual(expected);

    });
it("U3-L02_5_T01B:Practitioner / Search by email - not exists" ,
    async function () {
        result=await L02_5_T01B();
        const expected=L2_GetExpectedResult("L02_5_T01B");
        expect(result).toEqual(expected);

    });
it("U3-L02_5_T02A:Practitioner / Search By telecom - phone / not supported" ,
    async function () {
        result=await L02_5_T02A();
        const expected=L2_GetExpectedResult("L02_5_T02A");
        expect(result).toEqual(expected);

    });
it("U3-L02_5_T02B:Practitioner / Search By telecom - email / existing" ,
    async function () {
        result=await L02_5_T02B();
        const expected=L2_GetExpectedResult("L02_5_T02B");
        expect(result).toEqual(expected);

    });
it("U3-L02_5_T02C:Practitioner / Search By telecom - email / not existing" ,
    async function () {
        result=await L02_5_T02C();
        const expected=L2_GetExpectedResult("L02_5_T02C");
        expect(result).toEqual(expected);

    });
it("U3-L02_5_T02D:Practitioner / Search By telecom - w/o system / existing" ,
    async function () {
        result=await L02_5_T02D();
        const expected=L2_GetExpectedResult("L02_5_T02D");
        expect(result).toEqual(expected);

    });
});

