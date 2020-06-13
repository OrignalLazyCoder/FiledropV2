import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import FiledropContract from '../contracts/Filedrop.json';
import LinearProgress from '@material-ui/core/LinearProgress';

class UserActivity extends Component {

    constructor(props){
        super(props);
        this.state = {
            accounts:null,
            web3:null,
            contract:null,
            activities:[],
            activitiesCount:null,
            busy: true
        }
    }

    componentDidMount = async() =>{
        try{
            const web3 = await getWeb3();
            let accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = FiledropContract.networks[networkId];
            const instance = new web3.eth.Contract(
                FiledropContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            this.setState({
                web3,
                accounts,
                contract : instance
            }, this.onStart);
        }catch(error){
            alert('unable to connect to blockchain or metamask. Please press F12 and check errors in console');
            console.log(error);
        }
    }

    onStart = async() =>{
        const {contract,accounts} = this.state;
        const count = await contract.methods.fetchUserActivityCount().call({from:accounts[0]});
        let activity = []
        for(var i=1;i<=count;i++){
            const response = await contract.methods.fetchUserActivity(i).call({from:accounts[0]})
            activity.push(response);
        }
        this.setState({
            activities:activity,
            busy: false
        })
    }

    render() {
        return (
            <div>
                {
                    (this.state.busy) ? <div><LinearProgress color="secondary" /> <br /></div>: null
                }
                <h3>Your activities on our network</h3>
                <ul>
                {
                    this.state.activities.map((activity,index) => {
                        return(
                            <li key={index}>{activity}</li>
                        )
                    })
                }
                </ul>
            </div>
        );
    }
}

export default UserActivity;