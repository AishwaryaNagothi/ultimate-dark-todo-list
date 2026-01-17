let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let theme = localStorage.getItem("theme") || "light";

if (theme === "dark") {
    document.body.classList.add("dark");
}

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `${task.priority} ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <span onclick="toggleTask(${index})">
                <strong>${task.text}</strong><br>
                <small>📅 ${task.dueDate || "No date"}</small>
            </span>
            <button onclick="deleteTask(${index})">✖</button>
        `;

        list.appendChild(li);
    });
}

// Add task
function addTask() {
    const text = document.getElementById("taskInput").value.trim();
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("dueDate").value;

    if (!text) return;

    tasks.push({
        text,
        priority,
        dueDate,
        completed: false
    });

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";

    saveTasks();
    displayTasks();
}

// Toggle completed
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Dark mode toggle
document.getElementById("toggleTheme").onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
};

// Due date reminder
function checkDueDates() {
    const today = new Date().toISOString().split("T")[0];

    tasks.forEach(task => {
        if (task.dueDate && task.dueDate < today && !task.completed) {
            alert(`⏰ Task Overdue: ${task.text}`);
        }
    });
}

checkDueDates();
displayTasks();
// 🫧 Random bubble animation
document.querySelectorAll(".bubbles span").forEach(bubble => {
  const size = Math.random() * 60 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;
});
