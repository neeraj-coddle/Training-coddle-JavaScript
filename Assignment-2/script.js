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
    { a: "six", b: "2" },
    { a: "sixty", id: "24" },
    { a: "five", id: "212" },
  ],
};

let updated_objectTwo = objectTwo.data.filter((item) => item.id !== "24");
console.log("Q2 : ", updated_objectTwo);

// -----------------------------------------------------------------------------------------------------------------------------------------------
console.log("");

// 3. Write a function to
// A. Calculate the height of the end user's browser screen
// B. To console the name of the web host
// C. To show a warning message if there is no https protocol used in the visited website.
// D. To show an alert message after 10sec while the page is refreshed.

// A.
let screenHeight = screen.height;
console.log("Q3 A : ", screenHeight);

// B.
let webhost = location.hostname;
console.log("Q3 b : ", webhost);

// C.
let protocol = location.protocol;
// if (protocol !== "https:") {
//     alert("No https protocol used in this page.");
// }

// D.
// setTimeout(() => {
//     alert("An alert message after 10 seconds.");
// }, 10000);

// -----------------------------------------------------------------------------------------------------------------------------------------------
console.log("");

// 4. The Social Media Feed:
// A. Create a form to save posts with the following fields: id (auto-generate), author, content, likes, and tags
// B. Store post objects in an array. Each object must include: id, author, content, likes (number), and tags (array of strings). Save this array to the browser's localStorage.
// C. Write a function getTrendingPosts(minLikes) that returns only posts with likes above a certain number.
// D. Write a function getPostsByTag(tagName) that filters the feed based on a specific tag.
// E. Create a function that returns an alphabetically sorted array of all author usernames.
// F. Create a list view for the feeds. Each post should have delete and edit button
// G. Write a function to remove a post from the feed and update localStorage.
// H. Write a function to edit existing post details.
// I. Implement a confirm dialog before saving or updating a post, and an alert notification after a post is successfully deleted.

// A. B.
const form = document.getElementById("socialMedia");
const list = document.getElementById("list");
const listAuthor = document.getElementById("listAuthor");

let allPost = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const recentPost = {
    id: Date.now(),
    author: document.getElementById("author").value,
    content: document.getElementById("content").value,
    likes: document.getElementById("likes").value,
    tags: document.getElementById("tags").value.split(","),
  };

  allPost.push(recentPost);

  localStorage.setItem("allPost", JSON.stringify(allPost));

  console.log("Current Posts:", allPost);

  // form.reset();

  feedList(allPost);
});

// C.

function showTrending() {
  const result = allPost.filter((p) => {
    return p.likes > 10;
  });
  feedList(result);
}

// D.

function findPostsByTag(tag) {
  return allPost.filter((p) => {
    return p.tags.includes(tag);
  });
}

function showTagPosts(tag) {
  const result = findPostsByTag(tag);
  feedList(result);
}

// E

function showAuthors() {
  const authors = allPost.map((post) => post.author);
  authors.sort();
  listAuthor.innerHTML = "";

  authors.forEach((author) => {
    listAuthor.innerHTML += `${author}<br>`;
  });
}

// F.

function feedList(data) {
  list.innerHTML = "";

  data.forEach((p) => {
    list.innerHTML += `<li>
            <b>${p.id}</b> <br>
            <b>${p.author}</b> 
            <br> ${p.content}
            <br>Likes: ${p.likes}
            <br>Tags: ${p.tags.join(", ")}
        <button onclick="editpost(${p.id})">Edit</button> 
        <button onclick="deletepost(${p.id})">Delete</button>
            <hr>
        </li>`;
  });
}

// G.

function deletepost(id) {
  if (!confirm("do you really want to delete?")) {
    return;
  }

  allPost = allPost.filter((post) => post.id !== id);

  localStorage.setItem("allPost", JSON.stringify(allPost));

  feedList(allPost);

  alert("succesfully deleted");
}

// H.

const editpost = (id) => {
  const post = allPost.find((p) => p.id === id);
  if (!confirm("do you really want to delete ?")) return;

  document.getElementById("author").value = post.author;
  document.getElementById("content").value = post.content;
  document.getElementById("likes").value = post.likes;
  document.getElementById("tags").value = post.tags.join(",");

  allPost = allPost.filter((p) => p.id !== id);

  localStorage.setItem("allPost", JSON.stringify(allPost));
};
