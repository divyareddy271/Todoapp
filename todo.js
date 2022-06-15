const tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');


function renderList () {
   // tasks.map((task) =>) 
}

function markTaskAsComplete (taskId) {
    const index = tasks.indexOf(taskId);
    tasks[index].done = true;
}

function deleteTask (taskId) {}

function addTask (task) {
    tasks.push(task);
    console.log(tasks.length);
    renderList();
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