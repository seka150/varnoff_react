import { Stack, Autocomplete, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { IAssetsService } from "common/types/service";
import { getService } from "store/thunks/service";

const SearchBarComponent: FC = (): JSX.Element => {
    const [selectedItem, setSelectedItem] = useState<IAssetsService | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const serviceArray: IAssetsService[] = useAppSelector(
        (state) => state.service.service
    );

    useEffect(() => {
        dispatch(getService());
    }, [dispatch]);

    const handleSelectItem = (e: any, value: { name: string; url: string; } | null) => {
        if (value) {
            navigate(`single/${value.url}`, { state: { url: value.url } });
            setSelectedItem(null); 
        }
    };

    const serviceArrayMap = Object.values(serviceArray); 
    const flatServiceArray = serviceArrayMap.flat();
    const serviceWithIds = flatServiceArray.map((serviceArray) => ({
        name: serviceArray.name,
        url: serviceArray.url // Добавим свойство 'url'
    }));

    return (
        <Stack spacing={2} sx={{width: 300}}>
            <Autocomplete 
                value={selectedItem}
                onChange={handleSelectItem}
                renderInput={(element) => (
                    <TextField {...element} label="Поиск" InputProps={{
                        ...element.InputProps,
                        type: 'search'
                    }} />
                )} 
                options={serviceWithIds} // Используем обновленные опции
                getOptionLabel={(option) => option.name} 
            />
        </Stack>
    )
}

export default SearchBarComponent;
