import {styled} from "@mui/system"
import { Box, Button, Card, Grid, Theme } from "@mui/material";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled(Box)({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: theme.spacing(2),
    });

    const Cards = styled(Card)({
        width: '100%',
        maxWidth: 500,
        margin: theme.spacing(2),
        boxShadow: theme.shadows[3],
        borderRadius: '15px',
        padding: '20px',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        border: `1px solid ${colors.green.DEFAULT}`,
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: theme.shadows[6],
            border: `1px solid ${theme.palette.primary.main}`,
        },
    });

    const CardsButton = styled(Button)({
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: `${colors.green.DEFAULT}`,
        color: `${colors.white[100]}`
    })

    const CardsButtonWhite = styled(Button)({
        display: 'flex',
        justifyContent: 'space-between',
        border : `1px solid ${colors.borderColor}`,
        color: `${colors.white[100]}`
    })

    return { Root, Cards, CardsButton, CardsButtonWhite};
};
