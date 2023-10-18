import * as elementEditor from "./elementCreator.js"; 
import * as CookieManager from "./cookieManager.js";



let projectscontainer = document.querySelector(".projectscontainer");

let newProject = projectscontainer.querySelector(".newproject");

let newProjectInput = newProject.querySelector("input");


let projectsArray = []; 


addEvents(newProject); 



export function setProjectsFromAccount(account){

    let projects = account.projects; 
    console.log(projects);
    CookieManager.setAccount(account);

    projects.forEach(project => {
        newProjectInput.value = project.title;
        createNewProject(new Event('focusout'),true)
    });

    setAvailableProjectActive()
}
function setAvailableProjectActive(){
    if(projectsArray.length>0) activateProject(projectsArray[0]);
}



function addEvents(project){
    project.addEventListener('focusout', createNewProject);
    project.addEventListener('keypress', createNewProject);
    project.addEventListener('keypress', blurOnEnter);
    project.addEventListener('focusout', blurOnFocusOut);

    project.addEventListener('click', setActiveProject); 

    project.querySelector(".deleteproject i").addEventListener('click', deleteProject);

}

function setActiveProject(event){
    console.log(event.target.classList.value);
    if(event.target.classList.value !== "project")return;
    console.log(event.target.classList); 
    activateProject(event.target); 
}
function activateProject(project){
    projectsArray.forEach(project => {
        project.classList = "project";
    });
    project.classList = "activeproject";


}
function deleteProject(event){
    deleteFromArray(event.target.parentNode.parentNode, projectsArray);
    event.target.parentNode.parentNode.remove();
    console.log(event.target.parentNode.parentNode.classList);
    if(event.target.parentNode.parentNode.classList.value == "activeproject") setAvailableProjectActive();
}

function deleteFromArray(item,array){
    for(let i = 0; i < array.length; i++){
        if(array[i] == item)array.splice(i,1);
    }
}

function blurOnFocusOut(event){
    validateProjectInput(event.target);
}

function blurOnEnter(event){
    if(event.type != 'keypress' || event.key != 'Enter')return; 
    validateProjectInput(event.target,event);
}

function validateProjectInput(target){
    let input = removeEmptySpaceFromStart(target.value);  
    if(target.parentNode.classList.value === "project" && input === ""){
        try{
            target.parentNode.remove(); 
        }
        catch (error){
            //who asked
        }
        return;
    }
    target.value = input;
    if (event.type === 'keypress' && event.key === 'Enter') {
        event.target.blur();
    }
}

function removeEmptySpaceFromStart(string){
    while(string[0] == " "){
        if(string.length < 1) return undefined;
        string = string.substring(1); 
    }
    return string; 
}
function createNewProject(event, displayOnly){
    if(newProjectInput.value === "")return; 
    let fixedString = removeEmptySpaceFromStart(newProjectInput.value); 
    if(!fixedString){
        newProjectInput.value = ""; 
        return;
    }
    newProjectInput.value = fixedString;

    if (event.type === 'focusout' || (event.type === 'keypress' && event.key === 'Enter')) {
        newProjectInput.removeEventListener('focusout', createNewProject);
        newProjectInput.removeEventListener('keypress', createNewProject);
        
        let temp = newProject; 
        convertToProject(newProject)
        if(!displayOnly)CookieManager.addNewProject(newProjectInput.value); 
        newProject = elementEditor.CloneTo(temp,projectscontainer); 
        newProjectInput = newProject.querySelector("input"); 
        newProjectInput.value =""; 
        newProject.classList = "newproject";

        addEvents(newProject); 
        if(event.key === 'Enter'){
            temp.querySelector("input").blur();
            newProjectInput.focus();
        }
        activateProject(temp);
    }   
}

function convertToProject(newProject){
    newProject.classList = "project";
    projectsArray.push(newProject); 
}








