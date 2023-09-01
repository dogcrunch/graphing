const eq = document.getElementById("eq");
const ex = document.getElementById("ex");
const graphtype = document.getElementById("graphtype");
const rangeMin = document.getElementById("graphmin");
const rangeMax = document.getElementById("graphmax");
const colorType = document.getElementById("colortype");
const scaleType = document.getElementById("scaletype");
const graphHolder = document.getElementById("graphs");

const colors = ["red","blue","green", "magenta","black"]

let xMin = -10;
let xMax = 10;
let yMin = -10;
let yMax = 10;
let graphNumber = 0;

function cock(a,b,t)
{
	return a*t+b*(1-t);
}
function balls(a,b,v)
{
	return (v-a)/(b-a);
}


function graphFunc()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let text = parse(ex.value);
	document.getElementById("mainerrortext").style.display = "none";

	try{
	eval(text);
	}
	catch(error){
		document.getElementById("mainerrortext").innerHTML=error;
		document.getElementById("mainerrortext").style.display = "";
	}
	
	if (graphtype.value == "2d")
	colorGraph(0);
	else
	{
	
	for (let i = 0; i < graphInputs.length; i++)
	{
		lineGraph(i);
	}
	let digits = floor(Math.log10(xMax-xMin));
	let multiplier = pow(10,3-digits)
	if (mouseHover)
	ctx.strokeText("("+floor(cock(xMin,xMax,mouseX/canvas.width)*multiplier)/multiplier+","+floor(cock(yMin,yMax,1-mouseY/canvas.height)*multiplier)/multiplier+")",mouseX,mouseY)
	}
	
}

function colorGraph(i)
{
	let _graphFunction;
	let x=0;
	let y=0;
	try {
		eval("y000_try = "+parse(graphInputs[i].querySelector("input[name='eq']").value));
	} catch(error) {
		graphInputs[i].childNodes[3].style.display = '';
		graphInputs[i].childNodes[3].innerHTML = error;
		
		return;
	}
	eval("_graphFunction = (x,y) => "+parse(graphInputs[i].querySelector("input[name='eq']").value));

	graphInputs[i].childNodes[3].style.display = 'none';

	let xval = xMin;
	let yval = yMin;

	let segments = document.getElementById("resolution").value;
	for (let i = 0; i < segments; i++)
	{
		yval=yMin
		for (let j = 0; j < segments; j++)
		{
			let value = _graphFunction(xval,yval);
			
			let x0 = balls(xMin, xMax, xval)*canvas.width;
			let y0 = (1-balls(yMin, yMax, yval))*canvas.height;
			
			let clamped = value;
			if (colorType.value!="rainbow") clamped=Math.max(Math.min(value,rangeMax.value),rangeMin.value)
			let mu = balls(rangeMin.value,rangeMax.value,clamped);
			if (typeof(value) == "number")
			{
				if (colorType.value=="heat")
				ctx.fillStyle = hsv(cock(0.3,0,mu),1,1);
				else if (colorType.value == "black")
				ctx.fillStyle = rgb(cock(0,255,mu),cock(0,255,mu),cock(0,255,mu));
				else if (colorType.value=="rainbow")
				ctx.fillStyle = hsv(mu,1,1);
			}
			else if (typeof(value)=="string")
			ctx.fillStyle=value;
			ctx.fillRect(x0,y0,1+canvas.width/segments,1+canvas.height/segments);
			yval+=(yMax-yMin)/(segments-1);
		}
		
		xval+=(xMax-xMin)/(segments-1);
	}
	let digits = floor(Math.log10(xMax-xMin));
	let multiplier = pow(10,3-digits)
	let xRead= cock(xMin,xMax,mouseX/canvas.width)
	let yRead= cock(yMin,yMax,1-mouseY/canvas.height)
	
	if (mouseHover)
	ctx.strokeText("("+floor(xRead*multiplier)/multiplier+","+floor(yRead*multiplier)/multiplier+","+floor(_graphFunction(xRead,yRead)*multiplier)/multiplier+")",mouseX,mouseY)
		
}

function lineGraph(i)
{
	let _graphFunction;
	let x=0;
	try {
		eval("y000_try = "+parse(graphInputs[i].querySelector("input[name='eq']").value));
	} catch(error) {
		graphInputs[i].childNodes[3].style.display = '';
		graphInputs[i].childNodes[3].innerHTML = error;
		
		return;
	}
	eval("_graphFunction = (x) => "+parse(graphInputs[i].querySelector("input[name='eq']").value));

	graphInputs[i].childNodes[3].style.display = 'none';

	let xval = xMin;

	ctx.strokeStyle = colors[i%colors.length];
	ctx.lineWidth = 2;
	prevX = false;
	prevY = false;
	let segments = document.getElementById("resolution").value;
	for (let i = 0; i < segments; i++)
	{
		
		if (typeof(_graphFunction(xval)) == "number")
		{
			let x0 = balls(xMin, xMax, xval)*canvas.width;
			let y0 = (1-balls(yMin, yMax, _graphFunction(xval)))*canvas.height;

			if (i>0)
			{
				ctx.beginPath();
				ctx.moveTo(prevX,prevY);
				ctx.lineTo(x0,y0);
				ctx.stroke();
			}
			
			prevX = x0;
			prevY=y0;
		}

		xval+=(xMax-xMin)/(segments-1);
	}
}
document.addEventListener("keypress", function(event) {
	let scale = document.getElementById("updateGraph").checked ? 30 : 10
	switch(event.key)
	{
		case "w":
		yMin+=(yMax-yMin)/scale
		yMax+=(yMax-yMin)/scale
		break;
		case "s":
		yMin-=(yMax-yMin)/scale
		yMax-=(yMax-yMin)/scale
		break;
		case "d":
		xMin+=(xMax-xMin)/scale
		xMax+=(xMax-xMin)/scale
		break;
		case "a":
		xMin-=(xMax-xMin)/scale
		xMax-=(xMax-xMin)/scale
		break;
		case "q":
		yMin+=(yMax-yMin)/scale
		yMax-=(yMax-yMin)/scale
		xMin+=(xMax-xMin)/scale
		xMax-=(xMax-xMin)/scale
		break;
		case "e":
		yMin-=(yMax-yMin)/scale
		yMax+=(yMax-yMin)/scale
		xMin-=(xMax-xMin)/scale
		xMax+=(xMax-xMin)/scale
		break;
		case "r":
		yMin = -10;
		yMax = 10;
		xMin = -10;
		xMax = 10;
		break;
	}
	if (document.activeElement.tagName.toLowerCase()!="input"&&document.activeElement.tagName.toLowerCase()!="textarea")
		graphFunc();
  });
window.onload=function()
{
	addGraph();
	window.addEventListener('focus', function(){if (document.activeElement.id == "pop") return; lastInputSelected = this.document.activeElement}, true)
}
let lastInputSelected;
let graphInputs = [];
let graphAmount = 0;


function addGraph()
{
	if (graphInputs.length<=graphAmount)
	{
		graphInputs.push(document.getElementById("temp").cloneNode(true));
		graphHolder.appendChild(graphInputs[graphAmount]);
	}
	graphInputs[graphAmount].id = 'eq'+graphAmount;
	graphInputs[graphAmount].style.display = '';

	graphAmount++;


}
let mouseX, mouseY;
let mouseHover = false;
canvas.onmousemove = function(e) { 
    mouseX = e.pageX - e.currentTarget.offsetLeft; 
    mouseY = e.pageY - e.currentTarget.offsetTop; 
}

canvas.addEventListener("mouseleave", function (event) {
	mouseHover = false
  }, false);
  canvas.addEventListener("mouseover", function (event) {
	mouseHover = true;
  }, false);


function popGraph()
{
	let getIndex = graphInputs.indexOf(lastInputSelected.parentElement);
	if (getIndex==-1) getIndex = graphAmount-1;
	let element = graphInputs.splice(getIndex,1)[0];
	graphInputs.splice(graphAmount-1, 0, element);
	graphAmount--;
	element.style.display = "none";
	graphHolder.appendChild(element)
}
document.addEventListener('input', function (event) {
	if (event.target.id !== 'graphtype') return;
	if (event.target.value == "1d")
	{
		document.getElementById("_colortype").style.display="none"
		document.getElementById("_scaletype").style.display="none"
		document.getElementById("_graphmax").style.display="none"
		document.getElementById("_graphmin").style.display="none"
		
		document.getElementById("add").style.display=""
		document.getElementById("pop").style.display=""
	}
	else
	{
		document.getElementById("_colortype").style.display=""
		document.getElementById("_scaletype").style.display=""
		document.getElementById("_graphmax").style.display=""
		document.getElementById("_graphmin").style.display=""
		document.getElementById("add").style.display="none"
		document.getElementById("pop").style.display="none"
		lastInputSelected=document.body;
		while(graphAmount>1)
		{
			popGraph();
		}
	}

}, false);

function update()
{
	t = new Date().getTime()/1000;
	try{
		if (document.getElementById("updateGraph").checked)
		graphFunc();

	}
	catch{
		
	}
	window.requestAnimationFrame(update);

}
window.requestAnimationFrame(update);
