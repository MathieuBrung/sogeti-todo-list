import React, { useState } from 'react';
import './TodoItem.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateTodoState } from '../../reducer/reducers/todosReducer';

const TodoItem = ({ todo }) => {

    const [check, setCheck] = useState(todo.completed);
    const dispatch = useDispatch();

    const onToggle = () => {
        setCheck(!check);
        dispatch(updateTodoState({ id: todo.id, completed: !check }));
    };

    return (
        <div className={todo.completed ? 'mainContainer neumorphismInset blur' : 'mainContainer neumorphism'} >
            <div className='leftContainer'>
                <p>{todo.title}</p>
            </div>
            <div className='rightContainer'>
                <Link to={`/tasks/${todo.id}`}>🔎</Link>
                <input type='checkbox' checked={check} onChange={() => onToggle()} />
            </div>
        </div>
    )
}

export default TodoItem;