const cheerio=require("cheerio");
const request=require("request");
const fs=require("fs");
function ScoreBoardData(link){
request(link,function(error,response,body){
      parseMatch(body);
});
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
              let Strikerate=ch(allTds[7]).text().trim();
            //   console.log(`TemaName=>${TeamName},BatsMan=>${BatsMan},Run=> ${run} ,Balls=>${balls},Four=>${four},Six=>${six},StrickRat=>${Strikerate}`);
            fillIntoJson(TeamName,BatsMan,run,balls,four,six,Strikerate);
            
           }
        }
      
        
    }
}

function checkTeamFile(TeamName){
    let Teampath=`./IPL/${TeamName}`;
    return fs.existsSync(Teampath);
}

function checkBatmanFile(TeamName,BatsMan){
    let BatsManPath=`./IPL/${TeamName}/${BatsMan}.json`;
    return fs.existsSync(BatsManPath);
}

function updateBatmanFile(TeamName,BatsMan,run,balls,four,six,strikerate){
    let BatsManPath=`./IPL/${TeamName}/${BatsMan}.json`;
    let stringyFiedData=fs.readFileSync(BatsManPath);
    let BatsManData=JSON.parse(stringyFiedData);
    let inning={
       Runs: run,
       Balls:balls,
       Four:four,
       Six: six,
       Strikerate:strikerate
    }
    BatsManData.push(inning);
    fs.writeFileSync(BatsManPath,JSON.stringify(BatsManData));
}

function createBatmanFile(TeamName,BatsMan,run,balls,four,six,strikerate){
    let BatsmanPath=`./IPL/${TeamName}/${BatsMan}.json`;
    let BatManFile=[];
    let inning={
        Runs: run,
        Balls:balls,
        Four:four,
        Six: six,
        Strikerate:strikerate
     }
     BatManFile.push(inning);
     fs.writeFileSync(BatsmanPath,JSON.stringify(BatManFile));
}

function createTeamFile(TeamName){
    let Teampath=`./IPL/${TeamName}`;
    fs.mkdirSync(Teampath);
}

function fillIntoJson(TeamName,BatsMan,run,balls,four,six,Strikerate){
  let isTeam= checkTeamFile(TeamName);
  if(isTeam){
     let isBatman=checkBatmanFile(TeamName,BatsMan);
     if(isBatman){
         updateBatmanFile(TeamName,BatsMan,run,balls,four,six,Strikerate);
     }else{
         createBatmanFile(TeamName,BatsMan,run,balls,four,six,Strikerate);
          
     }
  }else{
      createTeamFile(TeamName);
      createBatmanFile(TeamName,BatsMan,run,balls,four,six,Strikerate);
  }
}
module.exports=ScoreBoardData;