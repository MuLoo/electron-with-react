const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;
process.env.NODE_ENV = 'development';

const client = new net.Socket();
let startElectron = false;
const tryConnect = () => {
    client.connect({ port }, () => {
        client.end();
        if (!startElectron) {
            console.log('Electron 启动中...');
            startElectron = true;
            const exec = require('child_process').exec;
            exec('npm run electron')
        }
    })
}
tryConnect();
client.on('error', error => {
    setTimeout(() => {
        tryConnect();
    }, 1000)
})