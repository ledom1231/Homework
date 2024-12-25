function charComparison(string, substring, statistic) {
    for (let i = 0; i < string.length; i++) {    //������� ��� ������������� ��������� ���������� ������ � ��������� ���������� ������������� ��������� ��� ����������
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
function BruteForce(string, substring) {         //����� ��������� � ������ � �������������� ������ ����
    let statistic = { 'Time': 0, 'Coincidences': 0, 'Matching': 0, 'Collisions': 0, 'SymCmpCount': 0 };   //������, ������� ������ � ����: �����, ������ 10 �������� ����������, ���������� ����������, ��������, ���������� ������������ ���������
    let startTime = performance.now();
    let coincidences = [];              //������ ��� �������� ����������
    let matching = 0;                   //���������� ����������
    let pointer = 0;                    //������� �������� ���������� �������� � coincidens
    let i = 0;                          //������� ��� �����, ���������� ������� �� ������� �� ���� ����������
    i  //� ���������� ���������� ����� ������� �������(��� time)
    while (i + substring.length <= string.length) {          //������ �����, � ������� �� ���������� �� ������ ������� ������ �����
        if (charComparison(string.slice(i, i + substring.length), substring, statistic)) {       //����� �������� ������ ������ ������ ������� ��������� � �������� �������� ��� ������������� ���������
            coincidences[pointer] = i;  
            pointer++;
            matching++;
        }
        i++;
    }
    statistic['Time'] = performance.now() - startTime; // �� ������ ������� ���� �������� ����� ���������� ���� ��� �������� ������� ���������� ����
    statistic['Coincidences'] = coincidences;          //��������� �����������
    statistic['Matching'] = matching;
    return statistic;                                   //����� ����������
}
function HashSum(string, substring) {        //������� ������������ ����� ����� � ������ ��������� � ������
    let statistic = { 'Time': 0, 'Coincidences': 0, 'Matching': 0, 'Collisions': 0, 'SymCmpCount': 0 };
    let coincidences = [];
    let matching = 0;
    let pointer = 0;
    let collisions = 0;
    let referenceHash = 0;          //���������� ��� ������ ���� ������� ���������
    let startTime = performance.now();
    for (let i = 0; i < substring.length; i++) {     //���� ��� �������� ����� ���� ������� ���������
        referenceHash += substring.charCodeAt(i);
    }
    let currentHash = 0;            //���������� ��� �������� ����, �� ����� � ������ ��������� ���������� �� ���� ������ ������� ��� ������ ������� � ��������� ��� �������(��������� ���)
    let l = 0;
    let r = 0;
    for (r; r < substring.length; r++) {
        currentHash += string.charCodeAt(r);
    }
    while (r <= string.length) {
        if (currentHash === referenceHash) {         //���� ����� ����� ���������, �� �� ����������� ���������� � ������� ������������� ��������� ��������� ������ � ������� ���������
            if (charComparison(string.slice(l, r), substring, statistic)) {
                coincidences[pointer] = l;
                pointer++;
                matching++;
            }
            else {              //���� ����� ����� �������, � ������ ���, �� ��� ��������, ������� ���������� ������� � �������
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
function HashRK(string, substring) {      //������� ������������ ���������� ����� ���������� ������ �����


    let statistic = { 'Time': 0, 'Coincidences': [], 'Matching': 0, 'Collisions': 0, 'SymCmpCount': 0 };
    let coincidences = [];
    let matching = 0;
    let pointer = 0;
    let collisions = 0;
    let referenceHash = 0;
    let startTime = performance.now();
    for (let i = 0; i < substring.length; i++) {             //������ ������ ����� ���������� �� ���� ������� ������, ����� ��������� ����� ��������
        referenceHash = 2 * (referenceHash + substring.charCodeAt(i));  //������������ ��� ��� ������� ���������(�������)
    }
    let currentHash = 0;
    let l = 0;
    let r = 0;
    for (r; r < substring.length; r++) {
        currentHash = 2 * (currentHash + string.charCodeAt(r));     //������������ ���, �������� ������� ������� �������������� ������� ��� ������ ��� ������ �������� ������ ������� ������� ��� ����������� ���������
    }
    while (r <= string.length) {
        if (currentHash === referenceHash) {         //���� ��� ��������� �� ������ � ������� ��������
            if (charComparison(string.slice(l, r), substring, statistic)) {
                coincidences[pointer] = l;      //���� �������� ������ � ��������� ���������, �� ���������� ������ ����������
                pointer++;
                matching++;                         //� ��������� +1 � ������� ����������
            }
            else {
                collisions++;
            }

        }
        r++;
        let powerTwo = 2;
        for (let i = 1; i < substring.length; i++) {
            powerTwo = (powerTwo * 2);                //����� ������ �������, � ������� ���������� ������
        }
        currentHash = (2 * (currentHash - (string.charCodeAt(l) * powerTwo)) + 2 * string.charCodeAt(r - 1));//�������� ����� ����� �������, �������� �� �� ���, ���� ����� �������� ������� � ���������� ������ ������� ������� ���������� �� ���
        l++;
    }
    statistic['Time'] = performance.now() - startTime;
    statistic['Coincidences'] = coincidences;
    statistic['Matching'] = matching;
    statistic['Collisions'] = collisions;

    return statistic;
}
let fs = require('fs');                  //����������� ������ fs ��� ������ � �������

//let inText = fs.readFileSync('war_and_peace.ru.txt', 'utf8');    //���������� ����� ����� � ���������� inText
let string = 'KOLOKOL'
//let string = inText.toString();     
let substring = "KOL";
console.log(BruteForce(string, substring));         //������� ���������� ������ ������� ��� ��������� ������ ������ ���������� ������ ��������� � ������
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
