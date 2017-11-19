const todoList = document.querySelectorAll('.todo-list label');
const doneList = document.querySelector('.done');
const doneListItems = document.querySelectorAll('label');
const undoneList = document.querySelector('.undone');
const undoneListItems = undoneList.querySelectorAll('label');

for(const item of todoList) {
    item.addEventListener('click', moveToAnotherList);
}

function moveToAnotherList() {
    if(event.target.parentElement.classList.contains('done')){
        undoneList.appendChild(event.target);
    } else {
        doneList.appendChild(event.target);
    }
}