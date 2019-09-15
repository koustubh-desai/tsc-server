var fs=require('fs');
var path=require('path');

const paths=[
    "./server/dist",
    "./client/dist"
];
for(directory of paths){
    let filenames = fs.readdirSync(directory);
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
    })
}