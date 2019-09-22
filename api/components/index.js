var express = require('express');
const arp= require('@network-utils/arp-lookup');


// Retrieve the corresponding IP address for a given MAC address
(async() => { 
    console.log('do mac para ip ' + await arp.toIP('3c:cf:5b:bb:74:c5')) // Or '04:a1:51:1b:12:92' (any valid MAC format)
// Result: "192.168.2.47"
 
// Retrieve the corresponding MAC address for a given IP address
    console.log('do ip para o mac ' + await arp.toMAC('192.168.0.5'))
// Result: "04:a1:51:1b:12:92"  <----- All MAC addresses are normalized to this format
})();
console.log('É um mac? ' + arp.isMAC('b0:52:16:8f:26:1b')) // true
console.log('É um mac? ' + arp.isMAC('not:a:mac')); // false

(async() => {
console.log('é dinamico ' + await arp.is('dynamic', '192.168.2.47')) // true
console.log('é dinamico ' + await arp.is('dynamic', '04:a1:51:1b:12:92'))// true
console.log('é estatico ' + await arp.is('static', '192.168.2.255')) // true
console.log('é estatico ' + await arp.is('static', 'ff:ff:ff:ff:ff:ff')) // true
console.log('é indefinido ' + await arp.is('undefined', '0.0.0.0')) // true
 
console.log(await arp.getTable()) // Utilizar essa função para pegar os macs
// Result:
//[
//    { ip: '192.168.137.255', mac: 'ff:ff:ff:ff:ff:ff', type: 'static' },
//    { ip: '224.0.0.22', mac: '01:00:5e:00:00:16', type: 'static' },
//    { ip: '224.0.0.251', mac: '01:00:5e:00:00:fb', type: 'static' },
//    { ip: '224.0.0.252', mac: '01:00:5e:00:00:fc', type: 'static' },
//    { ip: '239.255.255.250', mac: '01:00:5e:7f:ff:fa', type: 'static' },
//    { ip: '192.168.2.1', mac: '04:a1:51:1b:12:92', type: 'dynamic' },
//    { ip: '192.168.2.3', mac: '1a:b1:61:2f:14:72', type: 'dynamic' },
//    { ip: '192.168.2.255', mac: 'ff:ff:ff:ff:ff:ff', type: 'static' },
//    { ip: '224.0.0.2', mac: '01:00:5e:00:00:02', type: 'static' },
//    ...
//]


})();
