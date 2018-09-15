// NPM
import React from 'react';
import Grid from '@material-ui/core/Grid';

// APP
import SpeakerListItem from './SpeakerListItem';
import StyledButton from 'appCommon/StyledButton';
import css from 'appAssets/css/index.module.css';

const SpeakerList = ({ speakers, endOfResults, loadMoreSpeakers, location }) => {
  const noResults = speakers.length === 0;

  if (noResults) {
    return <div className={css.noResults}>No results</div>;
  }

  return (
    <Grid container spacing={0}>
      <Grid container className={css.speakersList} spacing={0}>
        {speakers.map((speaker, index) => (
          <SpeakerListItem speaker={speaker} key={speaker.id} location={location} />
        ))}
      </Grid>
      {!endOfResults && (
        <Grid container justify={'center'} spacing={0}>
          <Grid item>
            <StyledButton color="secondary" onClick={loadMoreSpeakers} className={css.loadMoreButton}>
              Load more speakers
            </StyledButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SpeakerList;
