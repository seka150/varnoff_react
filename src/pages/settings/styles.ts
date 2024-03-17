import {styled} from "@mui/system"
import { Box, Grid, Theme } from "@mui/material";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const Root = styled (Grid) ({
        padding : 32
    })

    const TabsWrapper = styled(Box) ({
        borderBottom: `1px solid ${colors.borderColor}`
    })

    return { Root, TabsWrapper};
};
