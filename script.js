// add variables

const textArea = document.getElementById("placeNewTask");
const buttonNewTask = document.getElementById("btnNewTask");
const listGroup = document.getElementById("list");
const listElement = document.getElementsByClassName("element-list");
const buttonDeleteTask = document.getElementsByClassName("btn-close");
const STORAGE_KEY = 'tasks'

// add new task

function renderTask(text) {
        
        const newLi = document.createElement('li');
        newLi.classList.add("element-list");

        const newTaskText = document.createElement('a');
        newTaskText.setAttribute("href" , '#!')
        newTaskText.classList.add('task-text');
         newTaskText.textContent = text;

        const bntDelete = document.createElement('button');
        bntDelete.classList.add('btn-close');
        bntDelete.setAttribute('aria-label', 'Close')

        newLi.appendChild(newTaskText);
        newLi.appendChild(bntDelete);

        listGroup.appendChild(newLi)

}

    buttonNewTask.addEventListener ('click', (event) => {
        
        const text = textArea.value.trim();
        event.preventDefault()
        
        if (!text) return;
        
            renderTask(text);

            const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; 
            tasks.push(text);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

            textArea.value = "";
    });

// delete new tasks

listGroup.addEventListener("click", (event) => {
    event.preventDefault();
   
const btn = event.target.classList.contains('btn-close');
   
    if (!btn) return;

   
    const li = event.target.closest('li');
    if (!li) return;

    const taskText = li.querySelector('.task-text').textContent;

    
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    const index = tasks.indexOf(taskText);
    if(index > -1 ){
        tasks.splice(index, 1)

        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }

    li.remove();
});

// local storage 


window.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; 
    savedTasks.forEach(task => renderTask(task))

});
