import './style.css';

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener("submit", event => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
})
const todos = [
  {
    text: 'je suis une todo',
    done: false,
    editMode: false
  },
  {
    text: 'faire du javascript',
    done: true,
    editMode: false
  }
]

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode){
      return createEditMode(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  })
  ul.innerHTML = "";
  ul.append(...todosNode);
}

const createTodoElement = (todo, index) => {
  const li = document.createElement('li');
  const buttonDelete = document.createElement('button');
  buttonDelete.innerHTML = 'Supprimer';
  buttonDelete.classList.add("danger");
  buttonDelete.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteTodo(index);
  })
  const buttonEdit = document.createElement('button');
  buttonEdit.innerHTML = 'Edit';
  buttonEdit.classList.add("primary");
  buttonEdit.addEventListener('click', event => {
    event.stopPropagation();
    toggleEditeMode(index);
  })
  li.innerHTML = `
  <span class="todo ${todo.done ? 'done': ''}"></span>
  <p class="${todo.done ? 'done': ''}">${todo.text}</p>
  `;
  li.addEventListener('click', (event) => {
    toggleTodo(index);
  })
  li.append(buttonEdit, buttonDelete)
  return li;
}

const createEditMode = (todo, index) => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;
  const buttonSave = document.createElement('button');
  buttonSave.innerHTML = 'Save';
  buttonSave.classList.add("success");
  const buttonCancel = document.createElement('button');
   buttonCancel.innerHTML = 'Cancel';
   buttonCancel.classList.add("danger");
  buttonCancel.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleEditeMode(index);
   })
   buttonSave.addEventListener('click', event => {
    editTodo(index, input);
   })
   li.append(input, buttonCancel, buttonSave);
   return li;
}

const addTodo = (text) => {
  text = text.trim(); 
  if(text){
  todos.push({
    text: `${text[0].toUpperCase()}${text.slice(1)}`,
    done: false
  });
}
  displayTodo();
}

const deleteTodo = (index) => {
  todos.splice(index, 1); 
  displayTodo();
}

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
} 

const toggleEditeMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
}

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
}

displayTodo();