const fs=require("fs");
let AllFile=["./f1.txt","./f2.txt","./f3.txt"];
let f1kaPromise=fs.promises.readFile(AllFile[0]);
for(let i=1;i<=AllFile.length;i++){
    f1kaPromise= f1kaPromise.then(function(data){
        console.log(data+"");
        if(i<AllFile.length){
        aglaPromise=fs.promises.readFile(AllFile[i]);
        return aglaPromise;
        }
    });
}
// f1kaPromise.then(function(data){
//     console.log(data+"");
// })
