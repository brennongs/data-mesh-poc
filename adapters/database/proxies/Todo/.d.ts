import { Todo } from '~/lib/models/todo.d'

export interface Contract {
  search(
    params?: Partial<Pick<Todo, 'title' | 'description' | 'status' | 'id'>>
  ): Promise<Todo[]>;
  create(todo: Pick<Todo, 'title' | 'description'>): Promise<Todo>;
  update(id: Todo['id'], params: Partial<Todo>): Promise<Todo>;
  delete(ids?: Todo['id'] | Todo['id'][]): Promise<boolean>;
}