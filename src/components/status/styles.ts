import {styled} from "@mui/system"
import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);
    
    const TextH6 = styled(Typography)({
        color: colors.gray[100],
        display: 'flex',
        justifyContent: 'flex-end',
        fontWeight: 400
    });

    const ButtonKatal = styled(Button) ({
        border: `1px solid ${colors.blue}`,
        color: colors.blue,
        marginBottom: '20px',
        minWidth: '150px'
    });

    const Root = styled(Box) ({

    });

    const BoxOrderRoot = styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        rowGap: '10px'          
    });

    const BoxOrder = styled(Box)({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
    });
    


    return {TextH6, ButtonKatal, Root, BoxOrderRoot, BoxOrder};
};
