// This module is a demo in node js, created to query your FHIR Server Implementation
// We will test here the projects' Patient resource implementation
// Just to make sure you did not insert a change that broke the project
// (This should work after you improve the project with your changes)
const Client = require("fhir-kit-client");
const Axios = require('axios'); //When we want to do something not supported by client we use axios
module.exports = {
  L0_SearchPatientById,
  L0_SearchPatientByFamily,
  L0_SearchPatientByIdentifier
};
async function L0_SearchPatientById(
  server,
  PatientId
) {
  const fhirClient = new Client({
    baseUrl: server
  });

  let Response = await fhirClient
    .read({ resourceType: 'Patient', id: PatientId });

  return Response;
}

async function L0_SearchPatientByIdentifier(server, patientidentifiersystem, patientidentifiervalue) {
  const fhirClient = new Client({
    baseUrl: server
  });

  var PatientInfo = null;
  let searchResponse = await fhirClient
    .search({ resourceType: 'Patient', searchParams: { identifier: patientidentifiersystem + "|" + patientidentifiervalue } });
  entries = searchResponse.entry;
  if (entries) {
    PatientInfo = entries;
  }
  return PatientInfo;
}


async function L0_SearchPatientByFamily(server, MyFamily) {
  const fhirClient = new Client({
    baseUrl: server
  });

  var PatientInfo = null;
  let searchResponse = await fhirClient
    .search({ resourceType: 'Patient', searchParams: { family: MyFamily } });
  entries = searchResponse.entry;
  if (entries) {
    PatientInfo = entries;
  }
  return PatientInfo;
}


