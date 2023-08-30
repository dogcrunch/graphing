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

	let text = parse(ex.value);
	
	eval(text);

	let graph;
	
	eval("graph = (x) => "+eq.value);
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
