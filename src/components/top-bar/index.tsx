import React, { useContext } from "react";
import {Box, Grid, IconButton, InputBase, useTheme} from '@mui/material';
import { useAppSelector } from "../../utils/hook";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { ColorModeContext} from "../../theme";
import { useStyles } from "./styles";

const TopBarComponent = () => {
    const user = useAppSelector(state => state.auth.user.user)
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Grid>Welcome {user.firstName}</Grid>
            <Box display='flex'>
                <Grid className={classes.iconBlock}>
                    <IconButton className={classes.themeIcon} onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (<DarkModeIcon/>) : (<LightModeIcon/>)}
                    </IconButton>
                    <IconButton>
                        <NotificationsNoneIcon/>
                    </IconButton>
                </Grid>
                <Grid className={classes.searchBlock}>
                    <IconButton  className={classes.searchIcon}>
                        <SearchIcon/>
                    </IconButton>
                        <InputBase className={classes.searchInput} placeholder="Поиск"/>
                </Grid>
            </Box>
        </Box>
    );
};

export default TopBarComponent;