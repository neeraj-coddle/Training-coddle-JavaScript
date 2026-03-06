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

let id = 0; 

let allPost = JSON.parse(localStorage.getItem("allPost")) || [];
feedList(allPost);
// added automatic fetching of post list so after reload the post list stays 

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  id++; 
  formattedId = id.toString().padStart(8, '0'); 

  const recentPost = {
    id: formattedId,
    author: document.getElementById("author").value,
    content: document.getElementById("content").value,
    likes: document.getElementById("likes").value,
    tags: document.getElementById("tags").value.split(","),
  };

  allPost.push(recentPost);

  localStorage.setItem("allPost", JSON.stringify(allPost));

  console.log("Current Posts:", allPost);
  recentPost.tags.forEach(tag => addfilterButtons(tag))

  form.reset();

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
  let uniqueauthors = new Set(authors); 
  listAuthor.innerHTML = "";

  uniqueauthors.forEach((author) => {
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
            <br> 
        <button onclick="editpost(${p.id})">Edit</button> 
        <button onclick="deletepost(${p.id})">Delete</button>
            <hr>
        </li>`;
  });
}

// G.

function deletepost(id,tag) {
  if (!confirm("do you really want to delete?")) {
    return;
  }

  allPost = allPost.filter((post) => post.id !== id);
  allButtons = allButtons.filter((btns) => btns !== tag);
  
  localStorage.setItem("allButton",JSON.stringify(allButtons)); 
  localStorage.setItem("allPost", JSON.stringify(allPost));

  feedList(allPost);
  showFilterBtns(); 

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
// Important: Changes
// even after refresh the allposts are not showing the UI.
// Like should not be -Ve
// make required fields otherwise empty datas are showing in the below cards.
// tags prepopulate in the filter section.
// edit shows wrong alert.

let allButtons = JSON.parse(localStorage.getItem("allButton")) || ["html","react","javascript"]; 
const buttonBox = document.getElementById("filterbtns")
showFilterBtns(); 

function addfilterButtons(tag){

if(!allButtons.includes(tag)){
   allButtons.push(tag)
   localStorage.setItem("allButton",JSON.stringify(allButtons));
   console.log(allButtons);
   
}
showFilterBtns()
}

function showFilterBtns(){
  buttonBox.innerHTML = " ";
  allButtons.forEach((btns) => {
    buttonBox.innerHTML += `<button onclick="showTagPosts('${btns}')">${btns}</button>` 
  })
}

function resetFilter(){
  feedList(allPost)
}