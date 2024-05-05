import React, { useState } from "react";
import { DataGrid, GridRowId, GridRowModes, GridRowModesModel, GridSlots, GridToolbarContainer } from "@mui/x-data-grid";
import { Alert, AlertColor, Button, Snackbar, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { EditToolbarProps, UpdateTableProps } from "common/types/data";
import { deleteAssets, postAsset, updateAsset } from "store/thunks/data";
import { useAppDispatch } from "utils/hook";


const UpdateTableComponent: React.FC<UpdateTableProps> = ({ columns, rows, getSingleAssets, setRows, serviceId, selectedService }) => {
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [addedRows, setAddedRows] = useState<any[]>([]);
    const [formData, setFormData] = useState<{ [key: string]: string | number }>({});
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [severity, setSeverity] = useState<AlertColor>('success')

    const handleSelectionChange = (newSelection: GridRowId[]) => {
        setSelectedIds(newSelection.map(String)); 
        const updatedRowModesModel: GridRowModesModel = {};
        newSelection.forEach(id => {
            updatedRowModesModel[id] = { mode: GridRowModes.Edit, fieldToFocus: columns[0].field };
        });
        setRowModesModel(updatedRowModesModel);
    };

    const handleEditClick = async () => {
        try {
            if (selectedIds.length === 0) {
                console.log("Выберите ряды для редактирования");
                return;
            }
            
            const assetsToUpdate = rows.filter(row => selectedIds.includes(row.id.toString()));
    
            const modifiedAssets = assetsToUpdate.map(asset => {
                const { editMode, editable, ...updatedAsset } = asset;
                return updatedAsset;
            });
    
            await Promise.all(modifiedAssets.map(asset => {
                return dispatch(updateAsset({ id: asset.id, url: `${selectedService?.url}`, otherParams: asset }));
            }));

            setRows(rows => [...rows]); 
    
            console.log("Редактирование данных:", selectedIds);
        } catch (error) {
            console.error("Ошибка при редактировании данных:", error);
        }
    };
    
    
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
            setFormData(prevFormData => ({
                ...prevFormData,
                [fieldName]: numericValue
            }));
        };

        const handleSaveClick = async (e: any) => {
            e.preventDefault();
            try {
                // Проверяем, заполнены ли данные перед сохранением
                const formDataValues = Object.values(formData);
                if (formDataValues.some(value => value === '' || value === null)) {
                    throw new Error('Данные не заполнены');
                }
        
                const requestData = {
                    url: `${selectedService?.url}`,
                    otherParams: formData
                };
                
                await dispatch(postAsset(requestData));
        
                setError(false);
                setSeverity('success');
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 2000);
            } catch (error) {
                console.error("Ошибка при сохранении данных на сервере:", error);
                setError(true);
                setSeverity('error');
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 2000);
            }
        };
        
        
        const handleDeleteClick = () => {
            try {
                console.log("Selected IDs for deletion:", selectedIds);
        
                selectedIds.forEach(id => {
                    dispatch(deleteAssets({ id: parseInt(id), url: `${selectedService?.url}` }))
                        .then(() => {
                            console.log(`Row with ID ${id} deleted successfully from the server.`);
                        })
                        .catch((error) => {
                            console.error(`Failed to delete row with ID ${id} from the server:`, error);
                        });
                });
        
                const newRows = rows.filter(row => !selectedIds.includes(row.id.toString()));
                console.log("New rows after deletion:", newRows);
        
                setRows((oldRows) => newRows);
                setRowModesModel((oldModel) => {
                    const newModel = { ...oldModel };
                    selectedIds.forEach(id => {
                        delete newModel[id];
                    });
                    console.log("Updated row modes model after deletion:", newModel);
                    return newModel;
                });
            } catch (error) {
                console.error("Error occurred while deleting rows:", error);
            }
        };

        const handleCancelClick = async () => {
            try {
                setFormData({});
            } catch (error) {
                console.error("Ошибка при отмене редактирования:", error);
            }
        };

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
                <Button color="secondary" startIcon={<CancelIcon />} onClick={handleCancelClick}/>
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
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                slots={{
                    toolbar: EditToolbar as GridSlots['toolbar'],
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {!error ? 'Данные успешно сохранены на сервере!' : 'Ошибка при сохранении данных на сервере'}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default UpdateTableComponent;
