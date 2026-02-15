export type Memory = {
    id: string;
    type: 'star' | 'moon';
    title: string;
    text: string;
    images: string[]; // max 5
    date: string; // ISO format
    location?: string;
    createdAt: number;
}