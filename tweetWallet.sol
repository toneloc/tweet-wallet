/*
   TweetWallet - This contract allows you to claim ether via a tweet.
*/
pragma solidity ^0.4.0;
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";
import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract TweetWallet is usingOraclize {
    using strings for *;
    
    string username;

    event newOraclizeQuery(string description);
    event newTweetInfo(string tweetInfo);

    function TweetWallet(string _username) payable {
        username = _username; // Only this username may claim the funds.
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        newTweetInfo(result);
        string memory redemptionTweet = result; 
        
        // Verify syntax
        if (bytes(redemptionTweet).length > 103) {
            throw;
        }
        
        // Split syntax in two addresses.
        var claimerAddress = redemptionTweet.toSlice();
        var addressToVerify = claimerAddress.split(",".toSlice());
        
        string memory addressToVerifyString = addressToVerify.toString();
        string memory contractAddress = toString(this);
        string memory claimerAddressString = claimerAddress.toString();
        
        address addr = parseAddr(claimerAddressString);
        
        
        // Take first addresss and verify that it is equal to
        // the addresss of the contract itself.
        if (keccak256(addressToVerify) != keccak256(contractAddress)) {
            throw;
        }
        else {
            uint amount = this.balance;
            addr.send(amount);
        }
        
    }
    
    function claim(string _statusId) payable {
        // String will be prefix + username + statusId + suffix
        string memory prefix = "https://twitter.com/";
        string memory suffix = ").xpath(//*[contains(@class, 'tweet-text')]/text())";
        
        bytes memory _ba = bytes(prefix);
        bytes memory _bb = bytes(username);
        bytes memory _bc = bytes(_statusId);
        bytes memory _bd = bytes(suffix);
        
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length);
        bytes memory babcd = bytes(abcde);
       
        uint k = 0;
        
        for (uint i = 0; i < _ba.length; i++) babcd[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcd[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcd[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcd[k++] = _bd[i];
        
        string memory url = string(babcd);

        if (oraclize_getPrice("URL") > this.balance) {
            newOraclizeQuery("Oraclize query was not sent. Please add some ETH to cover the query fee.");
        } 
        else {
            newOraclizeQuery("Oraclize query sent. Please stand by ..");
            oraclize_query("URL", url);
        }   
    }
    
    function toString(address x) returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++) 
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }
    
}

