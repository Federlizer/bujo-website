import React from 'react';

import Task from './task';
import { Task as TaskModel } from '../models/Task';

const task: TaskModel = {
  id: 12,
  text: 'Some random task to be completed',
  date: new Date(),
  completed: true,
  monthly: false,
};

export const App = () => (
  <Task
    task={task}
  />
);
