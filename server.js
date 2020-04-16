'use strict'

const app = require('./bin/index');

app.listen(process.env.port || 3000, (err) => {
    console.log('==> [+] Server rodando');
    if(err) {
        console.log('==> [-] Aplicação');
    } else {
        console.log('==> [+] Aplicação');
    }
})