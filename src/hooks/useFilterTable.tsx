import { PropsWithChildren, createContext, useContext, useReducer } from 'react';

const FilterTableContext = createContext({});
export type TActionFilterTable = { type: string; nextValue: unknown };

export interface IFilterTableProvider<I, A> {
  initialArg: I;
  reducer?: (state: I, action: A extends undefined ? TActionFilterTable : A) => I;
}
const reducerInit =
  <T, A>() =>
  (state: T, action: A & { type: string; nextValue: unknown }): T => {
    state[action?.type] = action.nextValue;

    return { ...state };
  };

export function FilterTableProvider<I, A = undefined>({
  initialArg,
  children,
  reducer,
}: PropsWithChildren<IFilterTableProvider<I, A>>) {
  const initReducer = reducer ? reducer : reducerInit<I, A>();

  const [state, dispatch] = useReducer(initReducer, initialArg);

  const value = { state, dispatch };

  return <FilterTableContext.Provider value={value}>{children}</FilterTableContext.Provider>;
}

export const useFilterTable = <T, A = undefined>() => {
  return useContext(FilterTableContext) as {
    state: T;
    dispatch: React.Dispatch<A extends undefined ? TActionFilterTable : A>;
  };
};
