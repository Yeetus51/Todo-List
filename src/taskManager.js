import * as elementEditor from "./elementCreator"; 
import * as CookieManager from "./cookieManager.js"
import * as ProjectManager from "./sidebarManager.js"; 


let taskContainer = document.querySelector(".taskscontainer");
let newTask = taskContainer.querySelector(".newtask");
let checkmark = newTask.querySelector(".checkmark");
let newTaskInput = newTask.querySelector("input");
let removeTaskButton = newTask.querySelector(".deletetask");
let projectTitleText = document.querySelector(".projectTitle p");


addEvents(newTask); 


function addEvents(task){
    task.addEventListener('focusout', createNewTask);
    task.addEventListener('keypress', createNewTask);
    task.addEventListener('keypress', blurOnEnter);
    task.addEventListener('focusout', blurOnFocusOut);

    task.querySelector(".deletetask i").addEventListener('click', deleteTask);
}



let tasksArray = []; 
let activeProject; 
export function setActiveProject(pActiveProject){
    activeProject = pActiveProject;
}





function toogleCheckmark(task, displayOnly){
    let input = task.querySelector("input");
    if(task.classList.value === "task"){
        task.classList = "taskcomplete";
        input.disabled = true;
        if(!displayOnly) CookieManager.setCompleteStatus(activeProject, getTaskByName(event.target.parentNode.querySelector("input").value), true); 
    }
    else{
        task.classList = "task";
        input.disabled = false;
        if(!displayOnly) CookieManager.setCompleteStatus(activeProject, getTaskByName(event.target.parentNode.querySelector("input").value), false); 
    }
}

function getTaskByName(name){
     for(let i = 0; i <activeProject.tasks.length; i++){
        if(activeProject.tasks[i].taskName === name) return activeProject.tasks[i];
     }
}
function deleteTask(event){
    deleteFromArray(event.target.parentNode.parentNode, tasksArray);
    CookieManager.deleteTask(activeProject, getTaskByName(event.target.parentNode.parentNode.querySelector("input").value));
    event.target.parentNode.parentNode.remove();
}
function deleteFromArray(item,array){
    for(let i = 0; i < array.length; i++){
        if(array[i] == item)array.splice(i,1);
    }
}


function blurOnFocusOut(event){
    validateTaskInput(event.target);
}

function blurOnEnter(event){
    if(event.type != 'keypress' || event.key != 'Enter')return; 
    validateTaskInput(event.target, event);
}

function validateTaskInput(target){
    let input = removeEmptySpaceFromStart(target.value);  
    if(target.parentNode.classList.value === "task" && input === ""){
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
function createNewTask(event, displayOnly){
    if(newTaskInput.value === "")return; 
    let fixedString = removeEmptySpaceFromStart(newTaskInput.value); 
    if(!fixedString){
        newTaskInput.value = ""; 
        return;
    }
    newTaskInput.value = fixedString;

    if (event.type === 'focusout' || (event.type === 'keypress' && event.key === 'Enter')) {
        newTaskInput.removeEventListener('focusout', createNewTask);
        newTaskInput.removeEventListener('keypress', createNewTask);
        
        let temp = newTask; 
        let newlyCreatedTask = convertToTask(newTask);
        if(activeProject === null){
            ProjectManager.initializeNewProject("New Project");
            if(!displayOnly)CookieManager.addNewTask(activeProject.title,newTaskInput.value,false); 
            return; 
        } 
        if(!displayOnly)CookieManager.addNewTask(activeProject.title,newTaskInput.value,false); 
        newTask = elementEditor.CloneTo(temp,taskContainer); 
        newTaskInput = newTask.querySelector("input"); 
        newTaskInput.value =""; 
        newTask.classList = "newtask";
        addEvents(newTask); 
        if(event.key === 'Enter'){
            temp.querySelector("input").blur();
            newTaskInput.focus();
        }
        return newlyCreatedTask; 
    }   
}

function convertToTask(newTask){

    newTask.classList = "task";
    let checkmark = newTask.querySelector(".checkmark");
    checkmark.addEventListener('click', (e) => toogleCheckmark(newTask));

    tasksArray.push(newTask); 
    return newTask; 
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

export function initializeTasksFromProject(project){
    removeAllTasks();
    tasksArray = []; 

    project.tasks.forEach(task => {
        newTaskInput.value = task.taskName;
        let newTask = createNewTask(new Event('focusout'),true)
        if(task.completeStatus)toogleCheckmark(newTask,true); 
    });
}

export function removeAllTasks(){
    tasksArray.forEach(task => {
        task.remove(); 
    });
}

export function setProjectTitleText(newName){
    projectTitleText.textContent = newName; 
}



