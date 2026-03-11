$(".taskList").hide()
$(".popUp").hide()
$("#priority").val("");


let tasks = JSON.parse(localStorage.getItem("tasks")) || []

tasks.forEach(function(task){

let strike = task.status === "Done" ? "style='text-decoration: line-through'" : ""

let row = "<tr "+strike+">" +
"<td>"+task.title+"</td>" +
"<td>"+task.date+"</td>" +
"<td>"+task.priority+"</td>" +
"<td class='status'>" + task.status +
(task.status === "Pending" ? " <button class='doneButton'>Done</button>" : "") +
"</td>" +
"<td><button class='deleteButton'>Delete</button></td>" +
"</tr>"

$("#tableBody").append(row)
}) 

if(tasks.length > 0){
$(".taskList").show()
}


$("#addTask").on("click",function(){
$(".popUp").show()
})


$("#closePopup").on("click",function(){
$(".popUp").hide()
})


$(".taskForm").on("submit",function(event){

event.preventDefault()

let title = $("#taskTitle").val()
let date = $("#estimatedTime").val()
let priority = $("#priority").val()
tasks.push({
    title: title,
    date: date,
priority: priority,
status: "Pending"
})

localStorage.setItem("tasks", JSON.stringify(tasks))

let row = "<tr>" +
"<td>"+title+"</td>" +
"<td>"+date+"</td>" +
"<td>"+priority+"</td>" +
"<td class='status'>Pending <button class='doneButton'>Done</button></td>" +
"<td><button class='deleteButton'>Delete</button></td>" +
"</tr>"



$("#tableBody").prepend(row)
$(".taskList").show()
$(".popUp").hide()

$("#taskTitle").val("");
$("#estimatedTime").val("");
$("#priority").val("");

})


$(document).on("click",".doneButton",function(){

let row = $(this).closest("tr")
let index = row.index()

row.css("text-decoration","line-through")

$(this).parent().text("Done")

tasks[index].status = "Done"

localStorage.setItem("tasks", JSON.stringify(tasks))

$(".taskList tbody").append(row)

})

$(document).on("click",".deleteButton",function(){

let row = $(this).closest("tr")
let index = row.index()

tasks.splice(index,1)

localStorage.setItem("tasks", JSON.stringify(tasks))

row.remove()

})