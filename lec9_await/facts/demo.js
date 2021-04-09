const puppeteer=require("puppeteer");
const id="xabimol152@aramidth.com";
const pass="DevOpHai";

let challenge=require("./Challenges");
(async function(){
    
     let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    });
   let pages = await browser.pages();
    let tab=pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.waitForTimeout(3000);
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    
    await tab.waitForTimeout(5000);
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a' , {visible:true});
    let bothATags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageChallengeATag = bothATags[1];
    await manageChallengeATag.click();

    await tab.waitForSelector('.btn.btn-green.backbone.pull-right',{visible:true});
    let CreateChallengeBtn=await tab.$('.btn.btn-green.backbone.pull-right');
    let ChallengeLink=await tab.evaluate(function(elem){
       return  elem.getAttribute("href");
    },CreateChallengeBtn);
    let CompleteLink="https://www.hackerrank.com"+ChallengeLink;
    for(let i=0;i<challenge.length;i++){
        fillChallange(CompleteLink,browser,challenge[i]);
       await tab.waitForTimeout(5000);
    }

    

})();

async function fillChallange(link,browser,particulerChallenge){
    let challengename=particulerChallenge["Challenge Name"];
    let desc=particulerChallenge["Description"];
    let problemStatement=particulerChallenge["Problem Statement"];
    let inputFormat=particulerChallenge["Input Format"];
    let constraint=particulerChallenge["Constraints"];
    let outputFormat=particulerChallenge["Output Format"];
    let tags=particulerChallenge["Tags"];


    let newTab = await browser.newPage();
    await newTab.goto(link);
    await newTab.waitForSelector("#name",{visible:true});
    await newTab.type("#name",challengename);
    await newTab.type("#preview",desc);
    await newTab.type("#problem_statement-container .CodeMirror textarea",problemStatement);
    await newTab.type("#input_format-container .CodeMirror textarea",inputFormat);
    await newTab.type("#constraints-container .CodeMirror textarea",constraint);
    await newTab.type("#output_format-container .CodeMirror textarea",outputFormat);
    await newTab.type("#tags_tag",tags);
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close(); 
    
}