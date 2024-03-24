import {styled} from "@mui/system"
import { Box, Grid, Theme } from "@mui/material";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled(Box)({
        flexGrow: 1,
        padding: '32px'
    });

    const TopPriceRoot = styled(Grid)({
        backgroundColor: `${
            theme.palette.mode === 'light' 
            ? colors.primary.DEFAULT
            : colors.primary[600]
        }`,
        padding: '20px 16px',
        marginBottom: 32,
        minHeight: 270,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 12,
        '& .MuiPaper-root': {
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',
            backgroundImage: 'none !important'
        }
    });

    return { Root, TopPriceRoot};
};
