import { IPCPart } from './pc-part';
interface IFilter {
    value: any;
}


export class FilterDataSrouce {

    private _initialDataSource: IPCPart[];
    public filteredData: IPCPart[];

    public constructor(initialData: IPCPart[]) {
        this._initialDataSource = JSON.parse(JSON.stringify(initialData));
        this.filteredData = JSON.parse(JSON.stringify(initialData));
    }

    public filter(byValue: string) {
        this.filteredData = this._initialDataSource.filter((item: IPCPart) => {
            if (item?.name?.toLowerCase().includes(byValue) || item?.info?.toLowerCase().includes(byValue)) {
                return true;
            }
            return false;
        });


    }
}