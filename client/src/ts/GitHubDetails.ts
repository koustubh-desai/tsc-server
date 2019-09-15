function* gitHubDetails(){
    let orgName = "Wallah";
    var baseUrl = "https://api.github.com/orgs";
    var url = baseUrl + orgName;
    console.log("I am in here");
    let reposUrl = yield wrapperOnFetch(url);
    let repoFullName = yield wrapperOnFetch(reposUrl);
    yield wrapperOnFetch(`https://api.github.com/repos/${repoFullName}/contributors`);
}
let i = 0;
function wrapperOnFetch(a:any){
    console.log(" i got ",a);
    return String(++i)+a;
}
let a = gitHubDetails();
for(let kka of a){
    console.log(kka);
}
