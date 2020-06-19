import React from 'react';
import dayjs from 'dayjs';

import {
  Grid,
} from '@material-ui/core';

import TaskList from '../taskList';

import { Task } from '../../models/Task';
import { orderTasksByDate } from '../../utils/orderTasksByDate';

export interface MonthlyPaneProps {
  tasks: Task[];
  monthsDisplayed: dayjs.Dayjs[];

  onWheelUp: () => void;
  onWheelDown: () => void;
}

const notImplemented = () => console.error('Not Implemented');

const categorizeTasks = (monthsDisplayed: dayjs.Dayjs[], tasks: Task[], datestring: string) => {
  const categorizedTasks: { [datestring: string]: Task[] } = {};
  monthsDisplayed.forEach((d) => { categorizedTasks[d.format(datestring)] = []; });

  tasks.forEach((task) => {
    const taskDateString = task.date.format(datestring);

    categorizedTasks[taskDateString] = [
      ...categorizedTasks[taskDateString],
      task,
    ];
  });

  return categorizedTasks;
};

export const MonthlyPane = (props: MonthlyPaneProps) => {
  const {
    tasks,
    monthsDisplayed,

    onWheelUp,
    onWheelDown,
  } = props;

  const orderedTasks = orderTasksByDate(tasks);
  const categorizedTasks = categorizeTasks(monthsDisplayed, orderedTasks, 'YYYY-MM');

  return (
    <Grid
      container
      onWheel={(e) => {
        const { deltaY } = e;

        if (deltaY > 0) return onWheelDown();
        if (deltaY < 0) return onWheelUp();
      }}
    >
      {Object.keys(categorizedTasks).map((datestring: string) => {
        const tasks = categorizedTasks[datestring];
        const header = dayjs(`${datestring}-01`).format('MMMM');

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
