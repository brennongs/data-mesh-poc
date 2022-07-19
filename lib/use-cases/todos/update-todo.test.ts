import PROXY from '~/adapters/database/proxies/Todo/memory'
import { TodoStatus } from '~/lib/models/todo.d'

import { UpdateTodo } from './update-todo'

describe('Usecases:Todos:Update', () => {
  beforeEach(async () => {
    await PROXY.delete()
    await Promise.all([1,2,3].map(int => PROXY.create({
      title: `test-${int}`,
      description: `testing (${int})`
    })))
  })

  it('updates a todo', async () => {
    const usecase = new UpdateTodo(PROXY)
    const all = await PROXY.search()

    expect(all[0].title).toBe('test-1')
    
    await usecase.execute(all[0].id, {
      title: 'totally new test string',
      status: TodoStatus.COMPLETE
    })

    expect((await PROXY.search({ id: all[0].id}))[0].title)
      .toBe('totally new test string')
  })
})