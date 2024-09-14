export default class BirthdayNumberRepository {
      public data: BirthdayNumberData;

    constructor() {
        this.data = {} as BirthdayNumberData;
        this.initialize();
    }

    private async initialize(): Promise<void> {
        this.data = await this.get();
    }
    private async get(): Promise<BirthdayNumberData> {
        let value: BirthdayNumberData;
        await fetch('./storages/BirthdayNumber.json')
            .then(response => response.json())
            .then(data => {
                value = data;
            });
        return value;
    }
}