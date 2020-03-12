import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import "./App.css";

import Modal from './components/Modal/Modal';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { makeStyles } from '@material-ui/core/styles';

const useStylesForTable = makeStyles(() => ({
    root: {
        width: '60%',
        marginTop: '5%',
    }
}));

const useStylesForIcon = makeStyles(() => ({
    root: {
        cursor: 'pointer',
        marginRight: '5px',
        '&:last-child': {
            marginRight: '0px',
        }
    }
}));

const App = () => {
    const stylesForTable = useStylesForTable();
    const stylesForIcon = useStylesForIcon();
    const [isShownModal, setIsShownModal] = useState();
    const [data, setData] = useState(() => {
        if(localStorage.data) {
            return JSON.parse(localStorage.data);
        }else {
            return []
        };
    });
    const [dataForEditing, setDataForEditing] = useState({ index: undefined, data: {}});

    const addData = addedData => {
        setData([...data, ...addedData ]);
        localStorage.setItem('data', JSON.stringify([...data, ...addedData ]));
        setIsShownModal(false);
    };

    const saveEditedData = editedData => {
        const firstPartData = data.slice(0, dataForEditing.index);
        const secondPartData = data.slice(dataForEditing.index + 1);
        setData([...firstPartData, ...editedData, ...secondPartData]);
        localStorage.setItem('data', JSON.stringify([...firstPartData, ...editedData, ...secondPartData]));
        setDataForEditing({ index: undefined, data: {}});
        setIsShownModal(false);
    };

    const handleDeleteButtonClick = (event, index) => {
        setData([ ...data.slice(0, index), ...data.slice(index + 1) ]);
        localStorage.setItem('data', JSON.stringify([ ...data.slice(0, index), ...data.slice(index + 1) ]));
    };

    const handleEditButtonClick = (event, item, index) => {
        setDataForEditing({ index, data: item });
        setIsShownModal(true);
    };

    return(
        <div className='container'>
            <Button variant="contained" color="primary" onClick={() => setIsShownModal(true)}>Add Record</Button>
            <Table classes={stylesForTable} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>
                                    <EditIcon classes={stylesForIcon} onClick={event => handleEditButtonClick(event, item, index)} />
                                    <DeleteForeverIcon classes={stylesForIcon} onClick={event => handleDeleteButtonClick(event, index)} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>            
            {isShownModal && <Modal setIsShownModal={setIsShownModal} addData={addData} dataForEditing={dataForEditing} saveEditedData={saveEditedData} setDataForEditing={setDataForEditing} />}
        </div>
    );
}

export default App;