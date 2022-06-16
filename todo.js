let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter-span');
const span = document.getElementById('span');

console.log('Working');

function  addTasktoDOM(task){
    console.log(task)
    const li=document.createElement('li');
    li.innerHTML = `
    
    <input type="checkbox" ${task.done ? "checked" : " "} onclick = {ToggleTask(${task.id})} id="${task.id}" data-id="12" class="custom-checkbox">
    <label for=${task.id}>${task.text}</label>
    <img src="bin.jfif" onclick = {deleteTask(${task.id})} class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}
function renderList (text) {
    console.log(text)
    tasksList.innerHTML = " ";
    if(tasks.length<=0){
        span.innerHTML="No task to display!!"
    }
    else{
        span.innerHTML=""
    }
   for(let i=0;i<tasks.length;i++){
       addTasktoDOM(tasks[i])
   }
   tasksCounter.innerHTML = tasks.length;
}
function displaynotask() {
    const span = document.createElement("span");
    span.innerHTML="No Task to display!!"
    tasksList.append(span);
}
function ToggleTask(taskId) {
    const task = tasks.filter(function(task){
        return task.id == taskId;
    })
    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList("update");
        showNotification("updated the status successfuly")
        return;
    }
    showNotification("cannot toggle the task");
   // const index = tasks.indexOf(taskId);
    //tasks[index].done = !(tasks[index].done);
    
}

function deleteTask (taskId) {
    const newTask  = tasks.filter(function(task){
        return  task.id !=taskId ;
    })
    tasks = newTask;
    renderList("delete");
    showNotification("Task deleted successfuly")
}

function addTask (task) {
    if(task){
        tasks.push(task);
        console.log(tasks.length);
        renderList();
        showNotification("Task added successfuly")
        return;
    }
    showNotification("Task can not add")
}

function showNotification(text) {
    alert(text);
}
function Handleeventlistner(e) {
  
    if(e.key === "Enter"){
        const text = e.target.value;
        console.log(text);
        if(!text){
            showNotification("Task text cannot be empty")
            return;
        }
        const task =  {
            text,
            id : Date.now().toString(),
            done :false
        }
        addTask(task);
        e.target.value="";
    }
    
}
addTaskInput.addEventListener('keyup',Handleeventlistner)