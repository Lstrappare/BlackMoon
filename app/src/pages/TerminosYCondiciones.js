export const TerminosYCondiciones = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 mx-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-700">Términos y Condiciones</h1>
      </header>
      <main className="sm:px-10 max-w-4xl mx-auto">
        <section className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-8">
            <h2 className="text-gray-800 text-2xl font-bold mb-4">Términos</h2>
            <p className="text-gray-700 mb-4">
              <strong className="font-bold">Introducción</strong><br />
              Bienvenido a BLACKMOON. Al acceder y utilizar nuestro sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones. Por favor, lea estos términos cuidadosamente antes de utilizar nuestro servicio.
            </p>
            <p className="text-gray-700 mb-4">
              <strong className="font-bold">Definiciones</strong><br />
              <ul className="list-disc pl-4">
                <li><strong>"Cliente"</strong>: Se refiere a la persona que realiza pedidos o reservas a través del sitio web de BLACKMOON.</li>
                <li><strong>"Sitio web"</strong>: Se refiere al sitio web oficial de BLACKMOON.</li>
                <li><strong>"Servicio"</strong>: Incluye la capacidad de realizar pedidos, reservas y gestionar cuentas a través del sitio web.</li>
              </ul>
            </p>
            {/* Agrega más párrafos según sea necesario */}
          </div>
          <div className="w-full md:w-1/2 mb-8">
            <h2 className="text-gray-800 text-2xl font-bold mb-4">Condiciones</h2>
            <p className="text-gray-700 mb-4">
              <strong className="font-bold">Seguridad de Datos</strong><br />
              BLACKMOON se compromete a proteger la información personal de los clientes mediante medidas de seguridad adecuadas. La información recopilada se utilizará únicamente para mejorar el servicio y no se compartirá con terceros sin el consentimiento del cliente.
            </p>
            <p className="text-gray-700 mb-4">
              <strong className="font-bold">Política de Pagos</strong><br />
              Los clientes pueden pagar sus pedidos en línea utilizando el saldo de la tarjeta BLACKMOON. El saldo de la tarjeta BLACKMOON solo puede ser recargado en la sucursal.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Limitaciones de Responsabilidad</strong><br />
              BLACKMOON no se hace responsable por daños indirectos, incidentales, especiales o consecuentes que resulten del uso del sitio web. BLACKMOON no garantiza que el sitio web esté libre de errores o que siempre esté disponible sin interrupciones.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Derechos de Propiedad Intelectual</strong><br />
              Todo el contenido del sitio web, incluyendo textos, imágenes, logos y software, es propiedad de BLACKMOON y está protegido por leyes de derechos de autor y marcas comerciales. Está prohibido el uso no autorizado de cualquier contenido del sitio web.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Modificaciones de los Términos</strong><br />
              BLACKMOON se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en el sitio web. El uso continuo del sitio web constituye la aceptación de los términos modificados.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Ley Aplicable</strong><br />
              Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país donde se encuentra BLACKMOON. Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes del país de BLACKMOON.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Contacto</strong><br />
              Para cualquier consulta o preocupación sobre estos términos y condiciones, por favor, contacte a BLACKMOON a través de la información de contacto proporcionada en el sitio web.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
