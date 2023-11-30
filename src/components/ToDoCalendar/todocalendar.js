import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar'
import LeftSideComponent from '../LeftSideComponent/leftsidecomponent';

import styles from "./ToDoCalendar.module.css"
import 'react-calendar/dist/Calendar.css';
import '../../calendar.css'

function ToDoCalendar () {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({});
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
    const [editedTask, setEditedTask] = useState("");
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    // const handleButtonClick = () => {
    //     if (newTask.trim() !== '') {
    //         setTasks([...tasks, newTask]);
    //         setNewTask('');
    //     }
    // };

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


  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    console.log(selectedDate)
  }, [selectedDate])

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>

        <LeftSideComponent />
            
        <div className={styles.calendarWrapper}>

            <div className={styles.calendarpage}>Calendar</div>

            <div className={styles.calendar}>

            <Calendar value={selectedDate} onChange={setSelectedDate}  />
            
            </div>
            </div>
        </div>
    );    
}

export default ToDoCalendar;