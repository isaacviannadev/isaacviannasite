import Divider from "./components/UI/divider";
import Brands from "./components/sections/brands";
import Contact from "./components/sections/contact";
import Footer from "./components/sections/footer";
import Header from "./components/sections/header";
import MainSection from "./components/sections/main";
import Work from "./components/sections/work";

function App() {
  return (
    <>
      <Header />
      <Divider />
      <MainSection />
      <Brands />
      <Work />
      <Divider />
      <Contact />
      <Divider />
      <Footer />
    </>
  );
}

export default App;
