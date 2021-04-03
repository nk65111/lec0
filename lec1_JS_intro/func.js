// function harry(){
//     console.log("You are in harry poter world");
// }
// harry();

// function nangloi(name,id){
//     console.log(name+" "+id);
// }
// nangloi("nitesh",1);

function realsing(name){
    if(name=="death note"){
        return 2005;
    }else{
        return 2002;
    }
}
function junra(name){
    if(name=="death note"){
        return "suspense";
    }else{
        return "ninja";
    }
}
function movie(name,func){
    let val=func(name);
    return name+"=>"+val;
}
let detail1=movie("death note",junra);
let detail2=movie("naruto",realsing)
console.log(detail1);
console.log(detail2);


