const fs=require("fs");
let pendingPromises=fs.promises.readFile("./f2.txt");
// console.log(pendingPromises);

pendingPromises.then(function(data){
    console.log(data+"");
    console.log(pendingPromises);
});


pendingPromises.catch(function(error){
    console.log(error);
})