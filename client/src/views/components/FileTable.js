import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import moment from 'moment';

class FileTable extends Component {
    render() {
        return (
            <div>
                <TableContainer>
                    <Table className={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>File Name</TableCell>
                                <TableCell>File hash</TableCell>
                                <TableCell>File time</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {this.props.files.map((file, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row" >{index + 1}</TableCell>
                                        <TableCell>{file[1]}</TableCell>
                                        <TableCell><a href={`https://gateway.ipfs.io/ipfs/${file[0]}`} target={'_blank'}>{file[0]}</a></TableCell>
                                        <TableCell>{moment.unix(file[2]).toString()}</TableCell>
                                        <TableCell>
                                           <span><Button variant="contained" color="primary" onClick={() => { this.props.shareAfile(index) }}>Share File</Button></span> &nbsp;
                                        <span><a href={`https://gateway.ipfs.io/ipfs/${file[0]}`} target={'_blank'} download><Button variant="contained" color="primary">Download</Button></a></span>
                                        </TableCell>
                                    </TableRow >
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default FileTable;