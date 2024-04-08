import Service from 'src/service';

export const isMe = () => Service.get('/v1/auth/me');

export const isMeAdmin = () => Service.get('/admin/auth/me');

export const setHeader = (token: string) => Service.setBearerToken(token);
