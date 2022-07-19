import { Todo } from '~/lib/models/todo.d'
import { Contract as TodoProxy } from '~/adapters/database/proxies/Todo/.d'

interface Contract {
  execute(
    id: Todo['id'],
    data: Partial<Pick<Todo, 'title' | 'description' | 'status'>>
  ): Promise<Todo>
}

export class UpdateTodo implements Contract {
  constructor(
    private TODO: TodoProxy
  ) { }

  execute(
    id: string,
    data: Partial<Pick<Todo, 'title' | 'description' | 'status'>>
  ): Promise<Todo> {
    return this.TODO.update(id, data)
  }
}