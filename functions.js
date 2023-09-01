const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let prevX = 0;
let prevY = 0;

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

const rgb = (r,g,b) => "rgb("+r+","+g+","+b+")"

function hsv(h, s, v) {
	h = abs(h);
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return rgb(r * 255, g * 255, b * 255);
}

const noise2d = (x,y) => noise.simplex2(x,y);
const noise3d = (x,y,z) => noise.simplex3(x,y,z);
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

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result)
	return "rgb("+parseInt(result[1],16)+","+parseInt(result[2],16)+","+parseInt(result[3],16)+")";
	return "black";
}


const monkey = function(x,y)
{
	y=194-y
    if (x<0 || y<0 || x>=259 || y>=194) return "black";
	return hexToRgb(monkeyHexString[floor(x)+floor(y)*259]); 
};


const graph2D = function(x,y,color)
{
	let x0 = balls(xMin, xMax, x)*canvas.width;
	let y0 = (1-balls(yMin, yMax, y))*canvas.height;
	ctx.fillStyle=color;
	ctx.fillRect(x0,y0, canvas.width/100, canvas.height/100);
	return "";
}
