// NPM
import React, { PropTypes } from 'react';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { Link } from 'gatsby';

// App
import { speakerToProfilePath } from 'appHelpers/url';
import StyledButton from 'appCommon/StyledButton';
import Topics from './Topics';
import { updateSearchParams } from 'appRedux/modules/speaker';

import css from '../../pages/styles.module.css';
import { profilePhoto } from 'appAssets/css/styles.module.css'

function buildTitle(position, organization) {
  let separator;
  if (position && organization) {
    separator = ` at `;
  } else {
    separator = ', ';
  }

  return (
    <p className={css.speakerTitle}>
      <span className={css.position}>{position || 'Independent'}</span>
      <span className={css.separator}>{separator}</span>
      <span className={css.organization}>
        {organization || 'No affiliation'}
      </span>
    </p>
  );
}

const SpeakerCard = ({ speaker, classes }) => {
  const name = !!speaker.display_name ? speaker.display_name : speaker.email;
  const title = buildTitle(speaker.position, speaker.organization);
  const speakerProfilePath = speakerToProfilePath({
    ...speaker,
  });
  return (
    <Grid item xs={12} className={css.contentCard}>
      <Grid container spacing={16}>
        <Grid item xs={3} md={3}>
          <div className={css.speakerPhoto}>
          <Link to={speakerProfilePath} className={profilePhoto}>
            <img src={speaker.image} alt={name} />
          </Link>
          </div>
        </Grid>
        <Grid item xs={9} md={7} className={css.info}>
          <Link to={speakerProfilePath}>
            <h3 className={css.name}>{name}</h3>
          </Link>
          {title}
          { (speaker.topics.length > 0) &&
            <Hidden smDown>
              <Topics topics={speaker.topics} limit={6} />
            </Hidden>
          }
        </Grid>
        <Hidden smDown>
          <Grid item md={2} className={`actions`}>
            <StyledButton
              color="primary"
              label="View profile"
              component={Link}
              to={speakerProfilePath}
            >
              View profile
            </StyledButton>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
};


export default SpeakerCard;
