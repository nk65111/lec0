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
    await tab.waitForTimeout(2000);
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
    await addModrator(browser,tab);
})();
async  function addModrator(browser,tab){
    await tab.waitForSelector(".backbone.block-center");
  let allATags=await tab.$$(".backbone.block-center");
  let AllATagsLink=[];
  for(let i=0;i<allATags.length;i++){
     let OneQuesLink= await tab.evaluate(function(elem){
         return elem.getAttribute("href");
      },allATags[i]);
      AllATagsLink.push(OneQuesLink);
  }
  let AllCompleteLinks=AllATagsLink.map(function(link){
      return "https://hackerrank.com"+link;
  });
  let checkAllPromise=[];
  for(let i=0;i<AllCompleteLinks.length;i++){
       let AddNamePromise= addName(AllCompleteLinks[i],browser);
        checkAllPromise.push(AddNamePromise);
  }
  
  await Promise.all(checkAllPromise);



  let allLis = await tab.$$('.pagination li');
    let nextBtnLi = allLis[allLis.length-2];
    let isDisabled = await tab.evaluate( function(elem){ return elem.classList.contains("disabled"); } , nextBtnLi );
    if(isDisabled){
        return;
    }
    else{
        await nextBtnLi.click();
        await addModrator(browser , tab);
    }
}

async  function addName(link,browser){
  let tab= await browser.newPage();
  await tab.goto(link);
  await tab.waitForSelector('li[data-tab="moderators"]',{visible:true});
  await tab.waitForTimeout(1000);
  await tab.click('li[data-tab="moderators"]');
  await tab.waitForSelector('#moderator',{visible:true});
  await tab.type('#moderator',"Nitesh");
  await tab.click('.moderator-save');
  await tab.click(".save-challenge.btn.btn-green");
  await tab.close();
  
}