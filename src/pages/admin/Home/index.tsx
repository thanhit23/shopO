import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useQuery } from '@tanstack/react-query';

import { formatPrice } from '../../../helpers';
import OverviewBudget from './components/OverviewBudget';
import { getAnalytics } from './services';

const Home = () => {
  const { data } = useQuery({
    queryKey: ['/admin/analytics'],
    queryFn: () => getAnalytics({}),
    select: data => data.data.data,
  });

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    '& > div > div > div': {
      '& > div:nth-of-type(1)': {
        display: 'none',
      },
    },
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <OverviewBudget
            title="Amount"
            formatValue={(value: number) => formatPrice.format(value)}
            value={data?.amountTotal}
            month={data?.amountMonth}
          />
        </Grid>
        <Grid item xs={3}>
          <OverviewBudget title="Order" value={data?.orderTotal} month={data?.orderMonth} />
        </Grid>
        <Grid item xs={3}>
          <OverviewBudget title="Shipping" value={data?.shippingTotal} month={data?.shippingMonth} />
        </Grid>
        <Grid item xs={3}>
          <OverviewBudget title="Sold" value={data?.soldTotal} month={data?.soldMonth} />
        </Grid>
      </Grid>
      <Box sx={styles}>
        <Card sx={{ marginTop: '20px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangeCalendar']}>
              <DateRangeCalendar calendars={3} sx={{ width: '100%' }} />
            </DemoContainer>
          </LocalizationProvider>
        </Card>
      </Box>
    </div>
  );
};

export const Component = Home;
