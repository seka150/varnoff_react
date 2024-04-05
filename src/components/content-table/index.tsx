import { useState } from "react";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "utils/hook";
import { getSingleAssets } from "store/thunks/data";
import UpdateTableComponent from "components/update-table";
import { IAssetsService } from "common/types/service";
import MenuService from "components/navigate-service";
import { GridColDef, GridRowModel } from "@mui/x-data-grid";
import { translations } from "utils/helpers/translation";

const ContentComponent = () => {
    const dispatch = useAppDispatch();
    const [selectedService, setSelectedService] = useState<IAssetsService | null>(null);
    const serviceArray: IAssetsService[] = useAppSelector((state) => state.service.service);
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<GridRowModel[]>([]);


    const handleServiceSelect = async (selectedService: IAssetsService) => {
        try {
            const data = await dispatch<any>(getSingleAssets({
                url: selectedService.url,
                otherParams: selectedService.otherParams
            }));
    
            setSelectedService(selectedService);
            const services = data.payload.services;
            const columns: GridColDef[] = Object.keys(services[0]).map((field) => ({
                field: field,
                headerName: translations[field] ?? field,
            }));
    
            const rows: GridRowModel[] = services.map((service: any, index: number) => ({
                id: index + 1, 
                ...service
            }));
    
            setColumns(columns);
            setRows(rows);
        } catch (error) {
            console.error("Ошибка при загрузке данных для выбранного сервиса:", error);
        }
    };
    

    return (
        <Grid container item xs={12}>
            <Grid container item xs={12} sx={{marginBottom: '20px'}}>
                {serviceArray && <MenuService service={serviceArray} handleServiceSelect={handleServiceSelect} />}
            </Grid>
            <Grid container item xs={12}>
                <UpdateTableComponent 
                    selectedService={selectedService} 
                    getSingleAssets={(params) => dispatch<any>(getSingleAssets(params))}
                    columns={columns}
                    rows={rows}
                    setRows={setRows}
                />
            </Grid>
        </Grid>
    );
};

export default ContentComponent;
