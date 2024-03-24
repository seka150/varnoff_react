import { Box, TextField } from "@mui/material";
import React from "react";

const ContentComponent = () => {
    return (
        <Box component="form"
        sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>        
    )
}

export default ContentComponent