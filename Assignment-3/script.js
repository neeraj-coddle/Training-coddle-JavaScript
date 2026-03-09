// 1. Given the string "JavaScript is a versatile language and JavaScript is fun", write a function to 
// return an object showing the frequency of each word.

function wordcount(str) {
  const freq = {};
  const words = str.toLowerCase().split(" ");

  for (let w of words) {
    if (freq[w]) {
      freq[w]++;
    } else {
      freq[w] = 1;
    }
  }

  return freq;
}

console.log(
  wordcount("JavaScript is a versatile language and JavaScript is fun"),
);



// ------------------------------------------------------------------------------------------------------------------------------------
console.log(""); 


// 2.  Use the JSONPlaceholder API to perform the following:

// A. GET: Fetch all "Posts" and display only the title of the first 5 posts in an HTML list.

// B. POST: Create a function that "sends" a new post (title and body) to the API. Console the 
// response from the server to prove the "creation" was successful.

// C. Handle errors.

// D. Create an input field where a user enters a User ID (1-10).

// E. When the user clicks "Fetch Info," call https://jsonplaceholder.typicode.com/users/[ID].

// F. Display the user's name, email, and their company name in a card format.


//  A. 
async function fetchData() {
  const posts = document.getElementById("list");
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const data = await response.json();
    
    console.log(data);

    let fivePosts = data.slice(0, 5).map((p) => {
        return `<li><b>Title: </b>${p.title}</li> <br>`;
      }).join("");

    posts.innerHTML = fivePosts; 
    
  } catch (error) {
    console.error("error fetching API", error);
  }
}

fetchData();

// ---------------------------------------------------------------------------------------------------------


//  B. 
const form = document.getElementById("newPost");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: document.getElementById("title").value,
          body: document.getElementById("body").value,
          userId: Number(document.getElementById("userid").value),
        }),
      },
    );

    if (!response.ok) {
      console.log("error", error);
    }

    const data = await response.json();
    console.log("post added succesfully. ", data);
    
    alert("post added succesfully. ");
  } catch (error) {
    console.error("error posting", error);
  }
});

// ------------------------------------------------------------------------------------------------------------

async function findUser() {
  const id = document.getElementById("search").value;
  const loading = document.getElementById("loading");
  const foundUser = document.getElementById("userData");

  if (id == "") {
    alert("type a id number, can't search with null value. ")
    return; 
  }
  loading.style.display = "block";
  if (id < 1 || id > 10) {
    alert("enter number between 1 and 10");
    loading.style.display = "none";
    return;
  }
  console.log("1");
  
  try {
    const response = await fetch(
    );
    const userData = await response.json();
    console.log(userData);
    
    displayUser(userData);
    loading.style.display = "none";
  } catch (error) {
    foundUser.innerHTML = "Sorry failed to fetch user details !!!";
    console.error("not able to find the user. ", error);
  }
}

function displayUser(user) {
  const foundUser = document.getElementById("userData");
  foundUser.innerHTML = `
  <div style="padding:10px; width:250px;">
    <p><b>Name:</b> ${user.name}</p>
    <p><b>Email:</b> ${user.email}</p>
    <p><b>Company:</b> ${user.company.name}</p>
  </div>
  `;
}

// -----------------------------------------------------------------------------------------------------------

// question 3
// The Secure Bank Account (Closures and Classes):
// A. Create a function createAccount(initialDeposit). It should return an object with three 
// methods: deposit(amount), withdraw(amount), and getBalance().
// B. Also implement this same logic using modern JavaScript Classes.
// NOTE: The actual balance variable must be private (cannot be accessed or changed from outside the function).

// A.

function createAccount(initialDeposit) {
  let balance = initialDeposit;

  return {
    deposit(amount) {
      if (amount < 1) {
        console.log("invalid deposit amount");
        return; 
      }
      balance += amount;
      console.log(`Deposit amount : ${amount}`);
      console.log(`balance after deposit : ${balance}`);
    },

    withdraw(amount) {
      if (amount > balance) {
        console.log("not enough balance");
        return;
      }
      balance -= amount;
      console.log(`withdrawn amount : ${amount}`);
      console.log(`balance after withdrawing : ${balance}`);
    },

    showBalance() {
      return `Balance : ${balance}`;
      ;
    },
  };
}

const account1 = createAccount(1000);

account1.deposit(500);
account1.withdraw(170);

console.log(account1.showBalance());


// ----------------------------------------------------------------------------------------------------------------------------------- 
console.log("");


// B.

class BankAccount {
  #balance;

  constructor(initialDeposit) {
    this.#balance = initialDeposit;
  }

  deposit(amount) {
    if (amount < 1) {
        console.log("invalid deposit amount");
        return; 
      }
      console.log(`Deposit amount : ${amount}`);
      console.log(`balance after deposit : ${this.#balance}`);
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("Insufficient balance");
      return;
    }
      console.log(`withdrawn amount : ${amount}`);
      console.log(`balance after withdrawing : ${this.#balance}`);
    this.#balance -= amount;
  }

  getBalance() {
    return `Balance : ${this.#balance}`;
  }
}

const account2 = new BankAccount(2000);

account2.deposit(500);
account2.withdraw(356);

console.log(account2.getBalance()); 



// ----------------------------------------------------------------------------------------------------------------------------------- 
console.log(""); 


// 4.
// Create an input field for a search bar. Write a Debounce function so that the "Search API Call" only 
// triggers 500ms after the user has stopped typing.

function debounce(func, delay) {
  let timer;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func();
    }, delay);
  };
}

const debouncedSearch = debounce(searchfun, 500);

document.getElementById("inputsearch").addEventListener("input", debouncedSearch);
  
  function searchfun() {
  let searchword = document.getElementById("inputsearch").value; 
  console.log("searching for :",searchword);
}


// ----------------------------------------------------------------------------------------------------------------------------------- 
console.log(""); 



// 5.
//   The Super-Class Challenge:

// A. Create a base class Vehicle with properties brand and speed.

// B. Create a subclass electricCar that inherits from Vehicle and adds a batteryLevel property.

// C. Add a method drive() to Vehicle that logs "Moving at [speed] km/h".

// D. Override drive() in electricCar to log "Moving silently at [speed] km/h with [batteryLevel]% charge."

class Vehicle {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  drive() {
    return 'Moving at' + this.speed + 'km/h';
    // console.log(`Moving at ${this.speed} km/h`);
  }
  carBrand() {
    return 'The car brand is : ' + this.brand; 
    // console.log(`the car brand is ${this.brand}. `);
    
  }
}

class electricCar extends Vehicle {
  constructor(brand, speed, batteryLevel) {
    super(brand, speed);
    this.batteryLevel = batteryLevel;
  }
  
  drive() {
    return 'Moving silently at ' + this.speed + 'km/h with ' + this.batteryLevel + '% charge.'
    // console.log(`Moving silently at ${this.speed} km/h with ${this.batteryLevel}% charge.`,); 
  }
  carBrand() {
    return 'The car brand is : ' + this.brand; 
    // console.log(`the car brand is ${this.brand}. `);
    
  }
}


const vehicle1 = new Vehicle("lamborgini", 70);
vehicle1.drive();
vehicle1.carBrand(); 

const electricCar1 = new electricCar("mini cooper", 100, 80);
electricCar1.drive(); 
electricCar1.carBrand(); 