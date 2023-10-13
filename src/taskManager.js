import * as elementEditor from "./elementCreator"; 


let taskContainer = document.querySelector(".taskscontainer");
let newTask = taskContainer.querySelector(".newtask");
let checkmark = newTask.querySelector(".checkmark");
let newTaskInput = newTask.querySelector("input");
let removeTaskButton = newTask.querySelector(".deletetask");





addEvents(newTask); 


function addEvents(task){
    task.addEventListener('focusout', createNewTask);
    task.addEventListener('keypress', createNewTask);
    task.addEventListener('keypress', blurOnEnter);

    task.querySelector(".deletetask").addEventListener('click', deleteTask);

}




function toogleCheckmark(task){
    let input = task.querySelector("input");
    if(task.classList.value === "task"){
        task.classList = "taskcomplete";
        input.disabled = true;
    }
    else{
        task.classList = "task";
        input.disabled = false;
    }
}

function deleteTask(event){
    event.target.parentNode.parentNode.remove();
}

function blurOnEnter(event){
    if (event.type === 'keypress' && event.key === 'Enter') {
        event.target.blur();
    }
}

function createNewTask(event){
    if(newTaskInput.value === "")return; 

    if (event.type === 'focusout' || (event.type === 'keypress' && event.key === 'Enter')) {
        newTaskInput.removeEventListener('focusout', createNewTask);
        newTaskInput.removeEventListener('keypress', createNewTask);
        
        let temp = newTask; 
        convertToTask(newTask)
        newTask = elementEditor.CloneTo(temp,taskContainer); 
        newTaskInput = newTask.querySelector("input"); 
        newTaskInput.value =""; 
        newTask.classList = "newtask";
        addEvents(newTask); 
        if(event.key === 'Enter'){
            temp.querySelector("input").blur();
            newTaskInput.focus();
        }
    }   
}

function convertToTask(newTask){

    newTask.classList = "task";
    let checkmark = newTask.querySelector(".checkmark");
    checkmark.addEventListener('click', () => toogleCheckmark(newTask));
}



