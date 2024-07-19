import React, { useEffect, useRef } from 'react';
import { Card, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../services/authService';
import JSMpeg from 'jsmpeg';

const VideoCard = ({ id, url, wsPort, onDelete }) => {
  const videoRef = useRef(null);
  const jsmpegPlayerRef = useRef(null);

  useEffect(() => {
    if (wsPort) {
      const wsUrl = `ws://localhost:${wsPort}`;
      jsmpegPlayerRef.current = new JSMpeg.VideoElement(
        videoRef.current,
        wsUrl,
        { autoplay: true }
      );
    } else {
      const videoElement = document.createElement('video');
      videoElement.src = `http://localhost:3001/videos/${id}`;
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.loop = true;
      videoElement.style.width = '100%';
      videoRef.current.appendChild(videoElement);
      
      return () => {
        videoRef.current.removeChild(videoElement);
      };
    }

    return () => {
      if (jsmpegPlayerRef.current) {
        jsmpegPlayerRef.current.destroy();
      }
    };
  }, [id, wsPort]);

  return (
    <Card style={{ position: 'relative' }}>
      <IconButton
        aria-label="delete"
        onClick={() => onDelete(id)}
        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1, height: '50px', width: '50px' }}
      >
        <DeleteIcon />
      </IconButton>
      <div ref={videoRef} style={{ width: '100%' }} />
    </Card>
  );
};

export default VideoCard;
