import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Task, TaskStatus } from '../../models/Task';
import TaskComponent from '../task/Task';

export interface TaskListProps {
  tasks: Task[];
  header: string;

  updateTaskStatus: (taskId: number, status: TaskStatus) => void;
  deleteTask: (taskId: number) => void;
}

const TaskList = (props: TaskListProps) => {
  const {
    tasks,
    header,
    updateTaskStatus,
    deleteTask,
  } = props;

  return (
    <Grid container>
      <Typography
        paragraph
        style={{
          textDecoration: 'underline',
        }}
      >
        {header}
      </Typography>

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
