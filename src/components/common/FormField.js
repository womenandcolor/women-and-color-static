import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  common: {
    marginTop: '1em',
    marginBottom: '1em'
  }
})

const FormField = (props) => {
  const classes = props.classes;
  return(
    <FormControl fullWidth={props.fullWidth} className={`${classes.common} ${props.className}`}>
      {props.children}
    </FormControl>
  )
}

export default withStyles(styles)(FormField);
