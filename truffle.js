module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
        localhost: {
            host: "localhost",
            port: 8546,
            network_id: "*"
        },
        ropsten: {
            host: "localhost",
            port: 8545,
            network_id: "3"
        }
    }
};
