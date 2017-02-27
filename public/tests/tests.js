mocha.setup("bdd");
const expect = chai.expect;

describe("Data tests", function () {
    describe("Get materials tests", function () {
        let material1 = {
            id: 1,
            title: "material1"
        };
        let material2 = {
            id: 1,
            title: "material1"
        };
        let materials = {
            result: [material1, material2]
        };

        beforeEach(function () {
            sinon.stub(requester, "getJSON")
                .returns(new Promise((resolve, reject) => {
                    resolve(materials);
                }));
        });

        afterEach(function () {
            requester.getJSON.restore();
        });

        it("Get materials should call getJSON with correct url", function (done) {
            data.getMaterials()
                .then(() => {
                    let actual = requester.getJSON.firstCall.args[0];
                    expect(actual).to.equal("api/materials");
                })
                .then(done, done);
        })

        it("Get materials should return correct result", function (done) {
            data.getMaterials()
                .then((result) => {
                    expect(result).to.eql(materials);
                    expect(result.result[0]).to.eql(material1);
                    expect(result.result[0]).to.eql(material2);
                })
                .then(done, done);
        })
    })

    describe("Get material by id tests", function () {
        let material = {
            id: 1,
            title: "material1"
        }

        beforeEach(function () {
            sinon.stub(requester, "getJSON")
                .returns(new Promise((resolve, reject) => {
                    resolve(material);
                }));
        });

        afterEach(function () {
            requester.getJSON.restore();
        });

        it("Get material by id should call getJSON with correct url", function (done) {
            let id = "12334567";
            data.getMaterialById(id)
                .then(() => {
                    let actual = requester.getJSON.firstCall.args[0];
                    expect(actual).to.equal(`api/materials/${id}`);
                })
                .then(done, done);
        })

        it("Get material by id should return correct result", function (done) {
            let id = 1;
            data.getMaterialById(id)
                .then((result) => {
                    expect(result).to.eql(material);
                })
                .then(done, done);
        })
    })

    describe("Get user by username tests", function () {
        let user = {
            username: "pesho",
            id: "123434"
        }

        beforeEach(function () {
            sinon.stub(requester, "getJSON")
                .returns(new Promise((resolve, reject) => {
                    resolve(user);
                }));
        });

        afterEach(function () {
            requester.getJSON.restore();
        });

        it("Get user by username should call getJSON with correct url", function (done) {
            let username = "pesho";
            data.getUserByUsername(username)
                .then(() => {
                    let actual = requester.getJSON.firstCall.args[0];
                    expect(actual).to.equal(`api/profiles/${username}`);
                })
                .then(done, done);
        })

        it("Get user by username should return correct result", function (done) {
            let username = "pesho";
            data.getUserByUsername(username)
                .then((result) => {
                    expect(result).to.eql(user);
                })
                .then(done, done);
        })
    })

    describe("Register user tests", function () {
        let username = "pesho";
        let password = "1234567457";
        let user = {
            username,
            password
        }
        let resultUser = {
            username: "pesho"
        }

        beforeEach(function () {
            sinon.stub(requester, "postJSON")
                .returns(new Promise((resolve, reject) => {
                    resolve(resultUser);
                }));
            sinon.stub(validator, "validateUsername");
            sinon.stub(validator, "validatePassword");
        });

        afterEach(function () {
            requester.postJSON.restore();
            validator.validatePassword.restore();
            validator.validateUsername.restore();
        });

        it("Register user should call postJSON with correct url", function (done) {
            data.registerUser(user)
                .then(() => {
                    let actual = requester.postJSON.firstCall.args[0];
                    expect(actual).to.equal(`api/users`);
                })
                .then(done, done);
        })

        it("Register user should call postJSON with correct data", function (done) {
            data.registerUser(user)
                .then(() => {
                    let actual = requester.postJSON.firstCall.args[1];
                    expect(actual).to.eql(user);
                })
                .then(done, done);
        })

        it("Register user should return correct result", function (done) {
            data.registerUser(user)
                .then((result) => {
                    expect(result).to.eql(resultUser);
                })
                .then(done, done);
        })

        it("Register user should call validate username with correct username", function (done) {
            data.registerUser(user)
                .then(() => {
                    let actual = validator.validateUsername.firstCall.args[0];
                    expect(actual).to.equal(username);
                })
                .then(done, done);
        })

        it("Register user should call validate password with correct password", function (done) {
            data.registerUser(user)
                .then(() => {
                    let actual = validator.validatePassword.firstCall.args[0];
                    expect(actual).to.equal(password);
                })
                .then(done, done);
        })

        it("Register user should throw and not call postJSON when validation throws", function () {
            validator.validateUsername.throws();
            expect(data.registerUser).to.throw();
            expect(requester.postJSON.callCount).to.equal(0);
        })
    })

    describe("Login user tests", function () {
        let username = "pesho";
        let password = "1234567457";
        let authKey = "someAuthKey";
        let user = {
            username,
            password
        };
        let resultUser = {
            result: {
                username: "pesho",
                authKey: authKey
            }
        };

        beforeEach(function () {
            sinon.stub(requester, "putJSON")
                .returns(new Promise((resolve, reject) => {
                    resolve(resultUser);
                }));
            sinon.stub(validator, "validateUsername");
            sinon.stub(validator, "validatePassword");
        });

        afterEach(function () {
            requester.putJSON.restore();
            validator.validatePassword.restore();
            validator.validateUsername.restore();
            localStorage.clear();
        });

        it("Login user should call putJSON with correct url", function (done) {
            data.loginUser(user)
                .then(() => {
                    let actual = requester.putJSON.firstCall.args[0];
                    expect(actual).to.equal("api/users/auth");
                })
                .then(done, done);
        })

        it("Login user should call putJSON with correct data", function (done) {
            data.loginUser(user)
                .then(() => {
                    let actual = requester.putJSON.firstCall.args[1];
                    expect(actual).to.eql(user);
                })
                .then(done, done);
        })

        it("Login user should return correct result", function (done) {
            data.loginUser(user)
                .then((result) => {
                    expect(result.username).to.eql(username);
                })
                .then(done, done);
        })

        it("Login user should call validate username with correct username", function (done) {
            data.loginUser(user)
                .then(() => {
                    let actual = validator.validateUsername.firstCall.args[0];
                    expect(actual).to.equal(username);
                })
                .then(done, done);
        })

        it("Login user should call validate password with correct password", function (done) {
            data.loginUser(user)
                .then(() => {
                    let actual = validator.validatePassword.firstCall.args[0];
                    expect(actual).to.equal(password);
                })
                .then(done, done);
        })

        it("Login user should throw and not call putJSON when validation throws", function () {
            validator.validateUsername.throws();
            expect(data.loginUser).to.throw();
            expect(requester.putJSON.callCount).to.equal(0);
        })

        it("Login user should save username and key in localStorage", function (done) {
            const USERNAME_KEY = "username";
            const AUTH_KEY = "x-auth-key";
            data.loginUser(user)
                .then(() => {
                    expect(localStorage.getItem(USERNAME_KEY)).to.equal(username);
                    expect(localStorage.getItem(AUTH_KEY)).to.equal(authKey);
                })
                .then(done, done);
        });
    })

    describe("Logout user tests", function () {
        const USERNAME_KEY = "username";
        const AUTH_KEY = "x-auth-key";
        let username = "pesho";
        let authKey = "someAuthKey";

        beforeEach(function () {
            localStorage.setItem(USERNAME_KEY, username);
            localStorage.setItem(AUTH_KEY, authKey);
        });

        afterEach(function () {
            localStorage.clear();
        });

        it("Logout user should remove username and key form local storage", function (done) {
            data.logoutUser()
                .then(() => {
                    expect(localStorage.getItem(USERNAME_KEY)).to.equal(null);
                    expect(localStorage.getItem(AUTH_KEY)).to.equal(null);
                })
                .then(done, done);
        })


    })

    describe("Is logged in tests", function () {
        const USERNAME_KEY = "username";
        const AUTH_KEY = "x-auth-key";
        let username = "pesho";
        let authKey = "someAuthKey";

        afterEach(function () {
            localStorage.clear();
        });

        it("Is logged in should return username when user is logged in", function (done) {
            localStorage.setItem(USERNAME_KEY, username);
            localStorage.setItem(AUTH_KEY, authKey);

            data.isLoggedIn()
                .then((result) => {
                    expect(result.username).to.equal(username);
                })
                .then(done, done);
        })

        it("Is logged in should return empty object when user is not logged in", function (done) {
            data.isLoggedIn()
                .then((result) => {
                    expect(result).to.eql({});
                })
                .then(done, done);
        })
    })

    describe("Add comment tests", function () {
        let id = "someId";
        let text = "Text";
        const USERNAME_KEY = "username";
        const AUTH_KEY = "x-auth-key";
        let username = "pesho";
        let authKey = "someAuthKey";
        let postResult = {
            result: "someResult"
        }

        beforeEach(function () {
            sinon.stub(requester, "putJSON")
                .returns(new Promise((resolve, reject) => {
                    resolve(postResult);
                }));
            localStorage.setItem(USERNAME_KEY, username);
            localStorage.setItem(AUTH_KEY, authKey);
        });

        afterEach(function () {
            requester.putJSON.restore();
            localStorage.clear();
        });

        it("Add comment should call putJSON with correct url", function (done) {
            data.addComment(id, text)
                .then(() => {
                    let actual = requester.putJSON.firstCall.args[0];
                    expect(actual).to.equal(`api/materials/${id}/comments`);
                })
                .then(done, done);
        })

        it("Add comment should call putJSON with correct data", function (done) {
            data.addComment(id, text)
                .then(() => {
                    let actual = requester.putJSON.firstCall.args[1];
                    expect(actual).to.eql({ "commentText": text });
                })
                .then(done, done);
        })

        it("Add comment should call putJSON with correct headers", function (done) {
            data.addComment(id, text)
                .then(() => {
                    let actual = requester.putJSON.firstCall.args[2];
                    expect(actual).to.eql({ [AUTH_KEY]: authKey });
                })
                .then(done, done);
        })

        it("Add comment should return correct result", function (done) {
            data.addComment(id, text)
                .then((result) => {
                    expect(result.result).to.eql("someResult");
                })
                .then(done, done);
        })

        it("Add comment should throw when no user is not logged in and not call putJSON", function (done) {
            localStorage.clear();
            data.addComment(id, text)
                .then(() => {
                    throw new Error("Should not enter here");
                })
                .catch((e) => {
                    expect(requester.putJSON.callCount).to.equal(0);
                    done();
                })
        })

    })

      describe("Add to category tests", function () {
        let id = "someId";
        let category = "wacthed";
        const USERNAME_KEY = "username";
        const AUTH_KEY = "x-auth-key";
        let username = "pesho";
        let authKey = "someAuthKey";
        let postResult = {
            result: "someResult"
        }

        beforeEach(function () {
            sinon.stub(requester, "postJSON")
                .returns(new Promise((resolve, reject) => {
                    resolve(postResult);
                }));
            localStorage.setItem(USERNAME_KEY, username);
            localStorage.setItem(AUTH_KEY, authKey);
        });

        afterEach(function () {
            requester.postJSON.restore();
            localStorage.clear();
        });

        it("Add to category should call postJSON with correct url", function (done) {
            data.addToCategory(id, category)
                .then(() => {
                    let actual = requester.postJSON.firstCall.args[0];
                    expect(actual).to.equal("api/user-materials");
                })
                .then(done, done);
        })

        it("Add to category should call postJSON with correct data", function (done) {
            data.addToCategory(id, category)
                .then(() => {
                    let actual = requester.postJSON.firstCall.args[1];
                    expect(actual).to.eql({ id, category});
                })
                .then(done, done);
        })

        it("Add to category should call postJSON with correct headers", function (done) {
            data.addToCategory(id, category)
                .then(() => {
                    let actual = requester.postJSON.firstCall.args[2];
                    expect(actual).to.eql({ [AUTH_KEY]: authKey });
                })
                .then(done, done);
        })

        it("Add to category should return correct result", function (done) {
            data.addToCategory(id, category)
                .then((result) => {
                    expect(result.result).to.eql("someResult");
                })
                .then(done, done);
        })

        it("Add to category should throw when no user is not logged in and not call postJSON", function (done) {
            localStorage.clear();
            data.addToCategory(id, category)
                .then(() => {
                    throw new Error("Should not enter here");
                })
                .catch((e) => {
                    expect(requester.postJSON.callCount).to.equal(0);
                    done();
                })
        })

    })
})

mocha.run();