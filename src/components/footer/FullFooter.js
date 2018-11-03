// NPM
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faInstagram from '@fortawesome/fontawesome-free-brands/faInstagram';
import { Link } from 'gatsby';

// APP
import css from 'appAssets/css/footer.module.css';
import Tribalscale from '../../assets/images/Tribalscale.svg';
import Wealthsimple from '../../assets/images/Wealthsimple.svg';

const FullFooter = () => {
  return (
    <footer className={css.footer}>
      <Grid
        container
        justify="center"
        className={`${css.backgroundSecondary}`}
        spacing={0}
      >
        <Grid item xs={12} md={9}>
          <Grid
            container
            spacing={0}
            justify="center"
            alignItems="center"
            className={css.partnerLogos}
          >
            <a href="https://www.wealthsimple.com" target="_blank" rel="noopener noreferrer">
              <img src={Wealthsimple} alt={'Wealth Simple'} />
            </a>
            <a href="http://www.tribalscale.com" target="_blank" rel="noopener noreferrer">
              <img src={Tribalscale} alt={'TribalScale'} />
            </a>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        className={`${css.footerRow} ${css.backgroundPrimary}`}
        spacing={0}
      >
        <Grid item xs={11} md={9}>
          <Grid container justify="space-between" spacing={0}>
            <Grid item xs={12} sm={8} className={css.verticalOnMobile}>
              <Link to="/about">About us</Link>
              <a href="http://eepurl.com/dFaJHb" target="_blank" rel="noopener noreferrer">Stay in touch</a>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              className={`${css.alignRight} ${css.alignCenterOnMobile}`}
            >
              <a
                href="https://github.com/CivicTechTO/women-and-color-frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a href="https://twitter.com/womenandcolor" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="https://www.instagram.com/womenandcolor/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        className={`${css.footerRow} ${css.backgroundPrimaryDark}`}
        spacing={0}
      >
        <Grid item xs={11} md={9}>
          <Grid container justify="space-between" spacing={0}>
            <Grid item xs={12} sm={6} className={css.verticalOnMobile}>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/code-of-conduct">Code of Conduct</Link>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className={`${css.alignRight} ${css.alignCenterOnMobile}`}
            >
              &copy; 2016 - 2018 Women and Color
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default FullFooter;
