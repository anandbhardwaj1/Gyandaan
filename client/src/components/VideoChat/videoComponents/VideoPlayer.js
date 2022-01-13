import React, { useContext,useEffect } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../context';
import { Button } from 'react-bootstrap';


const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {

  const { setflag,name, callAccepted, myVideo, myVdoStatus,myMicStatus, updateVideo,
            updateMic, userVideo, callEnded, stream, call } = useContext(SocketContext);
 
 const classes = useStyles();
  
  const vid=myVdoStatus?"Disable":"Enable";
  const mic=myMicStatus?"Mute":"Unmute";
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
          <Button   onClick={() => {
                updateMic();
              }} >{mic}</Button>

          <Button style={{color:'black',backgroundColor:"yellow"}}   onClick={() => {
                updateVideo();
              }} >{vid} video</Button>
        </Paper>
        
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
