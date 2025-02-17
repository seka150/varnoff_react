import React, { FC, useState, useEffect } from 'react';
import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../utils/hook';
import { getSingleAssets } from 'store/thunks/data';
import { useStyled } from './styles';
import { getService } from 'store/thunks/service';
import FlexBetweenComponent from 'components/flex-between';

interface SinglAssets {
    id: number;
    title: string; 
    description: string;
    price: number;
    img: string;
}

const SingleAssetPage: FC = (): JSX.Element => {
    const { state } = useLocation();
    const url = state ? state.url : '';
    const theme = useTheme();
    const { Root, StyledContainer, TypoHead, Description, cardMediaStyles, ButtonKatal } = useStyled(theme);
    const [asset, setAsset] = useState<any>(null);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [serviceData, setServiceData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(getSingleAssets({ url, otherParams: {} }));
                setAsset(response.payload);
            } catch (e) {
                console.error("Ошибка при загрузке данных актива:", e);
            }
        };

        const fetchService = async () => {
            try {
                const serviceData = await dispatch(getService()); 
                setServiceData(serviceData.payload); 
            } catch (e) {
                console.error("Ошибка при загрузке данных сервиса:", e);
            }
        };

        fetchData();
        fetchService();
    }, [dispatch, id, url]);

    const HandleClickSelectAsset = () => {
        window.location.href = '/watchlist';
    };

    const selectedService = serviceData ? serviceData.services.find((service: any) => service.url === id) : null;

    return (
        <Root>
            <StyledContainer>
                <Box>
                    <CardMedia
                        component="img"
                        alt="img"
                        height="500"
                        image={selectedService ? selectedService.img : ''}
                        sx={cardMediaStyles}
                    />
                </Box>
                <Box>
                    <TypoHead variant="h1" gutterBottom>{selectedService ? selectedService.name : ''}</TypoHead>
                    <Description variant='body1'>{selectedService ? selectedService.description : ''}</Description>
                </Box>
            </StyledContainer>
            <Grid sx={{ marginTop: 5 }} container spacing={2}>
                {asset?.services?.length ? (
                    asset.services.map((service: SinglAssets) => (
                        <Grid item xs={12} sm={4} key={service.id}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <CardActionArea sx={{ flex: '1 1 auto' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={service.img}
                                        alt={service.title}
                                    />
                                    <CardContent sx={{ flex: '1 1 auto' }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {service.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {service.description}
                                        </Typography>
                                        <FlexBetweenComponent>
                                            <Typography variant='body1'>от ~</Typography>
                                            <Typography>
                                            {service.price}
                                            </Typography>
                                        </FlexBetweenComponent>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ display: 'flex', justifyContent: 'center', flex: '0 1 auto' }}>
                                    <ButtonKatal size="small" color="primary" onClick={HandleClickSelectAsset}>
                                        Оформить заявку!
                                    </ButtonKatal>
                                </CardActions>
                            </Card>
                        </Grid>
                                ))
                            ) : (
                                    <p>Услуги отсутствуют</p>
                            )}
                        </Grid>

                        <Typography variant="body1" sx={{ marginTop: 2 }}>
                            * Также доступно создать навес под ваши размеры и желания.
                        </Typography>
                    </Root>
                    );
                };

                export default SingleAssetPage;