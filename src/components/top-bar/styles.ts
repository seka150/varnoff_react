import { styled, Theme } from "@mui/system";
import { Toolbar } from "@mui/material";

export const useStyles = (theme: Theme) => {

    const Toolbars = styled(Toolbar)({
        justifyContent: 'space-between',
        padding: '25px 45px',
    });

    return { Toolbars };
};

