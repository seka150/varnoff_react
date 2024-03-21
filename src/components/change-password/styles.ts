import { styled, Theme } from '@mui/system';
import { Box, TextField } from '@mui/material';

export const useStyled = (theme: Theme) => {

    const FormWrapper = styled (Box) ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0',
    });

    const InputField = styled (TextField) ({
        width: '25%',
        marginBottom: '15px !important',
    });
    
    const ButtonSubmitBlock = styled (Box) ({
        margin: '32px 0',
    })

    

    return {FormWrapper, InputField, ButtonSubmitBlock };
};
