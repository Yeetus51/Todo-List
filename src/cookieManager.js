export const add = (pKey, pValue, pExpieryDays) =>{  
    return document.cookie = `${pKey}=${pValue};`; 
}
export const editValue = (pKey,pValue) => {
    //cookieEditor.add(pKey,pValue); 
}
export const remove = (pKey) => {
    document.cookie = `${pKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}
export const contains = (pKey) =>{
    let cookie = document.cookie.split(";");
    for(let i =0; i < cookie.length; i++){
        let cookieKey = cookie[i].split("=")[0]; 
        if(cookieKey[0] === " ")cookieKey = cookieKey.substring(1);
        if(cookieKey === pKey) return true;
    }
    return false; 
}
export const getCookie = (pKey) =>{
    let cookie = document.cookie.split(";");
    for(let i =0; i < cookie.length; i++){
        let cookieKey = cookie[i].split("=")[0]; 
        if(cookieKey[0] === " ")cookieKey = cookieKey.substring(1);
        if(cookieKey === pKey) return cookie[i].split("=")[1];
    }
    return "NOT FOUND"; 
}
export const getAllCookieKeys = () =>{
    let cookie = document.cookie.split(";"); 
    let keyArray = []; 
    for(let i =0; i < cookie.length; i++){
        let cookieKey = cookie[i].split("=")[0]; 
        if(cookieKey[0] === " ")cookieKey = cookieKey.substring(1);
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
