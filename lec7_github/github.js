const cheerio=require("cheerio");
const request=require("request");
const fs=require("fs");

request("https://github.com/topics",function(error,response,data){
    parseMainPage(data);
});

function parseMainPage(html){
    let ch=cheerio.load(html);
    let TopicBox=ch(".topic-box a");
    for(let i=0;i<TopicBox.length;i++){
        let TopicLink=ch(TopicBox[i]).attr("href");
        let CompleteLink="https://github.com/"+TopicLink;
        FindTopicData(CompleteLink);
    }
}

function FindTopicData(link){
    request(link,function(error,response,data){
       parseTopicData(data);
    });
}

function parseTopicData(html){
    let ch=cheerio.load(html);
    let TopicName=ch(".h1-mktg").text().trim();
    if(!fs.existsSync(`./${TopicName}`)){
         fs.mkdirSync(`./${TopicName}`);
    }
    let Article=ch("article.my-4");
    for(let i=0;i<5;i++){
        fecthDataFromTopic(TopicName,Article[i]);
    }
    
}

function fecthDataFromTopic(TopicName,Article){
    let ProjectName=cheerio(Article).find("a.text-bold").text().trim();
    let AllNevBar=cheerio(Article).find(".tabnav-tabs a");
    let issueLink=cheerio(AllNevBar[1]).attr("href");
    let CompleteLink="https://github.com"+issueLink;
    let ProjectPath=`./${TopicName}/${ProjectName}`;
    if(!fs.existsSync(ProjectPath)){
        fs.mkdirSync(ProjectPath);
    }
    request(CompleteLink,parseIssue);
    function parseIssue(error,response,data){
        let ch=cheerio.load(data);
        let AllAtags=ch(".markdown-title");
        for(let i=0;i<AllAtags.length;i++){
            let issuetopic=ch(AllAtags[i]).text().trim();
            let IssueDataLink=ch(AllAtags[i]).attr("href");
            let issueCompleteLink= "https://github.com"+IssueDataLink;
            let issuePath=`${ProjectPath}/issues.json`;
            if(!fs.existsSync(issuePath)){
                fs.writeFileSync(issuePath,JSON.stringify([]));
            }else{
                let getIssue=JSON.parse(fs.readFileSync(issuePath));
                let issue={
                    IssueTopic:issuetopic,
                    issueLink:issueCompleteLink
                }
                getIssue.push(issue);
                fs.writeFileSync(issuePath,JSON.stringify(getIssue));
            }
        }
    }
   
}