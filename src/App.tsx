import Router from 'src/routes/routes';
import ToastProvider from 'src/providers/ToastProvider';
import { useEffect } from 'react';
import favicon from 'src/assets/images/favicon.png';

const App = () => {
  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = `${favicon}`;
  }, []);
  return (
    <div className='min-h-screen bg-background'>
      <ToastProvider duration={2500} />
      <Router />
    </div>
  );
};

export default App;
