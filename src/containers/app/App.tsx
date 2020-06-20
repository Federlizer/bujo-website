import React from 'react';
import dayjs from 'dayjs';

import { Grid } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import DailyPane from '../../components/dailyPane';
import MonthlyPane from '../../components/monthlyPane';

import { Task, TaskStatus } from '../../models/Task';

import { tasks } from './data';

import './styles.css';

interface AppProps {}
interface AppState {
  tasks: Task[];
  monthsDisplayed: dayjs.Dayjs[];
}

class App extends React.Component<AppProps, AppState> {
  constructor (props: AppProps) {
    super(props);

    this.state = {
      tasks,
      monthsDisplayed: [
        dayjs(),
        dayjs().add(1, 'month'),
      ],
    };

    this.handleUpdateTaskStatus = this.handleUpdateTaskStatus.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);

    this.showNextMonth = this.showNextMonth.bind(this);
    this.showPreviousMonth = this.showPreviousMonth.bind(this);
  }

  handleAddTask (text: string, dateString: string, monthly = false): void {
    this.setState((state) => {
      const newTask: Task = {
        id: 10,
        text,
        date: dayjs(dateString),
        status: TaskStatus.PENDING,
        monthly,
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
        ...state,
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
      ...state,
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  }

  showNextMonth (): void {
    console.log('Called showNextMonth');
    this.setState((state) => ({
      ...state,
      monthsDisplayed: state.monthsDisplayed.map((d) => d.add(1, 'month')),
    }));
  }

  showPreviousMonth (): void {
    console.log('Called showPreviousMonth');
    this.setState((state) => ({
      ...state,
      monthsDisplayed: state.monthsDisplayed.map((d) => d.subtract(1, 'month')),
    }));
  }

  render () {
    const { tasks, monthsDisplayed } = this.state;

    const displayedTasks = tasks.filter((task) => {
      const taskMonthString = task.date.format('YYYY-MM');
      return monthsDisplayed.some((d) => d.format('YYYY-MM') === taskMonthString);
    });

    const monthlyTasks = displayedTasks.filter((task) => task.monthly);
    const dailyTasks = displayedTasks.filter((task) => !task.monthly);

    const theme = createMuiTheme({
      typography: {
        fontSize: 24,
      },
    });

    return (
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Grid
            container
            direction="row"
            wrap="nowrap"
          >
            <MonthlyPane
              tasks={monthlyTasks}
              monthsDisplayed={monthsDisplayed}

              addTask={(text, datestring) => this.handleAddTask(text, datestring, true)}
              updateTaskStatus={this.handleUpdateTaskStatus}
              deleteTask={this.handleDeleteTask}

              onWheelUp={this.showPreviousMonth}
              onWheelDown={this.showNextMonth}
            />
            <DailyPane
              tasks={dailyTasks}
              addTask={this.handleAddTask}
              updateTaskStatus={this.handleUpdateTaskStatus}
              deleteTask={this.handleDeleteTask}
            />
          </Grid>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}

export default App;
