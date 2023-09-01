const parse = function(text)
{
    text = multiplication(power(text));
    let functions = [...text.matchAll(/[A-Za-z,]+[(][A-Za-z, ]*[)][ ]*[=]/g)];
	let addedLength = 0;
	for (let i = 0; i < functions.length;i++)
	{
		let initLength = text.length;
		functions[i].index+=addedLength;
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
    return text;
}

const findEndOfGroup = function(text,start, backwards=false)
{
    let p = 0;
    for (let i = start; (backwards && i>=0) || (!backwards && i < text.length); i+=(backwards?-1:1))
    {
        if (text[i]=="(") {
            if (p==0&&backwards) return i+1;
            p++;
        }
        else if (text[i]==")") {
            if (p==0&&!backwards) return i-1;
            p--;
        }
        if (text == ")"&&(p==0&&i!=start)) return i-1;
        if (p==0&&" !@#$%^&*-+,=^\n".includes(text[i]))
            return backwards?(i+1):(i-1);
    }
    return backwards?0:text.length-1;
}
const multiplication = function(text)
{
    let occurences = [...text.matchAll(/((?<![A-Za-z])[0-9]|\))[A-Za-z(]/gm)];
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
    for (let i = text.length; i >= 0; i--)
    {
        if (text[i]!="^") continue;
        let end1;
        end1 = findEndOfGroup(text,i-1,true);
        let end2;
        end2 = findEndOfGroup(text,i+1,false);
        let val1 = text.slice(end1,i);
        let val2 = text.slice(i+1,end2+1);
        text=text.substring(0, end1) + "pow("+val1+","+val2+")"+text.substring(end2+1);
        i+=6
    }
    return text;
}
