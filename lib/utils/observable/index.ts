import Contract, {
  Observer,
  Subscriber
} from './.d';

const OBSERVERS = Symbol('observers');
const UNSUBSCRIBE = Symbol('unsubscribe');

export class Observable<State> implements Contract<State> {
  state: State;

  private [OBSERVERS]: Array<Observer<State>> = []

  constructor(state: State) {
    this.state = { ...state };
  }

  emit(action: (state: State) => State) {
    if (action) {
      const result = action(this.state);
      if (result) this.state = {...result};
    }

    this[OBSERVERS].forEach(observer => {
      observer.handle(this.state);
    })

    return this;
  };

  subscribe(handle: (state: State) => any): Subscriber {
    const observer: Observer<State> = {
      id: Symbol('id'),
      handle
    };

    this[OBSERVERS].push(observer);
    observer.handle(this.state);

    return {
      unsubscribe: () => {
        this[UNSUBSCRIBE](observer.id);
      }
    }
  }

  private [UNSUBSCRIBE](id: Symbol): void {
    this[OBSERVERS] = this[OBSERVERS].filter(observer => observer.id !== id)
  };
}
