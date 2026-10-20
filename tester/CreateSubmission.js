const Config = require('./config');
const baseUrl= Config.ServerEndpoint();
const sh=require('./submission_helper.js');

    sh.TestResults().then((res)=>
    {
        SubmitTestReport(res);
    }
    );
    
function SubmitTestReport(TestResults)

{
    const Client = require('fhir-kit-client');
    var date = new Date(); 
    datee=date.toISOString();
    datee=datee.replaceAll(":","");
    tr=
    {
        resourceType:'TestReport',
        status:'in-progress',
        testScript:{identifier:{system:'http://fhirintermediate.org/test_script/id',value:'FHIR_INTERMEDIATE_U03-JS'}},
        result:"pending",
        tester:Config.StudentId(),
        identifier:{system:'http://fhirintermediate.org/test_report/id',value:Config.StudentId()+"-"+datee},
        issued: datee,
        participant: [
            {
              "type": "client",
              "uri": "http://localhost",
              "display": Config.StudentName()
            },
            {
              "type": "server",
              "uri": Config.ServerEndpoint(),
              "display": Config.ServerEndpoint()
            }
          ],
        test:[]
    }

    
    TestResults.forEach((t1)=>
    {
        t1.forEach((t)=>
        {
        console.log(t.key);
        console.log(t.value);  
        result='pass';
        if (t.value=="")
         {
          t.value="Not Attempted";
          result='fail';
         }
        OneTest=
        {
            id: t.key,
            name: t.key,
            description: t.key,
            action: [
                         {
                            assert: 
                            {
                              result: result,
                              message: t.value
                            }
                        }
            ]
        };
     
         tr.test.push(OneTest);
    });
    });
    const fs = require('fs')
    try {
      const filename='FHIR_INTERMEDIATE_U3_SUBMISSION_' + Config.StudentId()+"_"+datee+'.JSON';
      const data = fs.writeFileSync(filename, JSON.stringify(tr));
      console.log("Your report was saved to "+filename);
    } catch (err) {
      console.error(err)
    }
  }