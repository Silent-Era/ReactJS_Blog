import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('CircularIndeterminate', theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
}));

function CircularIndeterminate(props) {
  const classes = props.classes;
  return (
    <div>
      <CircularProgress className={classes.progress} size={50} />
    </div>
  );
}

export default withStyles(styleSheet)(CircularIndeterminate);