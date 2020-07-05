const listName = document.querySelector('[data-new-list-input]');
const newListForm = document.querySelector('[data-add-list-form]');
const listsContainer = document.querySelector('[data-task-list]');
const listTitle = document.querySelector('[data-list-title]');
const tasksCount = document.querySelector('[data-list-count]');
const tasksDisplayBoard = document.querySelector('[data-tasks-board]');
const tasksContainer = document.querySelector('[data-tasks-container]');
const newTaskForm = document.querySelector('[data-new-task]');
const taskName = document.querySelector('[data-task-input]');
const taskTemplate = document.getElementById('task-template');
const deleteListButton = document.querySelector('[data-delete-list]');
const deleteTaskButton = document.querySelector('[data-delete-task]');

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_CURRENT_LIST_ID = "tasks.currentList";

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
// let selectedListId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRENT_LIST_ID));
let selectedListId = localStorage.getItem(LOCAL_STORAGE_CURRENT_LIST_ID);

function createList(name) {
    return {
        id: Date.now().toString(),
        name: name,
        tasks: []
    }
}

function createTask(name) {
    return {
        id: Date.now().toString(),
        name: name,
        completed: false
    }
}

deleteListButton.addEventListener('click', e => {
    if (selectedListId) {
        lists = lists.filter(list => list.id !== selectedListId);
        selectedListId = null;
        saveAndDisplay();
    }
});

deleteTaskButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId);
    //相比于Delete list，这里不需要设置null的值，selectedListId之所以需要设置null，因为需要删除当前list的所有 关联属性，包括active
    //这里是 给当前selectedList.tasks重新赋值，这样task表展示的就是 未完成的  task
    selectedList.tasks = selectedList.tasks.filter(task => !task.completed);
    saveAndDisplay();
});

//点击这里负责改变 selectedListId
//用这里最新的 id 和display里面的list比较，就能给那个match的list 添加一个class
listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndDisplay();
    }
});

// 这里非常不熟悉！！！！！！！验证checked
tasksContainer.addEventListener('change', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        selectedTask.completed = e.target.checked;
    }
});

newListForm.addEventListener('submit', e => {
    e.preventDefault();
    let name = listName.value;
    if (name == null || name === '') return;

    const listItem = createList(name);
    listName.value = null;
    lists.push(listItem);
    saveAndDisplay();
});

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    let name = taskName.value;
    if (name == null || name === '') {
        return;
    }
    const taskItem = createTask(name);
    taskName.value = null;
    let selectedList = lists.find(list => list.id == selectedListId);
    selectedList.tasks.push(taskItem);
    saveAndDisplay();

});

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_CURRENT_LIST_ID, selectedListId);
}


function display() {
    clearElement(listsContainer);
    displayLists();
    const selectedList = lists.find(li => li.id == selectedListId);
    if (selectedListId != null) {
        tasksDisplayBoard.style.display = '';
        listTitle.innerText = selectedList.name;
        clearElement(tasksContainer);
        displayTasksCount(selectedList);
        displayTasks(selectedList);
    } else {
        tasksDisplayBoard.style.display = 'none';
    }
}

function displayLists() {
    lists.forEach(list => {
        const li = document.createElement('li');
        // 这里设置完ID, 然后下面那步判断 当前list是不是被选中的list
        li.dataset.listId = list.id;
        li.classList.add('list-name');
        li.innerText = list.name;

        if (list.id === selectedListId) {
            li.classList.add('active-list');
        }
        listsContainer.appendChild(li);
    });
}


function displayTasksCount(selectedList) {
    let remainingTaskslength = selectedList.tasks.filter(task => !task.completed).length;
    let taskString = remainingTaskslength === 1 ? "task" : "tasks";
    console.log(remainingTaskslength);
    tasksCount.innerText = `${remainingTaskslength} ${taskString} remaining`;
}

function displayTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const taskCheckbox = taskElement.querySelector('input');
        taskCheckbox.id = task.id;
        taskCheckbox.checked = task.completed;

        //label 会做特殊处理
        const label = taskElement.querySelector('label');
        //不加label的labelFor也没关系，label append已经可以把 name添加到相应的 label里去了
        label.htmlFor = task.id;
        label.append(task.name);
        tasksContainer.appendChild(taskElement);
    });
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function saveAndDisplay() {
    save();
    display();
}

display();