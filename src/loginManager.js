import * as CookieEditor from "./cookieManager.js"; 
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

    createAccount(name.value,username.value,password.value);
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



function createAccount(name,username,password){
    CookieEditor.add("name",name);
    CookieEditor.add("username",username);
    CookieEditor.add("password",password);

    uiManager.InitializeLogin(); 
}


///////// IT DOESNT WORK CHECK WHY NOTHING HAPPENS 
export function requestLogin(username,password){   
    if(CookieEditor.contains("username")){
        if(CookieEditor.getCookie("username") === username.value){
            if(CookieEditor.getCookie("password") === password.value){
                login(); 
            }else{
                password.setCustomValidity("Password was not correct, please try again");
                password.reportValidity();
            }
        }else{
            username.setCustomValidity("This username does not exist");
            username.reportValidity();
        }
    }else{
        username.setCustomValidity("NOTHING HAPPEND ");
        username.reportValidity();
    }

}

function login(){

}