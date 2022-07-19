export type Observer<State> = {
  id: Symbol;
  handle: (state: State) => any
}

export type Subscriber = {
  unsubscribe: () => void;
}

export default interface Observable<State> {
  state: State;

  // private observers array
  [Symbol]: Array<Observer<State>>;

  emit: (action: (state: State) => State) => Observable<State>;
  subscribe: (handle: Observer<State>['handle']) => Subscriber;
  // private unsubscribe: (id: Observer<State>['id']) => void;
}