import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./today.module.css";
import LeftSideComponent from '../LeftSideComponent/leftsidecomponent';
import ToDoModal from '../ToDoModal/modal';
import { format } from 'date-fns';
import UserComponent from '../UserComponent/usercomponent';
import IndividualTask from '../IndividualTask/individualTask';

function TodayPage() {

    const storedData = JSON.parse(localStorage.getItem('taskList')) || [];
    const today = format(new Date(), 'yyyy-MM-dd')


    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const temp = []

        if (storedData && storedData?.length > 0) {
            storedData.forEach(x => {
                const selectedTaskDate = x?.date
                if (today === selectedTaskDate) {
                    temp.push(x)
                }
            })
        }
        setTasks(temp)
    }, [])

    const [newTask, setNewTask] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const handleButtonClick = () => {
        if (newTask?.title?.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    const buttonClickHandler = (path) => {
        navigate(path)
    };

    // const [showDiv, setShowDiv] = useState(false);

    // const handleShowDiv = () => {
    //     setShowDiv(prev => !prev);
    // };

    return (
        <div className={styles.Wrapper}>

            <LeftSideComponent />

            <div>
            
                <div>
                    <div className={styles.todayText}>Today</div>
                </div>

                <div className={styles.inputWrapper}>
                    <input className={styles.input} type="text" value={newTask} onChange={handleInputChange} />

                    <button className={styles.button} type="button" onClick={handleButtonClick}>Add</button>
                </div>

            <IndividualTask />

            <ToDoModal />

                {/* <div>
                    <li className={styles["today-task-list"]}>
                        {tasks?.map((task, index) => (
                            <div key={index} onChange={() => toggleTaskCompletion(index)}>{task?.title}</div>
                        ))}
                    </li>
                </div> */}

            </div>

            <UserComponent />

        </div>
    );
}

export default TodayPage;