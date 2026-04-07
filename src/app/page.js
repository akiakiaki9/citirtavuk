import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import AboutUs from './components/AboutUs/AboutUs';
import Menu from './components/menu/Menu';
import Contacts from './components/contacts/Contacts';
import Footer from './components/footer/Fotoer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Header />
        <Menu />
        <AboutUs />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}