/*这个人考虑方法是根据每个 event   去分析，  每个点击事件需要产生什么效果
比如：deleteItem()这个方法需要考虑
①点击当前按钮，删除container里的article element
②删除完 一个 article element  需要提示用户，“已删除”
③删除完了还需要考虑什么细节呢？？？  还有检查 clear button需不需要清除掉，contianer list 的length === 0 就需要清除掉 clear button
④清除掉 clear button后呢？？？ 需要恢复默认设置，暂时没想通必要性
⑤清除 localStorage的元素
*/



// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.querySelector('#grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement
let editFlag = false
let editId = ""


// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem)

// clear all items
clearBtn.addEventListener('click', clearItems)

//load items
window.addEventListener('DOMContentLoaded', setupItems)

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault()
    const value = grocery.value
    const id = new Date().getTime().toString()

    // 有三种情况，①全新的值，②编辑的值，③空值   全新值和修改值 都需要模板来保存 值
    if (value && !editFlag) {

createListItem(id, value)

        container.classList.add('show-container')
        addToLocalStorage(id, value)
        //set back to default
        setBackToDefault()
        displayAlert('Item added Successfully', 'success')

    } else if (value && editFlag) {
        // console.log("edit item existed in the list")
        editElement.innerHTML = value
        displayAlert('Content Changed Successfully', 'success')
        //edit local storage
        editLocalStorage(editId, value)
        setBackToDefault()
    } else {
        displayAlert('Empty value', 'danger')
    }
}

// 清理按钮 无论是在”新建“，还是“编辑”状态
function clearItems() {
    // clear all article elements in the grocery-list
    const allItems = document.querySelectorAll('.grocery-item')
    if (allItems.length > 0) {
        allItems.forEach(item => {
            list.removeChild(item)
        })
    }
    container.classList.remove('show-container')
    displayAlert('Empty list', 'danger')
    localStorage.removeItem("list")
}

// displayAlert 报错提示代码 重复度高
function displayAlert(text, action) {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)
    setTimeout((() => {
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`)
    }), 1000)
}

// delete function
function deleteItem(e) {
    console.log('delete item.')
    const deleteItem = e.currentTarget.parentElement.parentElement
    const id = deleteItem.dataset.id

    list.removeChild(deleteItem)
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert('item remove', 'danger')
    setBackToDefault()
    // remove from lcoal storage
    removeFormLocalStorage(id)
}


// edit function
function editItem(e) {
    console.log('edit item.')
    const editItem = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // console.log(editElement.innerHTML)

    // set form value
    grocery.value = editElement.innerHTML
    editFlag = true
    editId = editItem.dataset.id
    submitBtn.textContent = "edit"
}

// set back to default
function setBackToDefault() {
    grocery.value = ''
    editFlag = false
    editId = ''
    submitBtn.textContent = 'submit'
    console.log('set back to default')
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    // console.log('add to local storage')
    const grocery = { id, value }
    let items = getLocalStorage()
    items.push(grocery)

    // save value to the local storage
    localStorage.setItem("lists", JSON.stringify(items))
}

function editLocalStorage(editID, value) {
    let items = getLocalStorage()
    items = items.map(function (item) {
        if (item.id === editID) {
            item.value = value
        }
        return item
    })
    localStorage.setItem("lists", JSON.stringify(items))
}

function removeFormLocalStorage(id) {
    let items = getLocalStorage()
    items = items.filter(item => item.id !== id)
    // save value to the local storage
    localStorage.setItem("lists", JSON.stringify(items))
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem("lists")) || []
}


//localStorage API
// setItem
// getItem
// removeItem
// save as strings
// localStorage.setItem("orange", JSON.stringify(["item1","item2"]))
// const localS = JSON.parse(localStorage.getItem("orange"))
// console.log(localS)
// localStorage.removeItem("orange")

// ****** SETUP ITEMS **********

function setupItems() {
    let items = getLocalStorage()
    if (items.length > 0) {
        items.forEach(item =>{
            createListItem(item.id, item.value)
        })
    }
    container.classList.add('show-container')
}

function createListItem(id, value){
    const listItem = document.createElement("article")
    let attr = document.createAttribute('data-id')
    attr.value = id
    listItem.setAttributeNode(attr)
    listItem.classList.add('grocery-item')
    listItem.innerHTML = `<p class="title">${value}</p>
                            <div class="btn-container">
                            <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                            </button>
                            <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                            </button>
                            </div>`


    const deleteBtn = listItem.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", deleteItem)
    const editBtn = listItem.querySelector(".edit-btn")
    editBtn.addEventListener("click", editItem)
    list.appendChild(listItem)
}