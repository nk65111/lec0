const request=require("request");
const cheerio=require("cheerio");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard",function(error,response,body){
    parsedata(body);
});
let m=0;
let name="";
function parsedata(html){
     let ch=cheerio.load(html);
      let allwicket=ch('table[class="table bowler"] tbody tr td:nth-child(5)');
      let allbowler=ch('table[class="table bowler"] tbody tr td:nth-child(1)');
      for(let i=0;i<allwicket.length;i++){
          let bowlerName=ch(allbowler[i]);
          let wicket=ch(allwicket[i]);
        if(m<parseInt(wicket.text())){
            name=bowlerName.text();
            m=parseInt(wicket.text());
        }
      }
      console.log(`${name}=>${m}`);
      
}
