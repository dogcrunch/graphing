const eq = document.getElementById("eq");
const ex = document.getElementById("ex");

const colors = ["red","blue","green", "magenta","black"]
let xMin = -10;
let xMax = 10;
let yMin = -10;
let yMax = 10;
let graphNumber = 0;

function balls(a,b,v)
{
	return (v-a)/(b-a);
}

function graph()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let text = ex.value;
	let functions = [...text.matchAll(/[A-Za-z,]+[(][A-Za-z, ]+[)][ ]*[=]/g)];
	let addedLength = 0;
	for (let i = 0; i < functions.length;i++)
	{
		let initLength = text.length;
		functions[i].index+=addedLength;
		console.log(functions[i].index)
		let firstP = text.indexOf("(",functions[i].index);
		let secondP = text.indexOf(")",functions[i].index);
		let args = text.substring(firstP+1,secondP);
		let startText = "function(" + args + ") { return "
		text = text.slice(0, functions[i].index+functions[i][0].length)
        + startText +text.slice(functions[i].index+functions[i][0].length);
		let nextLine = text.indexOf("\n",functions[i].index);
		let bracketindex = (nextLine!=-1)?nextLine:text.length;
		text = text.slice(0, bracketindex) + "}" +text.slice(bracketindex);
		text=text.slice(0,firstP)+text.slice(secondP+1,text.length);
		addedLength += text.length-initLength;
	}
	console.log(text);
	eval(text);
	let graph;
	
	eval("graph = (x) => "+eq.value);
	console.log(graph(2));
	ctx.beginPath();

	let x = xMin;

	ctx.strokeStyle = "red";
	ctx.lineWidth = 2;

	let segments = 100;

	for (let i = 0; i < segments; i++)
	{
		if (typeof(graph(x)) == "number")
		{
			let x0 = balls(xMin, xMax, x)*canvas.width;
			let y0 = (1-balls(yMin, yMax, graph(x)))*canvas.height;
			ctx.lineTo(x0,y0);
		}
		x+=(xMax-xMin)/(segments-1);
		
	}
	ctx.stroke();
}

addEventListener("keypress", (event) => {});

onkeypress = (event) => {
	switch(event.key)
	{
		case "w":
		yMin+=(yMax-yMin)/30
		yMax+=(yMax-yMin)/30
		graph();
		break;
		case "s":
		yMin-=(yMax-yMin)/30
		yMax-=(yMax-yMin)/30
		graph();
		break;
		case "d":
		xMin+=(xMax-xMin)/30
		xMax+=(xMax-xMin)/30
		graph();
		break;
		case "a":
		xMin-=(xMax-xMin)/30
		xMax-=(xMax-xMin)/30
		graph();
		break;
		case "q":
		yMin+=(yMax-yMin)/30
		yMax-=(yMax-yMin)/30
		xMin+=(xMax-xMin)/30
		xMax-=(xMax-xMin)/30
		graph();
		break;
		case "e":
		yMin-=(yMax-yMin)/30
		yMax+=(yMax-yMin)/30
		xMin-=(xMax-xMin)/30
		xMax+=(xMax-xMin)/30
		graph();
		break;
	}
};