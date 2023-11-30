import React, { useEffect, useState } from "react";
import { format, set } from 'date-fns';

import Modal from "react-modal";

import styles from "./modal.module.css";

function ToDoModal({ show, onHide, modalData, refreshData, index }) {

    const today = format(new Date(), 'yyyy-MM-dd')

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('taskList')) || []);
    const [newTask, setNewTask] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1); //-1 o an hiçbir şeyin seçili olmadığını gösteriyo
    const [editedTask, setEditedTask] = useState("");
    const [editDesc, setEditDesc] = useState("");

    const [modalCheckboxChecked, setModalCheckboxChecked] = useState(false);

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);

        setModalCheckboxChecked(updatedTasks[index].completed);
        localStorage.setItem('taskList', JSON.stringify(updatedTasks));
    };

    // const buttonClickHandler = () => {
    //     if (newTask?.title?.trim() !== "") {
    //         setTasks([...tasks, newTask]);
    //         setNewTask({
    //             title: "",
    //             desc: "",
    //             completed: false,
    //             date: null
    //         });
    //     }
    // };

    const buttonClickHandler = () => {
        if (newTask?.title?.trim() !== "") {
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            setNewTask({
                title: "",
                desc: "",
                completed: false,
                date: null,
            });
            localStorage.setItem('taskList', JSON.stringify(updatedTasks));
        }
    };    

    const handleInputChange = (event) => {
        const temp = {
            title: event.target.value,
            // desc: "this is a description field",
            desc: "",
            completed: false,
            date: today
        };

        setNewTask(temp);
    };

    const openEditModal = (index) => {
        setSelectedTaskIndex(index); // o anda hangi görevin düzenlenmekte olduğunu gösteriyo
        setEditedTask(tasks[index]); // durum değişkeninin içeriğini düzenler
        setEditDesc(tasks[index]); // tanım kısmının içeriğini düzenler

        setModalCheckboxChecked(tasks[index].completed);

        setIsModalOpen(true);
    };

    const [editState, setEditState] = useState(false);

    const saveEditedTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks[selectedTaskIndex] = editedTask;
        setTasks(updatedTasks);
        // setIsModalOpen(false);
        setEditState(false);

        localStorage.setItem('taskList', JSON.stringify(updatedTasks));
    };

    const saveDate = (updatedTask) => {
        const updatedTasks = [...tasks];
        updatedTasks[selectedTaskIndex] = updatedTask;
        setTasks(updatedTasks);
        localStorage.setItem('taskList', JSON.stringify(updatedTasks));
    };

    const editTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks[selectedTaskIndex] = editedTask;
        setTasks(updatedTasks);
    };

    const deleteTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(selectedTaskIndex, 1); // 1 task silineceği için 1 yazılı ve splice güncelleme için kullanılıyor
        setTasks(updatedTasks);
        setIsModalOpen(false); // ve modal kapanır
    };

    const closeModal = () => {
        console.log("jdafsajf")
        // setIsModalOpen(false);

        onHide()
    };

    //#endregion

     // useEffect(() => {
    //     console.log(editedTask)
    // }, [editedTask])
  
    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(tasks))
      }, [tasks])
  
      const [selectedDate, setSelectedDate] = useState(today.toString())
  
      return (
          <Modal
              isOpen={show}
              // isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Edit Task"
              style={{
                  content: {
                      marginTop: "130px",
                      width: "500px",
                      height: "fit-content",
                      maxHeight: "500px",
                      margin: "auto",
                      padding: "0px",
                      display: "flex",
                      flexDirection: "column"
                  },
              }}
          >
              <div className={styles["modal-body"]}>
  
                  <div className={styles.firstRow}>
  
                      <label className={styles.label}>
                          <span className={styles.labeltext}>Label</span>
                      </label>
  
                      <div className={styles.priorityWrapper}>
                          <div>
                              <span className={styles["priority-text"]}>Priority:</span>
                          </div>
  
                          <div className={styles.priorityscale}>
                              <input
                                  type="radio"
                              />
                              <input
                                  type="radio"
                              />
                              <input
                                  type="radio"
                              />
                          </div>
  
                      </div>
                  </div>
  
  
                  <div className={styles.secondRow}>
  
                      <div className={styles.titleWrapper}>
  
                          <input
                              type="checkbox"
                              className={styles.modalCheckbox}
                              // checked={editedTask?.completed}
                              checked={modalData?.completed}
                              onChange={() => {
                                  // const currentTask = { ...editedTask };
                                  // // shallow copy
                                  // currentTask.completed = !modalCheckboxChecked;
                                  // setEditedTask(currentTask);
                                  // setModalCheckboxChecked(!modalCheckboxChecked)
                                  const storageCopy = JSON.parse(localStorage.getItem('taskList'));
                                  const modifiedTask = {...modalData}
  
                                  
                                  modifiedTask.completed = !modalData?.completed
  
  
                                  storageCopy[index] = modifiedTask
                                  
                                  console.log(storageCopy)
                                  localStorage.setItem('taskList', JSON.stringify(storageCopy));
                                  refreshData()
  
                                  // console.log(!JSON.parse(localStorage.getItem('taskList'))[index]?.completed)
                              }}
                          />
  
                          <div className={styles.textAreaWrapper}>
  
                              <div className={styles.editTitle}>
                                  {editState ? (
                                      <input
                                          type="text"
                                          placeholder="title"
                                          value={editedTask?.title}
                                          onChange={(e) => {
                                              const currentTask = { ...editedTask };
                                              // shallow copy
                                              currentTask.title = e.target.value;
                                              setEditedTask(currentTask);
                                          }}
                                      />
                                  ) : (
                                      <div>{editedTask?.title}</div>
                                  )}
                              </div>
  
                              <div className={styles.textarea}>
                                  {editState ? (
                                      <textarea
                                          className={styles["edit-textarea"]}
                                          name="desc"
                                          rows="3"
                                          cols="32"
                                          placeholder="notes"
                                          value={editedTask?.desc}
                                          onChange={(e) => {
                                              const currentTask = { ...editedTask };
                                              // shallow copy
                                              currentTask.desc = e.target.value;
                                              setEditedTask(currentTask);
                                          }}
                                      />
                                  ) : (
                                      <div className={styles.desc}>{editedTask?.desc}</div>
                                  )}
                              </div>
                          </div>
                      </div>
  
                      <div>
                          <input type="date"
                          className={styles.taskdate}
                          value={editedTask?.date}
                          onChange={e => {
                              const currentTask = { ...editedTask };
                              currentTask.date = e?.target?.value;
                              setEditedTask(currentTask)
                              // saveEditedTask()
                              saveDate(currentTask)
                          }}
                          />
                      </div>
                  </div>
  
                  <div className={styles.thirdRow}>
  
  
                          {editState ? (
  
                              <div className={styles.buttonWrapper}>
  
                                  <div>
                                      <button className={styles.savebtn} onClick={saveEditedTask}>Save</button>
                                  </div>
  
                                  <div>
                                      <button className={styles.deletebtn} onClick={deleteTask}>Delete</button>
                                  </div>
                              </div>
  
                          ) : (
  
                              <div>
                                  <button className={styles.editbtn} onClick={() => setEditState(true)}>Edit</button>
                              </div>
                          )}
  
                  </div>
              </div>
          
  
      </Modal>
      )
  }
  
  export default ToDoModal;