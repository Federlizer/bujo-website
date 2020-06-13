import dayjs from 'dayjs';
import { Task, TaskStatus } from '../../models/Task';

export const tasks: Task[] = [
  {
    id: 1,
    text: "Mom's birthday",
    date: dayjs('2020-06-07'),
    status: TaskStatus.PENDING,
    monthly: false,
  },
  {
    id: 2,
    text: "Geri's birthday",
    date: dayjs('2020-01-27'),
    status: TaskStatus.PENDING,
    monthly: false,
  },
  {
    id: 3,
    text: "My brother's birthday",
    date: dayjs('2020-02-14'),
    status: TaskStatus.PENDING,
    monthly: false,
  },
  {
    id: 4,
    text: 'Task n4',
    date: dayjs(),
    status: TaskStatus.PENDING,
    monthly: false,
  },
  {
    id: 5,
    text: 'Task n5',
    date: dayjs(),
    status: TaskStatus.PENDING,
    monthly: false,
  },
  {
    id: 6,
    text: 'Some monthly task 1',
    date: dayjs('2020-06-01'),
    status: TaskStatus.PENDING,
    monthly: true,
  },
  {
    id: 7,
    text: 'Some monthly task 2',
    date: dayjs('2020-06-02'),
    status: TaskStatus.PENDING,
    monthly: true,
  },
  {
    id: 8,
    text: 'Some monthly task 3',
    date: dayjs('2020-07-01'),
    status: TaskStatus.PENDING,
    monthly: true,
  },
];
