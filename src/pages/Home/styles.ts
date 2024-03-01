import styled from "@emotion/styled";
import { Box, Theme } from "@mui/material";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled(Box)({
        flexGrow: 1,
        padding: '32px'
    });

    const TopCardItem = styled(Box)({
        backgroundColor: `${theme.palette.mode === 'light' ? colors.primary.DEFAULT : colors.primary[600]}`,
        padding: '20px 16px',
        minHeight: '185px',
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 12,
    });

    const AssetName = styled('h3')({
        fontSize: 25,
        fontWeight: 600,
        lineHeight: '1.2em', 
        textTransform: 'capitalize'
    });
    
    const ItemDetails = styled('div')({
        display: 'flex',
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '20px'
    });

    const CardPrice = styled('h3')({
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: '0', 
    });

    const CardCapitalize = styled('p')({
        color: `${colors.secondary.DEFAULT}`,
        fontWeight: 400,
        fontSize: 18,
        lineHeight: '0', 
    });

    return { Root, TopCardItem, AssetName, ItemDetails, CardPrice, CardCapitalize };
};
