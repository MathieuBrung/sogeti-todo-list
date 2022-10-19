import { createSlice } from '@reduxjs/toolkit'
import { db } from '../../db/db';

let id = 1;

let initialState = [
    {
        id: 0,
        title: 'Get my bachelor degree',
        description: 'Bachelor degree in web and mobile development',
        completed: true
    },
    {
        id: 1,
        title: 'Get a job',
        description: 'Get a job in a nice company, in a nice project',
        completed: false
    }
]

db.tasks?.toArray()
    .then(tasks => {
        tasks?.map(task => {
            if (task.id > id) {
                initialState = [...initialState, task];
            }
        })
    })
    .catch(e => console.log('Error : ', e));


db.tasks?.orderBy('id').delete();

initialState.forEach(todo => {
    db.tasks?.add({
        id: todo?.id,
        title: todo?.title,
        description: todo?.description,
        completed: todo?.completed
    });
});

export const todosSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            return [
                ...state,
                { id: ++id, completed: false, ...action.payload }
            ]
        },
        updateTodoState: (state, action) => {
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...todo, ...action.payload }
                } else {
                    return todo
                }
            })
        },
        clearCompletedTasks: (state) => {
            return state.filter(todo => todo.completed === false);
        },
        deleteAllTodo: () => {
            return []
        }
    }
})

export const { addTodo, updateTodoState, clearCompletedTasks, deleteAllTodo } = todosSlice.actions;

export default todosSlice.reducer;