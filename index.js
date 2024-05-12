let taskCount = 0;
let doneCount = 0;
let taskHeadingVisible = false;
let doneHeadingVisible = false;

document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
    const input = document.getElementById("taskInput").value.trim();
    if (input === "") {
        alert("Please enter a task!");
        return;
    }
    const ul = document.getElementById("taskList");
    const li = document.createElement("li");
    const taskText = document.createTextNode(input); 
    li.appendChild(taskText);

    const markDoneBtn = document.createElement("button");
    markDoneBtn.innerHTML = "<i class='fas fa-check'></i>";
    markDoneBtn.addEventListener("click", function() {
        markDone(li);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    deleteBtn.addEventListener("click", function() {
        deleteTask(li);
    });

    li.appendChild(markDoneBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    updateTaskHeading(++taskCount);
    document.getElementById("taskInput").value = "";

    if (!taskHeadingVisible) {
        const taskHeading = document.getElementById("taskHeading");
        taskHeading.style.display = "block";
        taskHeadingVisible = true;
    }
}

function updateTaskHeading(count) {
    const taskHeading = document.getElementById("taskHeading");
    taskHeading.textContent = `Task - ${count}`;
    taskHeading.style.display = count > 0 ? "block" : "none";
}

function markDone(task) {
    const doneList = document.getElementById("doneList");
    const doneTitle = document.getElementById("doneTitle");
    const taskText = task.firstChild.textContent;
    const originalTaskText = taskText.trim(); 
    const doneText = document.createTextNode(originalTaskText);
    const doneLi = document.createElement("li");
    doneLi.appendChild(doneText);
    doneLi.classList.add("done");
    const undoBtn = document.createElement("button");
    undoBtn.innerHTML = "<i class='fas fa-undo'></i>";
    undoBtn.addEventListener("click", function() {
        undoTask(doneLi, originalTaskText); 
    });
    doneLi.appendChild(undoBtn);
    doneList.appendChild(doneLi);
    task.style.display = "none";
    if (!doneTitle.style.display) {
        doneTitle.style.display = "block"; 
    }
    updateDoneHeading(++doneCount); 
    updateTaskHeading(--taskCount); 
}

function deleteTask(task) {
    task.remove();
    updateTaskHeading(--taskCount); 
    if (taskCount === 0) {
        const taskHeading = document.getElementById("taskHeading");
        taskHeading.style.display = "none";
        taskHeadingVisible = false;
    }
}

function undoTask(task, originalText) {
    const ul = document.getElementById("taskList");
    const li = document.createElement("li");
    const taskTextEl = document.createTextNode(originalText);
    li.appendChild(taskTextEl);

    const markDoneBtn = document.createElement("button");
    markDoneBtn.innerHTML = "<i class='fas fa-check'></i>";
    markDoneBtn.addEventListener("click", function() {
        markDone(li);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    deleteBtn.addEventListener("click", function() {
        deleteTask(li);
    });

    li.appendChild(markDoneBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    task.remove();
    updateTaskHeading(++taskCount); 
    updateDoneHeading(--doneCount); 
}

function updateDoneHeading(count) {
    const doneTitle = document.getElementById("doneTitle");
    doneTitle.textContent = `Done - ${count}`;
    doneTitle.style.display = count > 0 ? "block" : "none"; 
}
