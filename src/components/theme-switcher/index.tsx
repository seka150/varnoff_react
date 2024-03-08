import React, { useContext } from "react";
import { useStyles } from "./styles";
import { useTheme } from "@mui/system";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode, NotificationsNone } from "@mui/icons-material";
import { ColorModeContext } from "../../theme";

const ThemeSwitcherComponent = () => {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
    const { IconBlock} = useStyles(theme)
    return(
        <IconBlock>
            <IconButton sx={{marginRight: '45px'}} onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (<DarkMode/>) : (<LightMode/>)}
                </IconButton>
                <IconButton>
                <NotificationsNone/>
            </IconButton>
        </IconBlock>
    )
}

export default ThemeSwitcherComponent