import React from 'react';

import { TaskStatus } from '../../models/Task';

import Grid from '@material-ui/core/Grid';
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckboxCompletedIcon from '@material-ui/icons/CheckBoxOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import './styles.css';

export interface TaskProps {
  task: {
    id: number;
    text: string;
    date: Date;
    status: TaskStatus;
    monthly: boolean;
  };

  updateTaskStatus: (status: TaskStatus) => void;
  onDelete: (e: React.MouseEvent) => void;
};

const Task = (props: TaskProps) => {
  const {
    task,

    updateTaskStatus,
    onDelete,
  } = props;

  const checkbox = task.status === TaskStatus.COMPLETED
    ? (
      <CheckboxCompletedIcon
        onClick={() => updateTaskStatus(TaskStatus.PENDING)}
        fontSize="large"
      />
    ) : (
      <CheckboxIcon
        onClick={() => updateTaskStatus(TaskStatus.COMPLETED)}
        fontSize="large"
      />
    );

  return (
    <Grid
      className="task"
      container
      alignItems="center"
    >
      <div className="icon">
        {checkbox}
      </div>

      <div className={task.status === TaskStatus.ABANDONED ? 'strikethrough' : ''}>
        {task.text}
      </div>

      <CloseIcon
        onClick={() => updateTaskStatus(TaskStatus.ABANDONED)}
        className="icon"
        fontSize="large"
      />

      <DeleteIcon
        onClick={onDelete}
        className="icon"
        fontSize="large"
      />
    </Grid>
  );
};

export default Task;
