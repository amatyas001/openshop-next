import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const xsmall = '@media (max-width: 600px)';

const styles = ({ font, base, light, baseBackground, mq }) => ({
  root: {
    color: base,
    backgroundColor: '#322659',
  },
  header: {
    position: 'fixed',
    zIndex: 9999,
    top: '0',
    right: '0',
    left: '0',
    height: '50px',
    color: '#fff',
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
      color: '#efefef',
    },
    '&:hover, &:active': {
      color: '#FFFFFF',
      cursor: 'pointer',
    },
  },
  sideBar: {
    background: 'transparent',
    position: 'fixed',
    top: '50px',
    left: '0',
    width: '300px',
    height: '100%',
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
  hasSidebar,
}) {
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.bar}>
          <strong style={{ marginRight: '30px' }}>{title}</strong>
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
      {hasSidebar && <div className={classes.sideBar}>{toc}</div>}
      <main className={classes.content}>
        {children}
        <footer className={classes.footer}>
          <Markdown
            text={`Created with [React Styleguidist](${homepageUrl}) ❤️`}
          />
        </footer>
      </main>
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
