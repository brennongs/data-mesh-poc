enum TodoStatus {
  NOT_STARTED = 'not started',
  IN_PROGRESS = 'in progress',
  COMPLETE = 'complete'
}

export interface Todo {
  status: TodoStatus;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}