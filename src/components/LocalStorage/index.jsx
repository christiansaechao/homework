import React, { useState, useEffect } from 'react'; 
import './styles.scss'; 

const LocalStorage = () => {
    const [currTheme, setCurrTheme] = useState("");
    
    const getTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) setCurrTheme(savedTheme);
    }

    const setTheme = (theme) => {
        localStorage.setItem("theme", theme);
        setCurrTheme(theme);
    }

    useEffect(() => {
        getTheme();
    }, []);

    return (
        <div className={`localStorage-container ${currTheme}`}>
            <div className="buttons-container">
                <div className="btn" onClick={() => setTheme("light")}>Light Theme</div>
                <div className="btn" onClick={() => setTheme("dark")}>Dark Theme</div>
            </div>
            <div className="todo-app flex-center-center flex-column">
                <input className="general-input" type="text" placeholder='Write a task...' />
                <div className="btn add-task">Add Task</div>
            </div>
        </div>
    )
}

export default LocalStorage;