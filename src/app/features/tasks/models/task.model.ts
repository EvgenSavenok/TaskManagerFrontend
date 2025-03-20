export interface TagDto {
  TagId: string;
  Name: string;
}

export interface CommentDto {
  CommentId: string;
  Content: string;
  CreatedDate: Date;
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
