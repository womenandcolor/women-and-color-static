import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Carousel from 'nuka-carousel';

// App
import { ensureAbsoluteUrl } from 'appHelpers/url';
import css from "appAssets/css/speakers.module.css";

const FeaturedTalk = props => {
  const { talk } = props;
  return (
    <div className={css.talkCardContainer}>
      <Card elevation={6} className={css.talkCard}>
        <CardMedia image={talk.image} className={css.talkCardImage} />
        <CardContent>
          <h2 className={css.talkCardHeader}>{props.talk.event_name}</h2>
          <a className={css.talkCardLink} href={ensureAbsoluteUrl(props.talk.url)} target="_blank" rel="noopener noreferrer">
            {props.talk.talk_title}
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

const FeaturedTalks = props => {
  return (
    <section>
      <h4 className={css.sectionSubHeader}>Featured Talks and Links</h4>
      <div className={css.talksWrapper}>
        <Carousel
          slidesToShow={2}
          slidesToScroll={1}
          wrapAround={true}
          dragging={true}
          heightMode='max'
        >
          {props.talks.map(talk => <FeaturedTalk talk={talk} key={talk.id} />)}
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedTalks;
