// 1. {a:'one', b:'2', f:'5', c:'33', p:'do', q:'one' }: Using this object makes an array consisting
//  of all the keys of the given object in reverse order. (output should be ['q', 'p', 'c', 'f', 'b', 'a'])

let objectOne = { a: "one", b: "2", f: "5", c: "33", p: "do", q: "one" };
let objectOne_keys = Object.keys(objectOne);
let objectOne_reverse = objectOne_keys.reverse();

console.log("Q1 : ", objectOne_reverse);

// -----------------------------------------------------------------------------------------------------------------------------------------------
console.log("");

// 2. { data: [{a:'one', id:'22'}, {a:'four', id:'7'}, {a:'six', b:'2'},  {a:'sixty', id:'24'},  {a:'five', id:'212'}] }
// From the given object, remove the data arrays item with id as '24'. (consider that the data arrays order will be different
//  every time you get, so write code in such a way that given any object it will remove the item with id as 24 if it exists ).

let objectTwo = {
  data: [
    { a: "one", id: "22" },
    { a: "four", id: "7" },
    { a: "six", id: "2" },
    { a: "sixty", id: "24" },
    { a: "five", id: "212" },
  ],
};
// used include method in filtering 
let updated_objectTwo = objectTwo.data.filter((item) => !["7","24"].includes(item.id));
console.log("Q2 : ", updated_objectTwo);

// -----------------------------------------------------------------------------------------------------------------------------------------------
console.log("");

// 3. Write a function to
// A. Calculate the height of the end user's browser screen
// B. To console the name of the web host
// C. To show a warning message if there is no https protocol used in the visited website.
// D. To show an alert message after 10sec while the page is refreshed.

// A.
let screenHeight = window.innerHeight;
console.log("Q3 A : ", screenHeight);

// B.
let webhost = location.hostname;
console.log("Q3 b : ", webhost);

// C.
let protocol = location.protocol;
if (protocol !== "https:") {
    alert("No https protocol used in this page.");
}

// D.
setTimeout(() => {
    alert("An alert message after 10 seconds.");
}, 10000);
 