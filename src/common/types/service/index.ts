export interface IAssetsService {
    name: string
    description: string
    price: number
    url: string
}

export interface ISingleAssetsService {
    service: IAssetsService[];
}