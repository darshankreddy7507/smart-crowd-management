import { Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import bgImage from "../assets/home-bg.jpg"; // your image

function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.75)", // dark shade
          zIndex: 0,
        }}
      />

      {/* Page content */}
      <Container
        maxWidth="md"
        style={{
            textAlign: "center",
            marginTop: 120,
            padding:0,
            position: "relative",
            zIndex: 1,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          AI-Based Smart Bus Demand Management System
        </Typography>

        <Typography variant="h6" style={{ marginTop: 20 }}>
          An intelligent public transportation optimization system using AI + IoT.
        </Typography>

        <Box style={{ marginTop: 40 }}>
          <Typography variant="h5" fontWeight="bold">
            How Our AI + IoT System Helps
          </Typography>

          <Typography style={{ marginTop: 10 }}>
            • Detects passenger crowd levels at bus stops
          </Typography>
          <Typography>• Sends real-time data to a central AI system</Typography>
          <Typography>• Predicts high-demand routes and time periods</Typography>
          <Typography>• Helps transport authorities send extra buses</Typography>
          <Typography>• Reduces fuel wastage and improves convenience</Typography>
        </Box>

        <Box style={{ marginTop: 40 }}>
          <Typography variant="h6">Team: NEXTGEN INNOVATORS</Typography>
        </Box>

        <Box style={{ marginTop: 40 }}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button variant="contained" size="large">
              Open Dashboard
            </Button>
          </Link>
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;