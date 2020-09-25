export interface IProduct 
{
    ID:number ,
    Name: string,
    Price:number,
    Image:string,
    Brand:string,
    Description:string,
    Stars:number,
    Sale:number ,
    Quantity: number,
    CatID:number,
    Rate?:number[],
    TopRated?:boolean,
    PQ?:number,
    TotalMoeny?:number
}

