import React, { Component, useState } from 'react';

import styles from "./UserComponent.module.css";


function UserComponent() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [showDiv, setShowDiv] = useState(false);

    const handleShowDiv = () => {
        setShowDiv(prev => !prev);
    };

    return (
        <div className={styles.userComponentWrapper} onClick={handleMenuClick}>

                <img className={styles.img}
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Eo_circle_blue-grey_white_letter-m.svg"
                    weight={30} height={30} />

            <div className={styles.profile} >

                <div className={styles.user}>UserName</div>

            {isMenuOpen ? <div className={styles["dropdown-wrapper"]}>
                <div className={styles.accountWrapper}>
                    <img className={styles.account}
                    src="https://thenounproject.com/api/private/icons/5593607/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0" />
                    <p className={styles["account-text"]}>Account</p>
                </div>
                <div className={styles.settingsWrapper}>
                    <img className={styles.settings} src="https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-75-512.png" />
                    <p className={styles["settings-text"]}>Settings</p>
                </div>
                <div className={styles.logoutWrapper}>
                    <img className={styles.logout} src="https://thenounproject.com/api/private/icons/1933995/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0" />
                    <p className={styles["logout-text"]}>LogOut</p>
                </div>
            </div> : null}
        </div>
        </div>
    );
}

export default UserComponent;