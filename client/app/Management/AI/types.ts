interface ChatInputProps {
    value: string;
    onChange: (val: string) => void;
    onSend: () => void;
    disabled: boolean;
}
    export interface ChatResponse {
    response: string;
    status: string;
}

export interface PerformanceReport {
    status: string;
    report: {
        total_posts: number;
        total_likes: number;
        total_views: number;
        avg_engagement: number;
        top_performing_post: string;
    };
}
export type MessageRole = "user" | "ai" | "error";
