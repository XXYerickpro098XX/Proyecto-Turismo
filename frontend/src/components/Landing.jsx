// src/components/Landing.jsx
"use client";

import { Link } from "react-router-dom";
import { MapPin, Users, Calendar, Cloud, TreePine, Flower2, Mountain, Bird, Star, Shield, Heart, Phone, Mail, Map } from "lucide-react";
import { useState, useEffect } from "react";

export default function Landing() {
  const tours = [
    { id: 1, title: "Tour Volcán Arenal", desc: "Descubre la majestuosidad del volcán y aguas termales.", img: "https://picsum.photos/400/200?random=1" },
    { id: 2, title: "Tour Catarata La Fortuna", desc: "Caminata en la selva con una vista increíble.", img: "https://picsum.photos/400/200?random=2" },
    { id: 3, title: "Tour Playa Conchal", desc: "Relájate en una de las playas más hermosas de Costa Rica.", img: "https://picsum.photos/400/200?random=3" },
  ];

  const testimonials = [
    { id: 1, name: "María González", comment: "Una experiencia increíble. Los guías fueron muy profesionales.", rating: 5 },
    { id: 2, name: "Carlos Rodríguez", comment: "El tour superó todas mis expectativas. ¡Volveré pronto!", rating: 4 },
    { id: 3, name: "Ana Martínez", comment: "Costa Rica es hermosa y Turismo CR hizo que todo fuera perfecto.", rating: 5 },
  ];

  const [current, setCurrent] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % tours.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + tours.length) % tours.length);

  // Auto-rotación del carrusel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      {/* Fondo decorativo minimalista */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-sky-200 animate-float opacity-40">
          <Cloud className="h-12 w-12" />
        </div>
        <div className="absolute top-32 right-10 text-sky-200 animate-float opacity-30" style={{ animationDelay: "2s" }}>
          <Cloud className="h-16 w-16" />
        </div>
        <div className="absolute bottom-10 left-20 text-emerald-200 opacity-40">
          <TreePine className="h-16 w-16" />
        </div>
        <div className="absolute bottom-5 right-20 text-emerald-300 opacity-30">
          <TreePine className="h-20 w-20" />
        </div>
      </div>

      {/* Header minimalista */}
      <header className="relative z-10 flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <h1 className="text-xl font-bold text-emerald-700 flex items-center gap-2">
          <MapPin className="h-5 w-5" /> Turismo CR
        </h1>
        <nav className="hidden md:flex gap-6 text-gray-600">
          <a href="#tours" className="hover:text-emerald-600 transition-colors">Tours</a>
          <a href="#info" className="hover:text-emerald-600 transition-colors">Servicios</a>
          <a href="#testimonials" className="hover:text-emerald-600 transition-colors">Opiniones</a>
          <a href="#contact" className="hover:text-emerald-600 transition-colors">Contacto</a>
        </nav>
        <Link to="/reservas" className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors">
          Reservar
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Descubre Costa Rica</h2>
        <p className="text-lg text-gray-600 mb-8">
          Explora las maravillas naturales de Costa Rica con nuestros tours personalizados. 
          Disfruta de playas, montañas, volcanes y aventuras inolvidables.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/tours" className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors">
            Ver Todos los Tours
          </Link>
          <a href="#contact" className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
            Contactar
          </a>
        </div>
      </section>

      {/* Carrusel de tours */}
      <section id="tours" className="relative z-10 px-6 py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Tours Destacados</h3>
          <p className="text-gray-600 text-center mb-8">Descubre nuestras experiencias más populares</p>
          
          <div className="relative bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2">
                <img 
                  src={tours[current].img} 
                  alt={tours[current].title} 
                  className="rounded-lg shadow-sm w-full h-64 object-cover" 
                />
              </div>
              <div className="md:w-1/2">
                <h4 className="text-xl font-semibold text-gray-800">{tours[current].title}</h4>
                <p className="text-gray-600 my-4">{tours[current].desc}</p>
                <Link 
                  to={`/tour/${tours[current].id}`} 
                  className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>

            {/* Controles del carrusel */}
            <div className="flex justify-between mt-6">
              <button 
                onClick={prevSlide} 
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Anterior
              </button>
              <div className="flex gap-2">
                {tours.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-3 h-3 rounded-full ${current === index ? 'bg-emerald-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextSlide} 
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="info" className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Nuestros Servicios</h3>
          <p className="text-gray-600 text-center mb-8">Todo lo que necesitas para una experiencia perfecta</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Users className="h-10 w-10 text-emerald-500 mb-4" />
              <h4 className="font-bold text-lg mb-2">Guías Expertos</h4>
              <p className="text-gray-600">Acompañamiento profesional en todos los tours.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Calendar className="h-10 w-10 text-emerald-500 mb-4" />
              <h4 className="font-bold text-lg mb-2">Reservas Flexibles</h4>
              <p className="text-gray-600">Elige la fecha y el tour que más te convenga.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Shield className="h-10 w-10 text-emerald-500 mb-4" />
              <h4 className="font-bold text-lg mb-2">Seguridad Garantizada</h4>
              <p className="text-gray-600">Todos nuestros tours cumplen con los más altos estándares de seguridad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonials" className="relative z-10 px-6 py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Opiniones de Clientes</h3>
          <p className="text-gray-600 text-center mb-8">Lo que nuestros clientes dicen sobre nosotros</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">Contacto</h3>
          <p className="text-gray-600 text-center mb-8">¿Tienes preguntas? Estamos aquí para ayudarte</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-4">Información de Contacto</h4>
              
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-5 w-5 text-emerald-500" />
                <span className="text-gray-600">+506 2222-2222</span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-emerald-500" />
                <span className="text-gray-600">info@turismocr.com</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Map className="h-5 w-5 text-emerald-500" />
                <span className="text-gray-600">San José, Costa Rica</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-4">Envíanos un Mensaje</h4>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Tu nombre" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Tu email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Tu mensaje" 
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/90 backdrop-blur-sm text-center py-8 mt-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-emerald-700 flex items-center gap-2 mb-4 md:mb-0">
              <MapPin className="h-5 w-5" /> Turismo CR
            </h1>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Términos</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">Privacidad</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">FAQ</a>
            </div>
          </div>
          <p className="text-gray-600">© 2025 Turismo CR. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}