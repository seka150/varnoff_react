import {styled} from "@mui/system"
import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled(Grid)({
        flexGrow: 1,
        padding: '30px'
    });

    const Typog = styled(Typography)({
        color: colors.black[1000],
        fontSize: '40px',
        lineHeight: '60px',
        fontWeight: 400
    })

    const Parag = styled(Typography)({
        color: colors.gray[100],
        fontSize: '18px',
        lineHeight: '27px',
        fontWeight: 400
    })

    const ButtonKatal = styled(Button) ({
        border: `1px solid ${colors.blue}`,
        color: colors.blue
    })

    const Main = styled(Box)({
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingBottom: '90px'
    })

    const MainText = styled(Box)({
        alignItems: 'center',
        alignContent: 'center'
    })

    const CreateOrder = styled(Box)({
        display: 'flex',
    })

    const CreateOrderBox = styled(Box)({
        backgroundColor: `${colors.green.DEFAULT}`,
        borderRadius: '15px',
        alignItems: 'center',
        color: `${colors.white.DEFAULT}`,
        padding: '25px',
    })

    const CreateOrderBoxText = styled(Box)({
        marginBottom: '30px',
    })

    return {Root, Typog, Parag, ButtonKatal, Main, MainText, CreateOrder, CreateOrderBox, CreateOrderBoxText};
};
