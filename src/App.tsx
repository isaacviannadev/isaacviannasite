import Divider from "./components/UI/divider";
import Brands from "./components/sections/brands";
import Contact from "./components/sections/contact";
import Footer from "./components/sections/footer";
import Header from "./components/sections/header";
import Hero from "./components/sections/hero";
import Work from "./components/sections/work";
import { useLanguage } from "./contexts/LanguageContext";

function App() {
  const { language } = useLanguage();

  return (
    <div key={language} style={{ position: "relative" }}>
      <Hero />
      <Header />
      <Divider />
      <Brands />
      <Work />
      <Divider />
      <Contact />
      <Divider />
      <Footer />
    </div>
  );
}

export default App;
