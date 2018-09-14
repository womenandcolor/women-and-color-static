import React from 'react';
import { connect } from 'react-redux';
import { updateSearchParams } from 'appRedux/modules/speaker';
import { topicLinks } from 'appAssets/css/speakers.module.css';
import { navigate } from 'gatsby';

const Topics = ({ location, topics, updateSearchParams, limit }) => {
  const onTopicClick = topic => event => {
    event.preventDefault();
    const home = '/';
    if (location.pathname !== home) {
      navigate(home)
    }

    updateSearchParams({
      q: topic,
      offset: 0,
      limit: 20,
      append: false,
    });
  };

  const topicsList = limit ? topics.slice(0, limit - 1) : topics;

  return (
    <div className={topicLinks}>
      {
        topicsList.map(topic => (
          <a
            href={'/'}
            key={topic.topic}
            onClick={onTopicClick(topic.topic)}
            title={topic.topic}
          >
            {topic.topic}
          </a>
        ))
        .reduce((prev, curr) => [prev, ', ', curr])
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchParams: params => {
      dispatch(updateSearchParams(params));
    },
  };
};

export default connect(null, mapDispatchToProps)(Topics);