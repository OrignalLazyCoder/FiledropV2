pragma solidity ^0.5.0;

contract IPFS{
    
    address owner;
    
    constructor() public{
        owner = msg.sender;
    }
    
    function getOwner() public view returns(address){
        return owner;
    }
    
    mapping(address => mapping(uint256 => string)) userFiles;
    mapping(address => uint256) userFilesCount;
    uint256 totalFilesCount;
    
    struct sharedFile{
        address ownerOfFile;
        string ipfsHash;
    }
    
    mapping(address => mapping(uint256 => sharedFile)) sharedFilesWithuser;
    mapping(address => uint256) sharedWithUserFileCount;
    
    function uploadAfile(string memory _ipfsHash) public{
        userFilesCount[msg.sender] = userFilesCount[msg.sender] + 1;
        userFiles[msg.sender][userFilesCount[msg.sender]] = _ipfsHash;
    }
    
    function fetchTotalCount() public view returns(uint256){
        return userFilesCount[msg.sender];
    }
    
    function fetchSharedWithUserFileCount() public view returns(uint256){
        return sharedWithUserFileCount[msg.sender];
    }
    
    function fetchAFile(uint256 _index) public view returns(string memory){
        return userFiles[msg.sender][_index];
    }
    
    function shareAFile(address _usersAddress,string memory _ipfsHash) public{
        sharedFile memory file = sharedFile(msg.sender,_ipfsHash);
        sharedWithUserFileCount[_usersAddress] = sharedWithUserFileCount[_usersAddress] + 1;
        sharedFilesWithuser[_usersAddress][sharedWithUserFileCount[_usersAddress]] = file;
    }
    
    function fetchASharedFile(uint256 _index) public view returns(address, string memory){
        return (sharedFilesWithuser[msg.sender][_index].ownerOfFile, sharedFilesWithuser[msg.sender][_index].ipfsHash);
    }
    
}