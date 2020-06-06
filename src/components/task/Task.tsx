import React from 'react';

import { Task as TaskModel } from '../../models/Task';

import Grid from '@material-ui/core/Grid';
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckboxCompletedIcon from '@material-ui/icons/CheckBoxOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import './styles.css';

export interface TaskProps {
  task: TaskModel;

  onComplete?: (e: Event) => void;
  onAbandon?: (e: Event) => void;
  onDelete?: (e: Event) => void;
};

const Task = (props: TaskProps) => {
  const { task } = props;

  const checkbox = (
    task.completed
      ? <CheckboxCompletedIcon />
      : <CheckboxIcon />
  );

  return (
    <Grid
      className="task"
      container
      alignItems="center"
    >
      {checkbox}
      {task.text}
      <CloseIcon />
      <DeleteIcon />
    </Grid>
  );
};

export default Task;
