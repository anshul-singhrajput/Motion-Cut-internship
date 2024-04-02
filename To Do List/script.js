// Select elements from the DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage if available
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ""; // Clear the task list
    savedTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span class="task-text">${task.text}</span>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
           

        `;
        if (task.completed) {
            listItem.classList.add("completed");
        }
        taskList.appendChild(listItem);
    });
}

// Add a new task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        savedTasks.push({ text: taskText, completed: false });
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        taskInput.value = "";
        renderTasks();
    }
});

// Edit or Delete a task
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
        const index = event.target.dataset.index;
        const updatedText = prompt("Edit task:", savedTasks[index].text);
        if (updatedText !== null) {
            savedTasks[index].text = updatedText;
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            renderTasks();
        }
    } else if (event.target.classList.contains("delete-btn")) {
        const index = event.target.dataset.index;
        savedTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        renderTasks();
    }
});

// Mark a task as completed or uncompleted using checkboxes
// taskList.addEventListener("change", (event) => {
//     if (event.target.classList.contains("task-checkbox")) {
//         const index = event.target.parentElement.dataset.index;
//         savedTasks[index].completed = event.target.checked;
//         localStorage.setItem("tasks", JSON.stringify(savedTasks));
//         renderTasks();
//     }
// });

// Add this event listener to handle checkbox changes
taskList.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
        const taskText = event.target.parentElement.querySelector(".task-text");
        
        if (event.target.checked) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "#888";
        } else {
            taskText.style.textDecoration = "none";
            taskText.style.color = "#000"; // Change this to the desired text color
        }
    }
});


// Initial rendering of tasks
renderTasks();
