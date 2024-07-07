import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IGetOrder, getOrder } from 'store/thunks/order';
import { useAppDispatch, useAppSelector } from 'utils/hook';
import { useStyled } from "./styles";
import { styled } from '@mui/system';

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
    const { user } = useAppSelector(state => state.auth.user);
    const theme = useTheme();
    const { TextH6, ButtonKatal, Root, BoxOrderRoot, BoxOrder } = useStyled(theme);

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

    const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
        '& .Mui-active': {
            color: '#7875FE', 
        },
        '& .Mui-completed': {
            color: '#7875FE', 
        },
    }));

    return (
        <Root>
            <TextH6 variant="h1" marginBottom='100px'>МОИ ЗАКАЗЫ</TextH6>
            {selectedOrder ? (
                <Box>
                    <ButtonKatal onClick={() => setSelectedOrder(null)}>Назад к списку заказов</ButtonKatal>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <CustomStepLabel
                                    optional={index === 2 ? <Typography variant="caption">Последний шаг</Typography> : null}
                                >
                                    {step.label}
                                </CustomStepLabel>
                                <StepContent>
                                    <Typography>{step.description}</Typography>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>Заказ получен!</Typography>
                        </Paper>
                    )}
                </Box>
            ) : (
                <Box>
                    {orderStatus.length === 0 ? (
                        <BoxOrderRoot>
                            <TextH6 variant='h5'>У вас нет заказов. 😭</TextH6>
                            <ButtonKatal href="/watchlist">Создайте заказ</ButtonKatal>
                        </BoxOrderRoot>
                    ) : (
                        orderStatus.map((order) => (
                            <BoxOrder key={order.id}>
                                <ButtonKatal variant="outlined" onClick={() => handleOrderClick(order)}>
                                    Заказ #{order.id}
                                </ButtonKatal>
                            </BoxOrder>
                        ))
                    )}
                </Box>
            )}
        </Root>
    );
};

export default StatusComponent;
