import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Task, TaskStatus } from '../../models/Task';
import TaskComponent from '../task/Task';

export interface TaskListState {
  adding: boolean;
  newTaskText: string;
}

export interface TaskListProps {
  tasks: Task[];
  header: string;

  addTask: (text: string) => void;
  updateTaskStatus: (taskId: number, status: TaskStatus) => void;
  deleteTask: (taskId: number) => void;
}

class TaskList extends React.Component<TaskListProps, TaskListState> {
  constructor (props: TaskListProps) {
    super(props);

    this.state = {
      adding: false,
      newTaskText: '',
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleNewTaskTextChange = this.handleNewTaskTextChange.bind(this);
  }

  handleAdd () {
    this.setState((state) => ({
      ...state,
      adding: true,
    }));
  }

  handleNewTaskTextChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    this.setState((state) => ({
      ...state,
      newTaskText: value,
    }));
  }

  render () {
    const { adding, newTaskText } = this.state;
    const {
      tasks,
      header,
      addTask,
      updateTaskStatus,
      deleteTask,
    } = this.props;

    return (
      <Grid container>
        <Typography
          paragraph
          style={{
            borderBottom: '2px solid black',
            marginLeft: '1.1rem',
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

        { adding
          ? (
            <Grid item>
              <TextField
                variant="standard"
                onChange={this.handleNewTaskTextChange}
              />
              <Button onClick={() => addTask(newTaskText)}>
                Click me
              </Button>
            </Grid>
          )
          : (
            <IconButton onClick={this.handleAdd}>
              <AddIcon />
            </IconButton>
          )
        }

      </Grid>
    );
  }
};

export default TaskList;
