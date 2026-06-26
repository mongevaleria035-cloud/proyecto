// Función externa y segura para conectar con Supabase
async function guardarPuntajeEnBD(nombreJugador, puntajeFinal) {
try {
// Verificamos primero si Supabase está cargado y disponible en internet
if (typeof supabase === 'undefined') {
console.warn("Supabase no está disponible (posiblemente estás en Modo Avión). El puntaje se queda en modo local.");
return;
}

console.log("Intentando conectar con Supabase para guardar...", nombreJugador, puntajeFinal);

const { data, error } = await supabase
.from('puntajes')
.insert([
{ nombre: nombreJugador, puntaje: parseInt(puntajeFinal) }
 ]);

if (error) {
console.error('Error al guardar en la tabla de Supabase:', error);
} else {
console.log('¡Espectacular! Puntaje guardado con éxito en la nube.');
}
} catch (err) {
console.error('Se produjo un error de red o conexión:', err);
}
}
