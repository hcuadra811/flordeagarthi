import React from 'react';
import { FaLeaf, FaShieldAlt, FaSeedling } from 'react-icons/fa';
import AnimatedElement from './components/AnimatedElement';
import AnimatedText from './components/AnimatedText';
import StaggerContainer from './components/StaggerContainer';
import ParallaxSection from './components/ParallaxSection';

function AboutSection({ lang }) {
  const benefits = [
    {
      icon: <FaLeaf className="text-green-300 text-3xl" />,
      titleEs: "Paraíso Natural",
      titleEn: "Natural Paradise",
      descEs: "Ubicado en una de las regiones con mayor biodiversidad del planeta, esta finca ofrece una experiencia única de inmersión en la naturaleza.",
      descEn: "Located in one of the regions with the highest biodiversity on the planet, this estate offers a unique nature immersion experience."
    },
    {
      icon: <FaShieldAlt className="text-green-200 text-3xl" />,
      titleEs: "Inversión Sostenible",
      titleEn: "Sustainable Investment",
      descEs: "Una oportunidad para invertir en conservación mientras se disfruta de un entorno natural privilegiado con potencial para ecoturismo.",
      descEn: "An opportunity to invest in conservation while enjoying a privileged natural environment with ecotourism potential."
    },
    {
      icon: <FaSeedling className="text-green-300 text-3xl" />,
      titleEs: "Desarrollo Responsable",
      titleEn: "Responsible Development",
      descEs: "Posibilidad de desarrollar proyectos sostenibles en armonía con el entorno, combinando conservación y agricultura regenerativa.",
      descEn: "Possibility to develop sustainable projects in harmony with the environment, combining conservation and regenerative agriculture."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-white to-gray-100 text-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <AnimatedElement type="fadeIn" delay={0.2}>
            <h2 className="text-4xl font-bold mb-4">
              {lang === 'es' ? 'Acerca de la Finca' : 'About the Property'}
            </h2>
          </AnimatedElement>
          
          <AnimatedElement type="slideUp" delay={0.4}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {lang === 'es' 
                ? 'Una oportunidad única para poseer un pedazo de paraíso en una de las zonas más biodiversas del planeta.' 
                : 'A unique opportunity to own a piece of paradise in one of the most biodiverse areas on the planet.'}
            </p>
          </AnimatedElement>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <div className="md:w-1/2">
            <AnimatedElement type="slideInLeft" delay={0.3}>
              <div className="relative">
                <ParallaxSection direction="up" speed={0.1}>
                  <img 
                    src="https://res.cloudinary.com/dkca8m9ar/image/upload/v1740594506/20231121_090647_iuqajk.jpg" 
                    alt={lang === 'es' ? "Vista de la finca" : "Property view"} 
                    className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                  />
                </ParallaxSection>
                <AnimatedElement type="scale" delay={0.8}>
                  <div className="absolute -bottom-4 -right-4 bg-green-200 text-gray-800 py-2 px-4 rounded-lg shadow-lg">
                    <span className="font-bold text-xl">64</span> {lang === 'es' ? 'hectáreas' : 'hectares'}
                  </div>
                </AnimatedElement>
              </div>
            </AnimatedElement>
          </div>
          <div className="md:w-1/2">
            <AnimatedElement type="slideInRight" delay={0.5}>
              <AnimatedText 
                text={lang === 'es' ? 'Un Santuario Natural en Corcovado' : 'A Natural Sanctuary in Corcovado'}
                className="text-2xl font-bold mb-4 text-gray-700"
                Tag="h3"
              />
              
              <AnimatedElement type="fadeIn" delay={0.7}>
                <p className="text-lg mb-6 text-gray-600 leading-relaxed">
                  {lang === 'es' 
                    ? 'La finca se encuentra en una de las zonas más privilegiadas de Corcovado, con una biodiversidad impresionante y un entorno natural único. Este terreno de 64 hectáreas combina áreas de conservación con zonas aptas para desarrollo sostenible, ofreciendo lo mejor de ambos mundos.' 
                    : 'The property is located in one of the most coveted areas of Corcovado, boasting impressive biodiversity and a unique natural environment. This 64-hectare estate combines conservation areas with zones suitable for sustainable development, offering the best of both worlds.'}
                </p>
              </AnimatedElement>
              
              <AnimatedElement type="fadeIn" delay={0.9}>
                <p className="text-lg mb-6 text-gray-600 leading-relaxed">
                  {lang === 'es'
                    ? 'Ideal para amantes de la naturaleza, inversionistas en ecoturismo o conservacionistas que buscan proteger uno de los ecosistemas más valiosos del planeta mientras disfrutan de sus maravillas.'
                    : 'Perfect for nature lovers, ecotourism investors, or conservationists looking to protect one of the planet\'s most valuable ecosystems while enjoying its wonders.'}
                </p>
              </AnimatedElement>
              
              <AnimatedElement type="slideUp" delay={1.1}>
                <div className="bg-green-50 border-l-4 border-green-200 p-4 rounded-r-lg">
                  <p className="italic text-gray-700">
                    {lang === 'es'
                      ? '"Corcovado es el lugar biológicamente más intenso de la Tierra." - National Geographic'
                      : '"Corcovado is the most biologically intense place on Earth." - National Geographic'}
                  </p>
                </div>
              </AnimatedElement>
            </AnimatedElement>
          </div>
        </div>

        {/* Benefits grid */}
        <StaggerContainer delay={0.3} staggerDelay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">
                  {lang === 'es' ? benefit.titleEs : benefit.titleEn}
                </h3>
                <p className="text-gray-600 text-center">
                  {lang === 'es' ? benefit.descEs : benefit.descEn}
                </p>
              </div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}

export default AboutSection; 