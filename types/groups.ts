export type Group = {
    id: string;
    name: string;
    target_amount: number;
    max_members: number;
    status: 'pending' | 'funded' | 'expired';
    created_by: string;
    purchase_item: string;
    created_at: string;
}