import React from 'react';
import {useParams} from "react-router-dom";
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './videoComponents/VideoPlayer';
import Sidebar from './videoComponents/Sidebar';
import Notifications from './videoComponents/Notification';


const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const VideoApp = ({onlineUsers}) => {
  const classes = useStyles();
const Id=useParams().id;
 

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>  
      </AppBar>
      <VideoPlayer />
      <Sidebar id={Id} online={onlineUsers} >
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default VideoApp;
