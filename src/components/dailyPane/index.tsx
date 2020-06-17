import React from 'react';

import { Grid } from '@material-ui/core';

import TaskList from '../taskList';

import { Task, TaskStatus } from '../../models/Task';
import { orderTasksByDate } from '../../utils/orderTasksByDate';
import { categorizeTasks } from '../../utils/categorizeTasks';

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

  const orderedTasks = orderTasksByDate(tasks);
  const categorizedTasks = categorizeTasks(orderedTasks, 'YYYY-MM-DD');

  return (
    <Grid
      className="daily-pane"
      container
    >
      {Object.keys(categorizedTasks).map((dateString) => {
        const tasks = categorizedTasks[dateString];
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
