import Navbar from "../components/navbar";
import Footer from "../components/layout/footer";

export default function WithNavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
