import { Task } from '../models/Task';

/**
 * Categorizes tasks by their date. Returns an object with the keys being
 * the datestring format passed and the values being an array
 * filled with Tasks for that specific date.
 *
 * @param {Task[]} tasks - an array of tasks
 * @param {string} datestring - the datestring to categorize by
 *
 * @returns { [datestring: string]: Task[] } categorizedTasks - a map with a datestring
 * in format passed with values being an array of tasks for that date
 */
export const categorizeTasks = (tasks: Task[], datestring: string): { [datestring: string]: Task[] } => {
  const categorizedTasks: { [datestring: string]: Task[] } = {};

  tasks.forEach((task) => {
    const dateString = task.date.format(datestring);

    if (Object.prototype.hasOwnProperty.call(categorizedTasks, dateString)) {
      const previousTasks = categorizedTasks[dateString];
      categorizedTasks[dateString] = [...previousTasks, task];
    } else {
      categorizedTasks[dateString] = [task];
    }
  });

  return categorizedTasks;
};

export default categorizeTasks;
