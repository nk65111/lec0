const puppeteer=require("puppeteer");
const id="xabimol152@aramidth.com";
const pass="DevOpHai";
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
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]',{visible:true});
     await tab.click('div[data-analytics="NavBarProfileDropDown"]');
     await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]',{visible:true});
     await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
     await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a',{visible:true});
    let bothTags= await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageChallangetag=bothTags[1];
    await manageChallangetag.click();
})();