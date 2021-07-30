Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

-------------------------------------------------------------------------------------------------------------------------


const rot13 = str => str.split('').map(letter => getROTI13(letter)).join('');

rot13('SERR PBQR PNZC');

function getROTI13(str) {
  let newStr;
  let alphabetArr = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  if (str === 'N') {
    newStr = 'A';
  } else if (alphabetArr.includes(str)) {
    let adder = alphabetArr.indexOf(str) > 13 ? -13 : 13;
    return alphabetArr[alphabetArr.indexOf(str) + adder];
  } else {
    return str;
  }


  return newStr;
}