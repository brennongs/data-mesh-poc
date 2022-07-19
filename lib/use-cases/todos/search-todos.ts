import { Todo } from '~/lib/models/todo.d'
import { Contract as TodoProxy } from '~/adapters/database/proxies/Todo/.d'

interface Contract {
  execute(params?: Partial<Pick<Todo, 'title' | 'id' | 'description' | 'status'>>): Promise<Todo[]>
}

export class SearchTodos implements Contract {
  constructor(
    private TODO: TodoProxy
  ) { }

  async execute(
    params?: Partial<Pick<Todo, 'title' | 'id' | 'description' | 'status'>>
  ): Promise<Todo[]> {
    return await this.TODO.search(params)  
  }
}