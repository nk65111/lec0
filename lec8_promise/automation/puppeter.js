const puppeteer=require("puppeteer");
const id="xabimol152@aramidth.com";
const pass="DevOpHai";
let tab;
let idx;
let gCode;
let BroweserOpeningPromise = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
});

BroweserOpeningPromise.then(function(browser){
    let AllPages=browser.pages();
    return AllPages;
})
.then(function(pages){
    tab=pages[0];
    let Pageopenpromise=tab.goto("https://www.hackerrank.com/auth/login");
    return Pageopenpromise;
})
.then(function(){
    let UserFilledPromise=tab.type("#input-1",id);
    return UserFilledPromise;
})
.then(function(){
    let PassFilledPromise=tab.type("#input-2",pass);
    return PassFilledPromise;
})
.then(function(){
    let LoginPromise=tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return LoginPromise;
})
.then(function(){
    let WnCforInterview=waitAndClick('#base-card-1-link');
    return WnCforInterview;
})
.then(function(){
    let WnCforWarmer=waitAndClick('#base-card-7-link');
    return WnCforWarmer;
})
.then(function(){
    let WaitPromise=tab.waitForSelector(".js-track-click.challenge-list-item",{visible:true});
    return WaitPromise;
})
.then(function(){
    let allQuesATagPromise=tab.$$(".js-track-click.challenge-list-item");
    return allQuesATagPromise;
})
.then(function(allQuesTags){
    let allLinkPromise=[];
    for(let i=0;i<allQuesTags.length;i++){
        let aTag=allQuesTags[i];
        let LinkGetPromise=tab.evaluate(function(elem){
            let link=elem.getAttribute("href");
            return link;
        },aTag);
        allLinkPromise.push(LinkGetPromise);
    }
    let AllLink=Promise.all(allLinkPromise);
    return AllLink;
})
.then(function(AllLink){
   let completeLink=AllLink.map(function(link){
       return "https://www.hackerrank.com"+link;
   });
   let solveQuesOnePromise=SolveQues(completeLink[0]);
   for(let i=1;i<completeLink.length;i++){
        solveQuesOnePromise= solveQuesOnePromise.then(function(){
           nextQuesSolution=SolveQues(completeLink[i]);
           return nextQuesSolution;
       });
   }
   return solveQuesOnePromise;
})
.then(function(){
    console.log("All Question Solve Successfully");
})
.catch(function(error){
    console.log(error);
})


function waitAndClick(selector){
    return new Promise(function(resolve,reject){
       let WaitAndClickPromise=tab.waitForSelector(selector,{visible:true});
       WaitAndClickPromise.then(function(){
           let TabClickPromise=tab.click(selector);
           return TabClickPromise;
       })
       .then(function(){
           resolve()
       })
       .catch(function(error){
           reject(error);
       })

    });
}

function GetCode(){
    return new Promise(function(resolve,reject){
      let WaitPromise=tab.waitForSelector(".hackdown-content h3");
      WaitPromise.then(function(){
          allCodeHeadigPromise=tab.$$('.hackdown-content h3');
          return allCodeHeadigPromise;
      })
      .then(function(allCodeHeading){
          let codeHeading=[];
          for(let i=0;i<allCodeHeading.length;i++){
           let Heading= tab.evaluate(function(elem){
               return elem.textContent;
            },allCodeHeading[i]);
            codeHeading.push(Heading);
        }
        let AllPromise=Promise.all(codeHeading);
        return AllPromise;
      })
      .then(function(CodeNames){
         
          for(let i=0;i<CodeNames.length;i++){
              if(CodeNames[i]=="C++"){
                  idx=i;
                  break;
              }
          }
          let AllCodedataPromise=tab.$$(".hackdown-content .highlight");
          return AllCodedataPromise;
      })
      .then(function(AllCodeData){
          let CodedataDiv=AllCodeData[idx];
          let CodePromise=tab.evaluate(function(elem){
              return elem.textContent;
          },CodedataDiv);
          return CodePromise;
      })
      .then(function(Code){
          gCode=Code;
         resolve();
      })
      .catch(function(error){
          reject(error);
      });
    });
}

function PasteCode(){
    return new Promise(function(resolve,reject){
        let ProblemClickPromise=tab.click('div[data-attr2="Problem"]');
        ProblemClickPromise.then(function(){
            let WaitAndClickPromise=waitAndClick(".custom-input-checkbox");
            return WaitAndClickPromise;
        })
        .then(function(){
            let waitForTextBoxPromise=tab.waitForSelector(".custominput");
            return waitForTextBoxPromise;
        })
        .then(function(){
            let codeTypePromise=tab.type(".custominput",gCode);
            return codeTypePromise;
        })
        .then(function(){
            let ControlDownKeyPromise=tab.keyboard.down("Control");
            return ControlDownKeyPromise;
        })
        .then(function(){
            let AkeyPressedPromise=tab.keyboard.press("A");
            return AkeyPressedPromise;
        })
        .then(function(){
            let XkeyPressedpromise=tab.keyboard.press("X");
            return XkeyPressedpromise;
        })
        .then(function(){
            let EditorClickPromise=tab.click(".monaco-editor.no-user-select.vs");
            return EditorClickPromise;
        })
        .then(function(){
            let AkeyPressedPromise=tab.keyboard.press("A");
            return AkeyPressedPromise;
        })
        .then(function(){
            let vKeyPressedPromise=tab.keyboard.press("V");
            return vKeyPressedPromise;
        })
        .then(function(){
            let ControlUpKeyPromise=tab.keyboard.up("Control");
            return ControlUpKeyPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            console.log(error);
        })
    });
}

function HandleLockBtn(){
    return new Promise(function(resolve,reject){
        let waitPromise=tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled',{visible:true,timeout:5000});
        waitPromise.then(function(){
            let lockBtnPromise = tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
             return lockBtnPromise;
        })
        .then(function(lockBtn){
            
            let lockBtnClickPromise = lockBtn.click();
            return lockBtnClickPromise;
          })
          .then(function(){
          
            console.log("lock btn found !!!");
            resolve();
          })
          .catch(function(error){
            console.log("lock btn not found !!!");
            resolve();
          })
    })
}

function SolveQues(Queslink){
    return new Promise(function(resolve,reject){
       let GotoPromise=tab.goto(Queslink);
       GotoPromise.then(function(){
           let WaitAndClickPromise=waitAndClick('div[data-attr2="Editorial"]');
           return WaitAndClickPromise;
       })
       .then(function(){
           let lockButtonPromise=HandleLockBtn();
           return lockButtonPromise;
       })
       .then(function(){
           let GetCodePromise=GetCode();
           return GetCodePromise;
       })
       .then(function(){
           let PasteCodePromise=PasteCode();
           return PasteCodePromise;
       })
       .then(function(){
           let SubmitClickPromise=tab.click(".hr-monaco-submit");
           return SubmitClickPromise;
       })
       .then(function(){
           resolve();
       })
       .catch(function(error){
           reject(error);
       })
    });
}
