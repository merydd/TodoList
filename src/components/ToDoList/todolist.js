import React, { useEffect, useState } from "react";
import { format, set } from 'date-fns'

import ToDoModal from '../ToDoModal/modal';

import styles from "./ToDoList.module.css";
import IndividualTask from "../IndividualTask/individualTask";

function ToDoList({ setCompletedTaskList, setDate }) {
  //#region

  const taskModel = {
    title: "title",
    description: "desc",
    completed: false,
    date: "date"
  };

  const today = format(new Date(), 'yyyy-MM-dd')

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('taskList')) || []);
  const [newTask, setNewTask] = useState("");

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
  //   setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasks))
  }, [tasks])

  const buttonClickHandler = () => {
    if (newTask?.title?.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask({
        title: "",
        desc: "",
        completed: false,
        date: null
      });
    }
  };

  const handleInputChange = (event) => {
    const temp = { //birden fazla işlev tanımlanacağı için temp kullanılmış
      title: event.target.value,
      // desc: "this is a description field",
      desc: "",
      completed: false,
      date: today
    };

    setNewTask(temp); // temp değişkenine atanan değerleri geçici bir nesne olarak tutuyo
  };

  //#endregion

  const [selectedDate, setSelectedDate] = useState(today.toString())

  return (
    <>
        <div className={styles.header}>
        <span className={styles.todoHeader}>ToDoList</span>

        <div className={styles.ButtonWrapper}>
          <input
            className={styles["input-item"]}
            type="text"
            name="todos"
            placeholder="Enter task.."
            value={newTask?.title}
            onChange={handleInputChange}
          />
          <button
            className={styles.button}
            type="button"
            onClick={buttonClickHandler}
          >
            Add Task
          </button>
        </div>

        <IndividualTask />

        </div>

    </>
  );
}

export default ToDoList;