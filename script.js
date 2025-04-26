const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add task when button is clicked or Enter key is pressed
function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        
        // Create delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // '×' symbol
        li.appendChild(span);
        
        listContainer.appendChild(li);
        inputBox.value = '';
        saveData();
    }
}

// Add task when Enter key is pressed
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Handle clicks on tasks (complete/delete)
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save tasks to local storage
function saveData() {
    localStorage.setItem("todoData", listContainer.innerHTML);
}

// Load tasks from local storage when page loads
function loadTasks() {
    const savedData = localStorage.getItem("todoData");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

// Initialize the app
loadTasks();