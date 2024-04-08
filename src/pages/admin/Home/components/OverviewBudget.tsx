import ArrowDownIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import CurrencyDollarIcon from '@mui/icons-material/CurrencyBitcoin';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewBudget = (props: any) => {
  const { month, positive = false, sx, value, title, formatValue } = props;

  const difference = ((value - (value - month)) * 10) / 100;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {title}
            </Typography>
            <Typography variant="h4">{formatValue ? formatValue(value) : value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <SvgIcon color={positive ? 'success' : 'error'} fontSize="small">
              {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </SvgIcon>
            <Typography color={positive ? 'success.main' : 'error.main'} variant="body2">
              {difference}%
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="caption">
            Since last month
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewBudget;
