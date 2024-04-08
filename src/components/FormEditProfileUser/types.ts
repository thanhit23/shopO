import { UseMutationResult } from '@tanstack/react-query';

import { Auth, AuthType } from 'src/pages/Authenticated/types';

import { UploadAvatarResponse } from '../ImageCropper/types';

export interface TData {
  data: { status: boolean };
}

export type State = { global: Auth };

export type Props = {
  auth: AuthType;
  onUpdateProfileUser: UseMutationResult<TData, unknown, UserSubmitForm, unknown>;
  onUploadAvatar: UseMutationResult<UploadAvatarResponse, unknown, object, unknown>;
  onUpdateAvatarUser: UseMutationResult<TData, unknown, string, unknown>;
};

export interface UserSubmitForm {
  email: string;
  name: string;
  phoneNumber: string;
  location: string;
  gender: number;
}
