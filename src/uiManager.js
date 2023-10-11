import * as loginManager from "./loginManager.js"; 
import * as cookieEditor from "./cookieManager.js";

let signupContainer = document.getElementById("signupcontainer");
let loginContainer = document.getElementById("logincontainer");


if(UserAccountExists()){
    signupContainer.classList = "hidden";
}else{
    loginContainer.classList = "hidden";
}


function UserAccountExists(){
    return (cookieEditor.contains("username") && cookieEditor.contains("password") && cookieEditor.contains("name"));
}

document.querySelector(".signup").addEventListener('click', () => {
    let name = document.querySelector(".formcontainer .name");
    let username = document.querySelector(".formcontainer .username");
    let password = document.querySelector(".formcontainer .password");
    let repeatPassword = document.querySelector(".formcontainer .repeatpassword");

    loginManager.validateSignUp(name,username,password,repeatPassword);
})


document.querySelector(".login").addEventListener('click', () => {
    let username = document.querySelector(".formcontainer .username");
    let password = document.querySelector(".formcontainer .password");

    loginManager.validateLogin(username,password);
})


export function InitializeLogin(){
    signupContainer.classList = "hidden"; 
    loginContainer.classList = "formcontainer";
}



