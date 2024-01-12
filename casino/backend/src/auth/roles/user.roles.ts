import { RolesBuilder } from "nest-access-control";

export enum Role{
    User = 'user',
    Admin = 'admin'
}


export const roles : RolesBuilder = new RolesBuilder();


roles.grant(Role.User).readAny(['profile']).updateOwn('profile').deleteOwn('profile').readAny('game');
roles.grant(Role.Admin).extend(Role.User).createAny('profile').readAny('profile').updateAny('profile').deleteAny('profile').createAny('game').readAny('game').updateAny('game').deleteAny('game');

