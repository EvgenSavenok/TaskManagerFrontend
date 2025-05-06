import {TagDto} from '../../tags/models/tag.model';

export interface TaskDto {
  taskId: string;
  title: string;
  description: string;
  category: number;
  priority: number;
  deadline: Date;
  minutesBeforeDeadline: number;
  userTimeZone: string;
  taskTags: TagDto[];

  [key: string]: any;
}
