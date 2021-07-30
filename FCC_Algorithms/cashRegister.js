Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

--------------------------------------------------------------------------------------------------

function checkCashRegister(price, cash, cid) {
    let registerStatus = ['INSUFFICIENT_FUNDS', 'CLOSED', 'OPEN'];
    let totalChange = cash - price;
    let totalChangeWeNeedToGiveInDollars;
    let centsAsString;
    let totalChangeWeNeedToGiveInCents;
    let totalChangeAsAnArr = totalChange.toString().replace(/\W/, '').split('');
  
    if (totalChangeAsAnArr.length === 2) {
      totalChangeWeNeedToGiveInDollars = 0;
      totalChangeWeNeedToGiveInCents = totalChange;
    } else {
      totalChangeWeNeedToGiveInDollars = Number(
        totalChangeAsAnArr.slice(0, 2).join('')
      );
  
      centsAsString = totalChangeAsAnArr.slice(2).join('');
  
      totalChangeWeNeedToGiveInCents =
        Number(centsAsString) / Math.pow(10, totalChangeAsAnArr.length / 2);
    }
  
    let status = getStatus(
      totalChangeWeNeedToGiveInDollars,
      totalChangeWeNeedToGiveInCents,
      totalChange,
      cid,
      registerStatus
    );
  
    let change;
  
    switch (status) {
      case registerStatus[0]:
        change = [];
        break;
      case registerStatus[1]:
        change = cid;
        break;
      case registerStatus[2]:
        change = getCorrectChange(
          totalChangeWeNeedToGiveInDollars,
          totalChangeWeNeedToGiveInCents,
          cid
        );
        break;
    }
  
    let finalReceipt = {
      status,
      change,
    };
  
    return finalReceipt;
  }
  
  function getStatus(
    totalChangeWeNeedToGiveInDollars,
    totalChangeWeNeedToGiveInCents,
    totalChange,
    cid,
    regStat
  ) {
    let totalValueInCID = cid.map((item) => {
      return item[1];
    });
  
    let totalInCIDAsDollars = totalValueInCID
      .reverse()
      .slice(0, 5)
      .reduce((a, b) => a + b);
  
    let totalInCIDAsCents = totalValueInCID
      .reverse()
      .slice(0, 4)
      .reduce((a, b) => a + b);
  
    let finalStatus;
  
    if (
      totalInCIDAsDollars === totalChangeWeNeedToGiveInDollars &&
      totalInCIDAsCents === totalChangeWeNeedToGiveInCents
    ) {
      finalStatus = regStat[1];
    } else if (
      totalInCIDAsDollars > totalChangeWeNeedToGiveInDollars &&
      totalInCIDAsCents > totalChangeWeNeedToGiveInCents
    ) {
      finalStatus = regStat[2];
    } else {
      finalStatus = regStat[0];
    }
  
    return finalStatus;
  }
  
  function getCorrectChange(
    totalChangeWeNeedToGiveInDollars,
    totalChangeWeNeedToGiveInCents,
    cid
  ) {
    let dollarDenom = [100, 20, 10, 5, 1];
    let centDenom = [0.25, 0.1, 0.05, 0.01];
    let dollarsInCid = cid
      .reverse()
      .slice(1, 5)
      .map((item) => {
        return item[1];
      });
  
    let centsInCid = cid.slice(5).map((item) => {
      return item[1];
    });
  
    let dollarRangeArr = dollarDenom.filter((item) => {
      return totalChangeWeNeedToGiveInDollars > item;
    });
  
    let centRangeArr = centDenom.filter((item) => {
      return totalChangeWeNeedToGiveInCents > item;
    });
  
    let counter = 0;
  
    let amountOfHundreds = howManyOfEach(
      totalChangeWeNeedToGiveInDollars,
      dollarRangeArr[dollarRangeArr - 5],
      counter,
      dollarsInCid[dollarsInCid.length - 5]
    );
  
    let amountOfTwenties = howManyOfEach(
      totalChangeWeNeedToGiveInDollars,
      dollarRangeArr[dollarRangeArr.length - 4],
      counter,
      dollarsInCid[dollarsInCid.length - 4]
    );
  
    let amountOfTens = howManyOfEach(
      totalChangeWeNeedToGiveInDollars - amountOfTwenties,
      dollarRangeArr[dollarRangeArr.length - 3],
      counter,
      dollarsInCid[dollarsInCid.length - 3]
    );
  
    let amountOfFives = howManyOfEach(
      totalChangeWeNeedToGiveInDollars - amountOfTwenties - amountOfTens,
      dollarRangeArr[dollarRangeArr.length - 2],
      counter,
      dollarsInCid[dollarsInCid.length - 2]
    );
  
    let amountOfOnes = howManyOfEach(
      totalChangeWeNeedToGiveInDollars -
        amountOfTwenties -
        amountOfTens -
        amountOfFives,
      dollarRangeArr[dollarRangeArr.length - 1],
      counter,
      dollarsInCid[dollarsInCid.length - 1]
    );
  
    let amountOfQuarters = howManyOfEach(
      totalChangeWeNeedToGiveInCents,
      centRangeArr[0],
      counter,
      centsInCid[0]
    );
  
    let amountOfDimes = howManyOfEach(
      totalChangeWeNeedToGiveInCents - amountOfQuarters,
      centRangeArr[centRangeArr.length - 3],
      counter,
      centsInCid[centsInCid.length - 3]
    );
  
    let amountOfNickels = howManyOfEach(
      totalChangeWeNeedToGiveInCents - amountOfQuarters - amountOfDimes,
      centRangeArr[centRangeArr.length - 2],
      counter,
      centsInCid[centsInCid.length - 2]
    );
  
    let amountOfPennys = howManyOfEach(
      totalChangeWeNeedToGiveInCents -
        amountOfQuarters -
        amountOfDimes -
        amountOfNickels,
      centRangeArr[centRangeArr.length - 1],
      counter,
      centsInCid[centsInCid.length - 1]
    );
  
    let amountsArr = [
      ['HUNDRED', amountOfHundreds],
      ['TWENTY', amountOfTwenties],
      ['TEN', amountOfTens],
      ['FIVE', amountOfFives],
      ['ONE', amountOfOnes],
      ['QUARTER', amountOfQuarters],
      ['DIME', amountOfDimes],
      ['NICKEL', amountOfNickels],
      ['PENNY', amountOfPennys],
    ];
  
    let finalArr = amountsArr.filter((item) => {
      return item[1];
    });
  
    return finalArr;
  }
  
  function howManyOfEach(num, subtractor, counter, limit) {
    if (num < 0 || !subtractor || !num) {
      return counter * subtractor;
    }
  
    if (num < subtractor || counter * subtractor === limit) {
      return counter * subtractor;
    }
    counter++;
  
    return howManyOfEach(
      (num - subtractor).toFixed(2),
      subtractor,
      counter,
      limit
    );
  }