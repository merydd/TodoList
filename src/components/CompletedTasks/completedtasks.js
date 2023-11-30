import React, { useEffect, useState } from 'react';

import LeftSideComponent from '../LeftSideComponent/leftsidecomponent';

import styles from "./CompletedTasks.module.css"

function CompletedTasks ({taskList}) {

    const buttonClickHandler = () => {
        console.log("button click")
    }

    const [completedTaskList, setCompletedTaskList] = useState([]);

  useEffect(() => {
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    const temp = [];
    taskList?.forEach((x) => {
      if (x?.completed) { //if (x?.completed === true) {temp.push(x)} de olur
        temp.push(x);
      }
    });

    setCompletedTaskList(temp);
  }, []);


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

    <LeftSideComponent />

    <div className={styles.completedtaskWrapper}>

      <div className={styles.completedtasks}>Completed Tasks</div>

      {completedTaskList?.map((x) => (
        <div className={styles.completedtasklist}>
          <li>{x?.title}</li>
          </div>
      ))}

      </div>
    </div>

  );

}

export default CompletedTasks;