import { styled, Theme } from "@mui/system";
import { tokens } from "../../theme";
import { Avatar, Button, Grid, Typography } from "@mui/material";

export const useStyles = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled(Grid)({
        padding: 5,
        alignItems: 'center',
    });
    
    const AssetName = styled(Grid) ({
        display: 'flex',
        justifyContent: 'center',
        margin: '50px 0 !important',
    });

    const Card = styled(Grid) ({
        display: 'flex',
        justifyContent: 'center',
    });

    const CardItem = styled(Grid) ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${
            theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
        }`,
        padding: '20px 16px',
        width: '100%',
        maxWidth: 500,
        minHeight: 185,
        marginBottom: '25px !important',
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 12,
    });

    const AssetIcon = styled(Avatar) ({
        marginRight: 2,
    });
    const AssetSymbol = styled(Typography) ({
        fontSize: 20,
        fontWeight: 600,
    });

    const CardTitle = styled(Typography) ({
        fontSize: 20,
        fontWeight: 600,
        marginRight: 2,
    });

    const AssetPrice = styled(Typography) ({
        fontSize: 20,
    })
    const AssetPriceDetail = styled(Typography) ({
        fontSize: 20,
    });

    const TrendUp = styled(Typography) ({
        color: '#A9FFA7',
    });

    const TrendDown = styled(Typography) ({
        color: '#FFA7A7',
    });

    const CardButtonBlock = styled(Grid) ({
        marginTop: 25,
    });

    const CardButton = styled(Button) ({
        '&:first-child': {
            marginRight: 20,
    }});

    return { Root,  CardButton, CardButtonBlock, TrendDown, TrendUp, AssetPriceDetail, AssetPrice, CardTitle, AssetSymbol, AssetIcon, CardItem, Card, AssetName };
};

