import '../styles/global.css';
import { Navbar } from '../components';

export default function MyApp({ Component, pageProps }) {
  const navigation = [
    {
      text: 'home',
      path: '/',
    },
    {
      text: 'items',
      path: '/items',
    },
  ];
  return (
    <div className='container'>
      <Navbar links={navigation} />
      <Component {...pageProps} />
    </div>
  );
}
