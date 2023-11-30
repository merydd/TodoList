import React, { useState, useEffect } from "react";
import styles from "./individualTask.module.css";
import ToDoModal from "../ToDoModal/modal";


function IndividualTask() {

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('taskList')) || []);

    const [modalCheckboxChecked, setModalCheckboxChecked] = useState(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1); //-1 o an hiçbir şeyin seçili olmadığını gösteriyor.
    const [editedTask, setEditedTask] = useState("");
    const [editDesc, setEditDesc] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState()
    const [modalIndex, setModalIndex] = useState()
    const [refreshTaskList, setRefreshTaskList] = useState(false);

    useEffect(() => {
        if (refreshTaskList) {
            setTasks(JSON.parse(localStorage.getItem('taskList')) || [])
            setRefreshTaskList(false)
        }
    }, [refreshTaskList])

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
        setModalCheckboxChecked(updatedTasks[index].completed);
    };

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(tasks))
        setModalData(tasks[modalIndex])

    }, [tasks])

    const openEditModal = (index, task) => {
        setSelectedTaskIndex(index); // o anda hangi görevin düzenlenmekte olduğunu gösteriyo
        setEditedTask(tasks[index]); // durum değişkeninin içeriğini düzenler
        setEditDesc(tasks[index]); // tanım kısmının içeriğini düzenler

        setModalIndex(index)
        setModalData(task)
        setShowModal(true)
    };

    return (
        <div className={styles.wrapper}>

            <div className={styles["task-list"]}>
                {tasks.map((task, index) => (
                    <div key={index} className={styles["task-box-item"]}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(index)}
                        />

                        <span
                            className={styles["task-text"]}
                            onClick={() => openEditModal(index, task)}
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                            }}
                        >
                            {/* {task} */}
                            {task?.title}
                        </span>
                    </div>
                ))}

                <ToDoModal show={showModal} onHide={() => setShowModal(false)} modalData={modalData} refreshData={() => setRefreshTaskList(true)} index={modalIndex} />

            </div>

        </div>
    );
}

export default IndividualTask;