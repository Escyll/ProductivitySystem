export interface Task {
  name: string;
  points: number;
  done: boolean;
}

export interface DayTasks {
  dow: string;
  date: string;
  tasks: Task[];
}