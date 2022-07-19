import PROXY from '~/adapters/database/proxies/Todo/memory'

import { GetAllTodos } from './get-all-todos';

describe('UseCases:GetAllTodos', () => {
  it('works', async () => {
    const usecase = new GetAllTodos(PROXY)

    expect((await usecase.execute()).length).toBe(0)

    await Promise.all([1,2,3].map((int) => PROXY.create({
      title: `test-${int}`,
      description: 'this is a test'
    }))) 

    expect((await usecase.execute()).length).toBe(3);
  })
})