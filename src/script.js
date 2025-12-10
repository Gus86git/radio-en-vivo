// ================= CONFIGURACIÓN IMPORTANTE =================
// ¡REEMPLAZA ESTA URL CON LA DE TU STREAM REAL DE AUDIO!
// Ejemplo: 'https://tuserver.com:8000/live.mp3'
// Esta URL te la da tu servidor de streaming (Icecast/Shoutcast)
const STREAM_URL = 'https://radioclassique.ice.infomaniak.ch/radioclassique-high.mp3';
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volumeUpBtn = document.getElementById('volumeUp');
    const volumeDownBtn = document.getElementById('volumeDown');
    const volumeSlider = document.getElementById('volumeSlider');
    const statusEl = document.getElementById('status');
    const trackInfoEl = document.getElementById('trackInfo');
    const listenersEl = document.getElementById('listeners');
    const scheduleListEl = document.getElementById('scheduleList');
    const currentYearEl = document.getElementById('currentYear');
    
    // Configurar reproductor de audio
    audioPlayer.src = STREAM_URL;
    audioPlayer.volume = volumeSlider.value;
    console.log('Reproductor configurado con URL:', STREAM_URL);
    
    // ========== FUNCIONES DE CONTROL DEL REPRODUCTOR ==========
    
    // Reproducir
    playBtn.addEventListener('click', function() {
        audioPlayer.play().then(() => {
            updateStatus('Transmitiendo en Vivo', 'online');
            console.log('Reproduciendo stream de audio');
        }).catch(error => {
            console.error('Error al reproducir:', error);
            alert('❌ No se pudo conectar al stream de audio.\n\nPosibles causas:\n1. La URL del stream es incorrecta\n2. El servidor de streaming está caído\n3. Problemas de conexión a internet\n\nVerifica la URL en la línea 5 del archivo script.js');
            updateStatus('Error de Conexión', 'offline');
        });
    });
    
    // Pausar
    pauseBtn.addEventListener('click', function() {
        audioPlayer.pause();
        updateStatus('En Pausa', 'offline');
        console.log('Stream pausado');
    });
    
    // Control de volumen
    volumeUpBtn.addEventListener('click', function() {
        if (audioPlayer.volume < 1) {
            audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.1);
            volumeSlider.value = audioPlayer.volume;
            console.log('Volumen aumentado a:', audioPlayer.volume);
        }
    });
    
    volumeDownBtn.addEventListener('click', function() {
        if (audioPlayer.volume > 0) {
            audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.1);
            volumeSlider.value = audioPlayer.volume;
            console.log('Volumen disminuido a:', audioPlayer.volume);
        }
    });
    
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = this.value;
        console.log('Volumen cambiado a:', this.value);
    });
    
    // ========== FUNCIONES DE ACTUALIZACIÓN DE ESTADO ==========
    
    function updateStatus(text, className) {
        statusEl.textContent = `• Estado: ${text}`;
        statusEl.className = `status ${className}`;
    }
    
    // ========== SIMULACIÓN DE INFORMACIÓN EN VIVO ==========
    // (Para un proyecto real, reemplaza esto con una API real)
    
    function updateNowPlaying() {
        const shows = [
            { artist: 'DJ Rhythm', track: 'Morning Vibes Mix' },
            { artist: 'The Rock Band', track: 'Live Concert 2024' },
            { artist: 'Jazz Masters', track: 'Smooth Jazz Session' },
            { artist: 'Electro Pulse', track: 'Night Dance Party' },
            { artist: 'Chill Lounge', track: 'Relaxing Ambient Sounds' }
        ];
        
        const randomShow = shows[Math.floor(Math.random() * shows.length)];
        trackInfoEl.textContent = `${randomShow.track} - ${randomShow.artist}`;
        
        // Simular oyentes (aleatorio entre 50 y 1000)
        const randomListeners = Math.floor(Math.random() * 950) + 50;
        listenersEl.textContent = `👥 Oyentes en vivo: ${randomListeners}`;
        
        console.log('Información actualizada:', randomShow);
    }
    
    // ========== PROGRAMACIÓN DE LA RADIO ==========
    
    function loadSchedule() {
        const schedule = [
            { time: '06:00 - 09:00', program: 'Despertando Contigo', host: 'Ana López' },
            { time: '09:00 - 12:00', program: 'Música Sin Pausa', host: 'Carlos Martínez' },
            { time: '12:00 - 15:00', program: 'El Show del Mediodía', host: 'Laura Gómez' },
            { time: '15:00 - 18:00', program: 'Tarde de Éxitos', host: 'Pedro Ramírez' },
            { time: '18:00 - 21:00', program: 'Noche Electrónica', host: 'DJ Sonic' },
            { time: '21:00 - 00:00', program: 'Jazz Nocturno', host: 'Marta Chen' }
        ];
        
        scheduleListEl.innerHTML = '';
        schedule.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${item.time}</strong> - ${item.program} <em>(con ${item.host})</em>`;
            scheduleListEl.appendChild(li);
        });
    }
    
    // ========== INICIALIZACIÓN ==========
    
    function initializeRadio() {
        // Actualizar año en el footer
        currentYearEl.textContent = new Date().getFullYear();
        
        // Cargar programación
        loadSchedule();
        
        // Actualizar información cada 15 segundos
        updateNowPlaying();
        setInterval(updateNowPlaying, 15000);
        
        // Estado inicial
        updateStatus('Listo para Transmitir', 'offline');
        
        console.log('Radio inicializada correctamente');
        console.log('IMPORTANTE: Reemplaza STREAM_URL en la línea 5 con tu URL real');
    }
    
    // Inicializar cuando el DOM esté listo
    initializeRadio();
    
    // ========== DETECCIÓN DE ERRORES DE AUDIO ==========
    
    audioPlayer.addEventListener('error', function(e) {
        console.error('Error en el elemento de audio:', e);
        updateStatus('Error en el Stream', 'offline');
        alert('⚠️ Error cargando el stream de audio. Verifica la URL.');
    });
    
    audioPlayer.addEventListener('waiting', function() {
        updateStatus('Buffering...', 'offline');
        console.log('Buffering audio...');
    });
    
    audioPlayer.addEventListener('playing', function() {
        updateStatus('Transmitiendo en Vivo', 'online');
        console.log('Audio playing smoothly');
    });

});







