import * as storage from "./storage-module.js";

export function createTask(text, taskList){
    createTaskInternal(text, taskList);
    storage.addTask(text, false);
}

function addTaskBehaviours(element, taskList, text){
    let deleteButton = element.getElementsByClassName("delete-btn")[0];
    let checkBox = element.getElementsByClassName("checkbox")[0];

    deleteButton.addEventListener("click", event => {
        storage.removeTask(text);
        taskList.removeChild(element);
    });

    checkBox.addEventListener("click", event => {
        toggleTask(element);
        storage.toggleTask(text);
    });
}

function toggleTask(taskElement){
    taskElement.classList.toggle("marked");
}

function createTaskInternal(text, taskList, isChecked){
    let parser = new DOMParser();
    let html = parser.parseFromString(`
        <li>
            <div class="task-container">
                <input type="checkbox" class="checkbox">
                <span class="task-text">${text}</span>
            </div>
            <button class="delete-btn"></button>
        </li>`, "text/html");

    let finalTask = html.body.firstElementChild;
    addTaskBehaviours(finalTask, taskList, text);
    if(isChecked){
        toggleTask(finalTask);
        finalTask.getElementsByClassName("checkbox")[0].checked = true;
    }
    taskList.insertBefore(finalTask, taskList.firstChild);

    return finalTask;
}

export async function initializeStartTasks(taskList){
    await storage.moduleInited;
    let tasks = await storage.getAllTasks();

    for (const savedTask of tasks){
        createTaskInternal(savedTask.text, taskList, savedTask.isChecked)
    }
}
