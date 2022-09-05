const Hapi = require('@hapi/hapi')
const user = require('./route/alluser')


const server = Hapi.server({
    host: 'localhost',
    port: 5000
})


server.route(user);

const start = async () => {
    await server.start();
    console.log(' server has been running at ' + server.info.uri)
}

start();