import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function Cards({ title, content, customStyles, children }) {
  return (
    <Card sx={{ backgroundColor: '#2C2C2C', color: 'white', ...customStyles }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          {content}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
