import PROXY from '~/adapters/database/proxies/Todo/memory'

import { DeleteTodos } from './delete-todos'

describe('Usecases:Todos:Delete', () => {
  beforeEach(async () => {
    await PROXY.delete()
    await Promise.all([1,2,3].map((int) => PROXY.create({
      title: `test-${int}`,
      description: 'this is a test'
    })))
  })

  it('deletes one todo by id', async () => {
    const usecase = new DeleteTodos(PROXY)
    const todo = (await PROXY.search({ title: '1' })).pop()

    expect(todo).toBeDefined()
    expect((await PROXY.search()).length).toBe(3)
    expect(await usecase.execute(todo?.id)).toBe(true)
    expect((await PROXY.search()).length).toBe(2)
  })

  it('deletes many todos in batches', async () => {
    const usecase = new DeleteTodos(PROXY)
    await PROXY.create({
      title: 'control',
      description: 'this one should stay'
    });
    
    const todosToDelete = await PROXY.search({ title: 'test' })

    expect((await PROXY.search()).length).toBe(4)
    expect(await usecase.execute(todosToDelete.map(({ id }) => id))).toBe(true)
    expect((await PROXY.search()).length).toBe(1)
  })

  it('deletes all todos', async () => {
    const usecase = new DeleteTodos(PROXY)
    
    expect((await PROXY.search()).length).toBe(3)
    expect(await usecase.execute()).toBe(true)
    expect((await PROXY.search()).length).toBe(0)
  })
})