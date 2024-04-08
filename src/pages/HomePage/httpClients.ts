import Service from '../../service';

export const getBrands = () => Service.get('/v1/brands');

export const getWeekTopProduct = () => Service.get(`/v1/products?week_top=true&limit=12`);
