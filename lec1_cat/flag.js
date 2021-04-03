const fs =require("fs");
let filedata=fs.readFileSync("./f1.txt");
filedata+=""
let data=filedata.split("\r\n");
// console.log(data);

function removeLineExceptOne(data){
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
let maindata=removeLineExceptOne(data);
console.log(maindata);

function numbernOnlyFilledLine(data){
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
let nuberLine=numbernOnlyFilledLine(data);
console.log(nuberLine)

function numberAllLine(data){
    for(let i=1;i<=data.length;i++){
         data[i-1]=`${i}. ${data[i-1]}`;
    }
    let maindata=data.join("\n");
    return maindata;
}

let numallline=numberAllLine(data);
console.log(numallline);