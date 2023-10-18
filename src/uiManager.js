import * as loginManager from "./loginManager.js"; 
import * as cookieManager from "./cookieManager.js";
import * as sideBarManager from "./sidebarManager.js";

let signupContainer = document.getElementById("signupcontainer");
let loginContainer = document.getElementById("logincontainer");
let logContainer = document.getElementById("logcontainer");

let taskSiteContainer = document.getElementById("tasksitecontainer");


if(true){
    signupContainer.classList = "hidden";
    taskSiteContainer.classList = "hidden";
    
}else{
    loginContainer.classList = "hidden";
    taskSiteContainer.classList = "hidden";
}

let createAccountLink = loginContainer.querySelector("a"); 
createAccountLink.addEventListener('click', () =>{
    InitializeSignUp(); 
})

let loginAccountLink = signupContainer.querySelector("a"); 
loginAccountLink.addEventListener('click', () =>{
    InitializeLogin();
})






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
    taskSiteContainer.classList = "hidden";
}
export function InitializeSignUp(){
    signupContainer.classList = "formcontainer"; 
    loginContainer.classList = "hidden";
    taskSiteContainer.classList = "hidden";
}


function InitializeTaskPage(account){
    tasksitecontainer.classList = "tasksitecontainer";
    sideBarManager.setProjectsFromAccount(account)

}


export function loginSeccuessful(account){
    loginContainer.classList = "hidden";
    logContainer.classList = "hidden"; 
    InitializeTaskPage(account); 
} 



