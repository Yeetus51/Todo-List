import "./style.css";
import * as cookieEditor from "./cookieManager.js" 
import "./../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/brands.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/solid.css";



test(); 
function test(){
    
    cookieEditor.add("username","Omair"); 
    cookieEditor.add("password","UrMom");
    cookieEditor.add("age","19");
    cookieEditor.add("gender","AttackHelocopter");
    cookieEditor.add("bloodType","Be Positive");

    console.log(document.cookie);

    console.log(`get All cookies:${cookieEditor.getAllCookieKeys()}`); 

    console.log(`get "password" cookie:${cookieEditor.getCookie("password")}`);


    console.log(`"password" contains?:${cookieEditor.contains("password")}`);

    console.log(`"DoesNotExisit" contains?:${cookieEditor.contains("DoesNotExisit")}`);

    console.log(`removing "password" cookie..`); 
    cookieEditor.remove("password"); 

    console.log(document.cookie);





}
