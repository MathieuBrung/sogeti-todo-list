import { createSlice } from '@reduxjs/toolkit'

let hardCodedId = 1;

let hardCodedState = [
    {
        id: 0,
        title: '🎓 Get my bachelor degree',
        description: 'Bachelor degree in web and mobile development',
        completed: true
    },
    {
        id: 1,
        title: '💼 Get a job',
        description: 'Get a job in a nice company, in a nice project',
        completed: false
    }
]

let initialState = [];
let id = hardCodedId;

const storageTasks = JSON.parse(localStorage.getItem('tasks'));

if (storageTasks) {
    storageTasks.map(task => {
        initialState = [...initialState, task];
        if (task.id > id) {
            id = task.id;
        }
    });
} else {
    initialState = [...hardCodedState];
}

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