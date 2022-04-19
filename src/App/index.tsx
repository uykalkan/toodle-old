import React, {useContext, useEffect, useState} from 'react';
import TodoTable from "../components/TodoTable";
import {Button, Card} from "antd";
import TodoSave from "../components/TodoSave";
import {AppContext} from "../providers/AppProvider";
import FixedModal from "../components/FixedModal";
import {Todo} from "../types/Todo";

export interface AppProps {

}

const App: React.FC<AppProps> = () => {
    const [createTodoScreenIsVisible, setCreateTodoScreenIsVisible] = useState(false);
    const {setTodos, todos} = useContext(AppContext)
    const [selectedTodo, setSelectedTodo] = useState<Todo>();

    const onFinishSave = (todo: { title: string, priority: number }) => {

        if (selectedTodo) {
            let foundTodoIndex = todos.findIndex(x => x.id === selectedTodo.id)
            if (foundTodoIndex > -1) {
                setTodos([]) // TODO: antdtable re-render problemi quick fix

                todos[foundTodoIndex].priority = todo.priority
                todos[foundTodoIndex].title = todo.title
                setTimeout(() => {
                    setTodos([...todos])
                }, 1)
            }
        } else {
            setTodos([...todos, {
                ...todo,
                priority: todo.priority,
                id: Math.round(Date.now() + Math.random())
            }])
        }

        setCreateTodoScreenIsVisible(false)
    }

    const onEdit = (todo: Todo) => {
        setSelectedTodo(todo)
        setCreateTodoScreenIsVisible(true)
    }

    useEffect(() => {
        if (!createTodoScreenIsVisible) {
            setSelectedTodo(undefined)
        }
    }, [createTodoScreenIsVisible])

    return (
        <div className="app">
            <div className="header">
                <img src="/logo.png" alt=""/>
            </div>

            <div className="container">
                <Card>
                    <TodoTable onEdit={onEdit}/>
                    <Button type="link" icon="+ " onClick={() => setCreateTodoScreenIsVisible(true)}>Create a Job</Button>
                </Card>
            </div>

            <FixedModal destroyOnClose visible={createTodoScreenIsVisible} footer={false} onCancel={() => setCreateTodoScreenIsVisible(false)}>
                <TodoSave selectedTodo={selectedTodo} onFinish={onFinishSave} onCancel={() => setCreateTodoScreenIsVisible(false)}/>
            </FixedModal>
        </div>
    );
};

export default App;