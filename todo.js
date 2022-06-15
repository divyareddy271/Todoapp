const tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function  addTasktoDOM(task){
    console.log(task)
    const li=document.createElement('li');
    li.innerHTML = `
    
    <input type="checkbox" ${task.done ? "checked" : " "} id="${task.id}" data-id="12" class="custom-checkbox">
    <label for=${task.id}>${task.text}</label>
    <img src="bin.jfif" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}
function renderList () {
    tasksList.innerHTML = " ";
   for(let i=0;i<tasks.length;i++){
       addTasktoDOM(tasks[i])
   }
   tasksCounter.innerHTML = tasks.length;
}

function ToggleTask(taskId) {
    const task = tasks.filter((task) => {
        return task.id === taskId;
    })
    if(task.length >0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification("updated the status successfuly")
        return;
    }
    showNotification("cannot toggle the task");
   // const index = tasks.indexOf(taskId);
    //tasks[index].done = !(tasks[index].done);
    
}

function deleteTask (taskId) {
    const newTaks  = tasks.filter(function(task){
        return taskId !== task.id;
    })
    tasks = newTaks;
    renderList();
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
            done : false
        }
        addTask(task);
        e.target.value="";
    }
    
}
addTaskInput.addEventListener('keyup',Handleeventlistner)