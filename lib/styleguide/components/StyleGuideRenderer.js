import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import { ScrollTop } from '@app/components';

const xsmall = '@media (max-width: 600px)';

const styles = ({ font, base, light, baseBackground, mq }) => ({
  root: {
    color: base,
    backgroundColor: baseBackground,
  },
  header: {
    position: 'fixed',
    zIndex: 9999,
    top: '0',
    right: '0',
    left: '0',
    height: '50px',
    color: base,
    padding: [[15, 30]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: 15,
    },
    display: 'block',
    background: 'transparent',
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    [xsmall]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  nav: {
    marginLeft: 'auto',
    marginRight: '-0.5em',
    [xsmall]: {
      margin: [[10, 0, 0]],
    },
  },
  headerLink: {
    '&, &:link, &:visited': {
      marginLeft: '0.5em',
      marginRight: '0.5em',
      fontFamily: font,
      color: light,
    },
    '&:hover, &:active': {
      color: base,
      cursor: 'pointer',
    },
  },
  sideBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '300px',
    overflow: 'auto',
    background: '#E9D8FD',
  },
  content: {
    maxWidth: 1000,
    padding: [[15, 30]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: 15,
    },
    display: 'block',
  },
  components: {
    overflow: 'auto', // To prevent the pane from growing out of the screen
  },
  footer: {
    display: 'block',
    color: light,
    fontFamily: font,
    fontSize: 12,
  },
});

export function StyleGuideRenderer({
  classes,
  title,
  homepageUrl,
  children,
  toc,
}) {
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.bar}>
          <nav className={classes.nav}>
            <a
              className={classes.headerLink}
              href='https://github.com/amatyas001/openshop-next'
              target='_blank'
            >
              Github
            </a>
            <a
              className={classes.headerLink}
              style={{ marginLeft: '20px' }}
              href='https://openshop.netlify.app'
              target='_blank'
            >
              Live
            </a>
            <a
              className={classes.headerLink}
              style={{ marginLeft: '20px' }}
              href='/coverage/lcov-report/index.html'
              target='_blank'
            >
              Coverage
            </a>
          </nav>
        </div>
      </header>
      <div className={classes.sideBar}>{toc}</div>
      <main className={classes.content}>
        {children}
        <footer className={classes.footer}>
          <Markdown
            text={`Created with [React Styleguidist](${homepageUrl}) ❤️`}
          />
        </footer>
      </main>
      <ScrollTop />
    </div>
  );
}

StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Styled(styles)(StyleGuideRenderer);
