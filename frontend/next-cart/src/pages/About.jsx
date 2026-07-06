import React from "react";
import { AboutHero } from "../component/ABOUT/AboutHero";
import { OurStory } from "../component/ABOUT/OurStory";
import { Mission } from "../component/ABOUT/Mission";
import Stats from "../component/ABOUT/Stats";
import Values from "../component/ABOUT/Values";
import DeveloperSection from "../component/ABOUT/DeveloperSection";

export const About = () => {
    return(
        <>
        <AboutHero />
        <OurStory />
        <Mission /> 
        <Stats />
        <Values />
        <DeveloperSection />
        
        </>
    )
}