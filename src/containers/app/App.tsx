import React from 'react';

import Task from '../../components/task';
import { Task as TaskModel } from '../../models/Task';

import './styles.css';

const task: TaskModel = {
  id: 12,
  text: 'Some random task to be completed',
  date: new Date(),
  completed: true,
  monthly: false,
};

const App = () => (
  <div className="app">
    <Task
      task={task}
    />
  </div>
);

export default App;
