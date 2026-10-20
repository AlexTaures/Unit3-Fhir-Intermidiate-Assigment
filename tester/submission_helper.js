const Config = require('./config');
const baseUrl= Config.ServerEndpoint();
module.exports={TestResults};
const L1= require('./L1_test_runner');
const L2= require('./L2_test_runner');
const L3= require('./L3_test_runner');

async function TestResults()
{

    var outcome=[];
    const T1=await AddTests_L1();
    outcome.push(T1);
    const T2=await AddTests_L2();
    outcome.push(T2);
    const T3=await AddTests_L3();
    outcome.push(T3);
    return outcome;
}
async function AddTests_L3()
{
  
  var TestResults=[];
  AllTests=L3.L3_GetAllTests();
  
  for (const MyKey of Object.keys(AllTests))
   {
    MyElement= AllTests[MyKey];
    result   = await L3.L3_RunTest(MyElement.key);
    TestResults.push({key:MyElement.key,value:result});
   }                
  return TestResults;
   
}

async function AddTests_L2()
{
  var TestResults=[];
AllTests=L2.L2_GetAllTests();

for (const MyKey of Object.keys(AllTests))
 {
  MyElement= AllTests[MyKey];
  result   = await L2.L2_RunTest(MyElement.key);
  TestResults.push({key:MyElement.key,value:result});
 }                
return TestResults;

}

async function AddTests_L1()
{
var TestResults=[];
AllTests=L1.L1_GetAllTests();

for (const MyKey of Object.keys(AllTests))
 {
  MyElement= AllTests[MyKey];
  result   = await L1.L1_RunTest(MyElement.key);
  TestResults.push({key:MyElement.key,value:result});
 }                
return TestResults;
}

