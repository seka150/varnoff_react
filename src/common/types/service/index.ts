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
