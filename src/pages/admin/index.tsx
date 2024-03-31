import React, { useEffect, useState } from 'react'
import { Tab, Tabs, useTheme } from '@mui/material'
import TabPanel from '../../components/tab-panel'
import { tabProps } from '../../utils/helpers'
import { tokens } from '../../theme'
import { useStyled } from './styles'
import { useAppDispatch } from '../../utils/hook'
import { getPublicUser } from '../../store/thunks/auth'
import ChangePasswordComponent from '../../components/change-password'
import DeleteUserComponent from '../../components/delete-user'
import ContentComponent from '../../components/create-services'
import { getService } from 'store/thunks/service'
import { getSingleAssets } from 'store/thunks/data'
import { useLocation, useParams } from 'react-router-dom'


const AdminPage = () => {
    const [asset, setAsset] = useState<any>(null);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [serviceData, setServiceData] = useState<any>();
    const [value, setValue] = useState(0)
    const theme = useTheme()
    const { state } = useLocation();
    const url = state ? state.url : '';
    const colors = tokens(theme.palette.mode)
    const { Root, TabsWrapper} = useStyled(theme)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }


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

    const selectedService = serviceData ? serviceData.services.find((service: any) => service.url === id) : null;
    const rows = asset ? asset.services.map((item: any, index: number) => ({ id: index + 1, ...item })) : [];

    const menu = selectedService ? [{ name: selectedService.name, content: rows }] : [];

        return (
        <Root>
            <TabsWrapper>
            <Tabs value={value} onChange={handleChange} aria-label="Admin tabs" centered textColor='secondary' TabIndicatorProps={{style: {backgroundColor: colors.blue}}}> 
                <Tab label="Контент" {...tabProps(0)} />
                <Tab label="Основные настройки" {...tabProps(1)} />
                <Tab label="Аналитика" {...tabProps(2)} />
                <Tab label="Заказы" {...tabProps(3)} />
            </Tabs>
            </TabsWrapper>
            <TabPanel value={value} index={0}>
            <ContentComponent menuItems={menu} />
            </TabPanel>
            <TabPanel value={value} index={1}>
            <ChangePasswordComponent/>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <DeleteUserComponent/>
            </TabPanel>
            <TabPanel value={value} index={3}>
            <DeleteUserComponent/>
            </TabPanel>
        </Root>
        )
    }

    export default AdminPage