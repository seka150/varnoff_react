import React, { FC, useState, useEffect } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Grid, Typography, useTheme } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../utils/hook';
import { getSingleAssets } from 'store/thunks/data';
import { useStyled } from './styles';
import { translations } from "../../utils/helpers/translation"
import { getService } from 'store/thunks/service';
import FlexBetweenComponent from 'components/flex-between';

const SingleAssetPage: FC = (): JSX.Element => {
    const { state } = useLocation();
    const url = state ? state.url : '';
    const theme = useTheme()
    const { Root, TopPriceRoot, Table, TopCardItem } = useStyled(theme)
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
            }
    
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
    

    const generateColumns = (): GridColDef[] => {
        if (!asset || !asset.services || asset.services.length === 0) {
            return [];
        }

        const firstService = asset.services[0];
        const columns: GridColDef[] = Object.keys(firstService).map((key: string) => ({
            field: key,
            headerName: translations[key] ?? key
        }));

        return columns;
    };

    const columns = generateColumns();

    const rows = asset ? asset.services.map((item: any, index: number) => ({ id: index + 1, ...item })) : [];
    
    const selectedService = serviceData ? serviceData.services.find((service: any) => service.url === id) : null;

    
    return (
        <Root>
            <FlexBetweenComponent>
            <TopCardItem sx={{marginRight: '40px'}}>
                <Typography variant='h3'>{selectedService ? selectedService.name : ''}</Typography>
            </TopCardItem>
            <TopCardItem item xs={12} lg={12} sm={12}>
            <Typography variant='h6'>{selectedService ? selectedService.description : ''}</Typography>
            </TopCardItem>
            </FlexBetweenComponent>
            <TopPriceRoot container item xs={12} lg={12} sm={12}>
                <Grid style={{ height: 'auto', width: '100%' }} >
                <Table
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[]}
                    checkboxSelection
                    autoHeight={true}
                    />
                </Grid>
            </TopPriceRoot>
        </Root>
    );
};

export default SingleAssetPage;
