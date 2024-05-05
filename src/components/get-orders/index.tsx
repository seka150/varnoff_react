import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem, FormControl, InputLabel, Popover, Snackbar, Alert, AlertColor } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { IGetOrder, getOrder, updateOrderStatus } from 'store/thunks/order';
import { statuses } from 'utils/helpers/status';
import { useAppDispatch } from 'utils/hook';

const GetOrdersComponent = () => {
    const [rows, setRows] = useState<IGetOrder[]>([]);
    const dispatch = useAppDispatch();
    const [selectStatus, setSelectStatus] = useState<number>(0);
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [severity, setSeverity] = useState<AlertColor>('success')

    const handleChange = (event: ChangeEvent<{ value: unknown; }>) => {
        setSelectStatus(event.target.value as number);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const actionResult = await dispatch(getOrder());
                if (actionResult.payload) {
                    const orders: IGetOrder[] = Array.isArray(actionResult.payload) ? actionResult.payload : [];
                    setRows(orders);
                } else {
                    console.error('Error fetching data: payload is undefined');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const getStatusCellColor = (statusId: number) => {
        switch (statusId) {
            case 1:
                return '#4CAF50';
            case 2:
                return '#FFC107';
            case 3:
                return '#F44336';
            default:
                return 'inherit';
        }
    };

    const handleUpdateStatus = async (id: number, statusId: number) => {
        try {
            const actionResult = await dispatch(updateOrderStatus({ orderId: id, statusId }));
            if (updateOrderStatus.fulfilled.match(actionResult)) {
                const updatedOrder: IGetOrder = actionResult.payload;
                setRows(prevRows =>
                    prevRows.map(row => (row.id === id ? { ...row, statusId: updatedOrder.statusId } : row))
                );
                setError(false)
                setSeverity('success')
                setOpen(true)
                setTimeout(() => {
                setOpen(false)
            }, 2000)
            } else {
                console.error('Обновление статуса заказа не удалось');
                setError(true)
                setSeverity('error')
                setOpen(true)
                setTimeout(() => {
                    setOpen(false)
                }, 2000)
            }
        } catch (error) {
            console.error('Ошибка при обновлении статуса заказа:', error);
            setError(true)
            setSeverity('error')
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 2000)
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Описание</TableCell>
                            <TableCell align="right">
                                Статус
                            </TableCell>
                            <TableCell align="right">User ID</TableCell>
                            <TableCell align="right">Service ID</TableCell>
                            <TableCell align="right">Обновить статус</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">
                                    <Button style={{ backgroundColor: getStatusCellColor(row.statusId), color: '#fff', cursor: 'auto' }}>
                                        {statuses[row.statusId]}
                                    </Button>
                                </TableCell>
                                <TableCell align="right">{row.userId}</TableCell>
                                <TableCell align="right">{row.serviceId}</TableCell>
                                <TableCell align="right">
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-label">Обновить</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={selectStatus}
                                            label="Статусы"
                                            onChange={(e) => {
                                                handleChange(e as React.ChangeEvent<{ value: unknown; }>);
                                                handleUpdateStatus(row.id, Number(e.target.value));
                                            }}
                                        >
                                            <MenuItem value={1}>Новый</MenuItem>
                                            <MenuItem value={2}>В процессе</MenuItem>
                                            <MenuItem value={3}>Завершен</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {!error ? 'Success!' : 'Ooops'}
                </Alert>
            </Snackbar>
        </>
    );
};

export default GetOrdersComponent;
