let content =process.argv.slice(2);
const fs=require("fs");
let flag=[];
let file=[];


// ###############################put tag into file and flag####################
for(let i=0;i<content.length;i++){
    if(content[i].startsWith('-')){
        flag.push(content[i]);
    }else{
        file.push(content[i]);
    }
 }
 if(flag.length==0||file.length==0){
     return;
 }
 console.log(flag);
 console.log(file);
// #########################run file one by one#########################
for(let i=0;i<file.length;i++){
   let filedata=fs.readFileSync(file[i]);
   filedata+="";
   
   let ans=checkflag(filedata);
   console.log(ans);
}

// ###########################check flag have not or have###############

function checkflag(filedata){
    let removeAllSpaces='';
   if(flag.includes('-s')){
    removeAllSpaces= removeLineExceptOne(filedata);
   }
   if(flag.includes('-n')&&flag.includes('-h')){
       if(flag.indexOf('-n')>flag.indexOf(-h)){
          if(flag.includes('-s')){
            removeAllSpaces= numberAllLine(removeAllSpaces);
          }else{
            removeAllSpaces=numberAllLine(filedata);
            
          }
       }else{
        if(flag.includes('-s')){
            removeAllSpaces= numbernOnlyFilledLine(removeAllSpaces);
            
           }else{
            removeAllSpaces=numbernOnlyFilledLine(filedata);
              
           }
       }
   }
   else if(flag.includes('-n')){
       if(flag.includes('-s')){
        removeAllSpaces= numberAllLine(removeAllSpaces);
        
       }else{
        removeAllSpaces=numberAllLine(filedata);
         
       }
   }
   else if(flag.includes('-h')){
       if(flag.includes('-s')){
        removeAllSpaces= numbernOnlyFilledLine(removeAllSpaces);
        
       }else{
        removeAllSpacess=numbernOnlyFilledLine(filedata);
         
       }
   }
   return removeAllSpaces;
    
}

// #############################for -s flag#########################

function removeLineExceptOne(filedata){
    let data=filedata.split("\r\n");
    let flag=false;
    let arr=[];
    for(let i=0;i<data.length;i++){
        if(data[i].length==0&&flag==false){
             arr.push(data[i]);
             flag=true;
        }else if(data[i].length>0){
             arr.push(data[i]);
        }
    }
    let maindata=arr.join("\n");
    return maindata;
}
// ##############################for -n flag##############################
function numberAllLine(filedata){
    let data=filedata.split("\r\n");
    for(let i=1;i<=data.length;i++){
         data[i-1]=`${i}. ${data[i-1]}`;
    }
    let maindata=data.join("\n");
    return maindata;
}
// #################################for -h flag###########################

function numbernOnlyFilledLine(filedata){
    let data=filedata.split("\r\n");
    let count=1;
    for(let i=0;i<data.length;i++){
       if(data[i].length>0){
           data[i]=`${count}. ${data[i]}`;
           count++;
       }
    }
    let maindata=data.join("\n");
    return maindata;
}