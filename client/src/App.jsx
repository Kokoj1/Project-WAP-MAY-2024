import AppRoutes from "./pages/AppRoutes";
import Searchbar from "./components/Searchbar";
import Navigationbar from "./components/Navigationbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
/*<Searchbar />*/
  return (
    <>
      <Navigationbar />
      <AppRoutes />
    </>
  )
}