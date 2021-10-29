
const addButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const inputBar = document.getElementById("input-task");

addButton.addEventListener('click', submitTaskInput);

inputBar.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        submitTaskInput();
    }
})

function submitTaskInput(){
    taskList.insertBefore(createTask(inputBar.value), taskList.firstChild);
    inputBar.value = '';
}

function createTask(text){
    let parser = new DOMParser();
    let html = parser.parseFromString(`
        <li>
            <div class="task-container">
                <input type="checkbox" class="checkbox">
                <span class="task-text">${text}</span>
            </div>
            <button class="delete-btn"></button>
        </li>`, 'text/html');

    let element = html.body.firstElementChild;
    let deleteButton = html.getElementsByClassName("delete-btn")[0];
    let checkBox = html.getElementsByClassName("checkbox")[0];
    let task = html.getElementsByClassName("task-text")[0];

    deleteButton.addEventListener('click', event => {
        taskList.removeChild(element)
    });

    checkBox.addEventListener('click', event => {
        element.classList.toggle('marked')
    });

    return element;
}