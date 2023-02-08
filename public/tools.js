let optionsContainer=document.querySelector('.options-cont');
// console.log(optionsContainer.children);
// console.log(optionsContainer.childNodes);
let optionsFlag=false;
let toolsCont=document.querySelector('.tools-cont');
let pencilToolCont=document.querySelector('.pencil-tool-cont');
let eraserToolCont=document.querySelector('.eraser-tool-cont');
let pencil=toolsCont.children[0];
let eraser=toolsCont.children[1];
let sticky=toolsCont.children[4];
let upload=toolsCont.children[3];
let pencilFlag=false;
let eraserFlag=false;
optionsContainer.addEventListener('click',(e)=>{
    //true -> show tools
    //false -> hide tools
    optionsFlag=!optionsFlag;
    if(optionsFlag){
        openTools();
    }else{
        closeTools();
    }
});
function openTools(){
    let iconElem=optionsContainer.children[0];
    // console.log(iconElem);
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-xmark");
    toolsCont.style.display="flex";
}
function closeTools(){
    let iconElem=optionsContainer.children[0];
    // console.log(iconElem);
    iconElem.classList.remove("fa-xmark");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display="none";

    pencilToolCont.style.display="none";
    eraserToolCont.style.display="none";
}
pencil.addEventListener('click',()=>{
    //true -> show
    //false -> hide
    pencilFlag=!pencilFlag;
    if(pencilFlag){
        pencilToolCont.style.display="block";
    }else{
        pencilToolCont.style.display="none";
    }
})
eraser.addEventListener('click',()=>{
    //true -> show
    //false -> hide
    eraserFlag=!eraserFlag;
    if(eraserFlag){
        eraserToolCont.style.display="flex";
    }else{
        eraserToolCont.style.display="none";
    }
})
upload.addEventListener('click',(e)=>{
    //open file explorer
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    
    input.addEventListener('change',(e)=>{
        let file=input.files[0];
        console.log(file);
        let url=URL.createObjectURL(file);
        console.log(url);
        let stickyTemplate=`
            <div class="sticky-header-cont">
                <div class="sticky-minimize"></div>
                <div class="sticky-close"></div>
            </div>
            <div class="sticky-note-cont">
                <img src="${url}"/>
            </div>
        `;
        createSticky(stickyTemplate);
    })

})
sticky.addEventListener("click",(e)=>{
    let stickyTemplate=`
        <div class="sticky-header-cont">
            <div class="sticky-minimize"></div>
            <div class="sticky-close"></div>
        </div>
        <div class="sticky-note-cont">
            <textarea></textarea>
        </div>
    `;
    createSticky(stickyTemplate);
})
function dragAndDrop(element,event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
  
    moveAt(event.pageX, event.pageY);
  
    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
  
};
function stickyNoteActions(minimize,close,stickyCont){
    console.log("hello");
    close.addEventListener("click",(e)=>{
        stickyCont.remove();
    })
    minimize.addEventListener("click",()=>{
        let stickyNoteCont=stickyCont.querySelector(".sticky-note-cont");
        let display=getComputedStyle(stickyNoteCont).getPropertyValue("display");
        if(display==="none"){
            stickyNoteCont.style.display="block";
        }else{
            stickyNoteCont.style.display="none";
        }
    })
}
function createSticky(stickyTemplate){
    let stickyCont=document.createElement("div");
    stickyCont.setAttribute("class","sticky-cont");
    stickyCont.innerHTML=stickyTemplate;
    document.body.appendChild(stickyCont);

    let minimize=stickyCont.querySelector(".sticky-minimize");
    let close=stickyCont.querySelector(".sticky-close");
    stickyNoteActions(minimize,close,stickyCont);

    stickyCont.onmousedown=function(event){ //onmousedown -> Fires when the user clicks the object with either mouse button.
        dragAndDrop(stickyCont,event);
    }
    stickyCont.ondragstart=function(){ //ondragstart -> Fires on the source object when the user starts to drag a text selection or selected object. 
        return false;
    }
    
}
