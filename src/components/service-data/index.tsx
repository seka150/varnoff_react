import React from "react";
import { GridColDef } from '@mui/x-data-grid';
import { useStyled } from "./styles";
import { useTheme } from "@mui/material";
import { ISingleAssetsService } from "common/types/service";

const ServiceDataComponent = (props: ISingleAssetsService) => {
    const theme = useTheme();
    const { Root } = useStyled(theme);
    const { service } = props;

    const serviceArray = Object.values(service); 

    const flatServiceArray = serviceArray.flat();
    
    const serviceWithIds = flatServiceArray.map((service, index) => ({
        id: index + 1,
        name: service.name,
        description: service.description,
        price: service.price,
    }));
    

    const columns: GridColDef[] = [
        { field: 'id', headerName: '№', width: 70 },
        { field: 'name', headerName: 'Название', width: 130, flex: 1, sortable: false },
        { field: 'description', headerName: 'Описание...', width: 200, flex: 1, sortable: false },
        {
            field: 'price',
            headerName: 'Цена (от) (руб.)',
            type: 'number',
            width: 90,
        },
    ];



    return (
        <div style={{ height: 400, width: '100%' }}>
            <Root
                rows={serviceWithIds}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
};

export default ServiceDataComponent;
