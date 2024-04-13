import React, { useState } from "react";
import { DataGrid, GridRowModes, GridRowModesModel, GridSlots, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { EditToolbarProps, UpdateTableProps } from "common/types/data";
import { postAsset } from "store/thunks/data";
import { useAppDispatch } from "utils/hook";


const UpdateTableComponent: React.FC<UpdateTableProps> = ({ columns, rows, getSingleAssets, setRows, serviceId, selectedService }) => {
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [addedRows, setAddedRows] = useState<any[]>([]);
    const [formData, setFormData] = useState<{ [key: string]: string | number }>({});

    const dispatch = useAppDispatch()

    const EditToolbar = (props: EditToolbarProps) => {
        const { setRowModesModel } = props;

        const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            const id = rows.length > 0 ? Math.max(...rows.map(row => row.id)) + 1 : 1;
            if (serviceId && serviceId.length > 0) {
                const firstServiceId = serviceId[0];
                const newRecord = { id, serviceId: firstServiceId, isNew: true, ...formData };
                setAddedRows(prevAddedRows => [...prevAddedRows, newRecord]);
                setRows(oldRows => [...oldRows, newRecord]); 
                setRowModesModel(oldModel => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit, fieldToFocus: 'serviceId' },
                }));
                setFormData(formData);
            } else {
                console.error("Массив serviceId пустой или не определен");
            }
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
            const { value } = e.target;
            const numericValue = !isNaN(parseFloat(value)) ? parseFloat(value) : value;
            console.log('Field Name:', fieldName);
            console.log('Value:', numericValue);
            setFormData(prevFormData => ({
                ...prevFormData,
                [fieldName]: numericValue
            }));
        };

        const handleSaveClick = async (e: any) => {
            e.preventDefault();
            try {
                console.log("Form data:", formData);
        
                const requestData = {
                    url: `${selectedService?.url}`,
                    otherParams: formData
                };
        
                console.log("Sending request with data:", requestData);
                
                await dispatch(postAsset(requestData));
                
                console.log("Данные успешно сохранены на сервере!");
            } catch (error) {
                console.error("Ошибка при сохранении данных на сервере:", error);
            }
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

        const handleCanelClick = async () => {
            
        }

        const handleEditClick = async () => {
            
        }

        return (
            <GridToolbarContainer>
                {columns.map((column) => (
                    <TextField
                    key={column.field}
                    label={column.headerName}
                    value={formData[column.field] || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, column.field)}
                />
                ))}
                <Button color="secondary" startIcon={<AddIcon />} onClick={handleAddClick}/>
                <Button color="secondary" startIcon={<DeleteIcon />} onClick={handleDeleteClick}/>
                <Button color="secondary" startIcon={<SaveIcon />} onClick={handleSaveClick}/>
                <Button color="secondary" startIcon={<CancelIcon />} onClick={handleCanelClick}/>
                <Button color="secondary" startIcon={<EditIcon />} onClick={handleEditClick}/>
            </GridToolbarContainer>
        );
    };

    return (
        <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row" 
                autoHeight
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
