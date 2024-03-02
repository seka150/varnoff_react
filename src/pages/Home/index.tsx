import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets } from "../../store/thunks/assets";
import { Grid, useTheme } from "@mui/material";
import { useStyled } from "./styles";
import AreaChart from "../../components/charts/area-chart";
import TrendUp from '../../assets/img/home/trend-up.svg'
import TrendDown from '../../assets/img/home/trend-down.svg'


const Home: FC = (): JSX.Element => {
    const favoriteAssets: any[] = useAppSelector(state => state.assets.favoriteAssets)
    const dispatch = useAppDispatch()
    const fetchDataRef = useRef(false)
    const theme = useTheme()
    const {Root, TopCardItem, AssetName, ItemDetails, CardPrice, PriceTrend, PriceUp, PriceDown} = useStyled(theme)
    console.log('priceup',PriceUp)
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
        const currentPrice = element.singleAsset.map((element: any) => element.current_price,)
        const currentCap = element.singleAsset.map((element: any) => element.market_cap,)
        const changePrice = element.singleAsset.map((element: any) => element.price_change_percentage_24h,)
        return (
            <Grid item lg={6} md={6} xs={12} key={element.id}>
                <TopCardItem>
                    <Grid container>
                        <Grid item lg={6} md={10} xs={12}>
                            <AssetName>{element.name}</AssetName>
                            <ItemDetails>
                                <CardPrice>${currentPrice}</CardPrice>
                                <PriceTrend>
                                    {changePrice > 0 ? (
                                        <>
                                        <PriceUp>
                                            <img src={TrendUp} alt="TrendUp" />
                                            <span>{Number(changePrice).toFixed(2)}%</span>
                                        </PriceUp>
                                        </>
                                    ) : (
                                        <>
                                        <PriceDown>
                                            <img src={TrendDown} alt="TrendDown" />
                                            <span>{Number(changePrice).toFixed(2)}%</span>
                                        </PriceDown>
                                        </>
                                    )}
                                    </PriceTrend>

                            </ItemDetails>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <AreaChart key={element.id} data={element.data}/>
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