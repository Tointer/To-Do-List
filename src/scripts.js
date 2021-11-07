const taskList = document.getElementById("task-list");
const inputBar = document.getElementById("input-task");
const addBar = document.getElementById("add-bar");

import {createTask, initializeStartTasks} from './task-creator.js';

window.onload = () => initializeStartTasks(taskList);

addBar.addEventListener("submit", (e) => {
    e.preventDefault();
    submitTaskInput();
})


function submitTaskInput(){
    createTask(inputBar.value, taskList);
    inputBar.value = "";
}