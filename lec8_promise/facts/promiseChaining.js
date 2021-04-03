const fs=require("fs");
let f1kapromise=fs.promises.readFile("./f1.txt");
f1kapromise.then(function(data){
    console.log(data+"");
    f2kapromise=fs.promises.readFile("./f2.txt");
    return f2kapromise;
})
.then(function(data){
    console.log(data+"");
    f3kapromise=fs.promises.readFile("./f3.txt");
    return f3kapromise;
})
.then(function(data){
    console.log(data+"");
})