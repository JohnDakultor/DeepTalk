// withUserData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const withUserData = (WrappedComponent) => {
  return (props) => {
    const [userData, setUserData] = useState(null);

    const tokenLoggedOut = async () => {
        try {
          const token = window.localStorage.getItem('jwt');
          console.log('Token being sent:', token);
      
          const response = await axios.post(
            'http://localhost:3001/userData',
            {
              token: token,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
      
          const data = response.data;
          console.log(data, 'userData');
          setUserData(data.data);
      
          if (data.data === 'Token expired') {
            alert('Token has expired');
            window.localStorage.clear();
            window.location.href = './login';
          }
        } catch (error) {
          console.error('Error during API call:', error);
        }
      };
      

    useEffect(() => {
      tokenLoggedOut();
    }, []);

    return <WrappedComponent userData={userData} {...props} />;
  };
};

export default withUserData;
