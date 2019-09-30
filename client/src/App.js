import React, { Component } from "react";
import IPFSContract from "./contracts/IPFS.json";
import getWeb3 from "./utils/getWeb3";
import ipfs from './utils/ipfs';
import "./App.css";

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = { 
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null,
      uploadedFiles : [],
      fileHash : "",
      recieversAddress : "",
      recieversHash : "",
      recievedFiles : [],
      buffer : ""
    };

    this.captureFile = this.captureFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.fetchFiles = this.fetchFiles.bind(this);
    this.shareAFile = this.shareAFile.bind(this);
    this.recieveAFile = this.recieveAFile.bind(this);
  }

  componentDidMount = async () => {
    try {  
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = IPFSContract.networks[networkId];
      const instance = new web3.eth.Contract(
        IPFSContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ web3, accounts, contract: instance }, this.onStart);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );

      console.error(error);
    }
  };

  onStart = async () =>{
    this.getOwnerOfContract();
    this.fetchFiles();
  }

  getOwnerOfContract = async () => {
    const { contract } = this.state;

    const response = await contract.methods.getOwner().call();

    this.setState({ 
      storageValue: response 
    });
  };

  captureFile =(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)    
  };

convertToBuffer = async(reader) => {
  //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
  //set this buffer -using es6 syntax
    this.setState({buffer});
    console.log("buffer : ",this.state.buffer)
};

  uploadFile = async (event) =>{
    event.preventDefault();
    //upload to ipfs
    console.log("upload started")
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err,ipfsHash[0].hash);
      //setState by setting ipfsHash to ipfsHash[0].hash 
      this.setState({ 
        ipfsHash:ipfsHash[0].hash 
      });
      this.addToSmartContract();
    })
  }

  addToSmartContract = async () =>{

      console.log("Adding to smart contract");

      const { contract ,accounts} = this.state;

      await contract.methods.uploadAfile(this.state.ipfsHash).send({ from: accounts[0] });
      
      this.fetchFiles();
  }

  fetchFiles = async () => {
    /*
      TODO :fetch total number of files uploaded by user from smart contract
            Run a loop for index 1 to numbers of files and fetch all hashes of file uploaded
            display all hashes in list
            
    */
      const { contract ,accounts} = this.state;
      let files = [];
      const count = await contract.methods.fetchTotalCount().call();
      console.log(count);

      for(var i=0;i<=count;i++){
        const response = await contract.methods.fetchAFile(i).call();
        files.push(response);
        console.log(response)
      }
      this.setState({
        uploadedFiles: files
      })
  }

  shareAFile = async (e) =>{
    /*
      TODO :Get wallet id and hash of file from the form
            Pass the values to the smart contract     
    */
   e.preventDefault();
    console.log("Share A file ",this.state.recieversHash," to",this.state.recieversAddress)
  }

  recieveAFile = async () =>{
    /*
      TODO :Same as fetch files
    */
   console.log("recieve a file")
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>Owner of smart contract is : {this.state.storageValue}</div>
        <hr />
        <div>
          <form onSubmit={this.uploadFile}>
            <input type="file"onChange = {this.captureFile} />
            <input type="submit" value="upload" />
          </form>         
        </div>
        <hr />
        <div>
          Uploaded files will come here
          <ul>
            {this.state.uploadedFiles.map((hash,index)=>(
              <li><a href={`https://gateway.ipfs.io/ipfs/${hash}`} key={index} target="_blank">{hash}</a></li>
            ))}
          </ul>
        </div>
        <hr />
        <div>
          File sharing
          <form onSubmit={this.shareAFile}>
            <label>Recievers address
              <input type="text"  placeholder="wallets address" value={this.state.recieversAddress} onChange={(event)=>{
                this.setState({
                  recieversAddress: event.target.value
                })
              }}/>
            </label>
            <label>Select file
              <input type="text" id="hashValue" placeholder="Select hash" value={this.state.recieversHash} onChange={(event)=>{
                this.setState({
                  recieversHash : event.target.value
                })
              }}/>
            </label>
            <input type="submit" value="send"/>
          </form>
        </div>
        <hr />
      </div>
    );
  }
}

export default App;
