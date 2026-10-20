const legacyUrl = "http://3.221.164.25:9080";
const axios = require('axios');
const apiHelpers = function () { };
var cache = [];
module.exports.getLegacyData = async function (endpoint) {
    content=null;
    for (const cachei of cache) {
        if (cachei.url==endpoint)
        {
            content=cachei.data;
            break;
        }
    }
    if (content==null)
    {
        content =  await GetLegacyContent(endpoint);
        cache.push({url:endpoint,data:content})
    }
    return content;
}
async function GetLegacyContent(key) {
    const urlSpecific = legacyUrl + "/" + key;
    var content =null;
    try {
        const res = await axios.get(urlSpecific);
        content   = res.data;
    } catch (error) {
        console.log(error);
    }
    
    return content;
}

