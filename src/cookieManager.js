let account; 
export function setAccount(pAccount){
    account = pAccount; 
    console.log("test");
    console.log(account); 
    doesAccountExist();
}
function doesAccountExist(){
    console.log(`does this bitch ass exist?`);
    console.log(account);
}

export const add = (pKey, pValue, pExpieryDays) =>{  
    console.log(`im losing it ${pKey},${pValue}`);
    return document.cookie = `${pKey}=${pValue};`; 
}
export const editValue = (pKey,pValue) => {
    if(pKey.contains(pKey)) add(pKey,pValue); 
}
export const remove = (pKey) => {
    document.cookie = `${pKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}
export const contains = (pKey) =>{
    if(getCookie(pKey)) return true;
    return false;   
}
export const getCookie = (pKey) =>{
    let cookie = document.cookie.split(";");
    for(let i =0; i < cookie.length; i++){
        let cookieKey = fixKey(cookie[i]);
        if(cookieKey[0] === pKey) return cookieKey[1];
    }
    return null; 
}
export const getAllCookieKeys = () =>{
    let cookie = document.cookie.split(";"); 
    let keyArray = []; 
    for(let i =0; i < cookie.length; i++){
        let cookieKey = fixKey(cookie[i]);
        keyArray.push(cookieKey); 
    }
    return keyArray; 
}
export function getKeyFromUsername(username){
    let allKeys = getAllCookieKeys(); 
    for(let i = 0; i < allKeys.length; i++){
        let accountObject = JSON.parse(allKeys[i][1])
        if(accountObject.username === username) return allKeys[i][0]; 
    }
}
export const removeAllCookies = () =>{
    let deleteAllCookies = confirm("are you sure you want to delete all cookies?");
    if(!deleteAllCookies) return;
    let allCookies = getAllCookieKeys(); 
    allCookies.forEach(key => {
        remove(key);
    });
    alert("all cookies were deleted");
}
const fixKey = (cookie) =>{
    let cookieKey = cookie.split("="); 
    if(cookieKey[0][0] === " ")cookieKey[0] = cookieKey[0].substring(1);
    return cookieKey;
}

export function usernameExists(username){
    return getAccountByUsername(username)? true:false; 
}

export function getAccountByUsername(username){
    let accounts = getAllCookieKeys(); 
    for(let i = 0; i < accounts.length; i++){
        if(accounts[i][0] == "") continue;
        let account = JSON.parse(accounts[i][1]); 
        if(account.username === username) return account; 
    }
    return false; 
}

// let acocunt = {
//     name: pName.value,
//     username: pUsername.value,
//     password: pPassword.value,
//     projects: [
//         {title:"template",tasks:[{taskName:"task1",completeStatus:false}]},
//         {title:"template2",tasks:[{taskName:"task1",completeStatus:true},{taskName:"task2",completeStatus:false}]}
//     ]
// }

export function projectExists(projectTitle){
    return getProjectByTitle(projectTitle)?true:false; 
}
export function getProjectByTitle(projectTitle){
    console.log(`wtf is going on frr:`);
    console.log(account)
    for(let i = 0; i < account.projects.length; i++){
        if(projectTitle === account.projects[i].title.value) return account.projects[i];
    }
    return false;
}

export function addNewProject(projectTitle){
    if(projectExists(projectTitle)) return "PROJECT EXISTS"; 
    console.log(`wtf is going on:`);
    console.log(account);
    account.projects.push({title:projectTitle,tasks:[]});
    updateAccount(); 
}

export function editProjectTitle(projectTitle, newProjectTitle){
    if(projectExists(projectTitle)){
        if(projectExists(newProjectTitle)) return "PROJECT EXISTS";
        let project = getProjectByTitle(projectTitle); 
        project.title.value = newProjectTitle; 
    }
    else return "PROJECT NOT FOUND";
}
export function deleteProjectByTitle(projectTitle){
    for(let i = 0; i < account[1].projects.length; i++){
        if(projectTitle === account[1].projects[i].title.value) account[1].projects.splice(i,1);
    }
}

export function updateAccount(){
    
    console.log("This is what We got!");
    let accountKey = getKeyFromUsername(account.username);
    console.log(accountKey);
    add(accountKey,JSON.stringify(account));
    console.log("Account is Updated");
    console.log(document.cookie);
}