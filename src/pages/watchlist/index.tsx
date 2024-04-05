import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { getWathclistElements } from '../../store/thunks/watchlist'
import { getTopPriceData } from '../../store/thunks/assets'
import {  useTheme } from '@mui/material'
import { useStyled } from './styles'
import AssetsTableComponent from 'components/asset-table'

const WatchlistPage: FC = (): JSX.Element => {
    const theme = useTheme()
    const {AssetsTableBlock, Heading, WatchlistHeading, Root} = useStyled(theme)
    const dispatch = useAppDispatch()
    const watchlist = useAppSelector((state) => state.watchlist.assets)
    const { assets } = useAppSelector((state) => state.assets)

    useEffect(() => {
        dispatch(getTopPriceData())
        dispatch(getWathclistElements())
    }, [dispatch])

    const filteredArray = assets.filter((element: any) => {
        return watchlist.some((otherElement: any) => {
            return otherElement.assetId === element.id
        })
    })

    return (
        <Root>
            <WatchlistHeading>
                <Heading variant="h2">
                    Избранное
                </Heading>
            </WatchlistHeading>
            <AssetsTableBlock >
                <AssetsTableComponent assets={filteredArray} />
            </AssetsTableBlock>
        </Root>
    )
}

export default WatchlistPage