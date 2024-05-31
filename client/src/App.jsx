import AppRoutes from "./pages/AppRoutes";
import Navigationbar from "./components/Navigationbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <>
      <Navigationbar />
      <AppRoutes />
    </>
  )
}