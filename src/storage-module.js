
let db;
const tasksDBName = "tasks_db";

let deffered;
export let moduleInited = new Promise(function (resolve, reject) {
    deffered = {resolve: resolve, reject: reject};
});


function openDatabase() {
    let request = window.indexedDB.open(tasksDBName, 1);

    request.onerror = function() {
        console.log("Database failed to open");
    };

    request.onsuccess = function() {
        db = request.result;
        deffered.resolve();
    }

    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        let objectStore = db.createObjectStore(tasksDBName, { keyPath: 'text', autoIncrement:true });

        objectStore.createIndex("text", "text", { unique: false });
        objectStore.createIndex("isChecked", "isChecked", { unique: false });

        deffered.resolve();

        console.log('Database setup complete ' + db);
    };
}
openDatabase();

export async function getAllTasks(){
    let objectStore = db.transaction(tasksDBName).objectStore(tasksDBName);

    console.log("getAllTasks");
    let result = [];
    await new Promise(function (resolve, reject){
        let getAll = objectStore.getAll();
        getAll.onsuccess = (e) => {
            console.log("getAllTasks done");
            result = e.target.result
            resolve();
        };
        getAll.onerror = reject;
    })

    //yield {text: cursor.value.text, isChecked: cursor.value.isChecked};
    console.log(result);
    return result;

}

export async function addTask(text, isChecked){
    let newItem = { text: text, isChecked: isChecked };
    let transaction = db.transaction([tasksDBName], "readwrite")
    let objectStore = transaction.objectStore(tasksDBName);

    let request = objectStore.add(newItem);
    request.onsuccess = function() {
        console.log(`${text.substr(0, Math.max(15, text.length))} task add start`)
    };

    transaction.oncomplete = function() {
        console.log(`${text.substr(0, Math.max(15, text.length))} task add finish`)
    };
}

export async function removeTask(taskText){
    let transaction = db.transaction([tasksDBName], "readwrite")
    let objectStore = transaction.objectStore(tasksDBName);
    let request = objectStore.delete(taskText);
}

export async function toggleTask(taskText){
    let transaction = db.transaction([tasksDBName], "readwrite")
    let objectStore = transaction.objectStore(tasksDBName);
    let request = objectStore.get(taskText);

    request.onsuccess = function(event){
        console.log("toggle success");
        let data = event.target.result;
        data.isChecked = !data.isChecked;

        objectStore.put(data);
    }
}

export async function getTask(taskText){
    let transaction = db.transaction([tasksDBName], "readwrite")
    let objectStore = transaction.objectStore(tasksDBName);
    let result;

    await new Promise(function (resolve, reject){
        let request = objectStore.get(taskText);
        request.onsuccess = function(event){
            console.log("toggle success");
            result = event.target.result;
            resolve();
        }
    })

    return result;
}