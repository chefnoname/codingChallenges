Return true if the passed string looks like a valid US phone number.

-------------------------------------------------------------------------------------------------------------------------



function telephoneCheck(str) {
    let regexFormat1 = /^1?\s?\d{3}-\d{3}-\d{4}$/
    
    
    let regexFormat2 = /^1?[(]\d{3}[)]\d{3}-\d{4}$/
    
    
    let regexFormat3 = /^1\s?[(]\d{3}[)]\s\d{3}-\d{4}$/
    
    
    let regexFormat4 = /^1?\d{3}\s\d{3}\s\d{4}$/
    
    let regexFormat5 = /^1?\d{10}$/
    
    
    let regexFormat6 = /^1\s\d{3}\s\d{3}\s\d{4}$/
    
    return regexFormat1.test(str) || regexFormat2.test(str) || regexFormat3.test(str) || regexFormat4.test(str) || regexFormat5.test(str) || regexFormat6.test(str) 
    }