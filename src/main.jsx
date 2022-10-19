import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './reducer/store';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './screens/ErrorPage';
import TodoDetails from './screens/TodoDetails/TodoDetails';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "tasks/:taskId",
        element: <TodoDetails />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} basename='/sogeti-todo-list' />
        </Provider>
    </React.StrictMode>
)
