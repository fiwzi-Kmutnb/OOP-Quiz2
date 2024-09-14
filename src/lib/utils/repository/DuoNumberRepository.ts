export default class DuoNumberRepository {
    public data: DuoNumberData;
    constructor() {
        this.data = {} as DuoNumberData;
        this.initialize();
    }

    private async initialize(): Promise<void> {
        this.data = await this.get();
    }

    private async get(): Promise<DuoNumberData> {
        let value: DuoNumberData;
        await fetch('./storages/DuoNumber.json').then(response => response.json()).then(data => {
            value = data
        });
        return value;
    }
}