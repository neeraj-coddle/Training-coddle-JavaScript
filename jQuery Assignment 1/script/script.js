$(document).ready(function(){
$(".task-list").hide();
$(".overlay").hide();
$("#Message").show();

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(function (task) {
  let strike =
    task.status === "Done" ? "style='text-decoration: line-through'" : "";

  let row =
    "<tr " +
    strike +
    ">" +
    "<td>" +
    task.title +
    "</td>" +
    "<td>" +
    task.date +
    "</td>" +
    "<td>" +
    task.priority +
    "</td>" +
    "<td class='status'>" +
    task.status +
    (task.status === "Pending"
      ? " <button class='doneButton'>Done</button>"
      : "") +
    "</td>" +
    "<td><button class='deleteButton'>Delete</button></td>" +
    "</tr>";

  $("#table-body").append(row);
});

if (tasks.length > 0) {
  $(".task-list").show();
  $("#Message").hide();
} else {
  $(".task-list").hide();
  $("#Message").show();
}

$("#add-task").on("click", function () {
  $("#Message").hide();
  $(".overlay").show();
});

$("#close-popup").on("click", function () {
  $("#Message").show();
  $(".overlay").hide();
});

$(".task-form").on("submit", function (event) {
  event.preventDefault();
  let date = $("#estimated-time").val();
  if (new Date(date) < new Date()) {
    alert("past date not allowed. please enter a date in future");
    $("#estimated-time").val("");
    return;
  }

  let title = $("#task-title").val();
  let priority = $("#priority").val();
  tasks.push({
    title: title,
    date: date,
    priority: priority,
    status: "Pending",
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  let row =
    "<tr>" +
    "<td>" +
    title +
    "</td>" +
    "<td>" +
    date +
    "</td>" +
    "<td>" +
    priority +
    "</td>" +
    "<td class='status'>Pending <button class='doneButton'>Done</button></td>" +
    "<td><button class='deleteButton'>Delete</button></td>" +
    "</tr>";

  $("#table-body").prepend(row);
  $("#Message").hide();
  $(".task-list").show();
  $(".overlay").hide();

  $("#task-title").val("");
  $("#estimated-time").val("");
  $("#priority").val("");
});

$(document).on("click", ".doneButton", function () {
  let row = $(this).closest("tr");
  let index = row.index();

  row.css("text-decoration", "line-through");

  $(this).parent().text("Done");

  tasks[index].status = "Done";

  localStorage.setItem("tasks", JSON.stringify(tasks));

  $(".task-list tbody").append(row);
});

$(document).on("click", ".deleteButton", function () {
  let row = $(this).closest("tr");
  let index = row.index();

  tasks.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  row.remove();

  if (tasks.length == 0) {
    $(".task-list").hide();
    $("#Message").show();
  }
});
})
