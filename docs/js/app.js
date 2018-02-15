App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        return App.initWeb3();
    },

    initWeb3: function () {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // Set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract();

    },

    initContract: function () {
        // Get the necessary contract artifact files and instantiate with truffle-contract.
        $.getJSON('TweetWallet.json', function (data) {
            var TweetWalletArtifact = data;
            App.contracts.TweetWallet = TruffleContract(TweetWalletArtifact);
            // Set the provider for our contract.
            App.contracts.TweetWallet.setProvider(App.web3Provider);
        });

        $.getJSON('TweetWalletParent.json', function (data) {
            var TweetWalletParentArtifact = data;
            App.contracts.TweetWalletParent = TruffleContract(TweetWalletParentArtifact);
            App.contracts.TweetWalletParent.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '#createButton', App.handleCreate);

        $(document).on('click', '#submitClaim', function(event) {
            App.handleClaim(event, $(this));
        });

        $(document).on('click', '#sendButton', function(event)
        {
            App.handleSend(event, $(this));
        });

        $(document).on('click', '.open-claim-modal', function () {
            // Populate
            var username = $(this).closest('tr').find('td:eq(0)').text();
            var address = $(this).closest('tr').find('td:eq(1)').text();
            $('#username-fill > p').text( username );
            $('#address-fill > p').text( address );
        });

        $(document).on('click', '.open-send-modal', function () {
            // Populate
            var username = $(this).closest('tr').find('td:eq(0)').text();
            var address = $(this).closest('tr').find('td:eq(1)').text();
            $('#username-fill-2 > p').text( username );
            $('#address-fill-2 > p').text( address );
        });

        // Wait so contracts can load ...
        setTimeout(function () {
            return App.getBalances();
        }, 3000);

    },

    handleCreate: function (event) {
        event.preventDefault();
        var username = $('#username').val();

        console.log('Username = ' + username);
        var tweetWalletParentInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];
            App.contracts.TweetWalletParent.deployed().then(function (instance) {
                tweetWalletParentInstance = instance;
                return tweetWalletParentInstance.createTweetWallet(username);
            })

                .then(function (result) {
                    alert('Smart contract created.');
                    $('#balances-table').find("tr:gt(0)").remove();
                    return App.getBalances();

                }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    handleClaim: function (event, button) {
        event.preventDefault();
        var contractAddress = $('#address-fill > p').text().toString().trim();
        var status = $('#status-id').val().toString();
        console.log(status);
        console.log(contractAddress);

        var tweetWalletInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            App.contracts.TweetWallet.at(contractAddress).then(function (instance) {
                tweetWalletInstance = instance;

                return tweetWalletInstance.claim(status);
            }).then(function (result) {
                alert('Transfer processed. Please allow several blocks to be mined and then re-check balances.');
                $('#claimModal').modal('toggle');
                $('#balances-table').find("tr:gt(0)").remove();
                return App.getBalances();
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    handleSend: function (event, button) {
        event.preventDefault();

        var addressToSendTo = $('#inputEmail4').text();
        addressToSendTo = addressToSendTo.toString().trim();
        var amountToSend = $('#amount-to-send').val();

        console.log(addressToSendTo);

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            account = accounts[0];

            var send = web3.eth.sendTransaction({from: account, to: addressToSendTo, value: web3.toWei(amountToSend, "ether")},function(error, result) {
                    if (error) {
                   console.log(error);
                } else {
                    $('#balances-table').find("tr:gt(0)").remove();
                    $('#sendModal').modal('toggle');
                    return App.getBalances();
                }
            });

        });
    },

    getBalances: function () {
        console.log('Getting balances ... ');
        var tweetWalletParentInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            // Here if needed.
            var account = accounts[0];

            // First get parent address array
            App.contracts.TweetWalletParent.deployed().then(function (instance) {
                tweetWalletParentInstance = instance;

                return tweetWalletParentInstance.getAddresses.call();
            }).then(function (result) {
                var addresses = result;

                console.log(addresses.toString());

                $('#my-token-balances').html("");

                var parentContractAddress = tweetWalletParentInstance.address;
                console.log(parentContractAddress);
                $('#parent-contract-address').text(parentContractAddress);

                App.processArray(addresses, App.populateGrid);
            });
        })
    },

    processArray: function(items, process) {
        var todo = items.concat();

        setTimeout(function() {
            process(todo.shift());
            if(todo.length > 0) {
                setTimeout(arguments.callee, 25);
            }
        }, 25);
    },

    populateGrid: function (address) {
        var table = document.getElementById("balances-table");

        var row = table.insertRow();
        var usernameCell = row.insertCell(0);
        var addressCell = row.insertCell(1);
        var balanceCell = row.insertCell(2);
        var claimCell = row.insertCell(3);
        var sendCell = row.insertCell(4);

        var addressString = address.toString();
        var url = "https://ropsten.etherscan.io/address/" + addressString;

        var spanString = "<span> <a href=\'" + url + "\' target=\'_blank_\'>" + addressString + "</a> </span>";

        addressCell.innerHTML = spanString;

        usernameCell.innerHTML = "Loading ...";
        balanceCell.innerHTML = "Loading ...";

        // And get username.
        console.log("getting contract instance at " + new Date().getTime());
        App.contracts.TweetWallet.at(address)
            .then(function (instance) {
                console.log("getting username at " + new Date().getTime());
                instance.getUsername.call()
                    .then(function(result) {
                        console.log("got username at " + new Date().getTime());
                        var usernameString = result.toString();
                        var url = "https://twitter.com/" + usernameString;
                        var spanString2 = "<span> <a href=\'" + url + "\' target=\'_blank_\'>" + usernameString + "</a> </span>";
                        usernameCell.innerHTML = spanString2;
                    });

                let bountyAmount = web3.fromWei(web3.eth.getBalance(address, function (error, result) {
                    if (!error) {
                        var formattedAsEth = web3.fromWei(result);
                        balanceCell.innerHTML = formattedAsEth.toString();
                        claimCell.innerHTML = '<span <button type="button" class="open-claim-modal btn btn-primary" data-toggle="modal" data-target="#claimModal" >Claim ether</button> </span>';
                        sendCell.innerHTML = ' <span <button type="button" class="open-send-modal btn btn-primary" data-toggle="modal" data-target="#sendModal">Send ether</button> </span>';
                    }
                    else {
                        console.error(error);
                    }
                }));
            });
    }
}

$(function() {
  $(window).load(function() {
	App.init();
  });
});