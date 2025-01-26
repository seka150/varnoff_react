import { styled } from "@mui/system";
import { Box, Button, Theme } from "@mui/material";
import { tokens } from "../../theme";

export const useStyled = (theme: Theme) => {
    const colors = tokens(theme.palette.mode);

    const ButtonKatal = styled(Button)({
        border: `1px solid ${colors.blue}`,
        color: colors.blue,
        marginBottom: "20px",
        minWidth: "150px",
    });

    const ButtonContainer = styled(Box)({
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column", 
        gap: "20px", 
        width: "100%", 
        marginTop: "10px", 
    });

    return { ButtonKatal, ButtonContainer };
};
