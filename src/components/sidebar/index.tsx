import { FC, useEffect, useState } from 'react';
import { useStyled } from './styles';
import {Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme} from '@mui/material';
import {ChevronLeftOutlined, LogoutOutlined} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetweenComponent from '../flex-between';
import { navMenu } from '../../common/moks/navigate';
import { tokens } from '../../theme';
import logo from '../../assets/img/sidebar/logo.svg'
import { ISidebarProps } from '../../common/types/sidebar';
import ThemeSwitcherComponent from '../theme-switcher';
import SearchBarComponent from '../search-bar';

const SidebarComponent: FC<ISidebarProps> = (props: ISidebarProps): JSX.Element => {
    const [active, setActive] = useState('')
    const {isNonMobile, drawerWidth, isOpen, setIsOpen} = props
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const {Brand, NavItemButton, NavBlock, NavList} = useStyled(theme)

    useEffect(()=> {
        setActive(pathname)
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
                            <FlexBetweenComponent>
                                <Brand>
                                    <img src={logo} alt="logo" />
                                    <Typography variant='h1' color={theme.palette.mode === 'dark' ? colors.white.DEFAULT : colors.black.DEFAULT}>Varnoff</Typography>
                                </Brand>
                                {!isNonMobile && (
                                    <IconButton onClick={()=> setIsOpen(!isOpen)}>
                                        <ChevronLeftOutlined/>
                                    </IconButton>
                                )}
                            </FlexBetweenComponent>
                        </Box>
                        {!isNonMobile && (
                            <List>
                            <ListItem>
                                <SearchBarComponent/>
                            </ListItem>
                        </List>
                        )}
                        <NavList>
                            {
                                navMenu.map((element)=> {
                                    return (
                                        <ListItem key={element.id}>
                                            <NavItemButton className={active === element.path ? 'active' : ''} onClick={() => navigate(`${element.path}`)}>
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
                            {!isNonMobile && (
                                <ListItem>
                                    <Box padding="5px">
                                        <ThemeSwitcherComponent/>
                                    </Box>
                                </ListItem>
                            )}
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