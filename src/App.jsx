import UpProvider from "./UpProvider";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <UpProvider>
        <NavBar />
        <Card />
      </UpProvider>
      <Footer />
    </>
  );
}

export default App;
