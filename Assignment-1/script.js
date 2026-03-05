// 1. Create variables with different data types available in JS and print their data types
//  along with each variable name in the console.

let x;
console.log("x :" + typeof (x)); //undefined 

let num = 12;
console.log("num :" + typeof (num)); //number 

let str = "this is a string";
console.log("str :" + typeof (str)); //string 

x = true;
console.log("x :" + typeof (x)); //boolean 

// Important: Recheck this is it actually returning null or object
x = null;
console.log("x :" + typeof (x)); //Null, But shows object as datatype

const user = { name: "abi", age: 12 };
console.log("user :" + typeof (user)); //object 

// Important: Recheck this is it actually returning array or object
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log("arr :" + typeof (arr)); //array , But shows object as datatype

x = 6566754433232345565n;
console.log("x :" + typeof (x)); //bigint 

function abc(a, b) {
    return a + b;
}
console.log("abc :" + typeof (abc)); //function 


// ----------------------------------------------------------------------------------------------------------------------------- 

// 2. Write a JS program to show an alert message on the loading of the website. 
// initiated alert message using window.alert 
window.alert("this is a alert message. "); 


// ----------------------------------------------------------------------------------------------------------------------------- 

// 3. A. Remove number "6" from the array and console the length of the array. 

let arr1 = ["1", "2", "3", "4", "5", "6", "7"];

let index = arr1.indexOf("6");
let newArray = arr1;
newArray.splice(index,1)
console.log("arr1 length after removing 6 :" + newArray.length);

// B.Convert all the items of the array to data type number and console each items data type, 
// use any of the array iteration methods provided by JS for iteration. 

arr1 = ["1", "2", "3", "4", "5", "6", "7"];
let typeof_arr1 = []; 
//applied foreach instead of map function
    arr1.forEach((num,index) =>{
    arr1[index] = Number(num); 
    typeof_arr1.push(typeof arr1[index]); 
});

for (let i = 0; i < arr1.length; i++) {
    console.log(arr1[i] + ": " + typeof_arr1[i]); 
}

console.log(typeof_arr1);

// C. Remove last three items of the array, use JS provided array method, then console the array
//  and then add "one" and "two" (strings) to the beginning of the array and console the array.  
arr1 = ["1", "2", "3", "4", "5", "6", "7"];
let arr2;
arr2 = arr1; //made a shallow copy 
arr2.splice(-3);
console.log(arr2);

arr2.unshift("one", "two");
console.log(arr2);

// D. Using any one of the array iteration methods console the string concatenation of all items
//  of the array and also console the sum of all the items ( convert to integer before calculating)
arr1 = ["1", "2", "3", "4", "5", "6", "7"];
let mergedArray = [];
let sum = 0;

arr1.forEach(item => {
    mergedArray += item;
    sum += Number(item);
});

console.log("merged array :" + mergedArray);
console.log("sum of array :" + sum);

// E. Filter out item "3" from the array and console the array (use array method)
arr1 = ["1", "2", "3", "4", "5", "6", "7"];

arr1 = arr1.filter(num => num !== "3");
console.log("removed 3 from arr1 :" + arr1);

// F. Iterate the array and console the item, when item is either "3", "6" or "7" 
arr1 = ["1", "2", "3", "4", "5", "6", "7"];

arr1.map(num => {
    if (num == "3" || num == "6" || num == "7") {
        console.log(num);
    }
})

// G. [1, 2, "3", 4, 5, 6,"7"]  Compare this array with the above given array and console
//  only if both items of the array have same data type. (Compare each item of this array with each item of the other array) 
arr1 = ["1", "2", "3", "4", "5", "6", "7"];
arr2 = [1, 2, "3", 4, 5, 6, "7"];
//corrected check condition
let arr1_length = arr1.length;
let arr2_length = arr2.length;
for (let i = 0; i <= arr1_length - 1; i++) {
    for (let j = 0; j <= arr1_length - 1; j++) {
        if (typeof(arr1[i]) == typeof(arr2[j])) {
            console.log("items with same datatype :" + arr1[i],arr2[j]);
        }
    }
}


// H. [0,2,3,7,5,6,8] iterates the array and multiplies each item by its index value and console the result only if result is greater than 40. 
let arr3 = [0, 2, 3, 7, 5, 6, 8];
let result = 0;
//corrected result >= 40
arr3.forEach((num, ind) => {
    result = num * ind;
    if (result > 40) {
        console.log("sum more than 40 :" + result); 
    }
})

// I. Create two arrays with five items each and merge the array into a single array and then console it. 
let arr4 = [1, 2, 3, 4, 5];
let arr5 = [6, 7, 8, 9, 10];

let concatedArray = arr4.concat(arr5);
// used spread operator for concatenation 
let concatedBySpread = [...arr4,...arr5];
console.log("concated array : " + concatedArray);
console.log("concated array using spread operator : " + concatedBySpread);

// ----------------------------------------------------------------------------------------------------------------------------- 

// 4. Create an array of 3 objects called users. Each object should have id, name, and email. 
let userdata = [
    { id: 1, name: "Jim carrey", email: "jimcarry@gmail.com" },
    { id: 2, name: "Hugh jackman", email: "Hughjackmany@gmail.com" },
    { id: 3, name: "Henry cavil", email: "Henrycavil@gmail.com" }
];

// A. Create a new array that only contains the email strings. 
let email_only = userdata.map((a) => a.email);
console.log("only emails: " + email_only);



// B. Add a new property isAdmin: true to only the first user in the array using the spread operator. 

// userdata[0]={...userdata[0],isAdmin:true} 

const added_admin = userdata.map((item,i) => {
   return i === 0?{...item,isAdmin:true}:item
})

console.log(added_admin);


// ----------------------------------------------------------------------------------------------------------------------------- 

// 5. [0, "hello", "", NaN, 42, undefined, false, "JS", "hello", "42"]

// A. Remove the falsy values from the array.

let falsearray = [0, "hello", "", NaN, 42, undefined, false, "JS", "hello", "42"];

let filtered_array = falsearray.filter((item) => { 
    if (item !== false || 0 || null || 0n || "" || NaN || undefined) {
        return item; 
    }
}); 
console.log("filtered array : " + filtered_array);

// B. Remove the duplicates and console the unique array. 

let uniquearray = [...new Set(filtered_array)];

console.log("unique array : " + uniquearray); 

// ----------------------------------------------------------------------------------------------------------------------------- 


// 6. "Javascript is a programming language". 
//  Convert it into an array of words, reverse the order of the words, and join them back into a single string separated by hyphens. 

let sentence = "Javascript is a programming language";

let altered_string = sentence.split(" ").reverse().join("-"); 

console.log(altered_string);

// ----------------------------------------------------------------------------------------------------------------------------- 

// 7. Given an array of prices: [19.99, 5.50, 24.00, 0.99].
// A. Add a 10% tax to each price.
// B. Then get the total sum.
// C. Console the output (ensure the final total is rounded to the nearest whole number) 

let prices= [19.99, 5.50, 24.00, 0.99]; 

let taxed_price = prices.map((price) => (price + (price * 0.10)).toFixed(2)); 
console.log("taxed price : " + taxed_price); 


let total_price = 0; 
taxed_price.forEach((a) => { 
    total_price += Number(a); 
}) 
console.log("total price : " + total_price); 

let rounded_price = Math.round(total_price); 
console.log("rounded price : " + rounded_price); 
