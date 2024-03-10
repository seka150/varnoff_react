import React, { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ISingleAsset } from '../../common/types/assets'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import {
    Typography,
    Snackbar,
    Alert,
    AlertColor,
    useTheme,
} from '@mui/material'
import FlexBetween from '../../components/flex-between'
import { useStyles } from './styles'
import { createWatchListRecord } from '../../store/thunks/assets'

const SingleAssetPage: FC = (): JSX.Element => {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [severity, setSeverity] = useState<AlertColor>('success')
    const navigate = useNavigate()
    const theme = useTheme()
    const { Root,  CardButton, CardButtonBlock, TrendDown, TrendUp, AssetPriceDetail, AssetPrice, CardTitle, AssetSymbol, AssetIcon, CardItem, Card, AssetName } = useStyles(theme)
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const assetsArray: ISingleAsset[] = useAppSelector(
        (state) => state.assets.assets,
    )

    const asset = assetsArray.find((element) => element.name === (id as string))

    const handleCreateRecord = () => {
        try {
            const data = {
                name: '',
                assetId: '',
            }
            if (asset) {
                data.name = asset.name
                data.assetId = asset.id
            }
            dispatch(createWatchListRecord(data))
            setError(false)
            setSeverity('success')
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 2000)
        } catch (e) {
            setError(true)
            setSeverity('error')
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 2000)
        }
    }

    return (
        <>
            {asset && (
                <Root container>
                    <AssetName item xs={12} >
                        <Typography variant="h1">{asset.name}</Typography>
                    </AssetName>
                    <Card item sm={6} xs={12}>
                        <CardItem >
                            <FlexBetween>
                                <AssetIcon
                                    src={asset.image}
                                />
                                <AssetSymbol
                                    variant="h2"
                                >
                                    {asset.symbol.toUpperCase()}
                                </AssetSymbol>
                            </FlexBetween>
                        </CardItem>
                    </Card>
                    <Card item sm={6} xs={12}>
                        <CardItem>
                            <FlexBetween>
                                <CardTitle
                                    variant="h2"
                                >
                                    Цена:&nbsp;
                                </CardTitle>
                                <AssetPrice
                                    variant="h2"
                                >
                                    $ {asset.current_price}
                                </AssetPrice>
                            </FlexBetween>
                        </CardItem>
                    </Card>
                    <Card item sm={6} xs={12}>
                        <CardItem container>
                            <CardTitle
                                variant="h2"
                            >
                                Изменение цены:&nbsp;
                            </CardTitle>
                            <AssetPriceDetail>
                                    {asset.price_change_percentage_24h >= 0 ? (
                                        <>
                                        <TrendUp>
                                        $ {asset.price_change_24h.toFixed(4)}
                                        </TrendUp>
                                        </>
                                    ) : (
                                        <>
                                        <TrendDown>
                                        $ {asset.price_change_24h.toFixed(4)}
                                        </TrendDown>
                                        </>
                                    )}
                                    </AssetPriceDetail>
                        </CardItem>
                    </Card>
                    <Card item sm={6} xs={12}>
                        <CardItem>
                            <CardTitle
                                variant="h2"
                            >
                                Изменение цены % :&nbsp;
                            </CardTitle>
                            <AssetPriceDetail>
                                    {asset.price_change_percentage_24h >= 0 ? (
                                        <>
                                        <TrendUp>
                                        $ {asset.price_change_percentage_24h.toFixed(2)}
                                        </TrendUp>
                                        </>
                                    ) : (
                                        <>
                                        <TrendDown>
                                        $ {asset.price_change_percentage_24h.toFixed(2)}
                                        </TrendDown>
                                        </>
                                    )}
                                    </AssetPriceDetail>
                        </CardItem>
                    </Card>
                    <CardButtonBlock
                        container
                        justifyContent="center"
                    >
                        <CardButton
                            color="success"
                            variant="outlined"
                            onClick={() => navigate(-1)}
                        >
                            Назад
                        </CardButton>
                        <CardButton
                            color="success"
                            variant="outlined"
                            onClick={handleCreateRecord}
                        >
                            Добавить в избраное
                        </CardButton>
                    </CardButtonBlock>
                    <Snackbar open={open} autoHideDuration={6000}>
                        <Alert severity={severity} sx={{ width: '100%' }}>
                            {!error ? 'Success!' : 'Ooops'}
                        </Alert>
                    </Snackbar>
                </Root>
            )}
        </>
    )
}

export default SingleAssetPage