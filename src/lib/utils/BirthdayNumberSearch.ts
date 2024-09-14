export default class BirthdayNumberSearch {
    data: BirthdayNumberData;
    constructor(data: BirthdayNumberData) {
        this.data = data;
    }

    public find(day:string,digit: number): string[] {
        let result: string[] = [];

        this.data.data.find((e: BirthdayDay) => {
            if(e.key == day){
                e.msg.forEach((item: BirthdayMsg) => {
                    item.key.find((i) => i == digit ? result.push(item.msg) : null);
                })
            }
        })
        return result;
    }

}