import Service from 'src/service';

export const loginAdmin = (data: object) => Service.post('/admin/auth/login', data);
