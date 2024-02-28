export interface UserProps {
    id: string | undefined;
    _id?: string;
    ids?: string[];
    username: string;
    password?: string;
    roles: string[],
    active: boolean
}