Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than or equal to 10 are 1, 1, 3, and 5.


-----------------------------------------------------------------------------------------------------------------------------------

function sumFibs(num){
    let fibbonacciSequence = [0,1];
    let sumOfOddFibbonacciNumbers = 1;
    let counter = iterateFibbonacciSequence(counter)
    
    function iterateFibbonacciSequence(counter){
        return fibbonacciSequence[fibbonacciSequence.length - 2] + fibbonacciSequence[fibbonacciSequence.length - 1];

    }

    function isOdd(counter){ return counter % 2 != 0 }

    while(counter <= num){
        fibbonacciSequence.push(counter)

        if(isOdd(counter)) { sumOfOddFibbonacciNumbers += counter}
        counter = iterateFibbonacciSequence(counter)
    }

    return sumOfOddFibbonacciNumbers
}