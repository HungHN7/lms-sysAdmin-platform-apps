const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  appName: process.env.APP_NAME,
  appFileName: process.env.APP_FILE_NAME,
  PUBLIC_PATH: process.env.HOST_ENTRY,
  PORT: process.env.HOST_ENTRY_PORT,
  exposes: {
    './hooks/useStore': './src/hooks/useStore.ts',
    './hooks/useStoreSelector': './src/hooks/useStoreSelector.ts',
    './providers/StoreProvider': './src/providers/StoreProvider.tsx',
    './icons': './src/assets/icons/index.ts',
    './components': './src/components/index.ts',
    './components/ui': './src/components/ui/index.ts',
    './shared': './src/shared/index.ts',
    './utils/classnames': './src/utils/classnames',
    './hooks/useToast': './src/hooks/useToast.ts',
    './providers/ToastProvider': './src/providers/ToastProvider.tsx',
    './routes/private-router': './src/routes/private-router/index.tsx',
    './components/layout': './src/components/layout/index.tsx',
    './routes/globalRouter': './src/routes/globalRouter.ts',
    './hooks': './src/hooks/index.ts',
  },
};
