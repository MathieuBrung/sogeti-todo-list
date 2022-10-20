import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './components/TodoList/TodoList';
import { addTodo, clearCompletedTasks, deleteAllTodo } from './reducer/reducers/todosReducer';
import Header from './components/Header/Header';

function App() {
    const dispatch = useDispatch();
    const getTodos = useSelector(state => state.todos);
    const todos = [...getTodos];

    const [showAddTodoWindow, setShowAddTodoWindow] = useState(false);
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');

    const [CSSClassBtn1, setCSSClassBtn1] = useState('button neumorphism');
    const [CSSClassBtn2, setCSSClassBtn2] = useState('button neumorphism');
    const [CSSClassBtn3, setCSSClassBtn3] = useState('button neumorphism');


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(todos));
    }, [getTodos])

    const handleAddTodo = () => {
        if (todoTitle === '') return;

        dispatch(addTodo({ title: todoTitle, description: todoDescription }));

        setTodoTitle('');
        setTodoDescription('');
        setShowAddTodoWindow(false);
    }

    const handleDeleteAllTodos = () => {
        if (!window.confirm('Are you sure you want to delete all tasks?')) return;
        dispatch(deleteAllTodo());
    }

    const handleClearCompletedTasks = () => {
        dispatch(clearCompletedTasks());
    }

    const handleCSSClass = (bool, btn) => {
        switch (btn) {
            case 1:
                if (bool) return setCSSClassBtn1('button neumorphismInset');
                return setCSSClassBtn1('button neumorphism');
                break;
            case 2:
                if (bool) return setCSSClassBtn2('button neumorphismInset');
                return setCSSClassBtn2('button neumorphism');
                break;
            case 3:
                if (bool) return setCSSClassBtn3('button neumorphismInset');
                return setCSSClassBtn3('button neumorphism');
                break;
            default:
                break;
        }
    }

    return (

        <div className="App">

            <Header />

            <div id='buttonsContainer'>
                <div
                    className={CSSClassBtn1}
                    onClick={() => setShowAddTodoWindow(!showAddTodoWindow)}
                    onMouseDown={() => handleCSSClass(true, 1)}
                    onMouseUp={() => handleCSSClass(false, 1)}
                >
                    {
                        showAddTodoWindow ?
                            <>
                                <span>❌</span>
                                <span>Cancel</span>
                                <span>❌</span>
                            </>
                            :
                            <>
                                <span>✍</span>
                                <span>Add a task</span>
                                <span>✍</span>
                            </>
                    }
                </div>
                <div
                    className={CSSClassBtn2}
                    onClick={() => handleClearCompletedTasks()}
                    onMouseDown={() => handleCSSClass(true, 2)}
                    onMouseUp={() => handleCSSClass(false, 2)}
                >
                    <span>🧹</span>
                    <span>Clear completed tasks</span>
                    <span>🧹</span>
                </div>
                <div
                    className={CSSClassBtn3}
                    onClick={() => handleDeleteAllTodos()}
                    onMouseDown={() => handleCSSClass(true, 3)}
                    onMouseUp={() => handleCSSClass(false, 3)}
                >
                    <span>🧺</span>
                    <span>Delete all tasks</span>
                    <span>🧺</span>
                </div>
            </div>

            {
                showAddTodoWindow ?
                    <div id='inputsContainer' className='neumorphism'>
                        <div className='inputsLeftContainer' >
                            <input
                                type="text"
                                id='addTodoTitleInput'
                                className="inputText addTodoInput neumorphismInset"
                                placeholder="Title..."
                                onChange={e => setTodoTitle(e.target.value)}
                                value={todoTitle}
                            />
                            <textarea
                                id='addTodoDescriptionInput'
                                className="inputText addTodoInput neumorphismInset"
                                placeholder="Description of the task..."
                                onChange={e => setTodoDescription(e.target.value)}
                                value={todoDescription}
                            />
                        </div>
                        <div className='inputsRightContainer' >
                            <span className='icon' onClick={() => handleAddTodo()}>➕</span>
                        </div>
                    </div>
                    : null
            }

            <div id='todoListContainer'>
                <TodoList todos={todos} />
            </div>
        </div >
    )
}

export default App