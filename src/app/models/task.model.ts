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
  TaskId: string;
  UserId: string;
  Title: string;
  Description: string;
  Category: number;
  Priority: number;
  Deadline: Date;
  MinutesBeforeDeadline: number;
  UserTimeZone: string;
  UserEmail: string;
  TaskTags: TagDto[];
  TaskComments: CommentDto[];
}
