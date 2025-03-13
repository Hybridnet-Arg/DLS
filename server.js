const express = require('express');
const https = require('https');
const fs = require('fs');
const next = require('next');

//const dev = process.env.NODE_ENV !== 'production';
//const app = next({ dev });
const prod = process.env.NODE_ENV = 'production';
const app = next({ prod });
const handle = app.getRequestHandler();

const httpsOptions = {

   //cert: fs.readFileSync('cert/7d8baa0b33aed385.pem'),    
  // key: fs.readFileSync('cert/private.key'),
  cert: fs.readFileSync('cert/dms.pem'),
  key: fs.readFileSync('cert/dms.key'),

};

app.prepare().then(() => {
    const server = express();

    server.use((req, res) => {
        try {
            handle(req, res);
        } catch (error) {
            console.error('Error:', error);
            // Puedes enviar una respuesta de error al cliente si lo deseas.
            res.status(500).send('Ocurrió un error en el servidor.');
        }
    });

    https.createServer(httpsOptions, server).listen(443, (err) => {
        if (err) {
            console.error('Error al iniciar el servidor HTTPS:', err);
        } else {
            console.log('Servidor HTTPS en funcionamiento en el puerto 443');
        }

    });
});