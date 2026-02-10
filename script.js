// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Datos de habitaciones disponibles
    const habitacionesData = [
        {
            nombre: 'Habitación Pen House',
            precio: 900000,
            descripcion: 'Cama Doble · Baño privado · Sauna',
            capacidad: 2,
            icono: '👑'
        },
        {
            nombre: 'Habitación VIP',
            precio: 700000,
            descripcion: 'Cama Doble · Baño privado · Sauna',
            capacidad: 2,
            icono: '⭐'
        },
        {
            nombre: 'Habitación Sencilla',
            precio: 500000,
            descripcion: 'Cama Doble · Baño privado · Sauna',
            capacidad: 3,
            icono: '🏨'
        }
    ];
    
    // Buscador de disponibilidad
    const formBuscador = document.getElementById('formBuscador');
    if (formBuscador) {
        formBuscador.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;
            const huespedes = parseInt(document.getElementById('huespedes').value);
            const mensajeBuscador = document.getElementById('mensajeBuscador');
            const habitacionesDisponibles = document.getElementById('habitacionesDisponibles');
            const listaHabitaciones = document.getElementById('listaHabitaciones');
            
            if (checkIn && checkOut && huespedes) {
                // Convertir fechas a objetos Date para validar
                const fechaCheckIn = new Date(checkIn);
                const fechaCheckOut = new Date(checkOut);
                
                if (fechaCheckOut <= fechaCheckIn) {
                    mensajeBuscador.textContent = '⚠️ La fecha de salida debe ser posterior a la de entrada.';
                    mensajeBuscador.style.color = '#ff9800';
                    habitacionesDisponibles.style.display = 'none';
                } else {
                    const noches = Math.ceil((fechaCheckOut - fechaCheckIn) / (1000 * 60 * 60 * 24));
                    mensajeBuscador.textContent = `✅ Se encontraron ${habitacionesData.length} habitación(es) disponible(s) para ${huespedes} huésped(es) por ${noches} noche(s).`;
                    mensajeBuscador.style.color = 'green';
                    
                    // Limpiar lista anterior
                    listaHabitaciones.innerHTML = '';
                    
                    // Mostrar habitaciones disponibles
                    habitacionesData.forEach(habitacion => {
                        if (habitacion.capacidad >= huespedes) {
                            const totalPrecio = habitacion.precio * noches;
                            
                            const tarjeta = document.createElement('div');
                            tarjeta.className = 'tarjeta-habitacion-disponible';
                            tarjeta.innerHTML = `
                                <div class="habitacion-nombre">${habitacion.icono} ${habitacion.nombre}</div>
                                <div class="habitacion-detalles">
                                    ${habitacion.descripcion}
                                </div>
                                <div class="habitacion-detalles">
                                    <strong>Capacidad:</strong> Hasta ${habitacion.capacidad} huésped(es)
                                </div>
                                <div class="habitacion-precio">$${habitacion.precio.toLocaleString('es-CO')}/noche</div>
                                <div class="habitacion-total">
                                    <div style="font-size: 0.85em; color: #999;">Total por ${noches} noche(s):</div>
                                    <div class="habitacion-total-valor">$${totalPrecio.toLocaleString('es-CO')}</div>
                                </div>
                                <button class="btn-reservar-disponible" data-habitacion="${habitacion.nombre}" data-precio="${habitacion.precio}" data-checkin="${checkIn}" data-checkout="${checkOut}">
                                    📅 Reservar Ahora
                                </button>
                            `;
                            
                            listaHabitaciones.appendChild(tarjeta);
                        }
                    });
                    
                    // Mostrar sección de habitaciones disponibles
                    habitacionesDisponibles.style.display = 'block';
                    
                    // Agregar event listeners a los botones de reserva
                    document.querySelectorAll('.btn-reservar-disponible').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const habitacion = this.getAttribute('data-habitacion');
                            const precio = this.getAttribute('data-precio');
                            
                            // Abrir modal de pago si existe
                            const modalPago = document.getElementById('modalPago');
                            if (modalPago) {
                                document.getElementById('resHabitacion').textContent = habitacion;
                                document.getElementById('resPrecioNoche').textContent = '$' + parseInt(precio).toLocaleString('es-CO');
                                
                                // Calcular noches
                                const checkInVal = new Date(checkIn);
                                const checkOutVal = new Date(checkOut);
                                const nochesVal = Math.ceil((checkOutVal - checkInVal) / (1000 * 60 * 60 * 24));
                                
                                document.getElementById('resNoches').textContent = nochesVal;
                                document.getElementById('nochesInput').value = nochesVal;
                                document.getElementById('resTotal').textContent = '$' + (parseInt(precio) * nochesVal).toLocaleString('es-CO');
                                
                                modalPago.style.display = 'block';
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        });
                    });
                }
            } else {
                mensajeBuscador.textContent = '⚠️ Por favor completa todos los campos.';
                mensajeBuscador.style.color = '#ff9800';
                habitacionesDisponibles.style.display = 'none';
            }
        });
        
        // Establecer fecha mínima en check-in como hoy
        const hoy = new Date().toISOString().split('T')[0];
        document.getElementById('checkIn').setAttribute('min', hoy);
    }
    
    // Cerrar barra de oferta
    const cerrarOferta = document.querySelector('.cerrar-oferta');
    const barraOferta = document.querySelector('.barra-oferta');

    if (cerrarOferta) {
        cerrarOferta.addEventListener('click', function() {
            barraOferta.classList.add('oculta');
        });
    }

    // Formulario de reserva
    const form = document.getElementById("formReserva");
    const mensaje = document.getElementById("mensaje");

    if (form && mensaje) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            mensaje.textContent = "✅ Reserva realizada con éxito. Pronto te contactaremos.";
            mensaje.style.color = "green";

            form.reset();
        });
    }

    // Manejo del formulario de recompensas
    const formRecompensas = document.getElementById('formRecompensas');
    const mensajeRecompensa = document.getElementById('mensajeRecompensa');

    if (formRecompensas && mensajeRecompensa) {
        formRecompensas.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const noches = parseInt(this.querySelector('input[type="number"]').value);
            
            let recompensa = '';
            
            if (noches >= 15) {
                recompensa = '¡Felicidades! 👑 Has desbloqueado: Upgrade de habitación gratis en tu próxima reserva.';
            } else if (noches >= 7) {
                recompensa = '¡Excelente! 🎁 Has desbloqueado: Desayuno gratis + acceso a Spa.';
            } else if (noches >= 3) {
                recompensa = '¡Genial! ⭐ Has desbloqueado: 10% descuento en tu próxima reserva.';
            } else {
                recompensa = 'Te faltan ' + (3 - noches) + ' noche(s) para obtener tu primera recompensa.';
            }
            
            mensajeRecompensa.textContent = recompensa;
            mensajeRecompensa.style.display = 'block';
            
            formRecompensas.reset();
        });
    }

    // ===== SISTEMA DE PAGO DE HABITACIONES =====
    let habitacionSeleccionada = {
        nombre: '',
        precioNoche: 0
    };
    
    const btnReservar = document.querySelectorAll('.btn-reservar-habitacion');
    const modalPago = document.getElementById('modalPago');
    const btnCerrarPago = document.querySelector('.btn-cerrar-pago');
    const formReservaPago = document.getElementById('formReservaPago');
    const nochesInput = document.getElementById('nochesInput');
    
    // Abrir modal de pago cuando se selecciona una habitación
    if (btnReservar.length > 0) {
        btnReservar.forEach(btn => {
            btn.addEventListener('click', function() {
                habitacionSeleccionada.nombre = this.getAttribute('data-habitacion');
                habitacionSeleccionada.precioNoche = parseInt(this.getAttribute('data-precio'));
                
                // Llenar datos en el modal
                document.getElementById('resHabitacion').textContent = habitacionSeleccionada.nombre;
                document.getElementById('resPrecioNoche').textContent = '$' + habitacionSeleccionada.precioNoche.toLocaleString('es-CO');
                
                // Resetear noches a 1
                nochesInput.value = 1;
                actualizarTotal();
                
                // Abrir modal
                modalPago.classList.add('activo');
            });
        });
    }
    
    // Cerrar modal
    if (btnCerrarPago) {
        btnCerrarPago.addEventListener('click', function() {
            modalPago.classList.remove('activo');
        });
    }
    
    // Cerrar modal al hacer clic fuera
    if (modalPago) {
        modalPago.addEventListener('click', function(e) {
            if (e.target === modalPago) {
                modalPago.classList.remove('activo');
            }
        });
    }
    
    // Actualizar total cuando cambian las noches
    if (nochesInput) {
        nochesInput.addEventListener('change', actualizarTotal);
        nochesInput.addEventListener('input', actualizarTotal);
    }
    
    function actualizarTotal() {
        const noches = parseInt(nochesInput.value) || 1;
        const total = habitacionSeleccionada.precioNoche * noches;
        
        document.getElementById('resNoches').textContent = noches;
        document.getElementById('resTotal').textContent = '$' + total.toLocaleString('es-CO');
    }
    
    // ===== SELECCIÓN DE MÉTODO DE PAGO =====
    let metodoSeleccionado = 'tarjeta';
    const btnMetodoPago = document.querySelectorAll('.btn-metodo-pago');
    
    if (btnMetodoPago.length > 0) {
        btnMetodoPago.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remover clase activo de todos
                btnMetodoPago.forEach(b => b.classList.remove('activo'));
                
                // Agregar clase activo al botón clickeado
                this.classList.add('activo');
                
                // Obtener método seleccionado
                metodoSeleccionado = this.getAttribute('data-metodo');
                
                // Mostrar/ocultar contenedores
                document.getElementById('metodoTarjeta').classList.remove('activo');
                document.getElementById('metodoNequi').classList.remove('activo');
                document.getElementById('metodoBancolombia').classList.remove('activo');
                
                if (metodoSeleccionado === 'tarjeta') {
                    document.getElementById('metodoTarjeta').classList.add('activo');
                } else if (metodoSeleccionado === 'nequi') {
                    document.getElementById('metodoNequi').classList.add('activo');
                } else if (metodoSeleccionado === 'bancolombia') {
                    document.getElementById('metodoBancolombia').classList.add('activo');
                }
            });
        });
    }
    
    // Procesar pago
    if (formReservaPago) {
        formReservaPago.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombreInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const telefono = document.getElementById('telefonoInput').value.trim();
            const documento = document.getElementById('documentoInput').value.trim();
            
            const mensajePago = document.getElementById('mensajePago');
            
            // Validar campos básicos
            if (!nombre || !email || !telefono || !documento) {
                mensajePago.textContent = '❌ Por favor completa todos los campos';
                mensajePago.style.color = '#d32f2f';
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mensajePago.textContent = '❌ Correo electrónico inválido';
                mensajePago.style.color = '#d32f2f';
                return;
            }
            
            // Validaciones según método de pago
            if (metodoSeleccionado === 'tarjeta') {
                const tarjeta = document.getElementById('tarjetaInput').value.trim();
                const vencimiento = document.getElementById('vencimientoInput').value.trim();
                const cvv = document.getElementById('cvvInput').value.trim();
                
                if (!tarjeta || !vencimiento || !cvv) {
                    mensajePago.textContent = '❌ Por favor completa los datos de la tarjeta';
                    mensajePago.style.color = '#d32f2f';
                    return;
                }
                
                // Validar CVV
                if (!/^\d{3,4}$/.test(cvv)) {
                    mensajePago.textContent = '❌ CVV debe tener 3 o 4 dígitos';
                    mensajePago.style.color = '#d32f2f';
                    return;
                }
                
                // Validar vencimiento
                if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
                    mensajePago.textContent = '❌ Formato: MM/YY';
                    mensajePago.style.color = '#d32f2f';
                    return;
                }
                
                // Validar tarjeta
                const tarjetaLimpia = tarjeta.replace(/\s/g, '');
                if (!/^\d{13,19}$/.test(tarjetaLimpia)) {
                    mensajePago.textContent = '❌ Número de tarjeta inválido';
                    mensajePago.style.color = '#d32f2f';
                    return;
                }
            } else if (metodoSeleccionado === 'nequi') {
                const nequiPhone = document.getElementById('nequiPhone').value.trim();
                
                if (!nequiPhone) {
                    mensajePago.textContent = '❌ Por favor ingresa tu número celular Nequi';
                    mensajePago.style.color = '#d32f2f';
                    return;
                }
                
                // Validar número celular (10 dígitos aproximadamente)
                const phoneClean = nequiPhone.replace(/\D/g, '');
                if (phoneClean.length < 10) {
                    mensajePago.textContent = '❌ Número de celular inválido';
                    mensajePago.style.color = '#d32f2f';
                    return;
                }
            } else if (metodoSeleccionado === 'bancolombia') {
                const tipoCuenta = document.getElementById('bancolombiaTipoCuenta').value;
                const numCuenta = document.getElementById('bancolombiaNumero').value.trim();
                
                if (!tipoCuenta || !numCuenta) {
                    mensajePago.textContent = '❌ Por favor completa los datos de tu cuenta Bancolombia';
                    mensajePago.style.color = '#d32f2f';
                    return;
                }
                
                // Validar número de cuenta
                if (!/^\d{8,17}$/.test(numCuenta)) {
                    mensajePago.textContent = '❌ Número de cuenta inválido';
                    mensajePago.style.color = '#d32f2f';
                    return;
                }
            }
            
            // Procesar pago
            mensajePago.textContent = '⏳ Procesando tu compra...';
            mensajePago.style.color = '#ff9800';
            
            // Simular procesamiento
            setTimeout(function() {
                const noches = parseInt(nochesInput.value);
                const total = habitacionSeleccionada.precioNoche * noches;
                
                let metodoTexto = 'Tarjeta de Crédito';
                if (metodoSeleccionado === 'nequi') metodoTexto = 'Nequi';
                if (metodoSeleccionado === 'bancolombia') metodoTexto = 'Bancolombia';
                
                mensajePago.innerHTML = '✅ ¡Compra confirmada!<br>Método: ' + metodoTexto + '<br>Email de confirmación enviado a: ' + email + '<br>Total: $' + total.toLocaleString('es-CO');
                mensajePago.style.color = '#27ae60';
                
                // Cerrar modal después de 3 segundos
                setTimeout(function() {
                    modalPago.classList.remove('activo');
                    formReservaPago.reset();
                    mensajePago.textContent = '';
                }, 3000);
            }, 2000);
        });
    }
});

// ===== ADMINISTRADOR =====
// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Credenciales de admin (en producción, esto debe estar en backend)
    const adminCredentials = {
        email: 'admin@hotel.com',
        password: 'admin123'
    };

    const btnAdmin = document.getElementById('btnAdmin');
    const modalLogin = document.getElementById('modalLogin');
    const formLogin = document.getElementById('formLogin');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const panelAdmin = document.getElementById('panelAdmin');
    const btnCerrarPanel = document.getElementById('btnCerrarPanel');
    const mensajeLogin = document.getElementById('mensajeLogin');
    const emailAdmin = document.getElementById('emailAdmin');
    const passwordAdmin = document.getElementById('passwordAdmin');

    // Verificar que todos los elementos existan
    if (!btnAdmin || !modalLogin || !formLogin || !panelAdmin) {
        console.error('Error: No se encontraron los elementos necesarios para el panel de administrador');
        return;
    }

    // Abrir modal de login
    if (btnAdmin) {
        btnAdmin.addEventListener('click', function() {
            modalLogin.classList.add('activo');
            mensajeLogin.textContent = '';
        });
    }

    // Cerrar modal
    if (cerrarModal) {
        cerrarModal.addEventListener('click', function() {
            modalLogin.classList.remove('activo');
            formLogin.reset();
        });
    }

    // Cerrar modal al hacer clic fuera
    if (modalLogin) {
        modalLogin.addEventListener('click', function(e) {
            if (e.target === modalLogin) {
                modalLogin.classList.remove('activo');
                formLogin.reset();
            }
        });
    }

    // Manejar formulario de login
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailAdmin.value;
            const password = passwordAdmin.value;
            
            if (email === adminCredentials.email && password === adminCredentials.password) {
                // Login exitoso
                modalLogin.classList.remove('activo');
                panelAdmin.classList.add('activo');
                mostrarGananciasEnPanel();
                formLogin.reset();
            } else {
                // Error de login
                mensajeLogin.textContent = '❌ Correo o contraseña incorrectos';
            }
        });
    }

    // Cerrar panel de administración
    if (btnCerrarPanel) {
        btnCerrarPanel.addEventListener('click', function() {
            panelAdmin.classList.remove('activo');
        });
    }

    // Cerrar panel al presionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            panelAdmin.classList.remove('activo');
            modalLogin.classList.remove('activo');
        }
    });

});

// ===== GANANCIAS DEL HOTEL =====
// Datos de ganancias mensuales (ejemplo)
const datosGanancias = {
    2026: {
        enero: { ganancias: 450000, reservas: 15 },
        febrero: { ganancias: 520000, reservas: 18 },
        marzo: { ganancias: 480000, reservas: 16 },
        abril: { ganancias: 550000, reservas: 19 },
        mayo: { ganancias: 610000, reservas: 21 },
        junio: { ganancias: 680000, reservas: 23 },
        julio: { ganancias: 720000, reservas: 25 },
        agosto: { ganancias: 690000, reservas: 24 },
        septiembre: { ganancias: 580000, reservas: 20 },
        octubre: { ganancias: 530000, reservas: 18 },
        noviembre: { ganancias: 0, reservas: 0 },
        diciembre: { ganancias: 0, reservas: 0 }
    }
};

// Función para calcular ganancias del mes actual
function calcularGananciasMes() {
    const hoy = new Date();
    const mes = hoy.getMonth(); // 0-11
    const año = hoy.getFullYear();
    
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    const mesActual = meses[mes];
    return datosGanancias[año][mesActual]?.ganancias || 0;
}

// Función para calcular ganancias anuales
function calcularGananciasAnuales() {
    const año = new Date().getFullYear();
    let total = 0;
    
    for (const mes in datosGanancias[año]) {
        total += datosGanancias[año][mes].ganancias;
    }
    
    return total;
}

// Función para formatear dinero
function formatearDinero(cantidad) {
    return '$' + cantidad.toLocaleString('es-CO');
}

// Función para llenar la tabla de ingresos
function llenarTablaIngresos() {
    const tablaIngresos = document.getElementById('tablaIngresos');
    tablaIngresos.innerHTML = '';
    
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const año = new Date().getFullYear();
    const mesesMinusculas = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                              'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    mesesMinusculas.forEach((mesMin, index) => {
        const datos = datosGanancias[año][mesMin];
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${meses[index]}</td>
            <td>${datos.reservas}</td>
            <td>${formatearDinero(datos.ganancias)}</td>
        `;
        tablaIngresos.appendChild(fila);
    });
}

// Función para mostrar ganancias en el panel
function mostrarGananciasEnPanel() {
    const gananciasDelMes = document.getElementById('gananciasDelMes');
    const gananciasAnuales = document.getElementById('gananciasAnuales');
    
    if (gananciasDelMes) {
        gananciasDelMes.textContent = formatearDinero(calcularGananciasMes());
    }
    
    if (gananciasAnuales) {
        gananciasAnuales.textContent = formatearDinero(calcularGananciasAnuales());
    }
    
    llenarTablaIngresos();
    dibujarGrafico();
}

// Función para dibujar el gráfico de ganancias
function dibujarGrafico() {
    const canvas = document.getElementById('canvasGanancias');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const año = new Date().getFullYear();
    const mesesMinusculas = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                              'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const mesesCortos = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const ganancias = mesesMinusculas.map(mes => datosGanancias[año][mes].ganancias);
    
    // Configurar dimensiones del canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
    
    // Dibujo simple del gráfico de barras
    const maxGanancia = Math.max(...ganancias, 750000);
    const padding = 50;
    const ancho = (canvas.width - padding * 2) / 12;
    const alto = canvas.height - padding * 2;
    
    // Fondo
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // ejes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Etiquetas del eje Y
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const valor = (maxGanancia / 5) * i;
        const y = canvas.height - padding - (alto / 5) * i;
        ctx.fillText(formatearDinero(valor), padding - 10, y + 4);
    }
    
    // Barras y etiquetas del eje X
    ganancias.forEach((ganancia, index) => {
        const altura = (ganancia / maxGanancia) * alto;
        const x = padding + ancho * index + ancho / 4;
        const y = canvas.height - padding - altura;
        
        // Barra
        ctx.fillStyle = 'darkgoldenrod';
        ctx.fillRect(x, y, ancho / 2, altura);
        
        // Etiqueta
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(mesesCortos[index], x + ancho / 4, canvas.height - padding + 20);
    });
}


