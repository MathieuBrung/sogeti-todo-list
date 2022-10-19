import React from 'react';
import Todo from '../TodoItem/TodoItem';

const TodoList = ({ todos }) => {

    const completedTodos = todos.filter(todo => todo.completed === true).sort((a, b) => { return b.id - a.id });
    const uncompletedTodos = todos.filter(todo => todo.completed === false).sort((a, b) => { return b.id - a.id });
    const sortedTodos = [...uncompletedTodos, ...completedTodos];

    return (
        <>
            {
                sortedTodos
                    .map(todo =>
                        <Todo todo={todo} key={todo.id} />
                    )
            }
        </>
    )
}

export default TodoList;