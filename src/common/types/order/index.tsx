import { IAssetsService } from "../service";

export interface GetOrdersComponentProps {
    hideUpdateColumn?: boolean; 
    orders: any
}

export interface ICovering {
    id: number;
    type: string;
}

export interface IOrderProps {
    service: IAssetsService[];
    getSingleAssets: any;
    covering: ICovering[];
}
