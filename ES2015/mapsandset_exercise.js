//Quick Question #1
new Set([1,1,2,2,3,4]) 
// {1,2,3,4}

//Quick Question #2
[...new Set("referee")].join("") 

// "ref"

//Quick Question #3
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);


// {Array(3) => false}

//Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate

hasDuplicate([1,3,2,1]) // true
hasDuplicate([1,5,-1,4]) // false

const hasDuplicate = arr => new Set(arr).size !==arr.length

//Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
vowelCount('Colt') // Map { 'o' => 1 }

function vowelCount(str) {
    const vowels = ['a','e', 'i', 'o', 'u']
    const map = new Map()

    for (let char of str){
        let lowercasChar = char.toLowerCase()
        if(vowels(lowercasChar)){
            if(map.has(lowercasChar)){
            map.set(lowercasChar, map.get(lowercasChar)+1)
        }else{
            map.set(lowercasChar, 1)
        }
    }
   
    }
    return map
}


// function vowelCount(str){

//     const vowelMap = new Map();
//     for(let char of str){
//       let lowerCaseChar = char.toLowerCase()
//       if(isVowel(lowerCaseChar)){
//         if(vowelMap.has(lowerCaseChar)){
//           vowelMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1);
//         } else {
//           vowelMap.set(lowerCaseChar, 1);
//         }
//       }
//     }
//     return vowelMap;
//   }