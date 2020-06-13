import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    margin: '20px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Faq() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <h3>Frequntly Asked question</h3>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><b>What is file Drop?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            FileDrop is an open platform to store and share your valuable files on a distributed and decentralized network. It runs on latest technologies like Blockchain and uses most advanced protocols for your file transfer like IPFS to ensure that your data is safe and always available. <br /><br />
            FileDrop is a server less data center. Yes! You are not day dreaming. There are no servers running or data centers which are responsible for storing and securing your data.<br /><br />
            Shocked! Read more about FileDrop below. 
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><b>How does it works?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            File Drop runs on a public blockchain - <b>Ethereum</b>. We have developed a <b>smart contract</b> that is used to store information about your file. <br/><br/>
            You need a ethereum wallet or a chrome extention called Metamask to access our network. Since all transactions are validated on Ethereum blockchain by miners and no one can tamper the data so your files are secured.<br/><br/>
            To ensure your files are safe. We do not store your files on our smart contract, we just store the <b>Hash</b> of the file, and access link is generated on run time by the user so no one can access your file.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}><b>What is a Ethereum blockchain</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          Ethereum is a distributed public blockchain network that focuses on running the programming code of any decentralized application. More simply, it is a platform for sharing information across the globe that cannot be manipulated or changed.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography className={classes.heading}><b>How is Smart Contract?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          A smart contract is a computer protocol intended to digitally facilitate, verify, or enforce the negotiation or performance of a contract. Smart contracts allow the performance of credible transactions without third parties. Smart contracts help you exchange money, property, shares, or anything of value in a transparent, conflict-free way while avoiding the services of a middleman
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <Typography className={classes.heading}><b>How is IPFS</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          The InterPlanetary File System (IPFS) is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.
            IPFS allows users to not only receive but host content, in a similar manner to BitTorrent. As opposed to a centrally located server, IPFS is built around a decentralized system of user-operators who hold a portion of the overall data, creating a resilient system of file storage and sharing. Any user in the network can serve a file by its content address, and other peers in the network can find and request that content from any node who has it using a distributed hash table (DHT).
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6a-content"
          id="panel6a-header"
        >
          <Typography className={classes.heading}><b>How is my file shared</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Your file is shared by sharing the hash of your file to the reciver (the person who will recieve your file). It is not re uploaded or dumped again on our network.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7a-content"
          id="panel7a-header"
        >
          <Typography className={classes.heading}><b>What is Recievers Address?</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Recievers address is the public key or Wallet address of the reciever. This address is publically available and is used to indentity users on a public blockchain since your real identity is never revealed.<br /><br />
            <u><b>Note: Never share your private key with any one as it will give your account access to them and your crypto currency can be stolen</b></u>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
