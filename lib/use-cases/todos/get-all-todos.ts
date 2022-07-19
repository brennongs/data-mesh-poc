import { Contract as TodoProxy } from '~/adapters/database/proxies/Todo/.d'

import { Todo } from '~/lib/models/todo.d'

interface Contract {
  execute(): Promise<Todo[]>
}

export class GetAllTodos implements Contract {
  constructor(
    private TODO: TodoProxy
  ) { }

  async execute(): Promise<Todo[]> {
    return await this.TODO.search() 
  }
}