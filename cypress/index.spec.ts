const cypressConfig: Partial<Cypress.RequestOptions> = {
    url: `users`,
    failOnStatusCode: false,
};

describe('list and create users', function () {
    it.skip('makes get request to the server', function () {
        cy.request({
            ...cypressConfig,
            method: 'GET',
        }).then((response) => {
            const status = response.status;
            const body = response.body;

            expect(status).to.eq(200);
            expect(body).to.be.an('array');
            expect(body).to.have.length(0);
        });
    });

    it('tried to create a user but will fail because of missing fields - name', function () {
        cy.request({
            ...cypressConfig,
            method: 'POST',
        }).then((response) => {
            const status = response.status;
            const body = response.body;

            expect(status).to.eq(400);
            expect(body).to.be.an('object');
            expect(body).to.have.property('message').to.eq('name is required');
        });
    });

    it('tried to create a user but will fail because of missing fields - age', function () {
        cy.request({
            ...cypressConfig,
            method: 'POST',
            body: {
                name: 'John Doe',
            },
        }).then((response) => {
            const status = response.status;
            const body = response.body;

            expect(status).to.eq(400);
            expect(body).to.be.an('object');
            expect(body).to.have.property('message').to.eq('age is required');
        });
    });

    it('tried to create a user but will fail because of missing fields - invalid age', function () {
        cy.request({
            ...cypressConfig,
            method: 'POST',
            body: {
                name: 'John Doe',
                age: 'invalid age',
            },
        }).then((response) => {
            const status = response.status;
            const body = response.body;

            expect(status).to.eq(400);
            expect(body).to.be.an('object');
            expect(body)
                .to.have.property('message')
                .to.eq('age must be a number');
        });
    });

    it('tried to create a user but will fail because of missing fields - missing email', function () {
        cy.request({
            ...cypressConfig,
            method: 'POST',
            body: {
                name: 'John Doe',
                age: 20,
            },
        }).then((response) => {
            const status = response.status;
            const body = response.body;

            expect(status).to.eq(400);
            expect(body).to.be.an('object');
            expect(body).to.have.property('message').to.eq('email is required');
        });
    });

    it('creates user successfully', function () {
        cy.request({
            ...cypressConfig,
            method: 'POST',
            body: {
                name: 'John Doe',
                age: 20,
                email: 'john.doe@gmail.com',
            },
        }).then((response) => {
            const status = response.status;
            const body = response.body;

            expect(status).to.eq(201);
            expect(body).to.be.an('object');
            expect(body).to.have.property('name').to.eq('John Doe');
            expect(body).to.have.property('age').to.eq(20);
            expect(body).to.have.property('email').to.eq('john.doe@gmail.com');
        });
    });
});
