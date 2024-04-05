import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowModel, GridRowModes, GridRowModesModel, GridSlots, GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { randomId } from "@mui/x-data-grid-generator";
import { IAssetsService } from "common/types/service";

interface UpdateTableProps {
    selectedService: IAssetsService | null;
    getSingleAssets: (params: FetchDataParams) => Promise<void>;
    columns: GridColDef[];
    rows: GridRowModel[];
    setRows: (updateFunction: (oldRows: GridRowModel[]) => GridRowModel[]) => void;
}

interface FetchDataParams {
    url: string;
    otherParams: any;
}

interface EditToolbarProps {
    setRows: (updateFunction: (oldRows: GridRowModel[]) => GridRowModel[]) => void;
    setRowModesModel: (updateFunction: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

const UpdateTableComponent: React.FC<UpdateTableProps> = ({ columns, rows, getSingleAssets, setRows }) => {
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const EditToolbar = (props: EditToolbarProps) => {
        const { setRowModesModel } = props;

        const handleAddClick = () => {
            const id = randomId();
            setRows((oldRows) => [...oldRows, { id, name: '', age: 0, isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            }));
        };

        const handleDeleteClick = () => {
            const selectedIds = Object.keys(rowModesModel);
            const newRows = rows.filter(row => !selectedIds.includes(row.id.toString()));
            setRows(() => newRows);
            setRowModesModel((oldModel) => {
                const newModel = { ...oldModel };
                selectedIds.forEach(id => {
                    delete newModel[id];
                });
                return newModel;
            });
        };

        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
                    Add record
                </Button>
                <Button color="secondary" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
                    Delete selected
                </Button>
            </GridToolbarContainer>
        );
    };

    

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                slots={{
                    toolbar: EditToolbar as GridSlots['toolbar'],
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </div>
    );
};

export default UpdateTableComponent;
