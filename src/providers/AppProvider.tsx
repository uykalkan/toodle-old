import React, {useEffect, useState} from 'react';
import {Todo} from "../types/Todo";
import priorityService from "../services/priorityService";
import {Priority} from "../types/Priority";
import Loading from "../components/Loading";
import * as localforage from "localforage";

interface IAppContext {
    children?: any; // React.FC typeında bir problem var 18 de oluşmuş olabilir bu şekilde geçici bir fix
    todos: Todo[]
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
    priorities: Priority[],
    setPriorities?:  React.Dispatch<React.SetStateAction<Priority[]>>
}

const defaultState = {
    todos: [],
    priorities: [],
    setTodos: () => {}
};

export const AppContext = React.createContext<IAppContext>(defaultState);

const AppProvider: React.FC<any> = ({children}) => {

    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        localforage.setItem('todos', todos).then()
    }, [todos])

    useEffect(() => {
        setLoading(true)
        Promise.all([loadPriorities(), loadTodos()]).finally(() => setLoading(false))
    }, [])

    async function loadPriorities() {
        setPriorities((await priorityService.getAll()))
    }

    async function loadTodos() {
        return setTodos((await localforage.getItem<Todo[]>('todos') ) || [])
    }

    return (
        <AppContext.Provider value={{...defaultState, priorities, todos, setTodos}}>
            {loading && <Loading />}
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider