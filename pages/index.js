import Head from 'next/head';
import dynamic from 'next/dynamic';
import { PseudoBox, Heading, Image, Spinner } from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';

const Carousel = dynamic(() => import('@brainhubeu/react-carousel'));

const Index = () => {
  const [loading, setLoading] = React.useState(true);
  const items = [
    'images/site/landscape-people-1.webp',
    'images/site/landscape-things-1.webp',
    'images/site/landscape-girl-5.webp',
    'images/site/landscape-shoes-1.webp',
    'images/site/landscape-girl-1.webp',
  ];
  return (
    <>
      <Head>
        <title>OpenShop - Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {loading && (
        <Spinner size='150px' mx='auto' my={{ sm: '150px', lg: '300px' }} />
      )}
      <Carousel autoPlay={5000} animationSpeed={1000} infinite>
        {items.map((item) => (
          <PseudoBox
            key={item}
            display={loading ? 'none' : 'block'}
            as={Image}
            opacity='0.6'
            width='100%'
            height={{ sm: '450px', lg: '750px' }}
            src={item}
            alt='Random unsplash image'
            objectFit='cover'
            objectPosition='top center'
            onLoad={() => setLoading(false)}
            data-cy='header-img'
          />
        ))}
      </Carousel>
      {!loading && (
        <Heading
          position='absolute'
          as='strong'
          fontSize='8vw'
          color={COLORS.HEADING.light}
          left='50%'
          top={{ sm: '20%', lg: '50%' }}
          mr='-50%'
          px='30px'
          textShadow='2px 4px 7px black'
          transform={{
            sm: 'translate(-50%, -20%)',
            lg: 'translate(-50%, -50%)',
          }}
        >
          WE ARE OPENSHOP
        </Heading>
      )}
    </>
  );
};

export default Index;
