
import ServicesSection from "@/Components/Services";
import HeroBanner from "../Components/Banner";

import PatientReviews from "../Components/Review";
import ContactSection from "@/Components/Contact";
import WorkflowPage from "@/Components/Workflow";


export default function Home() {
  return (
    <div className="">

      <HeroBanner></HeroBanner>
      <ServicesSection></ServicesSection>
      <WorkflowPage></WorkflowPage>
      <PatientReviews></PatientReviews>
      <ContactSection></ContactSection>


    </div>
  );
}
