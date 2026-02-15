export type MemoryBlock = 
    | {
        id: string;
        type: 'text';
        content: string;
    }
    | {
        id: string;
        type: 'image';
        uri: string;
    };

export type Memory = {
    id: string;
    type: 'star' | 'moon';
    title: string;
    blocks: MemoryBlock[];
    date: string; // ISO format
    location?: string;
    createdAt: number;
}