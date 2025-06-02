const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filter');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function renderTodos() {
    list.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.onclick = () => toggleTodo(index);

        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑️';
        delBtn.onclick = () => deleteTodo(index);

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        todos.push({
            text,
            completed: false
        });
        input.value = '';
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

filters.forEach(btn => {
    btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

form.addEventListener('submit', addTodo);
renderTodos();