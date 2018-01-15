// module.exports = {
//   // See <http://truffleframework.com/docs/advanced/configuration>
//   // to customize your Truffle configuration!
//     networks: {
//         localhost: {
//             host: "localhost",
//             port: 8546,
//             network_id: "*"
//         },
//         ropsten: {
//             host: "localhost",
//             port: 8545,
//             network_id: "3"
//         }
//     }
// };
module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        ropsten:  {
            network_id: 3,
            host: "localhost",
            port:  8545,
            gas:   4100000
        }
    },
    rpc: {
        host: 'localhost',
        post:8080
    }
};