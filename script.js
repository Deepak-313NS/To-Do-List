//Selectors 

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions

function addTodo(event) {

    //prevent form from submitting

    event.preventDefault();

    // todo div

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");


    //create LI

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to LocalStorage

    saveLocalTodos(todoInput.value);


    //checkmark button

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);


    //check trash button 

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    //append to list

    todoList.appendChild(todoDiv);

    //clear todo input value aftre enter

    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //delete the todo

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });

    }

    // check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";

                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                    document.body.style.backgroundImage = "url('https://img.freepik.com/free-photo/man-jumping-impossible-possible-cliff-sunset-background-business-concept-idea_1323-266.jpg?size=626&ext=jpg')";

                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });

}
function saveLocalTodos(todo) {
    // check ki we already have something in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    } (todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
