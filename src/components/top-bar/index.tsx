import React, { FC } from 'react'
import { Grid, Typography, useTheme } from '@mui/material'
import FlexBetween from '../flex-between'
import { ITopBarProps } from '../../common/types/top-bar'
import ThemeSwitcherComponent from '../theme-switcher'
import { useStyled } from './styles'
import SearchBarComponent from '../search-bar'
import { useAppSelector } from '../../utils/hook'

const TopBarComponent: FC<ITopBarProps> = (
    props: ITopBarProps,
): JSX.Element => {
    const theme = useTheme()
    const { Toolbars, Root, MenuIcon } = useStyled(theme)
    const { setIsOpen, isOpen, isNonMobile } = props
    const { user } = useAppSelector(state => state.auth.user)
    

    return (
        <Root position="static">
            <Toolbars >
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item sm={3} lg={3}>
                        <FlexBetween>
                            <MenuIcon
                                onClick={() => setIsOpen(!isOpen)}
                            />
                            <Typography variant='h6'>Welcome, {user ? `${user.firstName}`: ''} </Typography>
                        </FlexBetween>
                    </Grid>
                    {isNonMobile && (
                        <Grid
                            display="flex"
                            justifyContent="flex-end"
                            item
                            sm={9}
                            lg={9}
                        >
                            <ThemeSwitcherComponent />
                            <SearchBarComponent />
                        </Grid>
                    )}
                </Grid>
            </Toolbars>
        </Root>
    )
}

export default TopBarComponent