import { Box, CircularProgress } from "@mui/material";
import Logo from '../assets/img/Logo footer 2.png';
function Loader() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50rem"}}>
      <img src={Logo} alt="Web-Linker-Store" style={{ width: "14rem" }} />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "3rem", }}>
        <CircularProgress />
        <br/>
        <div className="text-center pt-2" style={{ color: "#7F8C8D" }}>
          Cargando, no tardaremos mucho 🥱...
        </div>
      </Box>
    </div>
  );
}

export default Loader;