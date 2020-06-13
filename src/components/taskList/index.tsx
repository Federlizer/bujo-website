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

    this.toggleAdding = this.toggleAdding.bind(this);
    this.handleNewTaskTextChange = this.handleNewTaskTextChange.bind(this);
  }

  toggleAdding (adding: boolean) {
    this.setState((state) => ({
      ...state,
      adding,
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
      <Grid
        container
        alignItems="flex-start"
        direction="column"
      >
        <Typography
          display="inline"
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
              <Button onClick={() => {
                addTask(newTaskText);
                this.toggleAdding(false);
              }}>
                Click me
              </Button>
            </Grid>
          )
          : (
            <Grid item>
              <IconButton onClick={() => this.toggleAdding(true)}>
                <AddIcon />
              </IconButton>
            </Grid>
          )
        }

      </Grid>
    );
  }
};

export default TaskList;
