import React, { useState } from "react";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";
import Navbar from "../layouts/subNav";
import SeccionBusqueda from "../pages/seccionBusqueda";
import HomeSection from "./seccionInicio";
import useSearch from "../hooks/useSearch";
import ServicesSection from "../layouts/SeccionServicios";
import Testimonios from "../layouts/seccionTestimonios";
import Ubicacion from "../layouts/ubicacion";
import Footer from "../layouts/footer";
import ComoNacioComunitech from "../layouts/seccionHeroComuniTech";

const Home = () => {
    const { results, isLoading, showResults, handleSearch } = useSearch();

    return (
        <div>
            <div className="hidden xl:block">
                <Header handleSearch={handleSearch} />            </div>

            <div className="xl:hidden">
                <MobileHeader handleSearch={handleSearch} />
            </div>

            <Navbar />


            <HomeSection />
            <SeccionBusqueda
                results={results}
                isLoading={isLoading}
                showResults={showResults}
            />
            <ServicesSection />
            <ComoNacioComunitech />
            <Testimonios />
            <Ubicacion />

            <Footer />
        </div>
    );
};

export default Home;
