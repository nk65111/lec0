const fs=require("fs");
let pendingPromises=fs.promises.readFile("./f1.txt");
// console.log(pendingPromises);

pendingPromises.then(function(data){
    console.log(data+"");
    let f2kapendingPromsis=fs.promises.readFile("./f2.txt");
    f2kapendingPromsis.then(function(data){
        console.log(data+"");
        let f3kapendingPromise=fs.promises.readFile("./f3.txt");
        f3kapendingPromise.then(function(data){
            console.log(data+"");
        })

    })
});


pendingPromises.catch(function(error){
    console.log(error);
})