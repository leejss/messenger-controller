export interface BaseState {
  name?: string;
}

export type Listener<S> = (state: S) => void;

export class Controller<S extends BaseState> {
  defaultState = {} as S;

  private readonly initialState: S;
  private internalState: S = this.defaultState;
  private internalListeners = new Set<Listener<S>>();
  name = "Controller";

  constructor(state: S) {
    this.initialState = state;
  }

  initiallize() {
    this.internalState = this.defaultState;
    this.update(this.initialState);
    return this;
  }

  /**
   *  Updates controller state
   *  @param state - new state
   *  @param overwrite - flag to overwrite state
   *  */
  update(state: Partial<S>, overwrite = false) {
    this.internalState = overwrite ? (state as S) : Object.assign({}, this.internalState, state);
    this.notify();
  }

  notify() {
    for (const L of this.internalListeners) {
      L(this.internalState);
    }
  }
  subscribe(L: Listener<S>) {
    if (this.internalListeners.has(L)) {
      return;
    }
    this.internalListeners.add(L);
  }

  unsubscribe(L: Listener<S>) {
    this.internalListeners.delete(L);
  }

  get state() {
    return this.internalState;
  }
}
