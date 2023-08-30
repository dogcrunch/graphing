const parse = function(text)
{
    text = multiplication(power(text));
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
    return text;
}

const findEndOfGroup = function(text,start, backwards=false)
{
    let p = 0;
    for (let i = start; (backwards && i>=0) || (!backwards && i < text.length); i+=backwards?-1:1)
    {
        if (text[i]=="(") p++;
        else if (text[i]==")") p--;
        if (p==0&&i!=start) return i;
    }
    return backwards?0:text.length;
}
const multiplication = function(text)
{
    let occurences = [...text.matchAll(/[0-9)][A-Za-z(]/g)];
    let add = 0;
    for (let i = 0; i < occurences.length; i++)
    {
        occurences[i].index+=add;
        text = text.slice(0, occurences[i].index+1)
        + "*" +text.slice(occurences[i].index+1);
        add++;
    }
    return text;
}

const power = function(text)
{
    let occurences = [...text.matchAll(/([0-9a-zA-Z]+|\))\^([0-9a-zA-Z]+|\()/g)];
    let add = 0;
    for (let i = 0; i < occurences.length; i++)
    {
        occurences[i].index+=add;
        let middle = text.indexOf("^",occurences[i].index);
        let end1;
        if (text[middle-1]==")")
            end1 = findEndOfGroup(text,middle-1,true);
        else
            end1 = occurences[i].index;

        let end2;
        if (text[middle+1]=="(")
            end2 = findEndOfGroup(text,middle+1,false);
        else
            end2 = occurences[i].index+occurences[i][0].length;

        let val1 = text.slice(end1,middle);
        let val2 = text.slice(middle+1,end2);
        text=text.substring(0, end1) + "pow("+val1+","+val2+")"+text.substring(end2);
        add+=6;
    }
    return text;
}
