import { TodoStatus } from '~/lib/models/todo.d'
import PROXY from '~/adapters/database/proxies/Todo/memory'

import { SearchTodos } from './search-todos'

describe('Usecases:Todos:Search', () => {
  beforeEach(async () => {
    await PROXY.delete()

    await Promise.all([1,2,3].map(int => PROXY.create({
      title: `test-${int}`,
      description: `this is a test (${int})`
    })))
  })

  it('returns all todos when given no arguments', async () => {
    const usecase = new SearchTodos(PROXY)

    expect((await usecase.execute()).length).toBe(3)
  })

  it('can partial search on all text fields', async () => {
    const usecase = new SearchTodos(PROXY)

    expect((await usecase.execute({ title: 'tes' })).length).toBe(3)
    expect((await usecase.execute({ description: 's is' })).length).toBe(3)
  })

  it('can search status', async () => {
    const usecase = new SearchTodos(PROXY)
    const all = await usecase.execute()

    expect((await usecase.execute({ status: TodoStatus.NOT_STARTED })).length)
    .toBe(3)
  
    await PROXY.update(all[0].id, { status: TodoStatus.IN_PROGRESS })

    expect((await usecase.execute({ status: TodoStatus.NOT_STARTED })).length)
    .toBe(2)
  })

  it('can search by id', async () => {
    const usecase = new SearchTodos(PROXY)
    const all = await usecase.execute()
    const result = await usecase.execute({
      id: all[0].id
    })

    expect(result.length).toBe(1)
    expect(result[0].title).toBe('test-1')
  })
})