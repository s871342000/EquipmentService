export interface ICustomer{
    name: string,
    devices:{
        sn: string,
        model: string
    }[]
}