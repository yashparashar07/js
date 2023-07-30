class Task {
    constructor(id, name, dueDate, priority, project, completed = false) {
      this.id = id;
      this.name = name;
      this.dueDate = dueDate;
      this.priority = priority;
      this.project = project;
      this.completed = completed;
    }
  }
  
  let tasks = [];
  
  function addTask() {
    const taskNameInput = document.getElementById('taskNameInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const projectSelect = document.getElementById('projectSelect');
  
    const taskName = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;
    const project = projectSelect.value;
  
    if (taskName === '') {
      alert('Please enter a valid task name!');
      return;
    }
  
    const taskId = Date.now();
    const task = new Task(taskId, taskName, dueDate, priority, project);
    tasks.push(task);
  
    taskNameInput.value = '';
    dueDateInput.value = '';
    prioritySelect.selectedIndex = 0;
  
    saveTasksToLocalStorage();
    displayTasks();
  }
  
  function displayTasks() {
    const projectFilter = document.getElementById('projectFilter');
    const selectedProject = projectFilter.value;
  
    const taskListDiv = document.getElementById('taskList');
    taskListDiv.innerHTML = '';
  
    const tasksToShow = selectedProject === 'all'
      ? tasks
      : tasks.filter(task => task.project === selectedProject);
  
    tasksToShow.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
  
      const taskName = document.createElement('h3');
      taskName.innerText = task.name;
  
      const dueDate = document.createElement('p');
      dueDate.innerText = `Due Date: ${task.dueDate}`;
  
      const priority = document.createElement('p');
      priority.innerText = `Priority: ${task.priority}`;
  
      const completedCheckbox = document.createElement('input');
      completedCheckbox.type = 'checkbox';
      completedCheckbox.checked = task.completed;
      completedCheckbox.onchange = () => {
        task.completed = completedCheckbox.checked;
        saveTasksToLocalStorage();
        displayTasks();
      };
  
      const completedLabel = document.createElement('label');
      completedLabel.innerText = 'Completed';
      completedLabel.appendChild(completedCheckbox);
  
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.onclick = () => editTask(task);
  
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.onclick = () => deleteTask(task);
  
      taskItem.appendChild(taskName);
      taskItem.appendChild(dueDate);
      taskItem.appendChild(priority);
      taskItem.appendChild(completedLabel);
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);
  
      taskListDiv.appendChild(taskItem);
    });
  }
  
  function editTask(task) {
    const taskNameInput = document.getElementById('taskNameInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const projectSelect = document.getElementById('projectSelect');
  
    taskNameInput.value = task.name;
    dueDateInput.value = task.dueDate;
    prioritySelect.value = task.priority;
    projectSelect.value = task.project;
  
    deleteTask(task);
  }
  
  function deleteTask(task) {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasksToLocalStorage();
    displayTasks();
  }
  
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      tasks = JSON.parse(savedTasks).map(task => new Task(task.id, task.name, task.dueDate, task.priority, task.project, task.completed));
    }
  }
  
  function addProjectsToDropdown() {
    const projectFilter = document.getElementById('projectFilter');
    const projects = tasks.map(task => task.project);
    const uniqueProjects = [...new Set(projects)];
  
    uniqueProjects.forEach(project => {
      const option = document.createElement('option');
      option.value = project;
      option.innerText = project;
      projectFilter.appendChild(option);
    });
  }
  
  loadTasksFromLocalStorage();
  addProjectsToDropdown();
  displayTasks();
  