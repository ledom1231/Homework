let fs = require('fs');
let arg = process.argv;

let mode = arg[2];
let fileIn = arg[3];
let fileOut = arg[4];
let str = fs.readFileSync(fileIn, "utf-8"); // чтение
let n = 1;
let testString = '';

if (mode == "code") {
    for ( let i = 0; i < str.length;i++ ){
        if ((str.charAt(i) == str.charAt(i+1)) && !(n == 255)){
            n += 1;
        } else {
            if ((n >= 4) || (str.charAt(i) == "#")) {
                testString += "#" + String.fromCharCode(n) + str.charAt(i);
            } else {
                let pos = str.charAt(i).repeat(n);
				testString += pos;
            }
            n=1;
        };  
            
    }
    fs.writeFileSync(fileOut, testString) // запись
} else if (mode == "decode") {
    let i = 0;
    while (i < str.length) {
        if (str.charAt(i) == "#") {
            testString += str.charAt(i+2).repeat(str.charCodeAt(i+1));
            i += 3;
        } else {
            testString += str.charAt(i);
            i += 1;
        }
    }
    fs.writeFileSync(fileOut, testString) // запись
} else if (mode == "compare") {
    testString = fs.readFileSync(fileOut);
	if (str == testString) {
		console.log(true, "Тексты совпадают");
	} else {
		console.log(false, "Не совпадают(")
	}
}