# WebStorm
WebStorm is a source where you can send packets, floods over Layer4 and Layer7 applications, WebStorm is not a DDoS tool but a DOS. This means that this is only for the tests. 
<br>
With WebStorm, you are supposed to use it for testing purposes only and for good purposes.
<br>
I am not responsible for how you use WebStorm.

# Installation
Please install Node.js on your system. The latest version of Node.js is compatible with WebStorm
<br>
git clone https://github.com/DeweyDv/WebStorm.git && cd WebStorm && npm i && node .

<br>

# Layer 7 💣
- GET | Send GET requests with your own packet size and quantities of your choice.

# Layer 4 🧨
- CNC | Send open connections using the TCP protocol > host
- UDP | Send UDP packets with own rate and packet size.
- TCP | Send TCP packets with own rate and packet size.

# Layer 3 🔥
- ICMP | Send ping request floods


# Methods [Info]
<b style="color: red;">GET - </b> Send normal requests with the GET method, which is based on the TCP protocol, which does not require much network to send many requests, i recommend having a good processor so that you can handle and send all requests, if you send enough HTTP(s) requests then your remote host will not be able to handle the amount where the host can't reach its network or the processor can't handle all the requests.

<b style="color: red;">CNC - </b> With the CNC method you can send thousands to hundreds of thousands of open TCP connections. I recommend using multiple servers and a good stable network with enough RAM memory if you want to achieve millions of connections, when you are on an amount of connections and this does not increase, your system has a limit of a certain amount of maximum connections. It is also possible that the processor or hardware cannot handle it and no new TCP connections will be created after this.

<b style="color: red;">UDP - </b> UDP is a powerful method to take down a host by overloading their network with your network by sending large and fast UDP packets, if you send enough traffic the host may fail and will be suspended by the provider. I recommend not to hit public IPV4 servers with this, this is only for testing and good purposes. For this you only need a powerful and stable network where you can send a lot of packchain and also the processor that has to act to create and send the packchain in your system.

<b style="color: red;">TCP - </b> Using the TCP protocol you can send fast packets. This works just like UDP except it uses the TCP protocol. The difference is that TCP allows you to send packets to a host more quickly. It is also possible to adjust the delay, size, workers to your own choice.

<b style="color: red;">MCP - </b> MCP is a method for minecraft, very useful and powerful. This is based on the layer3 application request method, send a handshake packet requesting the status of the host if this example is a minecraft server. When the host receives your handshake packet, it will send a packet (the status) back to the sender. This can also work on normal hosts but this will work with less effect than a minecraft server and MCP is intended for minecraft servers to request their status with a packet.

<b style="color: red;">ICMP - </b> [coming soon back]



