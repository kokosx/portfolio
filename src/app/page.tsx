import React from "react";
import Header from "./components/Header";
import DevHero from "./components/DevHero";
import ProjectShowcase from "./components/ProjectShowcase";
import Toolbox from "./components/Toolbox";
import Footer from "./components/Footer";

const page = () => {
  return (
    <div className="dark relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col">
        <DevHero />
        <ProjectShowcase />
        <Toolbox />
        <Footer />
      </main>
    </div>
  );
};

export default page;
