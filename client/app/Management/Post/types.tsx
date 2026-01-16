export interface ScheduledPost{
    id: number;
    title: string;
    content: string;
    platform: string;
    scheduledTime: Date;
    status: 'scheduled' | 'posted' | 'failed';
    error?: string;

}