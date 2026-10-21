const ServerEndpoint = ()=> {
    return "http://localhost:3000/4_0_0/";
}
const StudentId= () => {
    return "oscaralexander.taures@salud.gob.sv";
}
const AssignmentSubmissionFHIRServer = () => {
    return "http://fhirserver.hl7fundamentals.org/fhir";
}

const StudentName=()=>{
    return "Oscar Alexander Taures Diaz";
}
const USCoreValidationServer = () => {
    return "https://hl7int-server.com/server/fhir";
}

exports.ServerEndpoint=ServerEndpoint;
exports.AssignmentSubmissionFHIRServer=AssignmentSubmissionFHIRServer;
exports.StudentId=StudentId;
exports.StudentName=StudentName;
exports.USCoreValidationServer=USCoreValidationServer;