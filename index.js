

// get todo list from local storage or create an empty array
let todoTasks = JSON.parse(localStorage.getItem("todoTasks")) || []

const todoIdInput = document.getElementById("todoIdInput")
const todoTitleInput = document.getElementById("todoTitleInput")
const todoDescriptionInput = document.getElementById("todoDescriptionInput")
const todoDateInput = document.getElementById("todoDateInput")
const todoTimeInput = document.getElementById("todoTimeInput")
const todoPriorityInput = document.getElementById("todoPriorityInput")
const todoButton = document.querySelector("#todoButton")

const todoList = document.getElementById("todoList")

// init
document.addEventListener("DOMContentLoaded", ()=>{
    todoButton.addEventListener("click", addTask)
    displayTasks()
})

function addTask(){
    const newTask = {
        title: todoTitleInput.value,
        description: todoDescriptionInput.value,
        dueDate: new Date(todoDateInput.value + "T" + todoTimeInput.value),
        priority: todoPriorityInput.value
    }

    todoTasks.push(newTask)
    displayTasks()
    saveToLocalStorage()
    console.log(todoTasks)
}

function displayTasks(){
    todoList.innerHTML = ""
    todoTasks.forEach((todoTask, index) => {
        const h3 = document.createElement("h3")
        h3.innerHTML = todoTask.title
        
        const p = document.createElement("p")
        p.innerHTML = todoTask.description

        const li = document.createElement("li")
        li.append(h3,p)

        todoList.innerHTML += li.outerHTML
    });
}

function saveToLocalStorage(){
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks))
}

