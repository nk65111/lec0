const fs=require("fs");
const path=require("path");
const document=require("./utility");
let folderPath="./Download/";
let extenPath;

function checkFolder(extension){
     for(let key in document){
        if(document[key].includes(extension)){
            extenPath=`${folderPath}/${key}`;
            break;
        } 
     }
     return fs.existsSync(extenPath);
}
function createFolder(){
   fs.mkdirSync(extenPath);
}

function moveFile(docname){
   let sourceFilePath=`${folderPath}/${docname}`;
   let destFilePath=`${extenPath}/${docname}`;
   fs.copyFileSync(sourceFilePath,destFilePath);
   fs.unlinkSync(sourceFilePath);

}

function sortingSync(){
   let filename= fs.readdirSync(folderPath);
   for(let i=0;i<filename.length;i++){
    let extension= path.extname(filename[i]);
    // console.log(extension);
      let isextenFolderExist= checkFolder(extension);
      if(isextenFolderExist){
         moveFile(filename[i]);
      }else{
         createFolder();
         moveFile(filename[i]);
      }
   }
}

sortingSync(folderPath);
