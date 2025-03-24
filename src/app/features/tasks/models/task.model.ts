export interface TagDto {
  tagId: string;
  name: string;
}

export interface TaskDto {
  taskId: string;
  title: string;
  description: string;
  category: number;
  priority: number;
  deadline: Date;
  minutesBeforeDeadline: number;
  userTimeZone: string;

  [key: string]: any;
}
