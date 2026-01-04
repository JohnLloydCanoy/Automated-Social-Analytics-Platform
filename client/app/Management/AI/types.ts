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

export interface ChatSession{
    id: string;
    questions: Question[];
    answers: Answer[];
    created_at: Date;
}
