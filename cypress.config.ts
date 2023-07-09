import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
  		viewportWidth: 1440,
		viewportHeight: 900,
		chromeWebSecurity: false,
		baseUrl: 'https://www.saucedemo.com/',
		video: false,
		env: {
			username: 'standard_user',
			password: 'secret_sauce',
		},
    setupNodeEvents(on, config) {
      // implement node event listeners here
	  require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});
