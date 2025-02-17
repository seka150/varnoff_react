import {Box, styled} from "@mui/system"
import { Button, Grid, Theme, Typography} from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled(Grid)({
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

    const Table = styled(DataGrid)({
        border: 'none !important',
        backgroundColor: `${
            theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
        }`,
        marginBottom: 32,
        minHeight: 270,
        borderRadius: 12,
        '&:hover .Mui-checked': { 
            backgroundColor: colors.blue,
            
        },
        '& .MuiPaper-root': {
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',
            backgroundImage: 'none !important'
        }
    });

    const TopCardItem = styled(Grid)({
        backgroundColor: `${theme.palette.mode === 'light' ? colors.primary.DEFAULT : colors.primary[600]}`,
        padding: '20px 16px',
        minHeight: '185px',
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 12,
        margin: '0px 0px 40px 0px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    });

    const TypoHead = styled(Typography)({
        fontSize: "32px",
        fontWeight: "bold",
        textTransform: "uppercase",
    });

    const StyledContainer = styled(Box)({
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
    });

    const Description = styled(Typography)({
        fontSize: "18px",
        color: "#555",
    });
    
    const cardMediaStyles = {
        width: "700px",
        height: "500px", 
        objectFit: "cover",
        borderRadius: "8px",
    };
    
    const ButtonKatal = styled(Button) ({
        border: `1px solid ${colors.blue}`,
        color: colors.blue
    })
    
    return { Root, TopPriceRoot, Table, TopCardItem, TypoHead, StyledContainer, Description, cardMediaStyles, ButtonKatal};
};
