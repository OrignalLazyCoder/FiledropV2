import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import ipfs from '../utils/ipfs';
import moment from 'moment'
import './css/Drive.css';
import FiledropContract from '../contracts/Filedrop.json';
import FileTable from './components/FileTable';
import SharedFileTable from './components/SharedFileTable';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ShareIcon from '@material-ui/icons/Share';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class Drive extends Component {

    constructor(props){
        super(props);
        this.state = {
            web3:null,
            accounts:null,
            contract:null,
            userFiles:[],
            buffer:null,
            owner:null,
            fileName:null,
            busy:true,
            recieversAddress:"",
            index:null,
            filesSharedWithUser:[],
            openDialog : false,
            openFileDialog: false,
            showShared: false,
        }
        //binding functions
        this.captureFile = this.captureFile.bind(this);
    }

    componentWillMount = async() =>{
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
        const {contract} = this.state;
        const response = await contract.methods.getOwner().call();
        this.setState({
            owner : response,
            busy: false
        })
        this.fetchFiles();
        this.fetchASharedFile();
    }

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        this.setState({fileName:event.target.files[0].name});
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

    
    convertToBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer});
    };

    handleSubmit = async(event) =>{
        event.stopPropagation()
        event.preventDefault()
        this.setState({
            busy:true,
            openFileDialog: false
        })
        const buffer = this.state.buffer;
        await ipfs.add(buffer, (err, ipfsHash) => {
            this.setState({ 
              hash:ipfsHash[0].hash,
              busy:false
            },this.addFileToSmartContract);
        })
    }

    fetchFiles = async() =>{
        const {contract,accounts} = this.state;
        const count = await contract.methods.fetchUserUploadedFilesCount().call({from:accounts[0]})
        let files = []
        for(var i=1;i<=count;i++){
            const response = await contract.methods.fetchAFile(i).call({from:accounts[0]});
            files.push(response);
        }
        this.setState({
            userFiles : files
        })
    }

    addFileToSmartContract = async() =>{
        const {contract,accounts} = this.state;
        var d = new Date();
        var n = d.getTime();
        const activity = `You uploaded ${this.state.fileName} with hash ${this.state.hash} at ${moment.unix(n).toString()}`;
        await contract.methods.uploadAFile(
            this.state.hash,
            this.state.fileName,
            false,
            activity
        ).send({from:accounts[0]})
        await this.fetchFiles();
        await this.fetchASharedFile();
        alert("File Uploaded!");
    }

    shareFile = async(event) =>{
        event.preventDefault();
        if(this.state.index == null){
            alert('choose a file first');
        }
        else{

            const selectedFile = this.state.userFiles[this.state.index]
            const activity = `you shared file ${selectedFile[1]} with ${this.state.recieversAddress}`;
            const {contract,accounts} = this.state;
            this.setState({busy:true})
            const response = await contract.methods.fetchAFile(this.state.index).call({from:accounts[0]});
            await contract.methods.shareAFile(
                this.state.index,
                this.state.recieversAddress,
                activity
                ).send({from:accounts[0]}).then(
                    this.setState({busy:false})
                    )
        }
        await this.fetchFiles();
        await this.fetchASharedFile();
    }

    handleClose = () => {
        this.setState({
            openDialog : false,
            openFileDialog: false,
        })
    }

    fetchASharedFile = async() =>{
        const {contract,accounts} = this.state;
        const count = await contract.methods.fetchFilesSharedWithUserCount().call({from:accounts[0]});
        let files = []
        for(var i=1;i<=count;i++){
            const response = await contract.methods.fetchASharedFile(i).call({from:accounts[0]});
            files.push(response);
        }
        this.setState({
            filesSharedWithUser:files
        })
    }

    shareFileButton = async(index) =>{
        this.setState({index});
        const {contract,accounts} = this.state;
        const response = await contract.methods.fetchAFile(index).call({from:accounts[0]}).then(
            this.setState({
                sharingFile:response
            })
        );
        this.setState({
            openDialog : true
        })
    }
    render() {
        return (
            <div>
                {
                    (this.state.busy) ? <div><LinearProgress color="secondary" /> <br /></div>: null
                }
                <div className="uploadButton">
                    <Fab color="secondary" aria-label="add" >
                        <CloudUploadIcon onClick={() => this.setState({openFileDialog:true})}/>
                    </Fab>
                </div>
                <div className="sharedButton">
                    {
                        (this.state.showShared) ? <Fab color="secondary" aria-label="add">
                        <InsertDriveFileIcon onClick={() => this.setState({showShared:false})}/>
                    </Fab>  : <Fab color="secondary" aria-label="add">
                                                            <ShareIcon onClick={() => this.setState({showShared:true})}/>
                                                        </Fab>
                    }
                </div>
                <Dialog open={this.state.openFileDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Upload a file</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Select a file and after 1 second, press upload button to upload your file.
                    </DialogContentText>
                    <TextField
                        autoFocus   
                        margin="dense"
                        id="name"
                        label="File"
                        fullWidth
                        type="file"
                        onChange={this.captureFile}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Upload
                    </Button>
                    </DialogActions>
                </Dialog>
                <div>
                    {
                        (this.state.showShared) ? null : <div>
                                                            <h3>Your Files:</h3>
                                                             <FileTable files={this.state.userFiles} shareAfile={this.shareFileButton} />
                                                        </div>
                    }
                </div>
                <div>
                <Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Share file</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Enter Recievers address:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        fullWidth
                        onChange={(event)=>{
                            this.setState({
                                recieversAddress : event.target.value
                            })
                        }} value={this.state.recieversAddress}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.shareFile} color="primary">
                        Send
                    </Button>
                    </DialogActions>
                </Dialog>
                <div>
                    {(this.state.showShared) ? <div><h3>Shared Files with you:</h3><SharedFileTable files={this.state.filesSharedWithUser} /></div> : null}
                </div>
            </div>
            </div>
        );
    }
}

export default Drive;