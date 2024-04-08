import Box from '@mui/material/Box';
import { useQuery } from '@tanstack/react-query';

import Event from 'src/components/Event';
import EventNotificationBanner from 'src/components/EventNotificationBanner';
import PopularSales from 'src/components/PopularSales';
import Service from 'src/components/Service';
import SlideCategory from 'src/components/Slide';
import SlideShow from 'src/components/SlideShow';

import BestSelling from './components/BestSelling';
import { getWeekTopProduct } from './httpClients';

function Home() {
  const { data: productBestTheWeek = [] } = useQuery({
    queryKey: ['getWeekTopProduct'],
    queryFn: () => getWeekTopProduct(),
    retry: 0,
    select: ({ data: { data } }) => data,
  });

  return (
    <Box bgcolor="#fff">
      <SlideShow />
      <SlideCategory />
      <Service />
      <BestSelling />
      <Event />
      <PopularSales productBestTheWeek={productBestTheWeek} />
      <EventNotificationBanner />
    </Box>
  );
}

export const Component = Home;
