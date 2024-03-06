

// get todo list from local storage or create an empty array
let todoTasks = JSON.parse(localStorage.getItem("todoTasks")) || []

const todoIdInput = document.getElementById("todoIdInput")
const todoTitleInput = document.getElementById("todoTitleInput")
const todoDescriptionInput = document.getElementById("todoDescriptionInput")
const todoDateInput = document.getElementById("todoDateInput")
const todoTimeInput = document.getElementById("todoTimeInput")
const todoPriorityInput = document.getElementById("todoPriorityInput")
const todoButton = document.querySelector("#todoButton")
const buttons = document.querySelectorAll("button")

const todoList = document.getElementById("todoList")

// init
document.addEventListener("DOMContentLoaded", ()=>{
    todoButton.addEventListener("click", addOrEditTask)
    displayTasks()

    todoList.addEventListener("click", (event) => {
        if(event.target.nodeName !== "BUTTON") return;
        const btnIdData = event.target.id.split("-")
        const btnData = {command: btnIdData[1], taskIndex: btnIdData[2]}
        if (btnData.command === "delete") deleteTask(btnData.taskIndex)
        if (btnData.command === "edit") requestEdit(btnData.taskIndex)
    })
})


function addOrEditTask(){
    const newTask = {
        title: todoTitleInput.value,
        description: todoDescriptionInput.value,
        dueDate: new Date(todoDateInput.value + "T" + todoTimeInput.value),
        priority: todoPriorityInput.value
    }

    console.log("is editing ", !!todoIdInput)
    if (todoIdInput.value) todoTasks[todoIdInput.value] = newTask
    else todoTasks.push(newTask)

    displayTasks()
    saveToLocalStorage()
    //clearForm()
    console.log(todoTasks)
}

function displayTasks(){
    todoList.innerHTML = ""
    todoTasks.forEach((todoTask, index) => {
        const taskTitle = document.createElement("h3")
        taskTitle.innerHTML = todoTask.title
        
        const taskDescription = document.createElement("p")
        taskDescription.innerHTML = todoTask.description

        const taskDueDate = document.createElement("p")
        taskDueDate.innerHTML = "Due on: " + new Date(todoTask.dueDate)

        const taskPriority = document.createElement("p")
        taskPriority.innerHTML = "Priority: " + todoTask.priority

        const editButton = document.createElement("button")
        editButton.id = `btn-edit-${index}`
        editButton.innerHTML = "Edit"

        const deleteButton = document.createElement("button")
        deleteButton.id = `btn-delete-${index}`
        deleteButton.innerHTML = "Delete"

        const li = document.createElement("li")
        li.append(taskTitle,taskDescription, taskDueDate, taskPriority, editButton, deleteButton)

        todoList.innerHTML += li.outerHTML
    });
}

function requestEdit(index){
    let duedate = new Date(todoTasks[index].dueDate) 

    todoIdInput.value = index
    todoTitleInput.value = todoTasks[index].title
    todoDescriptionInput.value = todoTasks[index].description
    todoDateInput.value = formatDate(duedate)
    todoTimeInput.value = formatTime(duedate)
    todoPriorityInput.value = todoTasks[index].priority
}

function deleteTask(index){
    todoTasks.splice(index, 1)
    displayTasks()
    saveToLocalStorage()
}

function saveToLocalStorage(){
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks))
}

function clearForm(){
    todoIdInput.value = null
    todoTitleInput.value = null
    todoDescriptionInput.value = null
    todoDateInput.value = null
    todoTimeInput.value = null
    todoPriorityInput.value = null
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatTime(date) {
    var t = new Date(date),
        hour = t.getHours(),
        min = '' + t.getMinutes(),
        sec = "00";

    if (hour.length < 2) 
        hour = '0' + hour;
    if (min.length < 2) 
        min = '0' + min;

    return [hour, min, sec].join(':');
}