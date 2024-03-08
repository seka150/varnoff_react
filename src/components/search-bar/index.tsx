import { Stack, Autocomplete, TextField } from "@mui/material";
import { useAppSelector } from "../../utils/hook";
import { ISingleAsset } from "../../common/types/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBarComponent = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>('')
    const navigate = useNavigate()
    const assetsArray: ISingleAsset[] = useAppSelector(
        (state) => state.assets.assets,
    )
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
            options={assetsArray.map((element: {name: string}) => element.name)}/>
        </Stack>
    )
}

export default SearchBarComponent