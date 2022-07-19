import { Observable } from '~/lib/utils/observable';
import { Todo, TodoStatus } from '~/lib/models/todo.d';

import { Contract } from './.d';

interface State {
  todos: Todo[];
}

class MemoryTodoProxy
extends Observable<State>
implements Contract {
  async create(
    {title, description}: Pick<Todo, 'title' | 'description'>
  ): Promise<Todo> {
    const now = new Date().toString()
    const todo: Todo = {
      id: String(Math.floor(Math.random() * 10000)),
      title,
      description,
      createdAt: now,
      updatedAt: now,
      status: TodoStatus.NOT_STARTED
    }

    this.emit(({ todos }) => ({
      todos: [...todos, todo]
    }))

    return todo
  }

  async search(params?: Partial<Pick<Todo, 'title' | 'description' | 'status' | 'id'>> | undefined): Promise<Todo[]> {
    /**
     * can search by id, title, description, status, createdAt, and updatedAt
     */
    return this.state.todos
      .filter(({ id }) => params?.id ? id.includes(params.id) : true)
      .filter(({ status }) => params?.status ? status === params.status : true)
      .filter(({ title }) => (
        params?.title ? title.includes(params.title) : true)
      ) .filter(({ description }) => (
        params?.description ? description.includes(params.description) : true
      ))
  }

  async update(id: string, params: Partial<Todo>): Promise<Todo> {
    /**
     * change the provided parameters,
     * update updatedAt
     */
    const index = this.state.todos.findIndex(todo => todo.id === id)    
    const subject = this.state.todos[index]
    const now = new Date().toString()
    const update = Object.assign({}, subject, params, {
      updatedAt: now
    })


    this.emit(({ todos }) => {
      todos[index] = update

      return { todos }
    })

    return this.state.todos[index]
  }

  async delete(ids?: string[] | string | undefined): Promise<boolean> {
    if (!ids) {
      this.emit(() => ({ todos: [] }))
    } else {
      if (ids.length) {
        this.emit(({ todos }) => ({
          todos: todos.filter((todo) => !ids.includes(todo.id))
        }))
      } else {
        this.emit(({ todos }) => ({
          todos: todos.filter((todo) => todo.id !== ids)
        }))
      }
    }
  
    return true
  }
}

export default new MemoryTodoProxy({ todos: [] })