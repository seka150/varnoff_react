import React, { useState } from "react";
import { Alert, AlertColor, Autocomplete, Box, Button, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import { useStyled } from "./slyles";
import SendIcon from '@mui/icons-material/Send';
import { GridColDef, GridRowModel } from "@mui/x-data-grid";
import { translations } from "utils/helpers/translation";
import { useAppDispatch, useAppSelector } from "utils/hook";
import { createOrder } from "store/thunks/order";
import { IOrderProps } from "common/types/order";


const Order = (props: IOrderProps) => {
    const { service,  getSingleAssets} = props;
    const serviceArray = Object.values(service);
    const theme = useTheme();
    const {TextFilding, Root, Buttons, SelectBox, Autocompletebox, ButtonSend, Table} = useStyled(theme);
    const [orderTitle, setOrderTitle] = useState('');
    const [orderDescription, setOrderDescription] = useState('');
    const dispatch = useAppDispatch();
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const statusId = 1;
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<GridRowModel[]>([]);
    const { user } = useAppSelector(state => state.auth.user);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');

    const flatServiceArray = serviceArray.flat();

    const serviceWithIds = flatServiceArray.map((service) => ({
        name: service.name,
        url: service.url,
    }));

    const handleServiceChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        setSelectedService(value);
    };

    const handleButtonClick = async () => {
        const selectedServiceData = serviceWithIds.find(service => service.name === selectedService);
        if (selectedServiceData && selectedServiceData.url) {
            try {
                const data = await getSingleAssets({
                    url: selectedServiceData.url,
                    otherParams: {}
                });
                const services = data.payload.services;
                const updatedColumns: GridColDef[] = Object.keys(services[0]).map((field) => ({
                    field: field,
                    headerName: translations[field] ?? field
                }));

                const updatedColumnsWithoutLast = updatedColumns.slice(0, -1); 
                setColumns(updatedColumnsWithoutLast);

                const updatedRows: GridRowModel[] = services.map((service: any, index: number) => ({
                    id: index + 1, 
                    ...service,
                }));
                setRows(updatedRows);
            } catch (error) {
                console.error("Ошибка при загрузке данных для выбранного сервиса:", error);
            }
        }
    };

    const handleSendClick = async () => {
        if (!selectedService) {
            setError(true);
            setSeverity('error');
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 2000);
            return; 
        }

        if (!orderTitle || !orderDescription) {
            setError(true);
            setSeverity('error');
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 2000);
            return;
        }

        const selectedServiceData = serviceWithIds.find((service) => service.name === selectedService);
        if (selectedServiceData && selectedServiceData.url) {
            try {
                const data = await getSingleAssets({
                    url: selectedServiceData.url,
                    otherParams: {},
                });
                const services = data.payload.services;
                const serviceId =
                    services.find((service: { serviceId: number }) => service.serviceId)?.serviceId || 0;
                const response = await dispatch(
                    createOrder({
                        serviceId: serviceId,
                        userId: user?.id,
                        title: orderTitle,
                        description: orderDescription,
                        statusId: statusId,
                    })
                );

                const orderId = response.payload;
                console.log("Заказ успешно создан. ID заказа:", orderId);
                setError(false);
                setSeverity('success');
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 2000);
            } catch (error) {
                console.error("Ошибка при отправке заказа:", error);
                setError(true);
                setSeverity('error');
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 2000);
            }
        }
    };

    const handleClearClick = () => {
        setSelectedService(null);
        setOrderTitle('');
        setOrderDescription('');
        setColumns([]);
        setRows([]);
    };

    return (
        <Root>
            <SelectBox>
                <Autocompletebox>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={serviceWithIds.map(service => service.name)}
                        value={selectedService}
                        onChange={handleServiceChange}
                        sx={{width: 250}}
                        renderInput={(params) => <TextField {...params} label="Услуги" />}
                    />
                    <ButtonSend variant="outlined" onClick={handleButtonClick}>Найти</ButtonSend>
                </Autocompletebox>
                <Box>
                    <Table
                        rows={rows}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </Box>
            </SelectBox>
            <Box sx={{width: '40%'}}>
                <TextFilding>
                    <Typography>Добавьте название:</Typography>
                    <TextField
                            id="outlined-basic"
                            label="Введите название"
                            variant="outlined"
                            multiline
                            maxRows={4}
                            value={orderTitle}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setOrderTitle(event.target.value);
                            }}
                        />
                        <Typography>Добавьте описание:</Typography>
                        <TextField
                            id="outlined-basic"
                            label="Введите описание"
                            variant="outlined"
                            multiline
                            maxRows={4}
                            value={orderDescription}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setOrderDescription(event.target.value);
                            }}
                        />
                </TextFilding>
                <Buttons>
                    <Button variant="outlined" sx={{backgroundColor: 'grey'}} onClick={handleClearClick}>
                        Очистить выбор
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon />} sx={{backgroundColor: 'blue'}} onClick={handleSendClick}>
                        Отправить
                    </Button>
                </Buttons>
            </Box>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {!error ? 'Success!' : 'Ooops'}
                </Alert>
            </Snackbar>
        </Root>
    );
};

export default Order;
