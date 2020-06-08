const inputValue = document.querySelector('[data-new-list-input]');
const newListForm = document.querySelector('[data-add-list-form]');
const listsContainer = document.querySelector('[data-task-list]');
const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_CURRENT_LIST_ID = "tasks.currentList";

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRENT_LIST_ID));

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



listsContainer.addEventListener('click', e => {
    let currentList = e.target.tagName.toLowerCase();
    if (currentList === 'li') {
        selectedListId = e.target.dataset.listId
    }
});


newListForm.addEventListener('submit', e => {
    e.preventDefault();
    let name = inputValue.value;
    if (name == null || name === '') return;

    const listItem = createList(name);
    inputValue.value = null;
    lists.push(listItem);
    console.log(lists);
    saveAndDisplay();

});

function displayList() {
    clearElement(listsContainer);
    lists.forEach(list => {
        const li = document.createElement('li');
        li.dataset.listId = list.id;
        li.classList.add('list-name');
        li.innerText = list.name;
        listsContainer.appendChild(li);
    });
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function saveAndDisplay() {
    save();
    displayList();
}

displayList();