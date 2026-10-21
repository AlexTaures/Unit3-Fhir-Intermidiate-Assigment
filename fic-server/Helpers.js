const getOperationOutcome = require('@asymmetrik/node-fhir-server-core/src/server/resources/4_0_0/schemas/operationoutcome');

module.exports.mapProcessingError = function (ErrorMessage = "") {
     const error = new getOperationOutcome();
        error.issue=[{
        severity: "error",
        code : "processing",
        diagnostics:  ErrorMessage}];
        error.text= {
            "status": "generated",
            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><h1>Operation Outcome</h1><table border=\"0\"><tr><td style=\"font-weight: bold;\">ERROR</td><td>[]</td><td><pre>"+ErrorMessage+"</pre></td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>"
          }
           
     return error;
}