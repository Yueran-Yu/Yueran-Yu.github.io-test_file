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

//点击这里负责改变 selectedListId
//用这里最新的 id 和display里面的list比较，就能给那个match的list 添加一个class
listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndDisplay();
    }
});


newListForm.addEventListener('submit', e => {
    e.preventDefault();
    let name = inputValue.value;
    if (name == null || name === '') return;

    const listItem = createList(name);
    inputValue.value = null;
    lists.push(listItem);
    saveAndDisplay();
});

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_CURRENT_LIST_ID, selectedListId);
}


function display() {
    clearElement(listsContainer);
    displayLists();


}

function displayLists() {
    lists.forEach(list => {
        const li = document.createElement('li');
        // 这里设置完ID, 然后下面那步判断 当前list是不是被选中的list
        li.dataset.listId = list.id;
        li.classList.add('list-name');
        li.innerText = list.name;

        // console.log("list.id: ", typeof(list.id));
        // console.log("selectedListId: ", typeof(selectedListId));

        if (list.id == selectedListId) {
            // console.log("here is inside");
            li.classList.add('active-list');

        }
        listsContainer.appendChild(li);
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