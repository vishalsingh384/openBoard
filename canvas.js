let canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let mouseIsDown=false;

let allPencilColor=document.querySelectorAll(".pencil-color");
let pencilWidthAdjust=document.querySelector(".pencil-input-width");
let eraserWidthAdjust=document.querySelector(".eraser-input-width");

let donwload=toolsCont.children[2];

let pencilColor="red";
let eraserColor="white";
let pencilWidth=pencilWidthAdjust.value;
let eraserWidth=eraserWidthAdjust.value;

//api
let tool=canvas.getContext("2d");

tool.strokeStyle=pencilColor;
tool.lineWidth=pencilWidth;
//----------//
// tool.beginPath();
// tool.moveTo(500,10);
// tool.lineTo(100,400);
// tool.stroke();

// tool.lineTo(901,400);//this line indicates that the line will start from where it ended last
// tool.stroke();

// //up until now line is of red and of width 4. From here line will be blue, with the same width
// tool.strokeStyle='blue';
// tool.lineWidth='4';
// tool.beginPath();//new graphic(path/line)
// tool.moveTo(498,10);//start point
// tool.lineTo(900,401);//end point
// tool.stroke();//to make the path/line visible
//-----------//

canvas.addEventListener('mousedown',(e)=>{
    mouseIsDown=true;
    beginPath({ //x and y coordinates
        x:e.clientX,
        y:e.clientY
    })
})
canvas.addEventListener('mousemove',(e)=>{
    if(mouseIsDown){
        drawStroke({
            x:e.clientX,
            y:e.clientY,
            color:eraserFlag?eraserColor:pencilColor,
            width:eraserFlag?eraserWidth:pencilWidth
        }) 
    }
})
canvas.addEventListener('mouseup',(e)=>{
    mouseIsDown=false;
})
function beginPath(obj){
    tool.beginPath();
    tool.moveTo(obj.x,obj.y);//x and y coordinates
}
function drawStroke(obj){
    tool.strokeStyle=obj.color;
    tool.lineWidth=obj.width;
    tool.lineTo(obj.x,obj.y);
    tool.stroke();
}
allPencilColor.forEach((colorElem)=>{
    colorElem.addEventListener("click",(e)=>{
        eraserFlag=false;
        eraserToolCont.style.display="none";
        let color=colorElem.classList[0];
        pencilColor=color;
        tool.strokeStyle=color;
    })
})
pencilWidthAdjust.addEventListener("change",(e)=>{
    eraserFlag=false;
    eraserToolCont.style.display="none";
    pencilWidth=pencilWidthAdjust.value;
    tool.lineWidth=pencilWidth;
})
eraserWidthAdjust.addEventListener("change",(e)=>{
    pencilFlag=false;
    pencilToolCont.style.display="none";
    eraserWidth=eraserWidthAdjust.value;
    tool.lineWidth=eraserWidth;
})
eraser.addEventListener('click',(e)=>{
    if(eraserFlag){
        tool.lineWidth=eraserWidth;
        tool.strokeStyle=eraserColor;
    }else{
        tool.lineWidth=pencilWidth;
        tool.strokeStyle=pencilColor;
    }
})
donwload.addEventListener('click',(e)=>{
    let url=canvas.toDataURL('image/jpg',1.0);//Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.

    let anchorElem=document.createElement("a");
    anchorElem.href=url;
    anchorElem.download='boArd.jpg';
    anchorElem.click();
})