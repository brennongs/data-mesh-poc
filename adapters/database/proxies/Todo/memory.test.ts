import { TodoStatus } from '~/lib/models/todo.d';

import PROXY from './memory';

describe('Proxies:Todo:InMemory', () => {
  beforeEach(async () => {
    await PROXY.delete()
  })

  it('create', async () => {
    expect((await PROXY.search()).length).toBe(0);

    const result = await PROXY.create({
      title: 'test',
      description: 'testing'
    });

    expect(result.title).toBe('test');
    expect(result.description).toBe('testing');
    expect(result.status).toBe(TodoStatus.NOT_STARTED);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  it('search, first', async () => {
    await Promise.all([1,2,3].map((int) => PROXY.create({
      title: `test-${int}`,
      description: `testing: todo number ${int}`
    })));

    expect((await PROXY.search()).length).toBe(3);
    expect((await PROXY.search({ title: 'test' })).length).toBe(3);
    expect((await PROXY.search({ title: 'test', description: '3' })).length)
      .toBe(1);
    expect((await PROXY.search({ title: 'test', description: '4' })).length)
      .toBe(0);
    expect(await PROXY.first({ title: 'test' })).toBeTruthy();
  });

  it('update', async () => {
    const subject = await PROXY.create({
      title: 'test',
      description: 'testing: todo number 1'
    });
    const result = await PROXY.update(subject.id, {
      title: 'still a test',
      description: 'testing: updated!'
    })

    expect(result.id).toEqual(subject.id);
    expect(result.title).not.toEqual(subject.title);
    expect(result.description).not.toEqual(subject.description);
    expect(result.title).toBe('still a test');
    expect(result.description).toBe('testing: updated!');
  });

  it('delete', async () => {
    const subject = await PROXY.create({
      title: 'test',
      description: 'testing: todo number 1'
    })

    expect(await PROXY.delete(subject.id)).toBe(true)
    expect((await PROXY.search({ title: 'test' })).length).toBe(0)

    await Promise.all([1,2,3].map((int) => PROXY.create({
      title: `test-${int}`,
      description: `testing: todo number ${int}`
    })))

    expect((await PROXY.search({ title: 'test' })).length).toBe(3)
    expect(await PROXY.delete()).toBe(true)
    expect((await PROXY.search({ title: 'test' })).length).toBe(0)
  });
});
