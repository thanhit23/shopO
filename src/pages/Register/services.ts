import Service from 'src/service';

import { UserSubmitForm } from './RegisterForm/types';

export const register = (data: UserSubmitForm) => Service.post('/v1/auth/register', data);
