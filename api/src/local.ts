import server from './server';

server().then(app => app.listen(3001, () => console.log('listening on port 3001...')));