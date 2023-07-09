# Automated tests

The folder contains automated frontend tests which are implemented using the [Cypress] framework with TypeScript, with POM structure and JSDoc.

To run tests against Chrome browser:
```bash
npm run testChrome
```
To run tests against Edge browser:
```bash
npm run testEdge
```
To optionally run against other environments, by specifying `configFile` parameter (can be changed at package.json):
```bash
npm run test:qa
```
To run a single test in a test suite put [.only] before the definition of the test:

```javascript
it.only('I can change the role of the user', () => {});
```

Grep plugin: to filter out tests by a name use `grep`. The following example runs only those tests that contains "edit a user" in their title:

```bash
npx cypress run --env grep="Order flow"
```

To filter out tests by a tag use `grepTags`. The following example runs only tests that are tagged with the tag `@critical`:

```bash
npx cypress run --env grepTags=@critical
```