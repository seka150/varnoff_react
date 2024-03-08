import { styled, Theme } from "@mui/system";
import { Grid } from "@mui/material";

export const useStyles = (theme: Theme) => {
    const IconBlock = styled(Grid)({
        paddingRight: '37px',
        paddingTop: '10px',
    })

    return { IconBlock };
};

