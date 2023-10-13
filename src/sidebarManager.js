import * as elementEditor from "./elementCreator"; 



let projectscontainer = document.querySelector(".projectscontainer");

let newProject = projectscontainer.querySelector(".newproject   ");

let newProjectInput = newProject.querySelector("input");


addEvents(newProject); 


function addEvents(task){
    task.addEventListener('focusout', createNewProject);
    task.addEventListener('keypress', createNewProject);
    task.addEventListener('keypress', blurOnEnter);
    task.addEventListener('focusout', blurOnFocusOut);

    task.querySelector(".deleteproject i").addEventListener('click', deleteProject);

}



function deleteProject(event){
    event.target.parentNode.parentNode.remove();
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
function createNewProject(event){
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
        newProject = elementEditor.CloneTo(temp,projectscontainer); 
        newProjectInput = newProject.querySelector("input"); 
        newProjectInput.value =""; 
        newProject.classList = "newproject";
        addEvents(newProject); 
        if(event.key === 'Enter'){
            temp.querySelector("input").blur();
            newProjectInput.focus();
        }
    }   
}

function convertToProject(newProject){

    newProject.classList = "project";

}








