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
  userId: string;
  title: string;
  description: string;
  category: number;
  priority: number;
  deadline: Date;
  minutesBeforeDeadline: number;
  userTimeZone: number;
  userEmail: string;
  taskTags: TagDto[];
  taskComments: CommentDto[];

  [key: string]: any;
}
