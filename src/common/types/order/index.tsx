import { IAssetsService } from "../service";

export interface GetOrdersComponentProps {
    hideUpdateColumn?: boolean; 
    orders: any
}

export interface IOrderProps {
    service: IAssetsService[];
    getSingleAssets: any;
}
