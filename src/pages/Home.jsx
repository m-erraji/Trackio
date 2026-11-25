import Hero from "../components/Hero";
import Features from "../components/Features";
import Products from "../components/Products";
import Approach from "../components/Approach";
import HowItWorks from "../components/HowItWorks";
import Faq from "../components/Faq";
import Contact from "../components/Contact";

export default function Home({ onAdd }) {
  return (
    <>
      <Hero />
      <Features />
      <Products onAdd={onAdd} />
      <Approach />
      <HowItWorks />
      <Faq />
      <Contact />
    </>
  );
}
