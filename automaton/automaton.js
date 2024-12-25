let fs = require('fs');
let arg = process.argv;
let s = fs.readFileSync(arg[2]);
let t = fs.readFileSync(arg[3]);
s = s.toString();
t = t.toString();
m = t.length;
console.time();
alph = new Array();
//Определяем алфавит строки t
for(i=0;i<m;i++)
    alph[t.charAt(i)] = 0;
//В двумерном массиве del храним таблицу переходов
del = new Array(m+1);
for(j=0;j<=m;j++)
    del[j] = new Array();
//Инициализируем таблицу переходов
for(i in alph)
    del[0][i]=0;
//for(j=0;j<=m;j++)
    //console.log(del[j]);
//Формируем таблицу переходов
for(j=0;j<m;j++){
    prev = del[j][t.charAt(j)];
    del[j][t.charAt(j)] = j+1;
    for(i in alph)
        del[j+1][i] = del[prev][i];
}
//Выводим таблицу переходов
out = '';
for(i in alph)
    out += i + ' ';
out += '\n';
for(j=0; j<=m; j++) {
    for(i in alph) 
        out += del[j][i] + ' ';
    out += '\n';
}
//console.log(out);

let state = 0;
positions = new Array();
for(i=0; i < s.length; i++){
    if(s.charAt(i) in alph)
        state = del[state][s.charAt(i)];
    else 
        state = 0;
    if(state == m)
        positions.push(i-m +1)
}
console.timeEnd();
console.log(positions)