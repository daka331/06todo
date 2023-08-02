const list = document.getElementById('todos');
document.querySelector('button').addEventListener('click', handleClick);
document.addEventListener('DOMContentLoaded', loadTodos); // проверяем загружен ли полностью контент

function handleClick() {
    const newTodo = this.previousElementSibling.value.trim();

    if (newTodo) {
        createTodo(newTodo);
        saveToStorage(newTodo);
        this.previousElementSibling.value = '';
    } else {
        alert('input field is empty');
    }
}

function saveToStorage(todo) {
    const todos = JSON.parse(localStorage.getItem('tasks')) || []; // получаем текущее значение
    localStorage.setItem('tasks', JSON.stringify([...todos, todo])); // запиши значение по известному ключу
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('tasks'));

    if (todos) {
    todos.forEach(todo => createTodo(todo));
    }
}

function createTodo(text) {
    const li =  document.createElement('li');
    li.innerText = text;
    li.className = 'todo-item';
    li.addEventListener('click', removeTodo);
    list.append(li); // добавить элемент в конец дочернего элемента
}

function removeTodo() {

    this.removeEventListener('click', removeTodo);
    const text = this.innerText;
    const arr = JSON.parse(localStorage.getItem('tasks')) || [];
    const key = arr.indexOf(text);
    localStorage.removeItem(key);    
    this.remove();
}

