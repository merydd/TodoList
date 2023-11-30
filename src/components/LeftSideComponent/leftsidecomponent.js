import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LeftSideComponent.module.css";

import homepageicon from "../../dashboard_icon.png"

function LeftSideComponent() {
  const navigate = useNavigate();

  const buttonClickHandler = (path) => {
    console.log("button click");
    navigate(path);
  };

  return (
    <div className={styles.rightbody}>
      <span className={styles.menu}>Menu</span>

      <img className={styles.homepageicon}
        src={homepageicon}
        onClick={() => buttonClickHandler("/")} />
        
      <button
        className={styles.todaybtn}
        type="button"
        style={{ cursor: "pointer", padding: "3px 12px" }}
        onClick={() => buttonClickHandler("/today")}
        >
        Today
      </button>

      <button
        className={styles.next7daybtn}
        type="button"
        style={{ cursor: "pointer", padding: "3px 12px" }}
        onClick={() => buttonClickHandler("/next7days")}
        >
        Next 7 Days
      </button>

      <button
        className={styles.calendarbtn}
        type="button"
        style={{ cursor: "pointer", padding: "3px 12px" }}
        onClick={() => buttonClickHandler("/todocalendar")}
      >
        Calendar
      </button>

      <button
        className={styles.completedtaskbtn}
        type="button"
        style={{ cursor: "pointer", padding: "3px 10px" }}
        onClick={() => buttonClickHandler("/completedtasks")}
      >
        Completed Tasks
      </button>
    </div>
  );
}

export default LeftSideComponent;