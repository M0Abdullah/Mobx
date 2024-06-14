import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Input, Space } from 'antd';
import { Radio } from 'antd';
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import store from '../Usecases/Store/usersecondstore'
import './Todo.css';


const Todolist = observer(() => {
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        store.addTodo(inputValue);
        setInputValue('');
    };

    return (
        <div>
            <div className="todo">
                Todo Functionality Using Mobx
            </div>
            <div className="todo_1">
                <div className="todo1">
                    <Space.Compact style={{ width: '90%' }}>
                        <Input
                            placeholder='Please Enter Something'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            maxLength={20}
                        />
                        <Button type="primary" onClick={addTodo}>Add</Button>
                    </Space.Compact>
                </div>
                <div className="todo2">
                    {store.todos.map((todo) => (
                        <ul key={todo.id}>
                            <Radio checked={todo.completed} onClick={() => store.toggleTodoCompletion(todo.id)}>
                                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                    {todo.text}
                                </span>
                            </Radio>
                            <MdDelete className='abd' onClick={() => store.removeTodo(todo.id)} />
                            <AiFillEdit className='abd1' onClick={() => store.updateTodoText(todo.id, prompt('Update todo:', todo.text) || todo.text)} />
                        </ul>
                    ))}
                </div>
                <div className="todo3">
                    {store.message}
                </div>
                <div className="todo4">
                    <Button icon={<FaDownload />}
                        onClick={store.downloadTodos}>Download Todos</Button>
                </div>
            </div>
        </div>
    );
});

export default Todolist;
