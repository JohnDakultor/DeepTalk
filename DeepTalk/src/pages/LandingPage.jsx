import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const rows = [
  {
    explanation:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi odit excepturi maiores ipsa itaque atque fugiat corrupti, deleniti modi? Omnis, quas? Laudantium nesciunt minima voluptas deleniti pariatur, in nobis aperiam.",
    imageUrl: "https://picsum.photos/200",
  },
  { explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi odit excepturi maiores ipsa itaque atque fugiat corrupti, deleniti modi? Omnis, quas? Laudantium nesciunt minima voluptas deleniti pariatur, in nobis aperiam.", imageUrl: "https://picsum.photos/201" },
  { explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi odit excepturi maiores ipsa itaque atque fugiat corrupti, deleniti modi? Omnis, quas? Laudantium nesciunt minima voluptas deleniti pariatur, in nobis aperiam.", imageUrl: "https://picsum.photos/202" },
  { explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi odit excepturi maiores ipsa itaque atque fugiat corrupti, deleniti modi? Omnis, quas? Laudantium nesciunt minima voluptas deleniti pariatur, in nobis aperiam.", imageUrl: "https://picsum.photos/203" },
];

export default function LandingPage() {
  return (
    <div className="Landing">
      <Header />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <Container sx={{ flex: 1, paddingRight: 4 }}>
          <Typography variant="h3">Welcome to Deep Talk</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo felis sit amet lectus euismod, sit amet maximus ex
            tincidunt. Nullam sagittis felis eu dolor lacinia, eget ultricies
            est mollis. Duis ut nisl quam. Donec at aliquam lectus, non
            hendrerit metus. Vestibulum vehicula purus in ante venenatis
            lacinia. Fusce id justo vitae elit consectetur dapibus.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: "10px" }}
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </Container>
        <Container
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "10%",
          }}
        >
          <img
            src="src\assets\eye.jpg"
            alt="Theia Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Container>
      </Container>

      <Container
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          minWidth: "100%",
        }}
      >
        <Container sx={{ flex: 1 }}>
          <Typography variant="h3">About Deep Talk</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo felis sit amet lectus euismod, sit amet maximus ex
            tincidunt. Nullam sagittis felis eu dolor lacinia, eget ultricies
            est mollis. Duis ut nisl quam. Donec at aliquam lectus, non
            hendrerit metus. Vestibulum vehicula purus in ante venenatis
            lacinia. Fusce id justo vitae elit consectetur dapibus. Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Eius eum, eligendi a
            harum aut dolor maxime fugiat possimus eos excepturi ex cum facere
            alias sed suscipit sapiente ipsam amet enim. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Dolorum error nostrum sequi
            eligendi! Modi voluptatem nulla architecto hic odit! Eos optio,
            aspernatur explicabo nam fugiat quia mollitia quasi soluta
            assumenda! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Labore et quo ipsum dolorum deserunt, consequatur autem itaque
            adipisci delectus blanditiis iure quos molestiae perspiciatis
            voluptas dicta architecto optio dolorem repellendus! Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Quae unde mollitia
            quam, sapiente quis quisquam esse et explicabo deserunt nam veniam
            voluptatum sed nesciunt quod, adipisci maxime repudiandae,
            laboriosam neque?
          </Typography>
        </Container>
        <Container sx={{ flex: 1, justifyContent: "flex-end" }}>
          <Typography variant="h3">Having a companion that wants to talk</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            commodo felis sit amet lectus euismod, sit amet maximus ex
            tincidunt. Nullam sagittis felis eu dolor lacinia, eget ultricies
            est mollis. Duis ut nisl quam. Donec at aliquam lectus, non
            hendrerit metus. Vestibulum vehicula purus in ante venenatis
            lacinia. Fusce id justo vitae elit consectetur dapibus. Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Eius eum, eligendi a
            harum aut dolor maxime fugiat possimus eos excepturi ex cum facere
            alias sed suscipit sapiente ipsam amet enim. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Dolorum error nostrum sequi
            eligendi! Modi voluptatem nulla architecto hic odit! Eos optio,
            aspernatur explicabo nam fugiat quia mollitia quasi soluta
            assumenda! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Labore et quo ipsum dolorum deserunt, consequatur autem itaque
            adipisci delectus blanditiis iure quos molestiae perspiciatis
            voluptas dicta architecto optio dolorem repellendus! Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Quae unde mollitia
            quam, sapiente quis quisquam esse et explicabo deserunt nam veniam
            voluptatum sed nesciunt quod, adipisci maxime repudiandae,
            laboriosam neque?
          </Typography>
        </Container>
      </Container>

      <Container sx={{ mt: 20 }}>
            {rows.map((row, index) => (
                <div key={index} style={{ display: "flex", flexDirection: index % 2 === 0 ? "row" : "row-reverse", marginBottom: 20 }}>
                    <Container sx={{ flex: 1, justifyContent: index % 2 === 0 ? "flex-end" : "flex-start", marginLeft: index % 2 === 0 ? 2 : 0 }}>
                        <p>{row.explanation}</p>
                    </Container>
                    <Container sx={{ flex: 1, justifyContent: index % 2 === 0 ? "flex-start" : "flex-end", marginRight: index % 2 === 0 ? 2 : 0, display: "flex", alignItems: "center", textAlign: index % 2 === 0 ? "left" : "right" }}>
                        <img src={row.imageUrl} alt="image" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Container>
                </div>
            ))}
        </Container>

      <Footer />
    </div>
  );
}
