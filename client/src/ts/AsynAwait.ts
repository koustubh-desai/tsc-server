
async function ResolveLater(){
    console.log(' STEP 1 ');
    const la1 = await tryme('wallah');
    console.log(' STEP 2 ',la1);
    const la2 = await tryme(la1 + 'jojo');
    console.log(' STEP 3 ',la2);
    const la3 = await tryme (la2 + 'koko');
    return 'i am done'+la3;
}
function tryme(mssg:string){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('\n resolving',mssg);
            resolve(mssg);
        },Math.random()*2000);
    });
}
console.log('started \n');
console.log(ResolveLater());