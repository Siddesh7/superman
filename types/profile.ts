import { Group } from "./groups";

export type ActiveTabTypes = 'dashboard' | 'myGroups' | 'myWallet' | 'dayPasses' | 'logout';

export type UserData = {
    id: string;
    name: string;
    email: string;
    wallet_address: string;
    profile_pic_url: string;
    created_at: string;
    createdGroups: Group[];
    joinedGroups: Group[];
}