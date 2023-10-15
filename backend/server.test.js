const chai = require('chai');
const chaiHttp = require('chai-http');
const https = require('https');
const fs = require('fs');
const app = require('./server'); // Assuming your server file is named 'server.js'

const expect = chai.expect;
chai.use(chaiHttp);

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // For self-signed certificates in development
});

describe('Server API Tests', () => {
    it('should respond with a 200 status code for /search', (done) => {
        chai
            .request(app)
            .get('/search?query=Tag')
            .agent(httpsAgent) // Use the HTTPS agent for self-signed certificate
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should respond with an array of results for /search', (done) => {
        chai
            .request(app)
            .get('/search?query=Rolex')
            .agent(httpsAgent) // Use the HTTPS agent for self-signed certificate
            .end((err, res) => {
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should respond with matching search results for /search', (done) => {
        chai
            .request(app)
            .get('/search?query=Rolex')
            .agent(httpsAgent) // Use the HTTPS agent for self-signed certificate
            .end((err, res) => {
                expect(res.body).to.deep.include({ id: 1, name: 'Rolex Submariner' });
                // Add more expectations for other results if needed
                done();
            });
    });

    it('should respond with a 404 status code for an invalid route', (done) => {
        chai
            .request(app)
            .get('/invalid-route')
            .agent(httpsAgent) // Use the HTTPS agent for self-signed certificate
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    // Add more test cases to cover other endpoints and scenarios as needed
});
