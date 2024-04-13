import { GridColDef, GridRowModel, GridRowModesModel } from "@mui/x-data-grid";
import { IAssetsService } from "../service";

export interface IAssetsData {
    id: number
    serviceId: number
    rows: GridRowModel
    isNew: boolean
}

export interface ISingleAssetsData {
    service: IAssetsData[];
}

export interface FetchDataParams {
    url: string;
    otherParams: any;
}

export interface UpdateTableProps {
    selectedService: IAssetsService | null;
    getSingleAssets: (params: FetchDataParams) => Promise<void>;
    columns: GridColDef[];
    rows: GridRowModel[];
    setRows: (updateFunction: (oldRows: GridRowModel[]) => GridRowModel[]) => void;
    serviceId: (number | undefined)[];
}


export interface EditToolbarProps {
    setRows: (updateFunction: (oldRows: GridRowModel[]) => GridRowModel[]) => void;
    setRowModesModel: (updateFunction: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}