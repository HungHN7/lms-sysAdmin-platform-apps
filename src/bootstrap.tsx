import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'src/assets/styles/styles.css';
import 'src/assets/styles/fonts/aeonik-fonts/fonts-aeonik.css';

import App from './App';
import StoreProvider from './providers/StoreProvider';
import { ComponentInject } from './shared/ui/component-inject';
import { ThemeProvider } from './providers/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const RenderedApp = ComponentInject({
  providers: [StoreProvider, ThemeProvider, BrowserRouter],
  containers: [],
  template: [],
  services: [],
  app: App,
});
root.render(<RenderedApp />);
