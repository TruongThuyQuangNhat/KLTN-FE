export interface dialogModel {
    type: string;
    value: any;
    title: string;
    listRadio?: radio[],
}

export interface radio {
    value: string,
    text: string,
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