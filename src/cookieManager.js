export const add = (pKey, pValue, pExpieryDays) =>{  
    return document.cookie = `${pKey}=${pValue};`; 
}
export const editValue = (pKey,pValue) => {
    if(pKey.contains(pKey)) cookieEditor.add(pKey,pValue); 
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