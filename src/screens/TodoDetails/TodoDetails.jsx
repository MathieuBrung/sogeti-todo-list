import React, { useState } from 'react';
import './TodoDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTodoState } from '../../reducer/reducers/todosReducer';
import Header from '../../components/Header/Header';

const TodoDetails = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const todo = useSelector(state => state.todos[taskId]);

    const [todoTitle, setTodoTitle] = useState(todo.title);
    const [todoDescription, setTodoDescription] = useState(todo.description);

    const [CSSClassBtn1, setCSSClassBtn1] = useState('button neumorphism');
    const [CSSClassBtn2, setCSSClassBtn2] = useState('button neumorphism');

    const navigate = useNavigate();

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
            default:
                break;
        }
    }

    const handleSave = () => {
        dispatch(updateTodoState({ id: todo.id, title: todoTitle, description: todoDescription, completed: false }));
        navigate(-1);
    }

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <Header />

            <div id='detailsContainer'>
                <div id='detailsInputsContainer' className='neumorphism'>
                    <input
                        type="text"
                        id='detailsTitle'
                        className="inputText neumorphismInset"
                        placeholder="Title..."
                        onChange={e => setTodoTitle(e.target.value)}
                        value={todoTitle}
                    />
                    <textarea
                        id='detailsDescription'
                        className="inputText neumorphismInset"
                        placeholder="Description of the task..."
                        onChange={e => setTodoDescription(e.target.value)}
                        value={todoDescription}
                    />
                </div>
                <div id='detailsButtonsContainer'>
                    <div
                        className={CSSClassBtn1}
                        onClick={() => handleCancel()}
                        onMouseDown={() => handleCSSClass(true, 1)}
                        onMouseUp={() => handleCSSClass(false, 1)}
                    >
                        <span>❌</span>
                        <span>Cancel</span>
                        <span>❌</span>
                    </div>
                    <div
                        className={CSSClassBtn2}
                        onClick={() => handleSave()}
                        onMouseDown={() => handleCSSClass(true, 2)}
                        onMouseUp={() => handleCSSClass(false, 2)}
                    >
                        <span>💾</span>
                        <span>Save</span>
                        <span>💾</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoDetails;