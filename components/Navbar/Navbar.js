import styles from './Navbar.module.css';
import Link from 'next/link';

export const Navbar = ({ links }) => {
  return (
    <ul className={styles.navbar}>
      {links.map((link) => {
        return (
          <li key={link.text} className={styles.navitem}>
            <Link href={link.path}>
              <a className={styles.navlink}>{link.text}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
