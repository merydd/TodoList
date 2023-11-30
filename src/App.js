import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TodayPage from './components/Today/today';
import ToDoCalendar from './components/ToDoCalendar/todocalendar';
import Next7Days from './components/Next7Days/next7days'; 
import CompletedTasks from './components/CompletedTasks/completedtasks';
import ToDoModal from './components/ToDoModal/modal';
import IndividualTask from './components/IndividualTask/individualTask';


import Dashboard from './dashboard';


function App() {

  const [completedTaskList, setCompletedTaskList] = useState([])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard setCompletedTaskList={setCompletedTaskList} />} />
        <Route path="/today" element={<TodayPage />} />                    
        <Route path="/todocalendar" element={<ToDoCalendar />} />
        <Route path="/next7days" element={<Next7Days />} />
        <Route path="/completedtasks" element={<CompletedTasks taskList={completedTaskList} />} />
        <Route path="/*" element={<div>  404 Not Found </div>} />
        <Route path="/modal" element={<ToDoModal />} />
        <Route path="/individualTask" element={<IndividualTask />} />
      </Routes>
    </Router>
  );
};

export default App;
