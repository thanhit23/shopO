import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { PATH_PUBLIC } from 'src/routes/paths';

import Default from './Default';
import styles from './styles';

function SlideShow() {
  const renderDotted = () => (
    <div className="indicator">
      <Box sx={styles.boxDot} />
    </div>
  );

  const slides = [
    {
      title: 'Lifestyle collection MEN',
      srcImg: 'https://bazar-react.vercel.app/assets/images/banners/banner-15.jpg',
      to: PATH_PUBLIC.product.category('6500791355ee920008ef5f27', 'Thời Trang Nam'),
    },
    {
      title: 'Lifestyle collection WOMEN',
      srcImg: 'https://bazar-react.vercel.app/assets/images/banners/banner-25.jpg',
      to: PATH_PUBLIC.product.category('6500792255ee920008ef5f2b', 'Thời Trang Nữ'),
    },
  ];

  return (
    <Box sx={styles.boxRootSlideShow}>
      <Container maxWidth="lg" sx={styles.containerBoxSlide}>
        <Grid container spacing={2}>
          <Grid item xs={8.5}>
            <Box sx={styles.boxSlide}>
              <Slide indicators={() => renderDotted()} autoplay={false} arrows={false} transitionDuration={350}>
                {slides.map((item, key) => (
                  <div key={key} className="each-slide-effect">
                    <Default title={item.title} srcImg={item.srcImg} to={item.to} />
                  </div>
                ))}
              </Slide>
            </Box>
          </Grid>
          <Grid item xs={3.5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    borderRadius: '10px',
                    padding: '30px',
                    height: '222px',
                    width: '100%',
                    backgroundImage: `url(https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fbanner-17.jpg&w=750&q=75)`,
                    backgroundRepeat: 'round',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '13px',
                      fontWeight: 400,
                      letterSpacing: '1.2px',
                    }}
                  >
                    NEW ARRIVALS
                  </Box>
                  <Box
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                    }}
                  >
                    SUMMER
                  </Box>
                  <Box
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                      marginBottom: '16px',
                    }}
                  >
                    SALE 20% OFF
                  </Box>
                  <Button variant="text" sx={{ color: '#111', padding: 0 }}>
                    Shop Now <ArrowForwardIcon />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    borderRadius: '10px',
                    padding: '30px',
                    height: '222px',
                    width: '100%',
                    backgroundImage: `url(https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fbanner-16.jpg&w=750&q=75)`,
                    backgroundRepeat: 'round',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '13px',
                      fontWeight: 400,
                      letterSpacing: '1.2px',
                    }}
                  >
                    GAMING 4K
                  </Box>
                  <Box
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                    }}
                  >
                    DESKTOPS &
                  </Box>
                  <Box
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                      marginBottom: '16px',
                    }}
                  >
                    LAPTOPS
                  </Box>
                  <Button variant="text" sx={{ color: '#111', padding: 0 }}>
                    Shop Now <ArrowForwardIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SlideShow;
