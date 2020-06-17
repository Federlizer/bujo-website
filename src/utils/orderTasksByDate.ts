import { Task } from '../models/Task';

/**
 * Returns an array with the tasks ordered by date in ascending manner.
 * @param {Task[]} tasks - an unordered array of tasks
 * @returns {Task[]} an array of tasks ordered by date in ascending manner
 */
export const orderTasksByDate = (tasks: Task[]): Task[] => tasks.sort((a, b) => {
  if (a.date.isBefore(b.date)) return -1;
  if (a.date.isAfter(b.date)) return 1;
  return 0;
});

export default orderTasksByDate;
