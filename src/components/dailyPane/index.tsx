import React from 'react';

import { Grid } from '@material-ui/core';

import TaskList from '../taskList';

import { Task, TaskStatus } from '../../models/Task';

import './styles.css';

export interface DailyPaneProps {
  tasks: Task[];

  addTask: (text: string) => void;
  updateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
  deleteTask: (taskId: number) => void;
}

export const DailyPane = (props: DailyPaneProps) => {
  const {
    tasks,
    addTask,
    updateTaskStatus,
    deleteTask,
  } = props;

  const taskDateMap: { [dateString: string]: Task[] } = {};

  tasks.forEach((task) => {
    const dateString = task.date.format('DD-MM-YYYY');

    if (Object.prototype.hasOwnProperty.call(taskDateMap, dateString)) {
      const Ts = taskDateMap[dateString];
      taskDateMap[dateString] = [...Ts, task];
    } else {
      taskDateMap[dateString] = [task];
    }
  });

  return (
    <Grid
      className="daily-pane"
      container
    >
      {Object.keys(taskDateMap).map((dateString) => {
        const tasks = taskDateMap[dateString];
        const header = tasks[0].date.format('DD MMMM');

        return (
          <TaskList
            key={dateString}
            tasks={tasks}
            header={header}

            addTask={addTask}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
          />
        );
      })}
    </Grid>
  );
};

export default DailyPane;
