import { Todo } from '~/lib/models'

export default interface TodoProxy {
  search(params?: Partial<Todo>): Promise<Todo[]>;
  first(params: Partial<Todo>): Promise<Todo | null>;
  create(todo: Pick<Todo, 'title' | 'description'>): Promise<Todo>;
  update(id: Todo['id'], params: Partial<Todo>): Promise<Todo>;
  delete(id?: Todo['id']): Promise<boolean>;
}