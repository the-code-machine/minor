import Contact from "@/components/Home/Contact";
import Developers from "@/components/Home/Developers";
import Footer from "@/components/Home/Footer";
import { NavbarView } from "@/components/Home/Navbar";
import { TabsDemo } from "@/components/Home/Tabs";

export default function Home() {
  return (
<>
<NavbarView/>
<TabsDemo/>
<Developers/>
<Contact/>
<Footer/>
</>
  );
}
