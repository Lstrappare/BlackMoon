export const Nosotros = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 mx-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-700">Sobre Nosotros</h1>
      </header>
      <main className="sm:p-10 max-w-4xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="about-section mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenidos a BLACKMOON</h2>
            <p className="text-gray-700 mb-6">
              Donde la pasión por la excelencia y la dedicación a la calidad se encuentran en cada aspecto de nuestra operación. Somos un establecimiento dedicado a ofrecer una experiencia gastronómica única, combinando el mejor café con un ambiente acogedor y un servicio excepcional.
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Historia</h3>
            <p className="text-gray-700 mb-6">
              BLACKMOON fue fundado con la visión de crear un lugar donde la comunidad pueda disfrutar de una buena charla y un café excepcional en un ambiente acogedor y elegante. Desde nuestros humildes comienzos, nos hemos esforzado por mantener los más altos estándares en la preparación de nuestras bebidas y postres, utilizando ingredientes frescos y de la más alta calidad.
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Nuestra Filosofía</h3>
            <p className="text-gray-700 mb-6">
              En BLACKMOON, creemos que una buena bebida debe ser una experiencia memorable. Nos esforzamos por crear sabores que no solo satisfagan el paladar, sino que también cuenten una historia. Nuestra filosofía se basa en la combinación de tradición e innovación, creando un menú que celebra tanto los sabores clásicos del café como los contemporáneos.
            </p>
          </div>
          <div className="about-section mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Nuestro Equipo</h3>
            <p className="text-gray-700 mb-6">
              Nuestro equipo está compuesto por profesionales apasionados por la gastronomía. Desde nuestros bartender hasta nuestro personal de servicio, todos en BLACKMOON comparten un compromiso con la excelencia y la satisfacción del cliente. Creemos que nuestro éxito se debe a nuestro equipo dedicado que trabaja incansablemente para brindar la mejor experiencia posible a nuestros clientes.
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Compromiso con la Calidad</h3>
            <p className="text-gray-700 mb-6">
              La calidad es la piedra angular de BLACKMOON. Nos aseguramos de que cada taza que servimos esté preparada con los mejores ingredientes y técnicas culinarias. Además, mantenemos un entorno limpio y seguro para nuestros clientes y empleados, cumpliendo con todas las normativas sanitarias y de seguridad.
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Misión y Visión</h3>
            <p className="text-gray-700 mb-6">
              Nuestra misión es ser el destino preferido para aquellos que buscan una experiencia y un buen sabor excepcional. Nos esforzamos por superar las expectativas de nuestros clientes en cada visita, creando recuerdos duraderos a través de nuestros sabores y servicio.
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Ubicación</h3>
          <p className="text-gray-700 mb-6">
            Nos encontramos en Av. Té 950, Granjas México, Iztacalco, 08400 Ciudad de México, CDMX, un lugar estratégico y accesible para todos. Te invitamos a visitarnos y descubrir por ti mismo la experiencia BLACKMOON.
          </p>
        </section>
      </main>
    </div>
  );
}
