// NPM
import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

// App

import StyledButton from 'appCommon/StyledButton';
import Topics from './Topics';

import css from 'appAssets/css/index.module.css';
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

const cleanName = str => encodeURIComponent(str.trim().replace(/\W+/g, '-'))

const ProfileLink = props => <a href={props.to} rel="noopener noreferrer" target="_blank" {...props}>{props.children}</a>;

const SpeakerCard = ({ speaker, classes, location }) => {
  const name = !!speaker.display_name ? speaker.display_name : speaker.email;
  const title = buildTitle(speaker.position, speaker.organization);
  const speakerProfilePath = `/speakers/${speaker.id}/${cleanName(speaker.display_name)}`;

  return (
    <Grid item xs={12} className={css.contentCard}>
      <Grid container spacing={16}>
        <Grid item xs={3} md={3}>
          <div className={css.speakerPhoto}>
          <a href={speakerProfilePath} className={profilePhoto} rel="noopener noreferrer" target="_blank">
            <img src={speaker.image} alt={name} />
          </a>
          </div>
        </Grid>
        <Grid item xs={9} md={7} className={css.info}>
          <a href={speakerProfilePath} rel="noopener noreferrer" target="_blank">
            <h3 className={css.name}>{name}</h3>
          </a>
          {title}
          { (speaker.topics.length > 0) &&
            <Hidden smDown>
              <Topics topics={speaker.topics} limit={6} location={location} />
            </Hidden>
          }
        </Grid>
        <Hidden smDown>
          <Grid item md={2} className={`actions`}>
            <StyledButton
              color="primary"
              label="View profile"
              component={ProfileLink}
              to={speakerProfilePath}
              target="_blank"
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
