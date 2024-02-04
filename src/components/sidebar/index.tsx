import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import {Box, Drawer, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme} from '@mui/material';
import {ChevronLeftOutlined, ChevronRightOutlined, LogoutOutlined} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from '../flex-between';
import { navMenu } from '../../common/moks/navigate';
import { tokens } from '../../theme';
import logo from '../../assets/img/sidebar/logo.svg'

const SidebarComponent = (props: any) => {
    const [active, setActive] = useState('')
    const {isNonMobile, drawerWidth, isOpen, setIsOpen} = props
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const {Brand, NavItemButton, NavBlock, NavList} = useStyles(theme)

    useEffect(()=> {
        setActive(pathname.substring(1))
    }, [pathname])

    return (
        <Box component='nav'>
            {isOpen && (
                <Drawer 
                open={isOpen}
                onClose={()=> setIsOpen(false)}
                variant='persistent'
                anchor='left'
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        color: theme.palette.secondary.main,
                        backgroundColor : theme.palette.primary.main,
                        boxSizing: 'border-box',
                        width: drawerWidth
                    }
                }}
                >
                    <NavBlock>
                        <Box>
                            <FlexBetween>
                                <Brand>
                                    <img src={logo} alt="logo" />
                                    <Typography variant='h1' color={theme.palette.mode === 'dark' ? colors.white.DEFAULT : colors.black.DEFAULT}>Demo</Typography>
                                </Brand>
                                {!isNonMobile && (
                                    <IconButton onClick={()=> setIsOpen(!isOpen)}>
                                        <ChevronLeftOutlined/>
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <NavList>
                            {
                                navMenu.map((element)=> {
                                    return (
                                        <ListItem key={element.id}>
                                            <NavItemButton onClick={()=> navigate(`${element.path}`)}>
                                                <ListItemIcon>
                                                    {element.icon}
                                                </ListItemIcon>
                                            <ListItemText>
                                                <Typography variant='body1'>{element.name}</Typography>
                                            </ListItemText>
                                            </NavItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                        </NavList>
                    </NavBlock>
                    <Box width='100%'>
                        <List>
                            <ListItem>
                                <NavItemButton >
                                    <ListItemIcon>
                                        <LogoutOutlined/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography>
                                            Logout
                                        </Typography>
                                    </ListItemText>
                                </NavItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default SidebarComponent