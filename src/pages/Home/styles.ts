import {styled} from "@mui/system"
import { Box, Grid, Theme } from "@mui/material";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled(Box)({
        flexGrow: 1,
        padding: '32px 32px 0px 32px',

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
        paddingBottom: '35px'
    });

    const CardPrice = styled('h3')({
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: '0', 
    });

    const PriceTrend = styled(Box)({
        width: 80,
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        borderRadius: 4,
    });

    const PriceUp = styled(Box)({
        backgroundColor: '#A9FFA7',
        color: '#037400',
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        borderRadius: 4,
    });

    const PriceDown = styled(Box)({
        backgroundColor: '#FFA7A7',
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        borderRadius: 4,
        color: '#740000'
    });

    const LineChartBlock = styled(Grid)({
        backgroundColor: `${theme.palette.mode === 'light' ? colors.primary.DEFAULT : colors.primary[600]}`,
        padding: '20px 10px',
        marginBottom: 32,
        minHeight: 270,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 12,
    });

    const AreaChartBlock = styled(Grid)({
        marginBottom: 32
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

    return { Root, TopCardItem, AssetName, ItemDetails, CardPrice, PriceTrend, PriceUp, PriceDown, LineChartBlock, AreaChartBlock, TopPriceRoot};
};
