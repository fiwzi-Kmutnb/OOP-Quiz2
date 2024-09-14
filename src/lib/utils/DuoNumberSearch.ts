export default class DuoNumberSearch {
    data: DuoNumberData;
    constructor(data: DuoNumberData) {
        this.data = data;
    }
    public find(address: string): string[] {
        let result: string[] = [];
        this.data.data.forEach((item: DuoNumber) => {
            if(address.indexOf(item.number[0]) > -1 || address.indexOf(item.number[1]) > -1){
                result.push(`${item.number[0]} หรือ ${item.number[1]}: ${item.msg}`);
            }
        })
        return result;
    }

}