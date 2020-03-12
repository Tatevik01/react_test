import React from 'react';
import './TabItem.css';

import TextField from '@material-ui/core/TextField';

const TabItem = ({ index, data, handleInputFieldsChange }) => {

    return(
        <div className='tabItemContainer'>
            <div>
                {index === 0 && <h3>Name</h3>}
                <TextField id='name' label="Name" value={data.name} onChange={event => handleInputFieldsChange(event, index)} />
            </div>
            <div>
                {index === 0 && <h3>Email</h3>}
                <TextField id='email' label="Email" value={data.email} onChange={event => handleInputFieldsChange(event, index)} />
            </div>
            <div>
                {index === 0 && <h3>Phone</h3>}
                <TextField id='phone' label="Phone" value={data.phone} onChange={event => handleInputFieldsChange(event, index)} />
            </div>            
        </div>
    )
}

export default TabItem