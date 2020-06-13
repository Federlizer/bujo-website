import { Dayjs } from 'dayjs';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
};

export interface Task {
  id?: number;
  text: string;
  date: Dayjs;
  status: TaskStatus;
  monthly: boolean;
}
