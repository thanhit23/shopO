import Service from 'src/service';

export const getAnalytics = (data: object) => Service.get('/admin/analytics', data);
