import { useAppDispatch, useAppSelector } from "utils/hook";
import { useEffect } from "react";
import { getOrder } from "store/thunks/order";
import Order from "components/order";
import { IAssetsService } from "common/types/service";
import { getSingleAssets } from "store/thunks/data";
import { getCoverings } from "store/thunks/covering";
import { ICovering as IOrderCovering } from "common/types/order"; 

const WatchlistPage = () => {
    const dispatch = useAppDispatch();

    const serviceArray: IAssetsService[] = useAppSelector((state) => state.service.service);
    const coverings = useAppSelector((state) => state.coverings.coverings); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getOrder());
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchData();
        dispatch(getCoverings());  
    }, [dispatch]);

    return (
        <Order
            service={serviceArray}
            getSingleAssets={(params: any) => dispatch<any>(getSingleAssets(params))}
            covering={coverings as IOrderCovering[]} 
        />
    );
};

export default WatchlistPage;
