const cheerio=require("cheerio");
const request=require("request");
const ScoreBoardData = require("./match");

function findMatch(link){
    request(link,function(error,response,body){
       parseBody(body);
    });
}
function parseBody(html){
   let ch= cheerio.load(html);
   let Scoreboard=ch('a[data-hover="Scorecard"]');
   for(let i=0;i<Scoreboard.length;i++){
       let aTag=Scoreboard[i];
       let scoreboardLink=  ch(aTag).attr("href");
       let completeScoreboardLink="https://www.espncricinfo.com"+scoreboardLink;
       ScoreBoardData(completeScoreboardLink);
   }
}
module.exports=findMatch;