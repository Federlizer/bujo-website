import React from 'react';

import {
  Grid,
} from '@material-ui/core';

import TaskList from '../taskList';

import { Task } from '../../models/Task';
import { orderTasksByDate } from '../../utils/orderTasksByDate';
import { categorizeTasks } from '../../utils/categorizeTasks';

export interface MonthlyPaneProps {
  tasks: Task[];
}

const notImplemented = () => console.error('Not Implemented');

export const MonthlyPane = (props: MonthlyPaneProps) => {
  const { tasks } = props;

  const orderedTasks = orderTasksByDate(tasks);
  const categorizedTasks = categorizeTasks(orderedTasks, 'YYYY-MM');

  return (
    <Grid container>
      {Object.keys(categorizedTasks).map((datestring: string) => {
        const tasks = categorizedTasks[datestring];
        const header = tasks[0].date.format('MMMM');

        return (
          <TaskList
            key={datestring}
            tasks={tasks}
            header={header}

            addTask={() => notImplemented()}
            updateTaskStatus={notImplemented}
            deleteTask={notImplemented}
          />
        );
      })}
    </Grid>
  );
};

export default MonthlyPane;
