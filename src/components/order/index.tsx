import React, { useState } from "react";
import { Alert, AlertColor, Autocomplete, Box, Button, Snackbar, TextField, useTheme } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from "utils/hook";
import { createOrder } from "store/thunks/order";
import { IOrderProps } from "common/types/order";
import { useStyled } from "./slyles";
import { IAssetsService } from "common/types/service";

const Order = (props: IOrderProps) => {
    const { service, getSingleAssets, covering } = props;
    const serviceArray = Object.values(service);
    const coveringArray = Object.values(covering);
    const theme = useTheme();
    const { TextFilding, Root, Buttons } = useStyled(theme);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth.user);
    const [orderLength, setOrderLength] = useState('');
    const [orderWidth, setOrderWidth] = useState('');
    const [orderHeight, setOrderHeight] = useState('');
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedCovering, setSelectedCovering] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const statusId = 1;

    const serviceWithIds = serviceArray.flat().map(service => ({
        name: service.name,
        url: service.url,
        id: service.id
    }));

    const coveringWithIds = coveringArray.flat().map(covering => ({
        name: covering.type,
        id: covering.id,
    }));

    const handleServiceChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        setSelectedService(value);
    };

    const handleCoveringChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        setSelectedCovering(value);
    };

    const handleSendClick = async () => {
    if (!selectedService || !orderLength || !orderWidth || !orderHeight || !selectedCovering) {
        setError(true);
        setSeverity('error');
        setOpen(true);
        setTimeout(() => setOpen(false), 2000);
        return;
    }

    const selectedServiceData = serviceWithIds.find(service => service.name === selectedService);
    const selectedCoveringData = coveringWithIds.find(covering => covering.name === selectedCovering);


    if (selectedServiceData?.id && selectedServiceData.url && selectedCoveringData) {
        try {
            const data = await getSingleAssets({
                id: selectedServiceData.id,
                url: selectedServiceData.url,
                otherParams: {},
            });

            const services = data.payload.services as IAssetsService[];


            const serviceId = selectedServiceData.id;

            if (serviceId === undefined) {
                console.error("Сервис не найден");
                setError(true);
                setSeverity('error');
                setOpen(true);
                setTimeout(() => setOpen(false), 2000);
                return;
            }
            

            const response = await dispatch(
                createOrder({
                    serviceId: serviceId,
                    userId: user?.id,
                    length: Number(orderLength),
                    width: Number(orderWidth),
                    height: Number(orderHeight),
                    statusId: statusId,
                    coveringId: selectedCoveringData.id,
                })
            );

            console.log('Order data:', {
                serviceId: serviceId,
                userId: user?.id,
                length: Number(orderLength),
                width: Number(orderWidth),
                height: Number(orderHeight),
                statusId: statusId,
                coveringId: selectedCoveringData.id,
            });

            if (createOrder.fulfilled.match(response)) {
                console.log("Заказ успешно создан. ID заказа:", response.payload);
                setError(false);
                setSeverity('success');
            } else {
                console.error("Ошибка при создании заказа:", response.payload);
                setError(true);
                setSeverity('error');
            }

            setOpen(true);
            setTimeout(() => setOpen(false), 2000);
        } catch (error) {
            console.error("Ошибка при отправке заказа:", error);
            setError(true);
            setSeverity('error');
            setOpen(true);
            setTimeout(() => setOpen(false), 2000);
        }
    } else {
        console.error("Ошибка: сервис или покрытие не найдено");
        setError(true);
        setSeverity('error');
        setOpen(true);
        setTimeout(() => setOpen(false), 2000);
    }
    
};

    

    return (
        <Root>
            <TextFilding>
                <Autocomplete
                    disablePortal
                    options={serviceWithIds.map(service => service.name)}
                    value={selectedService}
                    onChange={handleServiceChange}
                    renderInput={(params) => <TextField {...params} label="Тип навеса" />}
                />
                <TextField 
                    label="Длина" 
                    variant="outlined" 
                    value={orderLength} 
                    onChange={(e) => setOrderLength(e.target.value)}
                />
                <TextField 
                    label="Ширина" 
                    variant="outlined" 
                    value={orderWidth} 
                    onChange={(e) => setOrderWidth(e.target.value)}
                />
                <TextField 
                    label="Высота" 
                    variant="outlined" 
                    value={orderHeight} 
                    onChange={(e) => setOrderHeight(e.target.value)}
                />
                <Autocomplete
                    disablePortal
                    options={coveringWithIds.map(covering => covering.name)}
                    value={selectedCovering}
                    onChange={handleCoveringChange}
                    renderInput={(params) => <TextField {...params} label="Тип покрытия" />}
                />
            </TextFilding>
            <Buttons>
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleSendClick}>Отправить</Button>
            </Buttons>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {!error ? 'Заказ отправлен!' : 'Ошибка! Проверьте введенные данные.'}
                </Alert>
            </Snackbar>
        </Root>
    );
};

export default Order;
