import { types, onSnapshot } from "mobx-state-tree";

const Todo = types
  .model({
    id: types.identifier,
    text: types.string,
    completed: false,
  })
  .actions(self => ({
    toggleCompletion() {
      self.completed = !self.completed;
    },
    setText(newText) {
      self.text = newText;
    },
  }));

const TodoList = types
  .model({
    todos: types.array(Todo),
    message: types.optional(types.string, ""),
  })
  .actions(self => ({
    addTodo(text) {
      if (text=== '') {
        self.message = 'Please Enter Something';
      }else if (self.todos.some(todo=>todo.text === text)) {
        self.message = 'Todo already exists';
        return;
      }
      const newTodo = Todo.create({
        id: String(Math.random()),
        text: text,
      });
      self.todos.push(newTodo);
      self.message = '';
    },
    toggleTodoCompletion(id) {
      const todo = self.todos.find(todo => todo.id === id);
      if (todo) {
        todo.toggleCompletion();
      }
    },
    downloadTodos() {
      const content = self.todos.map(item => item.text).join('\n');
      const uri = `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
      const link = document.createElement('a');
      link.href = uri;
      link.download = 'To-do-list.txt';
      link.click();
    },
    removeTodo(id) {
      self.todos.replace(self.todos.filter(todo => todo.id !== id));
    },
    updateTodoText(id, newText) {
      const todo = self.todos.find(todo => todo.id === id);
      if (todo) {
        todo.setText(newText);
      }
    },
    setMessage(message) {
      self.message = message;
    },
  }));

const store = TodoList.create({
  todos: [],
  message: '',
});

onSnapshot(store, snapshot => {
  console.log("Snapshot: ", snapshot);
});

export default store;
