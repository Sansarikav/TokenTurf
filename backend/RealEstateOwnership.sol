// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstateCoOwnership {
    address public owner;
    uint256 public totalTokens;
    uint256 public tokenPrice;
    string public propertyName;

    mapping(address => uint256) public balances;
    address[] public investors;

    event TokensPurchased(address indexed buyer, uint256 amount);
    event RentDistributed(uint256 amount);
    event TokensSold(address indexed seller, uint256 amount);

    constructor(string memory _propertyName, uint256 _totalTokens, uint256 _tokenPrice) {
        owner = msg.sender;
        propertyName = _propertyName;
        totalTokens = _totalTokens;
        tokenPrice = _tokenPrice;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    
    function purchaseTokens(uint256 amount) external payable {
        require(msg.value == amount * tokenPrice, "Incorrect Ether sent");
        require(totalTokens >= amount, "Not enough tokens available");

        if (balances[msg.sender] == 0) {
            investors.push(msg.sender);
        }
        balances[msg.sender] += amount;
        totalTokens -= amount;

        emit TokensPurchased(msg.sender, amount);
    }

    
    function distributeRent(uint256 totalRent) external onlyOwner {
        require(totalRent > 0, "Invalid rent amount");

        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint256 share = (balances[investor] * totalRent) / (totalTokens + sumInvestorTokens());
            payable(investor).transfer(share);
        }

        emit RentDistributed(totalRent);
    }

    
    function sellTokens(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");

        balances[msg.sender] -= amount;
        totalTokens += amount;
        payable(msg.sender).transfer(amount * tokenPrice);

        emit TokensSold(msg.sender, amount);
    }

    
    function sumInvestorTokens() private view returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < investors.length; i++) {
            sum += balances[investors[i]];
        }
        return sum;
    }
}