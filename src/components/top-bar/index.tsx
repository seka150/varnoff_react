import React, { FC, useContext } from "react";
import {AppBar, Box, IconButton, Typography, useTheme} from '@mui/material';
import {LightMode, DarkMode, Search, NotificationsNone, MenuOutlined} from '@mui/icons-material';
import { ColorModeContext} from "../../theme";
import  {useStyles}  from "./styles";
import FlexBetween from "../flex-between";
import { tokens } from '../../theme';
import { ITopBarProps } from "../../common/types/top-bar";

const TopBarComponent: FC<ITopBarProps> = (props: ITopBarProps): JSX.Element=> {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
    const {isOpen, setIsOpen} = props
    const colors = tokens(theme.palette.mode)
    const {Toolbars, SearchIcon, SearchBlock, SearchInput, IconBlock} = useStyles(theme)

    return (
        <AppBar sx={{boxShadow: 'none !important', background: `${colors.primary.DEFAULT} !important`, borderBottom: `1px solid ${colors.borderColor}`}} position="static">
            <Toolbars>
            <FlexBetween>
                <MenuOutlined sx={{marginRight: '10px', cursor: 'pointer'}} onClick={()=> setIsOpen(!isOpen)} />
                <Typography variant='h6'>Welcome, {sessionStorage.getItem('name')}</Typography>
            </FlexBetween>
            <Box display='flex'>
                <IconBlock>
                    <IconButton sx={{marginRight: '45px'}} onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (<DarkMode/>) : (<LightMode/>)}
                    </IconButton>
                    <IconButton>
                        <NotificationsNone/>
                    </IconButton>
                </IconBlock>
                <SearchBlock>
                    <SearchIcon>
                        <Search/>
                    </SearchIcon>
                        <SearchInput placeholder="Поиск"/>
                </SearchBlock>
                </Box>
            </Toolbars>
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