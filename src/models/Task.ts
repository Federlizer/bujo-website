export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
};

export interface Task {
  id?: number;
  text: string;
  date: Date;
  status: TaskStatus;
  monthly: boolean;
}
