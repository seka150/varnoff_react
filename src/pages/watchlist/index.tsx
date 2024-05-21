import { useAppDispatch, useAppSelector } from "utils/hook";
import { useEffect, useState } from "react";
import { IGetOrder, getOrder } from "store/thunks/order";
import Order from "components/order";
import { IAssetsService } from "common/types/service";
import { getSingleAssets } from "store/thunks/data";



const WatchlistPage = () => {
    const dispatch = useAppDispatch();
    const [orderData, setOrderData]= useState<IGetOrder[]>([]);
    const serviceArray: IAssetsService[] = useAppSelector((state) => state.service.service);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const actionResult = await dispatch(getOrder());
                if (actionResult.payload) {
                    const orders: IGetOrder[] = Array.isArray(actionResult.payload) ? actionResult.payload : [];
                    setOrderData(orders);
                } else {
                    console.error('Error fetching data: payload is undefined');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <Order 
            service={serviceArray}
            getSingleAssets={(params: any) => dispatch<any>(getSingleAssets(params))}
        />
    );
};


export default WatchlistPage
