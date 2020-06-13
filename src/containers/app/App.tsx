import React from 'react';
import dayjs from 'dayjs';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import DailyPane from '../../components/dailyPane';

import { Task, TaskStatus } from '../../models/Task';

import { tasks } from './data';

import './styles.css';

interface AppProps {}
interface AppState {
  tasks: Task[];
}

class App extends React.Component<AppProps, AppState> {
  constructor (props: AppProps) {
    super(props);

    this.state = {
      tasks,
    };

    this.handleUpdateTaskStatus = this.handleUpdateTaskStatus.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }

  handleAddTask (text: string, dateString: string): void {
    this.setState((state) => {
      const newTask: Task = {
        id: 10,
        text,
        date: dayjs(dateString),
        status: TaskStatus.PENDING,
        monthly: false,
      };

      return {
        ...state,
        tasks: [
          ...state.tasks,
          newTask,
        ],
      };
    });
  }

  handleUpdateTaskStatus (taskId: number, newStatus: TaskStatus): void {
    this.setState((state) => {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, status: newStatus };
          }

          return task;
        }),
      };
    });
  }

  handleDeleteTask (taskId: number): void {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  }

  render () {
    const { tasks } = this.state;

    const theme = createMuiTheme({
      typography: {
        fontSize: 24,
      },
    });

    return (
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <DailyPane
            tasks={tasks}
            addTask={this.handleAddTask}
            updateTaskStatus={this.handleUpdateTaskStatus}
            deleteTask={this.handleDeleteTask}
          />
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}

export default App;
