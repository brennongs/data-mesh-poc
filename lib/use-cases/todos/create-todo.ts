import { Todo } from '~/lib/models/todo.d'

import { Contract as TodoProxy } from '~/adapters/database/proxies/Todo/.d'

interface Contract {
  execute(todo: Pick<Todo, 'title' | 'description'>): Promise<Todo>
}

export class CreateTodo implements Contract {
  constructor(
    private TODO: TodoProxy
  ) { }
  
  async execute(todo: Pick<Todo, 'title' | 'description'>): Promise<Todo> {
    return await this.TODO.create(todo);
  }
}