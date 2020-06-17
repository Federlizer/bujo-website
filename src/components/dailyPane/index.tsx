import React from 'react';

import { Grid } from '@material-ui/core';

import TaskList from '../taskList';

import { Task, TaskStatus } from '../../models/Task';

import './styles.css';

export interface DailyPaneProps {
  tasks: Task[];

  addTask: (text: string, dateString: string) => void;
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

  const orderedTasks = tasks.sort((a, b) => {
    if (a.date.isBefore(b.date)) return -1;
    if (a.date.isAfter(b.date)) return 1;
    return 0;
  });

  const taskDateMap: { [dateString: string]: Task[] } = {};

  orderedTasks.forEach((task) => {
    const dateString = task.date.format('YYYY-MM-DD');

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

            addTask={(text) => addTask(text, dateString)}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
          />
        );
      })}
    </Grid>
  );
};

export default DailyPane;
