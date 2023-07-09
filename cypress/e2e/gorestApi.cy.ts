describe('Gorest API user flow', () => {

    before(() => {
        const token = '011279f845ab2266cd9c3d989c2ae9dd5c19281777ff88499dac6936e61af4d1';
        Cypress.env('token', token);
    });

    it('I can retrieve users', function () {
        cy.request({
            method: 'GET',
            headers: {
                authorization: `Bearer ${Cypress.env('token')}`
            },
            url: `https://gorest.co.in/public/v2/users`,
        }).then((response) => {
            expect(response.status).to.eql(200);
        });
    });

    it('I can create, update and delete a user', function () {
        cy.wrap(null).then(() => {
            cy.request({
                method: 'POST',
                headers: {
                    authorization: `Bearer ${Cypress.env('token')}`
                },
                url: `https://gorest.co.in/public/v2/users`,
                body: { "name": "Tenali Ramakrishna", "gender": "male", "email": "ramakrishna999@15ce.com", "status": "active" }
            }).then((response) => {
                Cypress.env('userId', response.body.id);
                expect(response.status).to.eql(201);
            });
        });

        cy.wrap(null).then(() => {
            cy.request({
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${Cypress.env('token')}`
                },
                url: `https://gorest.co.in/public/v2/users/${Cypress.env('userId')}`,
                body: { "name": "Tenali Ramakrishna", "gender": "male", "email": "ramakrishna999@15ce.com", "status": "inactive" }
            }).then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body.status).to.be.equal('inactive');
            });
        });

        cy.wrap(null).then(() => {
            cy.request({
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${Cypress.env('token')}`
                },
                url: `https://gorest.co.in/public/v2/users/${Cypress.env('userId')}`,
            }).then((response) => {
                expect(response.status).to.eql(204);
            });
        });
    });
});