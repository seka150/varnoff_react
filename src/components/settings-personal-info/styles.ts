import {styled} from "@mui/system"
import { Box, Grid, TextField, Theme } from "@mui/material";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled (Grid) ({
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: colors.blue,
            },
        },
        '& label.Mui-focused': {
            color: `${
                theme.palette.mode === 'dark'
                    ? colors.white.DEFAULT
                    : colors.black.DEFAULT
            }`,
        },
    })

    const FormWrapper = styled(Box) ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0',
    });

    const InputField = styled(TextField) ({
        width: '25%',
        marginBottom: '15px !important',
    });

    const ButtonBlock = styled(Box) ({
        marginTop: 32,
    });

    return { Root, FormWrapper, InputField, ButtonBlock};
};
