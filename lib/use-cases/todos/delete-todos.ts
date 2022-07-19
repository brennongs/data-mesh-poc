import { Todo } from '~/lib/models/todo.d'

import { Contract as TodoProxy } from '~/adapters/database/proxies/Todo/.d'


interface Contract {
  execute(ids?: Todo['id'][] | Todo['id']): Promise<boolean>
}

export class DeleteTodos implements Contract {
  constructor(
    private TODO: TodoProxy
  ) { }

  async execute(ids?: string[] | string | undefined): Promise<boolean> {
    return await this.TODO.delete(ids)
  }
}