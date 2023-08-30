const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pi = Math.PI;
const e = Math.E;

const pow = (a,b) => Math.pow(a,b);
const abs = (x) => Math.abs(x);
const floor = (x) => Math.floor(x);
const ceil = (x) => Mathf.ceil(x);
const sin = (x) => Math.sin(x);
const cos = (x) => Math.cos(x);
const tan = (x) => Math.tan(x);
const sqrt = (x) => Math.sqrt(x);
const asin = (x) => Math.asin(x);
const acos = (x) => Math.acos(x);
const atan = (x) => Math.atan(x);

const sum = function(f,n,k) {
	let i = 0;
	for (let x = n; x < k;x++)
	{
		i+=f(x);
	}
	return i;
}

const or = function(f,n,k) {
	let i = 0;
	for (let x = n; x < k;x++)
	{
		i=i||f(x);
	}
	return i;
}
const penis = (x) => (abs(x) < 1.5 && abs(x)>0.5) ? 1 : (abs(x)<=0.5) ? 7 : 0;

const image = document.createElement('img');
image.src = "methmonkey.jpg"
const monkey = function(x,y,w,h)
{
    ctx.drawImage(image,balls(xMin, xMax, x)*canvas.width,(1-balls(yMin, yMax, y))*canvas.height,w*canvas.width/(xMax-xMin),h*canvas.height/(yMax-yMin)); 
    return false;
};


const graph = function(x,y,color)
{
	ctx.strokeStyle=color;
	ctx.lineTo(balls(xMin, xMax, x)*canvas.width,(1-balls(yMin, yMax, y))*canvas.height);
	return "";
};
