export default class Auth {
    /**
     * Authenticate the user via UI and check the status
     * @param {string} username username
     * @param {string} password password
     * @example
     *    auth.login('admin', 's3cr3t!');
     * @returns {void} void
     */
    login(
        username: string = Cypress.env('username'),
        password: string = Cypress.env('password')): void {

        cy.visit(`/`);
        cy.getDataTest('username').type(username);
        cy.getDataTest('password').type(password);
        cy.getDataTest('login-button').click();

        cy.getCookie('session-username').then(cookie => {
            expect(cookie.value).be.eq(username);
        })
    }
}
