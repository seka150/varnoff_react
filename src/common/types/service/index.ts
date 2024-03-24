export interface IAssetsService {
    name: string
    description: string
    price: number
}

export interface ISingleAssetsService {
    service: IAssetsService[];
}