export default class HomeNumberRepository {
    public data: HomeNumberData;
    constructor() {
        this.data = {} as HomeNumberData;
        this.initialize();
    }

    private async initialize(): Promise<void> {
        this.data = await this.get();
    }
    private async get(): Promise<HomeNumberData> {  
        let value: HomeNumberData;
         await fetch('./storages/HomeNumber.json').then(response => response.json()).then(data => {
            value = data
    });
        return value;
    }
}