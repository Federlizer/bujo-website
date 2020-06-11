import React from 'react';

import Grid from '@material-ui/core/Grid';

import { Task, TaskStatus } from '../../models/Task';
import TaskComponent from '../task/Task';

export interface TaskListProps {
  tasks: Task[];

  updateTaskStatus: (taskId: number, status: TaskStatus) => void;
  deleteTask: (taskId: number) => void;
}

const TaskList = (props: TaskListProps) => {
  const {
    tasks,
    updateTaskStatus,
    deleteTask,
  } = props;

  return (
    <Grid container>

      {tasks.map((task: Task) => {
        return (
          <TaskComponent
            key={task.id.toString()}
            task={task}
            updateTaskStatus={(status) => updateTaskStatus(task.id, status)}
            onDelete={() => deleteTask(task.id)}
          />
        );
      })}

    </Grid>
  );
};

export default TaskList;
