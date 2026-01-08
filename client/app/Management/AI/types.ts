export interface Message {
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
    questions: Message[];
    answers: Answer[];
    created_at: Date;
}
