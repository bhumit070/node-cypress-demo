import { defineConfig } from 'cypress';

// write a config for cypress node js
export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000/',
        supportFile: './cypress/**/*.ts',
        specPattern: './cypress/**/*.spec.ts',
        video: false,
        screenshotsFolder: false,
    },
    experimentalStudio: true,
    experimentalSourceRewriting: true,
    retries: 0,
});
