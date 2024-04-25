import { IAssetsService } from "common/types/service";
import Order from "components/order"
import { getSingleAssets } from "store/thunks/data";
import { useAppDispatch, useAppSelector } from "utils/hook";


const WatchlistPage =  () => {
    const dispatch = useAppDispatch();
    const serviceArray: IAssetsService[] = useAppSelector((state) => state.service.service);

    return (
        <Order 
        service={serviceArray}
        getSingleAssets={(params: any) => dispatch<any>(getSingleAssets(params))}
        /> 
    )
}

export default WatchlistPage