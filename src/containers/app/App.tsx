import React from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TaskList from '../../components/taskList';

import { Task, TaskStatus } from '../../models/Task';

import './styles.css';

const tasks = [
  {
    id: 1,
    text: 'Task n1',
    date: new Date(),
    status: TaskStatus.PENDING,
    monthly: false,
  },
  {
    id: 2,
    text: 'Task n2',
    date: new Date(),
    status: TaskStatus.PENDING,
    monthly: false,
  },
  {
    id: 3,
    text: 'Task n3',
    date: new Date(),
    status: TaskStatus.PENDING,
    monthly: false,
  },
  {
    id: 4,
    text: 'Task n4',
    date: new Date(),
    status: TaskStatus.PENDING,
    monthly: false,
  },
  {
    id: 5,
    text: 'Task n5',
    date: new Date(),
    status: TaskStatus.PENDING,
    monthly: false,
  },
];

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

  handleAddTask (text: string): void {
    this.setState((state) => {
      const newTask: Task = {
        id: 10,
        text,
        date: new Date(),
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
          <TaskList
            tasks={tasks}
            header={'07 June'}
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
