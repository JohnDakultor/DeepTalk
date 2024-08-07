// import React, { useEffect, useState } from "react";
// import ProductDrawer from "../../components/prodoctComponents/ProductDrawer";
// import { AppBar, Toolbar, Grid } from "@mui/material";
// import Cards from "../../components/Cards";
// import axios from "axios";
// import Carousel from "../../components/Carousel";

// export default function Dashboard() {
//   const [user, setUser] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try { 
//         const token = localStorage.getItem("jwt");
//         const response = await axios.get("http://localhost:3001/user", {
//           headers:{"x-access-token":token},
//         });

//         const { result } = response.data;
//         const { firstname, lastname } = result;
//         setUser(`${firstname} ${lastname}`);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const images = [
//     'https://static.politico.com/dims4/default/55a1666/2147483647/resize/1200/quality/100/?url=https://static.politico.com/9a/e9/2024a2724afb95604736764177f9/ew-0923-tomich-bitcoin-938-01.jpg',
//     'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
//     'https://media.licdn.com/dms/image/D4E12AQF7i8YBywitDQ/article-cover_image-shrink_720_1280/0/1679740629786?e=2147483647&v=beta&t=gmldPtjH1y1bGCHfI8G43DsLsoRTEYOa0cg26cnbAbc',
//   ];

//   return (
//     <div>
//       <AppBar>
//         <Toolbar>
//           <ProductDrawer />
//         </Toolbar>
//       </AppBar>
//       <Toolbar />
//       <Grid container spacing={3} style={{ padding: 24 }}>
//         <Grid item xs={12} md={8}>
//           <Cards
//             title={`Welcome, ${user}`}
//             customStyles={{ height: '200px', width: '100%' }}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Cards
//             title="Card 2"
//             content="This is card 2"
//             customStyles={{ height: '200px', width: '100%' }}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Cards
//             title="Card 3"
//             content="This is card 3"
//             customStyles={{ height: '400px', width: '100%' }}
//           />
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <Cards customStyles={{ height: '400px', width: '100%' }}>
//             <Carousel images={images} />
//           </Cards>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// Dashboard.js
import React, { useEffect, useState } from 'react';
import ProductDrawer from '../../components/prodoctComponents/ProductDrawer';
import { AppBar, Toolbar, Grid } from '@mui/material';
import Cards from '../../components/Cards';
import axios from 'axios';
import Carousel from '../../components/Carousel';
import withUserData from '../../components/UserData'

const Dashboard = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
        const fetchUser = async () => {
          try { 
            const token = localStorage.getItem("jwt");
            const response = await axios.get("http://localhost:3001/user", {
              headers:{"x-access-token":token},
            });
    
            const { result } = response.data;
            const { firstname, lastname } = result;
            setUser(`${firstname} ${lastname}`);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUser();
      }, []);

  const images = [
    'https://static.politico.com/dims4/default/55a1666/2147483647/resize/1200/quality/100/?url=https://static.politico.com/9a/e9/2024a2724afb95604736764177f9/ew-0923-tomich-bitcoin-938-01.jpg',
    'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
    'https://media.licdn.com/dms/image/D4E12AQF7i8YBywitDQ/article-cover_image-shrink_720_1280/0/1679740629786?e=2147483647&v=beta&t=gmldPtjH1y1bGCHfI8G43DsLsoRTEYOa0cg26cnbAbc',
  ];

  return (
    <div>
      <AppBar>
        <Toolbar>
          <ProductDrawer />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container spacing={3} style={{ padding: 24 }}>
        <Grid item xs={12} md={8}>
          <Cards
            title={`Welcome, ${user}`}
            customStyles={{ height: '200px', width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cards
            title="Card 2"
            content="This is card 2"
            customStyles={{ height: '200px', width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cards
            title="Card 3"
            content="This is card 3"
            customStyles={{ height: '400px', width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Cards customStyles={{ height: '400px', width: '100%' }}>
            <Carousel images={images} />
          </Cards>
        </Grid>
      </Grid>
    </div>
  );
};

export default withUserData(Dashboard);
