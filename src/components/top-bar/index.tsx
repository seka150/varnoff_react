import React, { FC } from "react";
import {AppBar, Grid, Typography, useTheme} from '@mui/material';
import { MenuOutlined} from '@mui/icons-material';
import  {useStyles}  from "./styles";
import FlexBetweenComponent from "../flex-between";
import { tokens } from '../../theme';
import { ITopBarProps } from "../../common/types/top-bar";
import SearchBarComponent from "../search-bar";
import ThemeSwitcherComponent from "../theme-switcher";

const TopBarComponent: FC<ITopBarProps> = (props: ITopBarProps): JSX.Element=> {
    const theme = useTheme()
    const {isOpen, setIsOpen, isNonMobile} = props
    const colors = tokens(theme.palette.mode)
    const {Toolbars} = useStyles(theme)

    return (
        <AppBar sx={{boxShadow: 'none !important', background: `${colors.primary.DEFAULT} !important`, borderBottom: `1px solid ${colors.borderColor}`}} position="static">
            <Toolbars>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item sm={3} lg={3} >
                    <FlexBetweenComponent>
                        <MenuOutlined sx={{marginRight: '10px', cursor: 'pointer'}} onClick={()=> setIsOpen(!isOpen)} />
                        <Typography variant='h6'>Welcome, {sessionStorage.getItem('name')}</Typography>
                    </FlexBetweenComponent>
                </Grid>
                {isNonMobile && (
                    <Grid display="flex" justifyContent="flex-end" item sm={9} lg={9} >
                    <ThemeSwitcherComponent/>
                    <SearchBarComponent/>
                    </Grid>
                )}
            </Grid>
            </Toolbars>
        </AppBar>
    );
};

export default TopBarComponent;