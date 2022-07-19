import { Observable } from '.';

describe('Observable', () => {
  it('runs', () => {
    expect(new Observable({})).toBeTruthy()
  })

  it('subscribe, emit, and unsubscribe work as expected', () => {
    expect.assertions(2)

    interface State {
      value: string
    }

    const initialState = {
      value: ''
    }
    const expectedValues = [
      '',
      'testing'
    ]

    const subject = new Observable<State>(initialState)
    const subscriber = subject.subscribe(({ value }) => {
      expect(value).toBe(expectedValues.shift())
    })

    subject.emit((_) => ({ value: 'testing' }))

    subscriber.unsubscribe()

    subject.emit((_) => ({ value: 'over' }))
  }) 
})