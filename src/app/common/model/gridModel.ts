export class GridModel {
    page: number = 0;
    pageLoading: boolean = true;
    pageSize: number = 5;
    searchText: string = "";
    srtColumns: string = "";
    srtDirections: string = "";
    listFilter: FilterModel[] = [];
}

export class FilterModel {
    filterData: string;
    filterDirections: string;
    filterColumns: string;
}