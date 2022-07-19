enum TodoStatus {
  NOT_STARTED = 'not started',
  IN_PROGRESS = 'in progress',
  COMPLETE = 'complete'
}

export interface Todo {
  id: string;
  status: TodoStatus;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}