import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { login } from 'src/pages/Login/services';
import { loginAdmin } from 'src/pages/admin/Login/services';

type ClientLogin = {
  email: string;
  password: string;
};

export const useClientLogin = (options: UseMutationOptions<any, unknown, ClientLogin> = {}) =>
  useMutation({
    mutationFn: async variables => {
      const { data } = await login(variables);

      return data;
    },
    ...options,
  });

export const useAdminLogin = (options: UseMutationOptions<any, unknown, ClientLogin> = {}) =>
  useMutation({
    mutationFn: async variables => {
      const { data } = await loginAdmin(variables);

      return data;
    },
    ...options,
  });
