let canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//api
let tool=canvas.getContext("2d");

tool.strokeStyle='red';
tool.lineWidth='4';
tool.beginPath();
tool.moveTo(500,10);
tool.lineTo(100,400);
tool.stroke();

tool.lineTo(901,400);//this line indicates that the line will start from where it ended last
tool.stroke();

//up until now line is of red and of width 4. From here line will be blue, with the same width
tool.strokeStyle='blue';
tool.lineWidth='4';
tool.beginPath();//new graphic(path/line)
tool.moveTo(498,10);//start point
tool.lineTo(900,401);//end point
tool.stroke();//to make the path/line visible


