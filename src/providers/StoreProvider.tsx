import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

export default function StoreProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
