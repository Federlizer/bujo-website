import React from 'react';

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

    return (
      <div className="app">
        <TaskList
          tasks={tasks}

          updateTaskStatus={this.handleUpdateTaskStatus}
          deleteTask={this.handleDeleteTask}
        />
      </div>
    );
  }
}

export default App;
