Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

function palindrome(str) {
    let arrOfStr = str.replace(/[_\W]/g, '').toLowerCase().split('');
    let firstSlice = arrOfStr.slice(0, arrOfStr.length / 2);
    let secondSlice = arrOfStr.slice((arrOfStr.length + 1) / 2).reverse();
  
    for (let i = 0; i < firstSlice.length; i++) {
      let item1 = firstSlice[i];
      let item2 = secondSlice[i];
  
      if (item1 !== item2) {
        return false;
      }
    }
  
    return true;
  }
  
  palindrome('never odd or even');
  
  palindrome('not a palindrome');