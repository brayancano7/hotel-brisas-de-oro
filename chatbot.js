// Respuestas predefinidas del chatbot
const respuestasBot = {
    // Preguntas sobre habitaciones
    'habitación|cuarto|room':
        '🛏️ Ofrecemos habitaciones de lujo con diferentes categorías: Habitación Estándar, Superior, Deluxe Suite y Suite Presidencial. Todas cuentan con aire acondicionado, TV Smart de 55", baño privado y vistas al extranjero.',
    'tipo de habitación|tipos habitación|cuáles son las habitaciones':
        '🏨 Nuestras categorías de habitaciones son:\n\n1. **Estándar** - Para viajeros que buscan comodidad\n2. **Superior** - Con mejores vistas y amenidades\n3. **Deluxe Suite** - Lujo y espacio\n4. **Suite Presidencial** - Nuestra máxima experiencia\n\n¿Deseas saber más sobre alguna?',
    'precio|costo|tarifa|cuánto cuesta':
        '💰 Nuestros precios varían según la temporada y tipo de habitación. Actualmente tenemos una **OFERTA ESPECIAL: 20% de descuento + desayuno gratis** en la primera noche.\n\nUsa nuestro buscador arriba para consultar disponibilidad y precios exactos.',
    
    // Preguntas sobre servicios
    'piscina|alberca|natación':
        '🏊 Contamos con una hermosa **Piscina Infinity** con vista al paisaje. Disponible para huéspedes todos los días de 7:00 AM a 10:00 PM.',
    'desayuno|comida|restaurante|alimentos':
        '🍽️ Ofrecemos un **desayuno buffet gourmet** incluido en la mayoría de nuestras tarifas. También contamos con restaurante a la carta para almuerzos y cenas. ¡Nuestro chef prepara platos deliciosos!',
    'wifi|internet|conexión':
        '📡 Claro que sí! Ofrecemos **WiFi de alta velocidad gratuito** en todas las áreas del hotel, incluidas las habitaciones.',
    'estacionamiento|parking|auto|coche':
        '🅿️ Proporcionamos **estacionamiento gratuito** para todos nuestros huéspedes. Espacio seguro y cubierto.',
    'piscina|spa|masaje':
        '💆 Tenemos un **Area Spa** completo con masajes terapéuticos, tratamiento facial y corporal. Reserva en recepción o pregunta a nuestro personal.',
    'ascensor|elevador|accesibilidad|discapacitados':
        '♿ Contamos con **ascensores modernos** y acceso total para personas con movilidad reducida. Si tienes necesidades especiales, contáctanos directamente.',

    // Preguntas sobre reservas y políticas
    'reserva|booking|cómo reservar|reservar':
        '📌 Puedes reservar de tres maneras:\n\n1. **Online** - Usa el buscador de disponibilidad en nuestro sitio\n2. **Teléfono** - Llama a nuestro número de reservas\n3. **Email** - Envía tu solicitud a reservas@bridasdeoro.com',
    'cancelación|cancelar reserva|política|cambiar|modificar':
        '📋 Nuestra política de cancelación permite cambios hasta 48 horas antes de la llegada. Para cancelaciones fuera de este plazo, se aplicarán cargos. Contacta a recepción para más detalles.',
    'check in|entrada|hourly|por horas':
        '🔑 Nuestro horario estándar es:\n\n**Check-in**: 3:00 PM\n**Check-out**: 11:00 AM\n\nSi llega temprano o desea salir tarde, consultaremos disponibilidad.',
    'mascotas|perro|gato|mascota':
        '🐕 Por el momento, no permitimos mascotas en nuestras habitaciones para mantener nuestros estándares de limpieza.',
    'eventos|conferencias|reuniones|grupo':
        '🎉 Ofrecemos salones para eventos, conferencias y celebraciones. Tenemos capacidad para grupos de diferentes tamaños. Contacta a nuestro departamento de eventos.',

    // Información general
    'ubicación|dónde están|dirección|localización':
        '📍 Estamos ubicados en el corazón del paraíso, con acceso fácil a playas, atracciones turísticas y transporte público.',
    'contacto|teléfono|email|llamar':
        '☎️ Contáctanos:\n\n📱 +1 (555) 123-4567\n📧 info@bridasdeoro.com\n🕐 Atención 24/7',
    'abierto|horarios|cuándo|disponible':
        '🕐 El hotel está **abierto 24/7** para nuestros huéspedes. Recepción disponible siempre.',
    'quiénes somos|historia|sobre nosotros|acerca de':
        '🏰 Somos un hotel boutique de lujo dedicado a ofrecerte una experiencia única. Combinamos elegancia, comodidad y atención personalizada para crear momentos inolvidables. ¡Bienvenido a Brisas de Oro!',
    
    // Saludos
    'hola|buenos días|buenas tardes|buenas noches|hi|hello':
        '¡Hola! 👋 Bienvenido a Brisas de Oro. ¿Cómo puedo ayudarte?',
    'gracias|thanks|vaya|excelente':
        '¡De nada! 😊 Es un placer ayudarte. ¿Hay algo más que necesites?',
    'adiós|hasta luego|bye|ciao|chao':
        '¡Hasta pronto! 👋 Esperamos verte pronto en Brisas de Oro.',
};

// Respuesta por defecto
const respuestaDefault = 'No estoy seguro de tu pregunta. 🤔\n\nPuedo ayudarte con:\n- Información sobre habitaciones\n- Servicios del hotel\n- Precios y ofertas\n- Reservas\n- Ubicación y contacto\n\n¿Qué te gustaría saber?';

// Inicializar chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const sendBtn = document.getElementById('sendBtn');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // Abrir/cerrar chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'flex' : 'none';
            if (chatbotContainer.style.display === 'flex') {
                chatbotInput.focus();
            }
        });
    }
    
    if (closeChatbot) {
        closeChatbot.addEventListener('click', function() {
            chatbotContainer.style.display = 'none';
        });
    }
    
    // Enviar mensaje
    if (sendBtn) {
        sendBtn.addEventListener('click', enviarMensaje);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensaje();
            }
        });
    }
    
    function enviarMensaje() {
        const mensaje = chatbotInput.value.trim();
        if (!mensaje) return;
        
        // Añadir mensaje del usuario
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        userMessageDiv.innerHTML = `<p>${escaparHTML(mensaje)}</p>`;
        chatbotMessages.appendChild(userMessageDiv);
        
        // Limpiar input
        chatbotInput.value = '';
        
        // Obtener respuesta del bot
        const respuesta = obtenerRespuesta(mensaje);
        
        // Simular pequeño delay para que parezca más natural
        setTimeout(function() {
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message bot-message';
            botMessageDiv.innerHTML = `<p>${respuesta}</p>`;
            chatbotMessages.appendChild(botMessageDiv);
            
            // Scroll al final
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 300);
        
        // Scroll al final
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function obtenerRespuesta(mensaje) {
        const mensajeLimpio = mensaje.toLowerCase().trim();
        
        // Buscar coincidencia en respuestas predefinidas
        for (let palabra in respuestasBot) {
            const palabras = palabra.split('|');
            for (let p of palabras) {
                if (mensajeLimpio.includes(p)) {
                    return respuestasBot[palabra];
                }
            }
        }
        
        // Si no encuentra coincidencia, devolver respuesta por defecto
        return respuestaDefault;
    }
    
    function escaparHTML(texto) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return texto.replace(/[&<>"']/g, m => map[m]);
    }
});
