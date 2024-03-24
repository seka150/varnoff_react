import { Stack, Autocomplete, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { IAssetsService } from "common/types/service";
import { getService } from "store/thunks/service";

const SearchBarComponent: FC = (): JSX.Element => {
    const [selectedItem, setSelectedItem] = useState<string | null>('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const serviceArray: IAssetsService[] = useAppSelector(
        (state) => state.service.service
    )

    useEffect(() => {
        dispatch(getService());
    }, [dispatch]);

    const serviceArrayMap = Object.values(serviceArray); 

    const flatServiceArray = serviceArrayMap.flat();
    
    const serviceWithIds = flatServiceArray.map((serviceArray) => ({
        name: serviceArray.name,
    }));

    
    console.log(serviceArray)
    return(
        <Stack spacing={2} sx={{width: 300}}>
            <Autocomplete 
            value={selectedItem}
            onChange={(e: any, value: string | null ) => { navigate(`single/${value}`)
            setSelectedItem(null)
        }}
            renderInput={(element) => (
                <TextField {...element} label="Поиск" InputProps={{
                    ...element.InputProps,
                    type: 'search'
                }} />
            )} 
            options={serviceWithIds.map((element: {name: string}) => element.name)}/>
        </Stack>
    )
}

export default SearchBarComponent