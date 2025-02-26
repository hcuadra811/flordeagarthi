import React from 'react';
import { FaTree, FaWater, FaMapMarkerAlt, FaMountain, FaPaw, FaFileAlt } from 'react-icons/fa';

function PropertyDetails({ lang }) {
  const mapUrl = 'https://maps.app.goo.gl/BfLUH4ppqyfrvpN18';
  
  // Property features with icons
  const features = [
    { 
      icon: <FaTree className="text-green-300 text-2xl" />, 
      titleEs: "Conservación Natural", 
      titleEn: "Natural Conservation",
      descEs: "Bosque tropical húmedo virgen, único en el Pacífico Mesoamericano",
      descEn: "Virgin humid tropical forest, unique in the Mesoamerican Pacific"
    },
    { 
      icon: <FaWater className="text-blue-300 text-2xl" />, 
      titleEs: "Recursos Hídricos", 
      titleEn: "Water Resources",
      descEs: "Atravesada por 3 riachuelos y colindante con el Río Claro",
      descEn: "Crossed by 3 streams and adjacent to the Claro River"
    },
    { 
      icon: <FaMountain className="text-gray-500 text-2xl" />, 
      titleEs: "Terreno Diverso", 
      titleEn: "Diverse Terrain",
      descEs: "10 hectáreas de tacotal aptas para agricultura y construcción",
      descEn: "10 hectares suitable for agriculture and construction"
    },
    { 
      icon: <FaPaw className="text-green-200 text-2xl" />, 
      titleEs: "Biodiversidad", 
      titleEn: "Biodiversity",
      descEs: "Hábitat de especies como jaguar, puma, chancho de monte y tapir",
      descEn: "Habitat for species like jaguars, pumas, wild boars, and tapirs"
    },
    { 
      icon: <FaMapMarkerAlt className="text-red-300 text-2xl" />, 
      titleEs: "Ubicación Privilegiada", 
      titleEn: "Prime Location",
      descEs: "Colindante con el Parque Nacional Corcovado",
      descEn: "Adjacent to Corcovado National Park"
    },
    { 
      icon: <FaFileAlt className="text-gray-400 text-2xl" />, 
      titleEs: "Documentación Legal", 
      titleEn: "Legal Documentation",
      descEs: "Plano catastrado número P-579262-99, visado por MINAE",
      descEn: "Cadastral plan number P-579262-99, approved by MINAE"
    }
  ];

  return (
    <section id="details" className="py-16 px-4 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          {lang === 'es' ? 'Detalles de la Finca' : 'Property Details'}
        </h2>
        
        {/* Property Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">
            {lang === 'es' ? 'Descripción General' : 'General Overview'}
          </h3>
          <p className="mb-4 text-lg">
            {lang === 'es' 
              ? 'La finca está conformada en su mayoría por terreno de montaña destinado a la conservación y cuido de la naturaleza. Además, cuenta con un sector de tacotal de 10 hectáreas apto para agricultura y construcción de infraestructura, y es atravesada por 3 riachuelos. El resto de la finca es un ambiente natural intacto, con un sendero que la recorre y una cabaña muy modesta.'
              : 'The estate is mainly a mountainous terrain dedicated to nature conservation, including a 10-hectare area suitable for agriculture and infrastructure development, and is crossed by 3 streams. The remainder of the property is an intact natural environment, featuring a trail and a modest cabin.'}
          </p>
          <p className="mb-4 text-lg">
            {lang === 'es'
              ? 'La finca es colindante con uno de los linderos del Parque Nacional Corcovado, con la margen derecha del Río Claro y tres fincas vecinas. La colindancia muestra un lecho rocoso que forma cascadas y pozas de gran belleza escénica.'
              : 'It is adjacent to one of the boundaries of Corcovado National Park, along the right bank of the Claro River and three neighboring estates. The riverbank features rocky beds that create a series of breathtaking waterfalls and pools.'}
          </p>
        </div>
        
        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-3">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-3">
                  {lang === 'es' ? feature.titleEs : feature.titleEn}
                </h3>
              </div>
              <p className="text-gray-600">
                {lang === 'es' ? feature.descEs : feature.descEn}
              </p>
            </div>
          ))}
        </div>
        
        {/* Location Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">
            {lang === 'es' ? 'Ubicación' : 'Location'}
          </h3>
          <p className="mb-4 text-lg">
            {lang === 'es'
              ? 'La finca se localiza con entrada desde la calle principal, a 3 km de la Escuela de Los Planes de Drake en la península de Osa, adyacente a la Estación del Guardaparques.'
              : 'The estate is located with a main street entrance, 3 km from the Escuela de Los Planes de Drake on the Osa Peninsula, adjacent to the Park Rangers\' Station.'}
          </p>
          <div className="bg-green-50 border-l-4 border-green-200 p-4 mb-4">
            <h4 className="font-bold mb-2">
              {lang === 'es' ? 'Instrucciones para llegar:' : 'Directions:'}
            </h4>
            <p>
              {lang === 'es'
                ? 'Para ingresar a la finca, se llega a la estación del guardaparques en Los Planes. A un lado de la edificación inicia un trillo ancho; a unos 400 m se encuentra el rótulo que identifica la finca. Seguidamente, el camino desciende pasando por una quebrada y sigue hasta llegar al Río Claro, donde se observan notoriamente cascadas. Allí se encuentra la cabaña de Oscar Sánchez.'
                : 'To enter the estate, arrive at the park rangers\' station at Los Planes. Next to the building, a wide trail begins; about 400 m in, there is a sign identifying the estate. The path then descends past a ravine and continues until reaching the Claro River, where a chain of waterfalls is visible. That is where Oscar Sánchez\'s cabin is located.'}
            </p>
          </div>
          <div className="text-center">
            <a 
              href={mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center bg-green-200 hover:bg-green-300 text-gray-800 py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <FaMapMarkerAlt className="mr-2" />
              {lang === 'es' ? 'Ver en Google Maps' : 'View on Google Maps'}
            </a>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-lg shadow-lg p-8 text-gray-800 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {lang === 'es' ? '¿Interesado en esta propiedad única?' : 'Interested in this unique property?'}
          </h3>
          <p className="mb-6 text-lg">
            {lang === 'es' 
              ? 'Contáctenos hoy para obtener más información o programar una visita.' 
              : 'Contact us today for more information or to schedule a visit.'}
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-white text-gray-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-300 border border-green-300"
          >
            {lang === 'es' ? 'Contactar Ahora' : 'Contact Now'}
          </a>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetails; 