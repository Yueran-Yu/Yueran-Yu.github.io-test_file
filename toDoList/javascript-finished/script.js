/*
    记住：每点击一个控件，就得调用 save 和  render
    save 是 改变更新最新的值的，  render 是展示最新数据的页面的
    所以点击控件，必须要这两个方法一起使用
*/



// 1 create a empty list variable to hold our list
// need to add a set of square brackets to get all the items in the list
const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newFormInput = document.querySelector('[data-new-list-input]');
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'tasks.selectedListId';
const deleteListButton = document.querySelector('[data-delete-list-button]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const clearCompletedTaskButton = document.querySelector('[data-clear-completed-tasks-button]');


// let lists = [{ id: 1, name: 'name' }, { id: 2, name: 'fucntion' }]
// get the information from the local storage using this key
// if it exists, parse it into an object, because it's just a string right now
// if it not, set the lists to []
// 这里是初始化 lists
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

// the value below is null
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);



listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        //set the selectedlistId value to current item id
        selectedListId = e.target.dataset.listId
            // after reset the value of selectedListId, when refresh the webpage
            // the selected value will be changed to the latest selection
            // 每点击一次，就需要刷新一次， 所以必须在这个 event listener里调用 save 和 render 都是刷新页面的
            // save function  的功能, 在次强调，是更新local storage的值的
        saveAndRender();

    }
});


tasksContainer.addEventListener('change', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        //set the selectedlistId value to current item id
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);

        // the complete is true or false depending on if the checkbox checked or not
        selectedTask.complete = e.target.checked;

        save();
        renderTaskCount(selectedList);
    }
});

deleteListButton.addEventListener('click', e => {
    // 现在的一切都是针对 local storage 来操作的，因为 lists和 selectedListId 都是储存在 local storage里的
    // exclude the item which the id equals to the selected item id
    lists = lists.filter(list => list.id !== selectedListId);
    //清空local storge 的 selectedListId 的值
    selectedListId = null;
    saveAndRender();
});

clearCompletedTaskButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    saveAndRender();
});




// every time you type something in the input box and then submit it
// it will triger the save function, save list to local storage
newListForm.addEventListener('submit', e => {
    e.preventDefault();
    let listName = newFormInput.value;
    // if the list has nothing entered, just return nothing to jump out of this event
    if (listName == null || listName === '')
        return
    const newListItem = createList(listName);
    // setting the value of newFormInput to null, clear the input box
    newFormInput.value = null;

    // 这里更新 lists
    lists.push(newListItem);

    // then refresh the list by calling render function again
    // so that the the new 'li' will be created
    saveAndRender();

});

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    let taskName = newTaskInput.value;
    // if the list has nothing entered, just return nothing to jump out of this event
    if (taskName == null || taskName === '')
        return
    const newTaskItem = createTask(taskName);
    // setting the value of newFormInput to null, clear the input box
    newTaskInput.value = null;
    const selectedList = lists.find(list => list.id === selectedListId);
    // 这里更新 lists
    selectedList.tasks.push(newTaskItem);

    // then refresh the list and tasks by calling render function again
    // so that the the new 'li' will be created
    saveAndRender();
});




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
        complete: false
    }
}

function saveAndRender() {
    render();
    save();
}


function save() {
    // save list to local storage, key-value pair
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    // save the selected item to the local storage
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}


function render() {
    // always clean first and change the list
    clearElement(listsContainer);
    renderLists();

    // 找到选中的 list，然后将名字显示在右边的白板上
    const selectedList = lists.find(list => list.id === selectedListId);
    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.name;
        renderTaskCount(selectedList);
        clearElement(tasksContainer);
        renderTasks(selectedList);
    }
}

function renderTaskCount(selectedList) {
    // 拿到selectedlist 的tasks数组的数据，将没有完成的task都提取出来
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length;
    const taskString = incompleteTasksCount === 1 ? "task" : "tasks"
    listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`
}


/* 在建立了task展示页以后, 有三个关联的控件需要相应 task的变化
一，input 更新的页面
二，清理tasks 的 clear button
三，记录remaining的 状态栏
*/
function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        /*the Document object's importNode() method creates a copy of a Node or DocumentFragment from another document,
         to be inserted into the current document later. The imported node is not yet included in the document tree.
         To include it, you need to call an insertion method such as appendChild() or insertBefore with a node that is currently
         in the duoment tree.
         */
        // 'true' will render everything inside this template
        // this is a copy of task template
        // this is a copy of task template
        // this is a copy of task template
        const taskElement = document.importNode(taskTemplate.content, true);
        const taskCheckbox = taskElement.querySelector('input');
        taskCheckbox.id = task.id;
        taskCheckbox.checked = task.complete;

        // label is the place to display the task
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);
        tasksContainer.appendChild(taskElement);
    });
}



function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement('li');

        //use dataset to add new attribute to the list
        listElement.dataset.listId = list.id;

        // add a class name to the current list item
        //这个 classList.add()
        listElement.classList.add('list-name');
        listElement.innerText = list.name;

        // here to set the effect(bold, white)to the select item
        if (list.id === selectedListId) {
            listElement.classList.add('active-list');
        }
        listsContainer.appendChild(listElement);
    });

}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

render();