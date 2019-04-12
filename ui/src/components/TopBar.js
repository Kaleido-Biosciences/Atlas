import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
const logo = require('../images/kaleido_logo.png');

const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
  },
});

class TopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <ToolBar>
          <Grid container spacing={24} alignItems="baseline">
            <Grid item xs={12}>
              <div className={classes.titleContainer}>
                <img width={12} src={logo} alt="" />
                <Typography
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Atlas
                </Typography>
              </div>
            </Grid>
          </Grid>
        </ToolBar>
      </AppBar>
    );
  }
}

const wrapped = withStyles(styles)(TopBar);
export { wrapped as TopBar };
