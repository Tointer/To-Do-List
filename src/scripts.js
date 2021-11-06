
const taskList = document.getElementById("task-list");
const inputBar = document.getElementById("input-task");
const addBar = document.getElementById("add-bar");

addBar.addEventListener("submit", (e) => {
    e.preventDefault();
    submitTaskInput();
})

function submitTaskInput(){
    let task = createTask(inputBar.value);
    addTaskBehaviours(task);

    taskList.insertBefore(task, taskList.firstChild);
    inputBar.value = "";
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
        </li>`, "text/html");

    return html.body.firstElementChild;
}

function addTaskBehaviours(element){
    let deleteButton = element.getElementsByClassName("delete-btn")[0];
    let checkBox = element.getElementsByClassName("checkbox")[0];

    deleteButton.addEventListener("click", event => {
        taskList.removeChild(element)
    });

    checkBox.addEventListener("click", event => {
        element.classList.toggle("marked")
    });
}