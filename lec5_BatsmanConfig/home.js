const cheerio=require("cheerio");
const request=require("request");
const findMatch = require("./allMatches");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",function(error,response,body){
    parseData(body);
});
function parseData(html){
   let ch= cheerio.load(html);
   let Allresult=ch(".widget-items.cta-link a");
   let link=Allresult['0']['attribs']['href'];
   let completeLink="https://www.espncricinfo.com"+link;
   findMatch(completeLink);
   
}