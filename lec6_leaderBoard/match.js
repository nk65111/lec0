const cheerio=require("cheerio");
const request=require("request");
const fs=require("fs");
let leaderboard=[];
let count=0;
function ScoreBoardData(link){
request(link,function(error,response,body){
      parseMatch(body);
      count--;
      if(count==0){
          console.table(leaderboard);
      }
});
count++;
}
function parseMatch(html){
    let ch=cheerio.load(html);
    let MatchTable=ch('div[class="card content-block match-scorecard-table"] .Collapsible');
    for(let i=0;i<MatchTable.length;i++){
        let OneMatch=ch(MatchTable[i]);
        let Team=ch(OneMatch.find("h5")).text();
        let TeamName=Team.split("INNINGS")[0].trim();
        // console.log(TeamName);

        let BatsManTable=OneMatch.find(".table.batsman");
        let PlayerData=BatsManTable.find("tbody tr");
        for(let j=0;j<PlayerData.length-1;j++){
           let allTds=ch(PlayerData[j]).find("td");
           if(allTds.length>1){
              let BatsMan=ch(allTds[0]).text().trim();
              let run=ch(allTds[2]).text().trim();
              let balls=ch(allTds[3]).text().trim();
              let four=ch(allTds[5]).text().trim();
              let six=ch(allTds[6]).text().trim();
            //   console.log(`TemaName=>${TeamName},BatsMan=>${BatsMan},Run=> ${run} ,Balls=>${balls},Four=>${four},Six=>${six},StrickRat=>${Strikerate}`);
            fillIntoJson(TeamName,BatsMan,run,balls,four,six);
            
           }
        }
      
        
    }
}

 function fillIntoJson(teamName,batsMan,run,balls,four,six){
     run=Number(run);
     balls=Number(balls);
     four=Number(four);
     six=Number(six);
  if(leaderboard.length){
      for(let i=0;i<leaderboard.length;i++){
          let obj=leaderboard[i];
          if(obj.TeamName==teamName&&obj.BatsMan==batsMan){
              obj.Run+=run,
              obj.Balls+=balls;
              obj.Four+=four;
              obj.Six=six;
              return;
          }
      }
  }
  let inning={
      TeamName:teamName,
      BatsMan:batsMan,
      Run:run,
      Balls:balls,
      Four:four,
      Six:six
  }
  leaderboard.push(inning);
}


// function fillIntoJson(teamName,batsMan,run,balls,four,six){
//  let leaderboarddata= JSON.parse(fs.readFileSync("./leaderbord.json"));
//  run=Number(run);
//  balls=Number(balls);
//  four=Number(four);
//  six=Number(six);
//  if(leaderboarddata.length){
//  for(let i=0;i<leaderboarddata.length;i++){
//      let obj=leaderboarddata[i];
//      if(obj.TeamName==teamName&&obj.BatsMan==batsMan){
//          obj.Run+=run;
//          obj.Balls+=balls;
//          obj.Four+=four;
//          obj.Six+=six;
//          fs.writeFileSync("./leaderbord.json",JSON.stringify(leaderboarddata));
//          return;
//      }
     
//  }
// }
// let inning={
//     TeamName:teamName,
//     BatsMan:batsMan,
//     Run:run,
//     Balls:balls,
//     Four:four,
//     Six:six
// }
// leaderboarddata.push(inning);
// fs.writeFileSync("./leaderbord.json",JSON.stringify(leaderboarddata));
// }
module.exports=ScoreBoardData;
