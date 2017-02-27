/* globals require console */

const config = require('./config');

let data = require('./data')(config.connectionString);

let controllers = require('./controllers')({ data });

let app = require('./config/express')({ data });

require('./routers')({ app, data, controllers });

app.listen(config.port, () => console.log(`App running at: ${config.port}`));
