import React, { Component } from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      type="search"
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.key}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : suggestions
        .filter(
          suggestion =>
            deburr(suggestion.label.trim())
              .toLocaleLowerCase()
              .search(inputValue) !== -1
        )
        .slice(0, 9);
}

class Autocomplete extends Component {
  state = {
    inputValue: '',
    selectedItem: [],
  };

  render() {
    const { classes } = this.props;

    return (
      <Downshift
        id="downshift"
        onChange={selection => {
          if (selection) {
            this.props.suggestions
              .find(
                item => item.label.toLowerCase() === selection.toLowerCase()
              )
              .onClick();
          }
        }}
        onStateChange={(changes, state) => {
          this.props.onStateChange(changes.inputValue);
          if (changes.inputValue === '') {
            state.setState({ selectedItem: null });
          }
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: this.props.placeholder,
                disableUnderline: true,
              }),
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue, this.props.suggestions).map(
                    (suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({
                          item: suggestion.label,
                        }),
                        highlightedIndex,
                        selectedItem,
                      })
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Autocomplete);
