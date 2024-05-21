import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IGetOrder, getOrder } from 'store/thunks/order';
import { useAppDispatch, useAppSelector } from 'utils/hook';

const StatusComponent = () => {
    const steps = [
        {
            id: 1,
            label: 'Заказ принят',
            description: 'Ваш заказ был успешно принят и передан нашим специалистам для обработки. Скоро мы свяжемся с вами для уточнения некоторых моментов.',
        },
        {
            id: 2,
            label: 'Заказ в процессе разработки',
            description: 'Ваш заказ находится в стадии активной разработки. Мы усердно работаем над его выполнением.',
        },
        {
            id: 3,
            label: 'Заказ готов к выдаче',
            description: 'Ваш заказ успешно завершен и готов к выдаче. Готовы ли вы его получить?',
        },
    ];

    const [activeStep, setActiveStep] = useState(0);
    const [orderStatus, setOrderStatus] = useState<IGetOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IGetOrder | null>(null);
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth.user);

    const statusMapping: { [key: number]: number } = {
        1: 0, 
        2: 1, 
        3: 2 
    };

    const determineActiveStep = (statusId: number): number => {
        return statusMapping[statusId] ?? 0; 
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const actionResult = await dispatch(getOrder());
                if (actionResult.payload) {
                    const orders: IGetOrder[] = Array.isArray(actionResult.payload) ? actionResult.payload : [];
                    const userOrders = orders.filter(order => order.userId === user.id);
                    setOrderStatus(userOrders);
                } else {
                    console.error('Error fetching data: payload is undefined');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch, user.id]);

    const handleOrderClick = (order: IGetOrder) => {
        setSelectedOrder(order);
        setActiveStep(determineActiveStep(order.statusId));
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            {selectedOrder ? (
                <Box>
                    <Button onClick={() => setSelectedOrder(null)}>Назад к списку заказов</Button>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={index === 2 ? <Typography variant="caption">Последний шаг</Typography> : null}
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <Typography>{step.description}</Typography>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>Все шаги завершены - вы закончили</Typography>
                        </Paper>
                    )}
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6">Ваши заказы</Typography>
                    {orderStatus.length === 0 ? (
                        <Typography>У вас нет заказов. <a href="/watchlist">Создайте заказ</a></Typography>
                    ) : (
                        orderStatus.map((order) => (
                            <Box key={order.id} sx={{ mb: 2 }}>
                                <Button sx={{color: 'white', border: '1px solid #fff'}} variant="outlined" onClick={() => handleOrderClick(order)}>
                                    Заказ #{order.id}
                                </Button>
                            </Box>
                        ))
                    )}
                </Box>
            )}
        </Box>
    );
};

export default StatusComponent;
