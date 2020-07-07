import React from 'react';
import TextField from '@material-ui/core/TextField';


function SearchRow(props) {

    return (
        <TextField fullWidth 
                value={props.filterText} 
                id="outlined-search" 
                label={props.label}
                type="search" 
                variant="outlined" 
                onChange={(e) => props.update(e.target.value)}/>
    )
}

export default SearchRow;