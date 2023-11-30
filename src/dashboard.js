import React, { Component, useState } from 'react';
import './App.css';
// import './m.svg';
import UserComponent from './components/UserComponent/usercomponent';
import LeftSideComponent from './components/LeftSideComponent/leftsidecomponent';
import ToDoList from './components/ToDoList/todolist';

function Dashboard({setCompletedTaskList}) {

  return (

      <div className="wrapper">
        
        <LeftSideComponent />
      
        <ToDoList setCompletedTaskList={setCompletedTaskList} />

        <UserComponent />

      </div>
  );
};

export default Dashboard;