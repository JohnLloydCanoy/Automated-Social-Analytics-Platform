export interface Question{
    id: string;
    text: string;
    date_asked: Date;
    answer?: string;
}

export interface Answer{
    id: string;
    text: string;
    date_answered: Date;
}

