const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary",function(error,response,body){
  parseBody(body);
});
function parseBody(html){
    
    let ch=cheerio.load(html);
    let tag=ch('div[itemprop="articleBody"] p');
     console.log(ch(tag[0]).text());
}
