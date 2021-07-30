Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.

-------------------------------------------------------------------------------------------------------------------------



function convertToRoman(num) {
    let splitNumber = splitNumberIntoUnits(num);
  
  
    switch (splitNumber.length) {
      case 1:
        return unitsToRNumeralMap(splitNumber[0]);
      case 2:
        return (
          tensToRNumeralMap(splitNumber[0]) + unitsToRNumeralMap(splitNumber[1])
        );
      case 3:
        return (
          hundredsToRNumeralMap(splitNumber[0]) +
          tensToRNumeralMap(splitNumber[1]) +
          unitsToRNumeralMap(splitNumber[2])
        );
      case 4:
        return (
          thousandsToRNumerals(splitNumber[0]) +
          hundredsToRNumeralMap(splitNumber[1]) +
          tensToRNumeralMap(splitNumber[2]) +
          unitsToRNumeralMap(splitNumber[3])
        );
    }
  }
  
  function splitNumberIntoUnits(num) {
    let numToArr = num.toString().split('');
    let tensPlace = [];
  
    let multiplier = 1;
    for (let i = numToArr.length - 1; i >= 0; i--) {
      let result = multiplier * Number(numToArr[i]);
      multiplier *= 10;
  
      tensPlace.unshift(result);
    }
    return tensPlace;
  }
  
  const unitsToRNumeralMap = (n) => {
    const unitMap = {
      0: '',
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      6: 'VI',
      7: 'VII',
      8: 'VIII',
      9: 'IX',
    };
    return unitMap[n];
  };
  
  const tensToRNumeralMap = (n) => {
    const tensMap = {
      0: '',
      10: 'X',
      20: 'XX',
      30: 'XXX',
      40: 'XL',
      50: 'L',
      60: 'LX',
      70: 'LXX',
      80: 'LXXX',
      90: 'XC',
    };
  
    return tensMap[n];
  };
  
  const hundredsToRNumeralMap = (n) => {
    const hundredsMap = {
      0: '',
      100: 'C',
      200: 'CC',
      300: 'CCC',
      400: 'CD',
      500: 'D',
      600: 'DC',
      700: 'DCC',
      800: 'DCCC',
      900: 'CM',
    };
    return hundredsMap[n];
  };
  
  function thousandsToRNumerals(num) {
    let str = '';
    let counter = 0;
    while (num > counter) {
      counter += 1000;
      str += 'M';
    }
    return str;
  }