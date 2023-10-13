export const div = (parent,styleClass,content) =>{
    let newDiv = document.createElement('div');
    return elementCreator.appendToParent(newDiv,parent,styleClass,content);
} 
export const a = (parent,styleClass,content,url) =>{
    let newA = document.createElement('a');
    newA.href = url;
    return elementCreator.appendToParent(newA,parent,styleClass,content);
} 
export const appendToParent = (element,parent,styleClass,content) =>{
    element.textContent = content; 
    if(styleClass) element.classList.add(styleClass);
    parent.appendChild(element);
    return element; 
}
export const CloneTo = (element, parent) =>{
    let elementClone = element.cloneNode(true); 
    parent.appendChild(elementClone); 
    return elementClone; 
}
