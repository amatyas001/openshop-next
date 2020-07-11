import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import { ScrollTop } from '@app/components';
import { Collapse } from '@chakra-ui/core';

const styles = ({ font, base, light, baseBackground, mq }) => ({
  root: {
    color: base,
    backgroundColor: baseBackground,
  },
  nav: {
    position: 'fixed',
    top: '0',
    right: '0',
    left: '0',
    zIndex: 9999,
    height: '50px',
    color: base,
    padding: [[15, 30]],
    margin: [[0, 'auto']],
    display: 'flex',
    background: 'white',
    borderBottom: '1px solid rgba(0,0,0,.3)',
  },
  link: {
    '&, &:link, &:visited': {
      transition: 'all 300ms',
      fontFamily: 'Khand',
      color: 'rgba(0,0,0,.7)',
    },
    '&:hover, &:active': {
      transition: 'all 300ms',
      color: 'rgba(0,0,0,1)',
      cursor: 'pointer',
    },
  },
  toc: {
    position: 'fixed',
    top: '50px',
    left: 0,
    bottom: 0,
    width: '300px',
    overflow: 'auto',
    background: '#fff',
    borderBottom: '1px solid rgba(0,0,0,.3)',
    zIndex: 9999,
  },
  content: {
    maxWidth: 1000,
    padding: [[15, 30]],
    margin: [[50, 'auto']],
    display: 'block',
  },
});

export function StyleGuideRenderer({
  classes,
  title,
  homepageUrl,
  children,
  toc,
}) {
  const [showContent, setShowContent] = React.useState(false);
  return (
    <div className={classes.root}>
      <Collapse isOpen={showContent} className={classes.toc}>
        {toc}
      </Collapse>
      <nav className={classes.nav}>
        <a
          className={classes.link}
          href='#0'
          onClick={() => setShowContent((prev) => !prev)}
        >
          Toggle Contents
        </a>
        <a
          className={classes.link}
          href='https://github.com/amatyas001/openshop-next'
          target='_blank'
          style={{ marginLeft: 'auto' }}
        >
          Github
        </a>
        <a
          className={classes.link}
          style={{ marginLeft: '20px' }}
          href='https://openshop.netlify.app'
          target='_blank'
        >
          Live
        </a>
        <a
          className={classes.link}
          style={{ marginLeft: '20px' }}
          href='/coverage/lcov-report/index.html'
          target='_blank'
        >
          Coverage
        </a>
      </nav>
      <main className={classes.content}>{children}</main>
      <ScrollTop d={!showContent ? 'block' : 'none'} />
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
