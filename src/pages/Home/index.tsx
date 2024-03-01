import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets } from "../../store/thunks/assets";
import { Grid, useTheme } from "@mui/material";
import { useStyled } from "./styles";
import AreaChart from "../../components/charts/area-chart";

const Home: FC = (): JSX.Element => {
    const favoriteAssets: any[] = useAppSelector(state => state.assets.favoriteAssets)
    const dispatch = useAppDispatch()
    const fetchDataRef = useRef(false)
    const theme = useTheme()
    const {Root, TopCardItem, AssetName, ItemDetails, CardPrice, CardCapitalize} = useStyled(theme)

    const favoriteAssetsName = useMemo(()=> ['bitcoin', 'ethereum'], [])
    const filteredArray = favoriteAssets.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))

    const fetchData = useCallback(
        (data: string[]) => {
            data.forEach((element: string)=> {
                dispatch(getFavoriteAssets(element))
            })
        }, [dispatch]
    )

    useEffect(()=> {
        if (fetchDataRef.current) return
        fetchDataRef.current = true
        fetchData(favoriteAssetsName)
    }, [favoriteAssetsName, fetchData])

    const renderFavoriteBlock = filteredArray.map((element: any)=> {
        const currentPrice = element.data.prices[0]
        const currentCap = element.data.market_caps[0]
        return (
            <Grid item lg={6} md={6} xs={12} key={element.id}>
                <TopCardItem>
                    <Grid container>
                        <Grid item lg={6} md={6} xs={12}>
                            <AssetName>{element.name}</AssetName>
                            <ItemDetails>
                                <CardPrice>${currentPrice[1].toFixed(2)}</CardPrice>
                                <CardCapitalize>${currentCap[1].toFixed(0)}</CardCapitalize>
                            </ItemDetails>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <AreaChart key={element.id} data={element.data.prices}/>
                        </Grid>
                    </Grid>
                </TopCardItem>
            </Grid>
        )
    })


    return(
        <Root>
            <Grid container spacing={2}>
                {renderFavoriteBlock}
            </Grid>
        </Root>
    )
}

export default Home;