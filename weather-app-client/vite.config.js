import react from '@vitejs/plugin-react';
import path from 'path';  // Add this import
import { defineConfig, loadEnv } from 'vite';

// Export the function that takes the mode parameter
export default defineConfig(({ mode }) => {
  // Load the environment variables based on the mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    assetsInclude: ['**/*.lottie'],
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': env,  // Pass the environment variables to process.env
    },
    build: {
      outDir: 'dist',  // Make sure the output directory is correct
    },
  };
});
