import React from 'react';

import { Task, TaskStatus } from '../../models/Task';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckboxCompletedIcon from '@material-ui/icons/CheckBoxOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import './styles.css';

export interface TaskProps {
  task: Task;

  updateTaskStatus: (status: TaskStatus) => void;
  onDelete: () => void;
};

const TaskComponent = (props: TaskProps) => {
  const {
    task,

    updateTaskStatus,
    onDelete,
  } = props;

  const checkbox = task.status === TaskStatus.COMPLETED
    ? (
      <IconButton onClick={() => updateTaskStatus(TaskStatus.PENDING)} >
        <CheckboxCompletedIcon />
      </IconButton>
    ) : (
      <IconButton onClick={() => updateTaskStatus(TaskStatus.COMPLETED)} >
        <CheckboxIcon />
      </IconButton>
    );

  return (
    <Grid
      className="task"
      container
      alignItems="center"
    >
      {checkbox}

      <Typography
        className={
          task.status === TaskStatus.ABANDONED
            ? 'strikethrough'
            : ''
        }
      >
        {task.text}
      </Typography>

      <IconButton onClick={() => updateTaskStatus(TaskStatus.ABANDONED)} >
        <CloseIcon />
      </IconButton>

      <IconButton onClick={onDelete} >
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
};

export default TaskComponent;
