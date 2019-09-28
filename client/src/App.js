import React, { Component } from "react";
import IPFSContract from "./contracts/IPFS.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = { 
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null 
    };
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
      this.setState({ web3, accounts, contract: instance }, this.getOwnerOfContract);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getOwnerOfContract = async () => {
    const { contract } = this.state;

    const response = await contract.methods.getOwner().call();

    this.setState({ 
      storageValue: response 
    });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>Owner of smart contract is : {this.state.storageValue}</div>
        <hr />
        <div>
          <form>
            <input type="file" />
            <input type="submit" value="upload" />
          </form>         
        </div>
        <hr />
        <div>
          Uploaded files will come here
        </div>
        <hr />
        <div>
          File sharing
          <form>
            <label>Recievers address
              <input type="text" placeholder="wallets address" />
            </label>
            <label>Select file
              <input type="text" placeholder="Select hash" />
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
