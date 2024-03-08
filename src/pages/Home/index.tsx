import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets, getTopPriceData } from "../../store/thunks/assets";
import { Grid, useTheme } from "@mui/material";
import { useStyled } from "./styles";
import AreaChartComponent from "../../components/charts/area-chart";
import TrendUp from '../../assets/img/home/trend-up.svg'
import TrendDown from '../../assets/img/home/trend-down.svg'
import LineChartComponent from "../../components/charts/line-chart";
import { IChartData, ISingleAsset } from "../../common/types/assets";
import TopPriceComponent from "../../components/top-price";


const HomePage: FC = (): JSX.Element => {
    const favoriteAssets: IChartData[] = useAppSelector(
        (state) => state.assets.favoriteAssets,
    )
    const assetsArray: ISingleAsset[] = useAppSelector(
        (state) => state.assets.assets,
    )
    const dispatch = useAppDispatch()
    const fetchDataRef = useRef(false)
    const theme = useTheme()
    const { Root, TopCardItem, AssetName, ItemDetails, CardPrice, PriceTrend, PriceUp, PriceDown, LineChartBlock, AreaChartBlock, TopPriceRoot} = useStyled(theme)

    const favoriteAssetName = useMemo(() => ['bitcoin', 'ethereum'], [])

    const filteredArray = useMemo(() => {
        return favoriteAssets.filter(
            (value, index, self) =>
                index === self.findIndex((t) => t.name === value.name),
        )
    }, [favoriteAssets])

    const filteredAssetArray = assetsArray
        .slice()
        .sort((a, b) => b.current_price - a.current_price)

    const fetchData = useCallback(
        (data: string[]) => {
            data.forEach((element: string) => {
                dispatch(getFavoriteAssets(element))
            })
        },
        [dispatch],
    )

    useEffect(() => {
        if (fetchDataRef.current) return
        fetchDataRef.current = true
        fetchData(favoriteAssetName)
        dispatch(getTopPriceData())
    }, [favoriteAssetName, fetchData, dispatch])

    const renderFavoriteBlock = filteredArray.map((element: IChartData)=> {
        const currentPrice = element.singleAsset.map((element: any) => element.current_price,)
        const changePrice = element.singleAsset.map((element: any) => element.price_change_percentage_24h,)
        return (
            <Grid item lg={6} md={6} xs={12} key={element.name}>
                <TopCardItem>
                    <Grid container>
                        <Grid item lg={6} md={10} xs={12}>
                            <AssetName>{element.name}</AssetName>
                            <ItemDetails>
                                <CardPrice>${currentPrice}</CardPrice>
                                <PriceTrend>
                                    {changePrice[0] > 0 ? (
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
                            <AreaChartComponent key={element.name} data={element.price_chart_data}/>
                        </Grid>
                    </Grid>
                </TopCardItem>
            </Grid>
        )
    })


    return(
        <Root>
            <AreaChartBlock>
                <Grid container spacing={2}>
                    {renderFavoriteBlock}
                </Grid>
            </AreaChartBlock>
            <LineChartBlock>
                <Grid container>
                    <Grid item lg={12} md={12} xs={12}>
                        {filteredArray.length && <LineChartComponent data={filteredArray}/>}
                    </Grid>
                </Grid>
            </LineChartBlock>
            <TopPriceRoot container>
                <Grid item lg={12} md={12} xs={12}>
                    {filteredAssetArray.length && <TopPriceComponent assets={filteredAssetArray.slice(0, 6)}/>}
                </Grid>
            </TopPriceRoot>
        </Root>
    )
}

export default HomePage;