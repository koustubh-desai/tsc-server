var fs=require('fs');
var path=require('path');

const paths=[
    "./server/dist",
    "./client/dist"
];
for(directory of paths){
    /*let filenames = fs.readdirSync(directory);
    filenames.forEach(somefile=>{
        if(somefile.match(/\./)){
            fs.unlink(path.join(directory,somefile),err=>{
                if(err) throw err;
            })
        }
        else{
            //filename is a directory. Add it.
            paths.push(directory+'/'+somefile);
        }
    });*/
    deleteFolderRecursive(directory);
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }
}
//paths.reverse();
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function(file, index){
        var curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };