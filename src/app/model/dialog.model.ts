export interface dialogModel {
    type: string;
    value: any;
    title: string;
    field: string;
    required: boolean;
    listRadio?: radio[],
    listSelect?: radio[],
}

export interface radio {
    id: string,
    name: string,
}

// date
// datetime-local
// email
// month
// number
// password
// search
// tel
// text
// time
// url
// week