import React, { useContext } from "react";
import {AppBar, Box, Grid, IconButton, InputBase, Toolbar, Typography, useTheme} from '@mui/material';
import { useAppSelector } from "../../utils/hook";
import {LightMode, DarkMode, Search, NotificationsNone, MenuOutlined} from '@mui/icons-material';
import { ColorModeContext} from "../../theme";
import { useStyles } from "./styles";
import FlexBetween from "../flex-between";

const TopBarComponent = (props: any) => {
    const user = useAppSelector(state => state.auth.user.user)
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
    const classes = useStyles()
    const {isOpen, setIsOpen} = props

    return (
        <AppBar className={classes.root} position="static">
            <Toolbar className={classes.toolbar}>
            <FlexBetween>
                <MenuOutlined className={classes.menuIcon} onClick={()=> setIsOpen(!isOpen)} />
                <Typography variant='h6'>Welcome, {user.firstName}</Typography>
            </FlexBetween>
            <Box display='flex'>
                <Grid className={classes.iconBlock}>
                    <IconButton className={classes.themeIcon} onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (<DarkMode/>) : (<LightMode/>)}
                    </IconButton>
                    <IconButton>
                        <NotificationsNone/>
                    </IconButton>
                </Grid>
                <Grid className={classes.searchBlock}>
                    <IconButton  className={classes.searchIcon}>
                        <Search/>
                    </IconButton>
                        <InputBase className={classes.searchInput} placeholder="Поиск"/>
                </Grid>
                </Box>
            </Toolbar>
        </AppBar>
        // <Box className={classes.root}>
        //     <Grid>Welcome {user.firstName}</Grid>
        //     <Box display='flex'>
        //         <Grid className={classes.iconBlock}>
        //             <IconButton className={classes.themeIcon} onClick={colorMode.toggleColorMode}>
        //                 {theme.palette.mode === 'dark' ? (<DarkModeIcon/>) : (<LightModeIcon/>)}
        //             </IconButton>
        //             <IconButton>
        //                 <NotificationsNoneIcon/>
        //             </IconButton>
        //         </Grid>
        //         <Grid className={classes.searchBlock}>
        //             <IconButton  className={classes.searchIcon}>
        //                 <SearchIcon/>
        //             </IconButton>
        //                 <InputBase className={classes.searchInput} placeholder="Поиск"/>
        //         </Grid>
        //     </Box>
        // </Box>
    );
};

export default TopBarComponent;