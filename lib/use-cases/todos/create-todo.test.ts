import { TodoStatus } from '~/lib/models/todo.d'

import PROXY from '~/adapters/database/proxies/Todo/memory'

import { CreateTodo } from './create-todo'

describe('UseCases:CreateTodo', () => {
  it('works', async () => {
    const usecase = new CreateTodo(PROXY);

    expect((await PROXY.search()).length).toBe(0);

    const subject = await usecase.execute({
      title: 'this is a test',
      description: 'testing create of the things'
    });

    expect(subject.title).toBe('this is a test');
    expect(subject.description).toBe('testing create of the things');
    expect(subject).toHaveProperty('id');
    expect(subject).toHaveProperty('status');
    expect(subject.status).toBe(TodoStatus.NOT_STARTED);
    expect(subject).toHaveProperty('createdAt');
    expect(subject).toHaveProperty('updatedAt');
  });
});