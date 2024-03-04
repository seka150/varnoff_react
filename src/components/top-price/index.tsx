import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import React from "react";
import { useStyled } from "./styles";


const TopPriceComponent = (props: any) => {
    const {assets} = props
    const theme = useTheme()
    const {PriceDown, PriceUp} = useStyled(theme)
    return (
        <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell align="right">Цена</TableCell>
                    <TableCell align="right">Изменения (%)</TableCell>
                    <TableCell align="right">Изменения ($)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {assets.map((element: any) => (
                    <TableRow
                    key={element.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {element.name}
                    </TableCell>
                    <TableCell align="right">{element.current_price}</TableCell>
                    {element.price_change_24h > 0 ? (
                                        <>
                                        <PriceUp align="right">
                                        {element.price_change_24h.toFixed(2)}
                                        </PriceUp>
                                        </>
                                    ) : (
                                        <>
                                        <PriceDown align="right">
                                        {element.price_change_24h.toFixed(2)}
                                        </PriceDown>
                                        </>
                                    )}
                    {element.price_change_percentage_24h > 0 ? (
                                        <>
                                        <PriceUp align="right">
                                        {element.price_change_percentage_24h.toFixed(2)}
                                        </PriceUp>
                                        </>
                                    ) : (
                                        <>
                                        <PriceDown align="right">
                                        {element.price_change_percentage_24h.toFixed(2)}
                                        </PriceDown>
                                        </>
                                    )}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}

export default TopPriceComponent