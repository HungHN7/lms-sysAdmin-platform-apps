import React from 'react';

const urlCache = new Set();
const useDynamicScript = (url: string) => {
  const [ready, setReady] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      setLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      urlCache.add(url);
      setReady(true);
      setLoading(false);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
      setLoading(false);
    };

    document.head.appendChild(element);

    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready,
    loading,
  };
};

export default useDynamicScript;
