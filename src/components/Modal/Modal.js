import React, { useState } from 'react';
import './Modal.css';

import Button from '@material-ui/core/Button';

import TabItem from '../TabItem/TabItem';

const tabItemObject = {
    name: '',
    email: '',
    phone: ''
};

const Modal = ({ setIsShownModal, addData, dataForEditing, saveEditedData, setDataForEditing }) => {
    const [tabItemData, setTabItemData] = useState(() => dataForEditing.index !== undefined ? [{...dataForEditing.data}] : [tabItemObject]);
    const [hasAnyChanges, setHasAnyChanges] = useState(false);

    const handleAddButtonClick = event => {
        setTabItemData([ ...tabItemData, tabItemObject ]);
    };

    const handleInputFieldsChange = (event, index) => {
        const firstPartData = tabItemData.slice(0, index);
        const secondPartData = tabItemData.slice(index + 1);
        const currentData = Object.assign({}, tabItemData[index]);
        currentData[event.target.id] = event.target.value;
        const modifiedTabItemData = [...firstPartData, currentData, ...secondPartData];
        detectThereIsAnyChange(modifiedTabItemData);
        setTabItemData(modifiedTabItemData);
    };

    const detectThereIsAnyChange = modifiedTabItemData => {
        if(modifiedTabItemData.length > 1) {
            setHasAnyChanges(true);
        }else {
            if(modifiedTabItemData[0].name !== '' || modifiedTabItemData[0].email !== '' || modifiedTabItemData[0].phone !== '') {
                setHasAnyChanges(true);
            }else {
                setHasAnyChanges(false);
            };
        };
    };

    const handleCancelChangesButtonClick = event => {
        setIsShownModal(false);
        dataForEditing.index !== undefined && setDataForEditing({ index: undefined, data: {}});
    };

    const handleSaveButtonClick = event => {
        if(dataForEditing.index !== undefined) {
            saveEditedData(tabItemData)
        }else {
            addData(tabItemData);
        };
    };

    return(
        <div className='modalContainer'>
            <div className='modalContent'>
                {
                    tabItemData.map((tabItem, index) => <TabItem key={index} index={index} data={tabItem} handleInputFieldsChange={handleInputFieldsChange} />)
                }
                <div className='modalActions'>
                    {dataForEditing.index === undefined && <Button variant="contained" color="primary" onClick={handleAddButtonClick}>Add</Button>}
                    <Button variant="contained" color="primary" disabled={!hasAnyChanges} onClick={handleSaveButtonClick}>Save</Button>
                    <Button variant="contained" color="primary" onClick={handleCancelChangesButtonClick}>Cancel Changes</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal