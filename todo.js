let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter-span');
const span = document.getElementById('span');

console.log('Working');
// function fetchapi(){
//     //GET Request
//     fetch("https://jsonplaceholder.typicode.com/todos")
//     .then(function(response){
//         console.log(response)
//         return response.json();
//     }).then(function(data){
//         tasks = data.slice(0,10);
//         renderList();
//     })
    
// }
//convert to async and await
async function fetchapi(){
    //GET Request
   try{ const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    tasks = data.slice(190,203);
    renderList();  }
    catch(error){
        console.log(error);
    }
}
function  addTasktoDOM(task){
    console.log(task)
    const li=document.createElement('li');
    li.innerHTML = `
    
    <input type="checkbox" ${task.completed ? "checked" : " "} id="${task.id}" data-id="${task.id}" class="custom-checkbox">
    <label for=${task.id}>${task.title}</label>
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
        currentTask.completed = !currentTask.completed;
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
        //post request but this will not work
        fetch("https://jsonplaceholder.typicode.com/todos",{
            method:"POST",
            headers : {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(task)
            })
            .then(function(response){
                console.log(response)
                return response.json();
            }).then(function(data){
                console.log(data);
                tasks.push(task);
                renderList(add);
                showNotification("Task added successfuly")
            }).catch(function(error){
                console.log(error);
            })
        // tasks.push(task);
        // console.log(tasks.length);
        // renderList(add);
        // showNotification("Task added successfuly")
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
            title: text,
            id : Date.now().toString(),
            completed :false
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
    fetchapi();
    document.addEventListener('click',handlealleventlistner)
    addTaskInput.addEventListener('keyup',Handleeventlistner)
}
initialzeAPP();