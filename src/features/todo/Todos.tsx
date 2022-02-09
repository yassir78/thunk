import React, { useEffect, useState } from 'react';
import { FiBell, FiBook } from 'react-icons/fi';
import { VscArchive } from 'react-icons/vsc';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './Todo.module.css';
import { addTodo, completeTodo, loadTodos, removeTodo, selectLoading, selectTodos } from './todoSlice';

export function Todos() {

    const todos = useAppSelector(selectTodos);
    const laoding  = useAppSelector(selectLoading)
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("load todos")
        dispatch(loadTodos());
    }, [])
    const [title,setTitle] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(title.trim()){
            dispatch(addTodo({title:title,completed:false}));
        }
        console.log("submit");
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }   
    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="description">Title : </label>
                <input value={title} onChange={handleChange} type="text" id="description" />
                <button type="submit">Add</button>
            </form>
            {laoding ? <div>Loading...</div> : null}
            <ul className={styles.ul}>{todos && todos.map((todo,index) => (
                    <li key={index} className={styles.li}>
                        <span>
                        <FiBell className={todo.completed ? styles.read :styles.unread}/>
                        {todo.title}
                         </span>
                        <span>
                        <FiBook className={styles.btn1} onClick={()=>dispatch(completeTodo(todo.title))} />
                        <VscArchive className={styles.btn2} 
                        onClick={()=>dispatch(removeTodo(todo.title))}/>
                        </span>
                        
                        </li>
                )
            )} </ul>
        </div>
    );
}
