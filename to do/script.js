document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
  
    // Function to add a new task to the list
    function addTask(event) {
      event.preventDefault();
      const taskText = taskInput.value.trim();
  
      if (taskText === "") return;
  
      const listItem = document.createElement("li");
      const taskLabel = document.createElement("span");
      const deleteBtn = document.createElement("button");
  
      taskLabel.textContent = taskText;
      deleteBtn.textContent = "X";
      deleteBtn.classList.add("delete-btn");
  
      listItem.appendChild(taskLabel);
      listItem.appendChild(deleteBtn);
      taskList.appendChild(listItem);
  
      taskInput.value = "";
      taskInput.focus();
  
      // Attach event listener to the delete button
      deleteBtn.addEventListener("click", deleteTask);
    }
  
    // Function to mark a task as completed
    function toggleCompleted() {
      this.classList.toggle("completed");
    }
  
    // Function to delete a task from the list
    function deleteTask() {
      this.parentNode.remove();
    }
  
    // Attach event listener to the form submission
    taskForm.addEventListener("submit", addTask);
  
    // Attach event listener to tasks for marking as completed
    taskList.addEventListener("click", function (event) {
      if (event.target.tagName === "SPAN") {
        toggleCompleted.call(event.target);
      }
    });
  
    // Attach event listener to the delete button
    taskList.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-btn")) {
        deleteTask.call(event.target);
      }
    });
  });
  