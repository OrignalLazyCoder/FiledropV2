pragma solidity ^0.5.0;

contract Filedrop{
    address owner;
    
    struct userFile{
        string hash;
        string fileName;
        uint256 creationTime;
        bool isPublic;
        address fileOwner;
    }
    
    struct sharedFile{
        string hash;
        string fileName;
        uint256 creationTime;
        uint256 sharedTime;
        address fileOwner;
    }
    
    mapping(address => mapping(uint256 => userFile)) userUploadedFiles;
    mapping(address => uint256) userUploadedFilesCount;
    
    mapping(address => mapping(uint256 => sharedFile)) filesSharedWithUser;
    mapping(address => uint256) filesSharedWithUserCount;
    
    uint256 publicFilesCount;
    mapping(uint256 => userFile) publicFiles;
    
    mapping(address => mapping(uint256 => string)) userActivity;
    mapping(address => uint256) userActivityCount;
    
    constructor() public{
        owner = msg.sender;
    }

    function getOwner() public view returns(address){return owner;}
    
    function addUserActivity(string memory _activity) internal{
        userActivityCount[msg.sender] = userActivityCount[msg.sender] + 1;
        userActivity[msg.sender][userActivityCount[msg.sender]] = _activity;
    }
    
    function fetchUserActivity(uint256 _index) public view returns(string memory){
        return userActivity[msg.sender][_index];
    }
    
    function fetchFilesSharedWithUserCount() public view returns(uint256){
        return filesSharedWithUserCount[msg.sender];
    }
    
    function fetchUserUploadedFilesCount() public view returns(uint256){
        return userUploadedFilesCount[msg.sender];
    }
    
    function fetchPublicFileCount() public view returns(uint256){
        return publicFilesCount;
    }
    
    function fetchUserActivityCount() public view returns(uint256){
        return userActivityCount[msg.sender];
    }
    
    function uploadAFile(
        string memory _hash,
        string memory _fileName,
        bool _isPublic,
        string memory _activity
        ) public{
        userFile memory file = userFile(_hash,_fileName,now,_isPublic,msg.sender);
        userUploadedFilesCount[msg.sender] = userUploadedFilesCount[msg.sender] + 1;
        userUploadedFiles[msg.sender][userUploadedFilesCount[msg.sender]] = file;
        if(_isPublic == true){
            publicFilesCount = publicFilesCount + 1;
            publicFiles[publicFilesCount] = file;
        }
        addUserActivity(_activity);
    }
    
    function fetchAFile(uint256 _index) public view returns(
            string memory,
            string memory,
            uint256
        ){
        return (
                userUploadedFiles[msg.sender][_index].hash,
                userUploadedFiles[msg.sender][_index].fileName,
                userUploadedFiles[msg.sender][_index].creationTime
            );
    }
    
    function shareAFile(uint256 _index, address _reciever,string memory _activity) public{
        userFile memory file = userUploadedFiles[msg.sender][_index];
        filesSharedWithUserCount[_reciever] = filesSharedWithUserCount[_reciever] + 1;
        sharedFile memory file2 = sharedFile(file.hash,file.fileName,file.creationTime,now,msg.sender);
        filesSharedWithUser[_reciever][filesSharedWithUserCount[_reciever]] = file2;
        addUserActivity(_activity);
    }
    
    function fetchASharedFile(uint256 _index) public view returns(string memory,string memory,uint256,uint256,address){
        return (
                filesSharedWithUser[msg.sender][_index].hash,
                filesSharedWithUser[msg.sender][_index].fileName,
                filesSharedWithUser[msg.sender][_index].creationTime,
                filesSharedWithUser[msg.sender][_index].sharedTime,
                filesSharedWithUser[msg.sender][_index].fileOwner
            );
    }
    
    function fetchPublicFile(uint256 _index) public view returns(string memory,string memory,uint256,address){
        return (
                publicFiles[_index].hash,
                publicFiles[_index].fileName,
                publicFiles[_index].creationTime,
                publicFiles[_index].fileOwner
            );
    }
}