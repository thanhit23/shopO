import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import HelpIcon from '@mui/icons-material/Help';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import { LoadingButton } from '@mui/lab';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tippy from '@tippyjs/react/headless';
import { compose } from 'redux';

import { State } from 'src/common/types';
import { integrationPathImage } from 'src/helpers';
import { t } from 'src/libs/intl';
import { PATH_AUTH } from 'src/routes/paths';

import ErrorMessage from '../ErrorMessage';
import ImageCropper from '../ImageCropper';
import ModalSeeImage from '../ModalSeeImage';
import MuiTextField from '../TextField';
import styles from './styles';
import { Props, TData, UserSubmitForm } from './types';
import { editProfileValidationSchema } from './validationSchema';

const FormEditProfileUser: React.FC<Props> = ({ auth, onUpdateProfileUser, onUploadAvatar, onUpdateAvatarUser }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [seeProfile, setSeeProfile] = useState(false);
  const handleClose = () => setOpenModal(false);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<UserSubmitForm>({
    mode: 'onChange',
    resolver: yupResolver(editProfileValidationSchema(t)),
    defaultValues: {
      name: auth.name,
      email: auth.email,
      phoneNumber: String(auth.phoneNumber || ''),
      location: auth.location,
      gender: auth.gender,
    },
  });

  const { email, name, phoneNumber, location, gender } = errors;

  const ERROR_MESSAGE = {
    updateProfileFailed: t('Update profile failed'),
    updateProfileSuccess: t('Update profile success'),
  };

  const onSubmitForm = (data: UserSubmitForm) => {
    onUpdateProfileUser.mutate(
      { ...data, phoneNumber: String(data.phoneNumber) },
      {
        onSuccess: ({ data: { status } }: TData) => {
          if (status) {
            toast.success(ERROR_MESSAGE.updateProfileSuccess);
            navigate(PATH_AUTH.profile);
          } else {
            toast.error(ERROR_MESSAGE.updateProfileFailed);
          }
        },
      },
    );
  };

  return (
    <Grid item xs={12} lg={9}>
      <Paper sx={styles.paperAvatar}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <Box marginBottom="32px">
                <Grid container spacing={{ xs: 3 }}>
                  <Grid item xs={12} md={6}>
                    <MuiTextField
                      size="medium"
                      sx={styles.inputStyles}
                      label={t('Name')}
                      message={t('Name')}
                      validate={register('name')}
                    />
                    <ErrorMessage name={name} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MuiTextField
                      size="medium"
                      sx={styles.inputStyles}
                      disabled
                      type="email"
                      label={t('Email')}
                      message={t('Email')}
                      validate={register('email')}
                    />
                    <ErrorMessage name={email} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MuiTextField
                      size="medium"
                      sx={styles.inputStyles}
                      label={t('Phone Number')}
                      message={t('Phone Number')}
                      validate={register('phoneNumber')}
                    />
                    <ErrorMessage name={phoneNumber} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MuiTextField
                      size="medium"
                      sx={styles.inputStyles}
                      label={t('Address')}
                      message={t('Address')}
                      validate={register('location')}
                    />
                    <ErrorMessage name={location} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RadioGroup row>
                      <FormControlLabel
                        checked={+watch('gender') === 1}
                        value={1}
                        control={<Radio {...register('gender')} />}
                        label={t('Female')}
                      />
                      <FormControlLabel
                        checked={+watch('gender') === 2}
                        value={2}
                        control={<Radio {...register('gender')} />}
                        label={t('Male')}
                      />
                    </RadioGroup>
                    <ErrorMessage name={gender} />
                  </Grid>
                </Grid>
              </Box>
              <LoadingButton
                loading={onUpdateProfileUser.isLoading}
                variant="contained"
                type="submit"
                sx={styles.btnSave}
              >
                {t('Update profile')}
              </LoadingButton>
            </form>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styles.boxContainerAvatar}>
              <Box marginBottom="20px">
                <Box display="flex" gap="8px" alignItems="center" marginBottom="8px">
                  <Box fontSize="20px" fontWeight={700}>
                    {t('Update Profile')}
                  </Box>
                  <HelpIcon sx={{ color: '#888f9a' }} />
                </Box>
                <Box color="#8e8e8e" display="flex" gap="5px">
                  {t('Profile of at least')} <Box color="#111">{t('Max 5mb.')}</Box>
                </Box>
              </Box>
              <Box sx={styles.boxWrapAvatar}>
                <Tippy
                  interactive
                  trigger="click"
                  placement="bottom-start"
                  zIndex={999}
                  render={attrs => (
                    <Box component={'ul'} sx={styles.avatarDropdown} tabIndex={-1} {...attrs}>
                      {auth.avatar && (
                        <Box component={'li'} sx={styles.avatarDropdownItem} onClick={() => setSeeProfile(true)}>
                          <PortraitOutlinedIcon />
                          {t('See profile picture')}
                        </Box>
                      )}
                      <Box component={'li'} sx={styles.avatarDropdownItem} onClick={() => setOpenModal(true)}>
                        <WallpaperOutlinedIcon />
                        {t('Choose profile picture')}
                      </Box>
                    </Box>
                  )}
                >
                  <Avatar sx={styles.avatar} src={auth.avatar} alt={auth.name} />
                </Tippy>
                <ModalSeeImage
                  openModal={seeProfile}
                  handleCloseModal={() => setSeeProfile(false)}
                  image={auth.avatar}
                />
                <Box sx={styles.boxUpload}>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={() => setOpenModal(true)}
                  >
                    <EditIcon sx={styles.iconCameraEnhance} />
                  </IconButton>
                  <ImageCropper
                    openModal={openModal}
                    handleCloseModal={handleClose}
                    onUploadAvatar={onUploadAvatar}
                    onUpdateAvatarUser={onUpdateAvatarUser}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = ({ global: { auth } }: State) => ({
  auth,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(FormEditProfileUser);
