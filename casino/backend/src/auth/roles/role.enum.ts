import { RolesBuilder } from "nest-access-control";

export enum Role{
    User = 'user',
    Admin = 'admin'
}


export const  roles : RolesBuilder = new RolesBuilder();