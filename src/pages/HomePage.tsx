import HeroSection from '../components/HeroSection';
import ClientLogos from '../components/ClientLogos';
import VisionSection from '../components/VisionSection';
import ApproachSection from '../components/ApproachSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import IndustriesSection from '../components/IndustriesSection';
import PortfolioSection from '../components/PortfolioSection';
import WhyEdrisync from '../components/WhyEdrisync';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

type HomePageProps = {
  refs: any;
};

export default function HomePage({ refs }: HomePageProps) {
  return (
    <>
      <HeroSection sectionRef={refs.home} refs={refs} />
      <ClientLogos />
      <VisionSection />
      <ApproachSection />
      <AboutSection sectionRef={refs.about} onAbout={refs.goAbout} />
      <ServicesSection sectionRef={refs.services} onServices={refs.goServices} onServiceDetail={refs.goServiceDetail} />
      <IndustriesSection sectionRef={refs.industries} />
      <PortfolioSection sectionRef={refs.portfolio} onViewMore={refs.goCaseStudies} />
      <WhyEdrisync sectionRef={refs.why} refs={refs} />
      <Testimonials sectionRef={refs.testimonials} />
      <CTASection sectionRef={refs.cta} />
    </>
  );
}
