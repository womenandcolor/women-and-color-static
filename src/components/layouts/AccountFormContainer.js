// Project
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    borderRadius: '8px',
    marginTop: '2rem',
    padding: '30px',
    border: '1px solid var(--color-grey-light)',
    backgroundColor: 'var(--color-inverted-light)',
  }
};

const AccountFormContainer = props => {
  return (
    <Grid container justify="center">
      <Grid item xs={11} sm={8} md={5}>
        <Card className={props.classes.root}>
          {props.children}
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(AccountFormContainer);
