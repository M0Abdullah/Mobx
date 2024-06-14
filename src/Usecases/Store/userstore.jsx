import { makeAutoObservable } from "mobx";

class TodoStore {
  todos = [];
  message = '';

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = (text) => {
    if (text === '') {
      this.message = 'Please Enter Something';
      return;
    }
    this.todos.push({ id: Math.random(), text, completed: false });
    this.message = '';
  };

  removeTodo = (id) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  };

  downloadTodos = () => {
    const content = this.todos.map(item => item.text).join('\n');
    const uri = `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
    const link = document.createElement('a');
    link.href = uri;
    link.download = 'To-do-list.txt';
    link.click();
  };

  updateTodoText = (id, newText) => {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.text = newText;
    }
  };

  toggleTodoCompletion = (id) => {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  setMessage = (message) => {
    this.message = message;
  };
}

const store = new TodoStore();
export default store;
