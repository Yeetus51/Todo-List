import * as CookieManager from "./cookieManager.js"; 
import * as uiManager from "./uiManager.js"; 



function hasNumber(string){
    return Array.from(string).some(element => !isNaN(parseInt(element)));
}


export function validateSignUp(name, username, password,repeatPassword){
    if(name.value == undefined || name.value === "" || hasNumber(name.value)||name.value.length < 2){
        name.setCustomValidity("Please enter a valid Name");
        name.reportValidity();
        return;
    }
    if(username.value == undefined || username.value === "" || username.value.length < 2){
        username.setCustomValidity("Please enter a valid Name");
        username.reportValidity();
        return;
    }
    if(password.value.length < 8){
        password.setCustomValidity("Password too short");
        password.reportValidity();
        return;
    }
    if(password.value != repeatPassword.value){
        repeatPassword.setCustomValidity("Password does not match");
        repeatPassword.reportValidity();
        return;
    }
    createAccount(name,username,password);
    // name.value = "";
    // username.value = ""; 
    password.value = "";
    repeatPassword.value = "";  
}

export function validateLogin(username, password){
    if(username.value == undefined || username.value === "" || username.value.length < 2){
        username.setCustomValidity("Please enter a valid Name");
        username.reportValidity();
        return;
    }
    if(password.value.length < 8){
        password.setCustomValidity("Password too short");
        password.reportValidity();
        return;
    }
    requestLogin(username,password);
}



function createAccount(pName,pUsername,pPassword){
    // CookieEditor.add("name",name);
    // CookieEditor.add("username",username);
    // CookieEditor.add("password",password);


    if(CookieManager.usernameExists(pUsername.value)){
        pUsername.setCustomValidity("This username already exists, please choose a different username"); 
        pUsername.reportValidity(); 
        return; 
    }



    let acocunt = {
        name: pName.value,
        username: pUsername.value,
        password: pPassword.value,
        projects: [
            {title:"template",tasks:[{taskName:"task1",completeStatus:false}]},
            {title:"template2",tasks:[{taskName:"task1",completeStatus:true},{taskName:"task2",completeStatus:false}]}
        ]
    }
    let allAccounts = CookieManager.getAllCookieKeys(); 

    CookieManager.add(`account${allAccounts.length+1}`,JSON.stringify(acocunt)); 

    uiManager.InitializeLogin(); 
}



export function requestLogin(username,password){
    if(CookieManager.usernameExists(username.value)){
        let account = CookieManager.getAccountByUsername(username.value);
        if(account.password === password.value){
            uiManager.loginSeccuessful(account); 
        }else{
            password.setCustomValidity("Password was not correct, please try again");
            password.reportValidity();
        }
    }else{
        username.setCustomValidity("This username does not exist");
        username.reportValidity();
    }
}
