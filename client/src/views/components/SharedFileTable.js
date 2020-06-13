import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import moment from 'moment';

class SharedFileTable extends Component {
    render() {
        return (
            <TableContainer>
                <Table className={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Hash</TableCell>
                            <TableCell>Shared by</TableCell>
                            <TableCell>shared time</TableCell>
                            <TableCell>creation time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.files.map((file, index) => {
                            return (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file[1]}</TableCell>
                                    <TableCell><a href={`https://gateway.ipfs.io/ipfs/${file[0]}`} target={'_blank'}>{file[0]}</a></TableCell>
                                    <TableCell>{file[4]}</TableCell>
                                    <TableCell>{moment.unix(file[2]).toString()}</TableCell>
                                    <TableCell>{moment.unix(file[3]).toString()}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default SharedFileTable;