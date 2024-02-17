import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { Theme } from '@mui/system';

export const useStyled = (theme: Theme) => {
    
    const Root = styled('div') ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        padding: '20px'
    });

    const Form = styled('form') ({
        flex: 1
    });

    const IncitingText = styled('span') ({
        color: '#1900d5',
        marginLeft: '10px',
        cursor: 'pointer'
    });

    const Boxing = styled(Box)({
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        maxWidth: '640px',
        margin:'auto',
        padding: '50px',
        borderRadius: '25px',
        boxShadow: '-3px -2px 20px 1px #202020'
    });

    const Submit = styled(Button) ({
        fontFamily:'Poppins, sans-serif', 
        marginTop: '10px', 
        marginBottom: '10px', 
        maxWidth: '300px',
        borderRadius: '4px',
        backgroundColor: '#1900d5',
        padding: '10px 20px !important',
        boxShadow: '0px 1px 7px #332a76 !important'
    })

    return {Root, Form, IncitingText, Boxing, Submit};
};
