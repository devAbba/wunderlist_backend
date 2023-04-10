export interface ITask {
    title: string;
    description: string;
    set_reminder: boolean;
    re_occuring: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}