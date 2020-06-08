import React from 'react';

import Task from '../../components/task';

import { Task as TaskModel, TaskStatus } from '../../models/Task';

import './styles.css';

interface AppProps {}
interface AppState {
  i: number;
  task: TaskModel;
}

class App extends React.Component<AppProps, AppState> {
  constructor (props: AppProps) {
    super(props);

    this.state = {
      i: 0,
      task: {
        id: 12,
        text: 'Some random task to be completed',
        date: new Date(),
        status: TaskStatus.PENDING,
        monthly: false,
      },
    };

    this.handleUpdateTaskStatus = this.handleUpdateTaskStatus.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  handleUpdateTaskStatus (newStatus: TaskStatus): void {
    this.setState((state) => {
      return {
        i: state.i + 1,
        task: {
          ...state.task,
          status: newStatus,
        },
      };
    });
  }

  handleDeleteTask (): void {
    this.setState({ task: undefined });
  }

  render () {
    const { task } = this.state;

    console.log(task);

    return (
      <div className="app">
        <Task
          task={task}

          updateTaskStatus={this.handleUpdateTaskStatus}
          onDelete={this.handleDeleteTask}
        />
      </div>
    );
  }
}

export default App;
