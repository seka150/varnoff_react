export interface IAssetsService {
    id: number
    name: string;
    description: string;
    price: number;
    url: string;
    otherParams: any
}

export interface ISingleAssetsService {
    service: IAssetsService[];
}

export interface MenuServiceProps {
    service: IAssetsService[];
    handleServiceSelect: (service: IAssetsService) => void;
}
