const fs=require("fs");


function getReadpromise(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,function(error,data){
            if(error){
                reject(error);
            }else{
                resolve(data);
            }
        });
    })
}

let PendingPromise= getReadpromise("./f1.txt");
// let PendingPromise=fs.promises.readFile(`./f1.txt`);

PendingPromise.then(function(data){
    console.log(data+"");
});
PendingPromise.catch(function(error){
    console.log(error);
});
