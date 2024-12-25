function charComparison(string, substring, statistic) {
    for (let i = 0; i < string.length; i++) {    //функция для посимвольного сравнения подходящей строки и подсчётом количества посимволльных сравнений для статистики
        statistic.SymCmpCount++;
        if (string[i] === substring[i]) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}
function BruteForce(string, substring) {         //поиск подстроки в строке с использованием грубой силы
    let statistic = { 'Time': 0, 'Coincidences': 0, 'Matching': 0, 'Collisions': 0, 'SymCmpCount': 0 };   //объект, которых хранит в себе: время, первые 10 индексов совпадений, количество совпадений, колиззии, количество посимвольных сравнений
    let startTime = performance.now();
    let coincidences = [];              //массив для индексов совпадений
    let matching = 0;                   //количество совпадений
    let pointer = 0;                    //счетчик индексов записанных индексов в coincidens
    let i = 0;                          //счетчик для цикла, означающий позицию на которой мы ищем совпадения
    i  //в переменную записываем время данного момента(для time)
    while (i + substring.length <= string.length) {          //начало цикла, в котором мы проходимся по каждой позиции строки файла
        if (charComparison(string.slice(i, i + substring.length), substring, statistic)) {       //берем фрагмент строки ранвый длинне искомой подстроки и вызываем функицию для посимвольного сравнения
            coincidences[pointer] = i;  
            pointer++;
            matching++;
        }
        i++;
    }
    statistic['Time'] = performance.now() - startTime; // из начала времени кода вычитаем конец выполнения кода для подсчёта времени выполнения кода
    statistic['Coincidences'] = coincidences;          //фиксируем стастистику
    statistic['Matching'] = matching;
    return statistic;                                   //вывод статистики
}
function HashSum(string, substring) {        //функция использующая сумму хэшэй в поиске подстроки в строке
    let statistic = { 'Time': 0, 'Coincidences': 0, 'Matching': 0, 'Collisions': 0, 'SymCmpCount': 0 };
    let coincidences = [];
    let matching = 0;
    let pointer = 0;
    let collisions = 0;
    let referenceHash = 0;          //переменная для длинны хэша искомой подстроки
    let startTime = performance.now();
    for (let i = 0; i < substring.length; i++) {     //цикл для подсчёта суммы хэша искомой подстроки
        referenceHash += substring.charCodeAt(i);
    }
    let currentHash = 0;            //переменная для текущего хэша, мы будем с каждой итерацией сдвигаться на один символ вычитая хэш левого символа и прибавляя хэш правого(плавающий хэш)
    let l = 0;
    let r = 0;
    for (r; r < substring.length; r++) {
        currentHash += string.charCodeAt(r);
    }
    while (r <= string.length) {
        if (currentHash === referenceHash) {         //если суммы хэшэй совпадают, то мы посимвольно обращаемся к функции посимвольного сравнение фрагмента строки и искомой подстроки
            if (charComparison(string.slice(l, r), substring, statistic)) {
                coincidences[pointer] = l;
                pointer++;
                matching++;
            }
            else {              //если сумма хэшэй совпала, а строки нет, то это коллизия, поэтому прибавляем единицу в счётчик
                collisions++;
            }

        }
        currentHash = currentHash - string.charCodeAt(l) + string.charCodeAt(r);
        r++;
        l++;
    }
    statistic['Time'] = performance.now() - startTime;
    statistic['Coincidences'] = coincidences;
    statistic['Matching'] = matching;
    statistic['Collisions'] = collisions;

    return statistic;
}
function HashRK(string, substring) {      //функция использующая вычисление хэшэй алгоритмом Рабина Карпа


    let statistic = { 'Time': 0, 'Coincidences': [], 'Matching': 0, 'Collisions': 0, 'SymCmpCount': 0 };
    let coincidences = [];
    let matching = 0;
    let pointer = 0;
    let collisions = 0;
    let referenceHash = 0;
    let startTime = performance.now();
    for (let i = 0; i < substring.length; i++) {             //каждый символ будет умножаться на свою степень двойки, чтобы уменьшить число коллизий
        referenceHash = 2 * (referenceHash + substring.charCodeAt(i));  //подсчитываем хэш для искомой подстроки(шаблона)
    }
    let currentHash = 0;
    let l = 0;
    let r = 0;
    for (r; r < substring.length; r++) {
        currentHash = 2 * (currentHash + string.charCodeAt(r));     //подсчитываем хэш, согласно правилу степени индивидуальной степени для двойки для первых символов строки длинной искомой для дальнейшего сравнения
    }
    while (r <= string.length) {
        if (currentHash === referenceHash) {         //если хэш совпадает то уходим в перебор символов
            if (charComparison(string.slice(l, r), substring, statistic)) {
                coincidences[pointer] = l;      //если фрагмент строки и подстроки совпадают, то записываем индекс совпадения
                pointer++;
                matching++;                         //и добавляем +1 в счетчик совпадений
            }
            else {
                collisions++;
            }

        }
        r++;
        let powerTwo = 2;
        for (let i = 1; i < substring.length; i++) {
            powerTwo = (powerTwo * 2);                //самая высшая степень, в которую приводится двойка
        }
        currentHash = (2 * (currentHash - (string.charCodeAt(l) * powerTwo)) + 2 * string.charCodeAt(r - 1));//вычитаем самый левый элемент, умножаем всё на два, дабы снова повысить степень и прибавляем правый элемент заранее умноженный на два
        l++;
    }
    statistic['Time'] = performance.now() - startTime;
    statistic['Coincidences'] = coincidences;
    statistic['Matching'] = matching;
    statistic['Collisions'] = collisions;

    return statistic;
}
let fs = require('fs');                  //Подключение модуля fs для работы с файлами

//let inText = fs.readFileSync('war_and_peace.ru.txt', 'utf8');    //Записываем текст файла в переменную inText
let string = 'KOLOKOL'
//let string = inText.toString();     
let substring = "KOL";
console.log(BruteForce(string, substring));         //Выводим статистику каждой функции для сравнения работы разных алгоритмов поиска подстроки в строке
statisticBM = BruteForce(string, substring)
console.log(statisticBM['Coincidences']);
console.log(HashSum(string, substring));
statisticHash = BruteForce(string, substring)
console.log(statisticHash['Coincidences']);
console.log(HashRK(string, substring));
statisticRK = BruteForce(string, substring);
console.log(statisticRK['Coincidences'])
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
