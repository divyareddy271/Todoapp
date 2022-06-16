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
    
    <input type="checkbox" ${task.done ? "checked" : " "} id="${task.id}" data-id="12" class="custom-checkbox">
    <label for=${task.id}>${task.text}</label>
    <img src="bin.jfif"  class="delete" data-id="${task.id}" />
    `;
    //onclick = {ToggleTask(${task.id})} 
    tasksList.append(li);
}
function renderList (text) {
    console.log(text)
    tasksList.innerHTML = " ";
 
    if(tasks.length<=0){
        displaynotask();
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
        renderList(add);
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
function handlealleventlistner(e){
    const target = e.target;
    console.log(target);
    if(target.className == "delete"){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className == "custom-checkbox"){
        const taskId = target.id;
        ToggleTask(taskId);
        return;
    }
}
function initialzeAPP(){
    document.addEventListener('click',handlealleventlistner)
    addTaskInput.addEventListener('keyup',Handleeventlistner)
}
initialzeAPP();