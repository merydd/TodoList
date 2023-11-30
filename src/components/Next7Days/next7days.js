// import React from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./Next7Days.module.css"
import LeftSideComponent from '../LeftSideComponent/leftsidecomponent';
import IndividualTask from '../IndividualTask/individualTask';

import UserComponent from '../UserComponent/usercomponent';


function Next7Days () {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState("");
  // const [newTask, setNewTask] = useState('');
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

  const saveEditedTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[selectedTaskIndex] = editedTask;
    setTasks(updatedTasks);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <LeftSideComponent />
      
      <div>

        <div>
          <div className={styles.next7daysWrapper}>Next 7 Days</div>
        </div>

        <div className={styles.inputWrapper}>
          <input className={styles.input} type="text" value={newTask} onChange={handleInputChange} />

          <button className={styles.button} type="button" onClick={handleButtonClick}>Add</button>
        </div>

        {/* <div>
          <li className={styles["next7day-task-list"]}>
            {tasks.map((task, index) => (
            <div key={index} onChange={() => toggleTaskCompletion(index)}></div>
            ))}
            </li>
          </div> */}

          <IndividualTask />
          
    </div>

    <UserComponent />

    </div>
  );

}

export default Next7Days;