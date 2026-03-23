document.addEventListener("DOMContentLoaded", () => {
    
    // --- 0. Loading Screen Logic ---
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.getElementById('loading-progress');
    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5; 
        if (progress >= 100) {
            progress = 100;
            loadingProgress.innerText = `LOADING... ${progress}%`;
            clearInterval(loadingInterval);
            
            // Waktu tunggu diubah jadi 800ms
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                document.body.classList.add('loaded');
            }, 800);
        } else {
            loadingProgress.innerText = `LOADING... ${progress}%`;
        }
    }, 120);

    // --- 1. Animasi Buka Undangan, Video Sync, AUDIO & Partikel ---
    const btnOpen = document.getElementById('open-invitation');
    const coverSection = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const body = document.body;
    
    const bgVideo = document.getElementById('bg-video');
    const galleryVideo = document.getElementById('gallery-video');
    const bgMusic = document.getElementById('bg-music');
    const musicControl = document.getElementById('music-control');
    let isPlaying = false;

    btnOpen.addEventListener('click', () => {
        mainContent.classList.remove('hidden');
        coverSection.classList.add('slide-up-out');
        
        bgVideo.play().catch(error => console.log("Bg video error:", error));
        galleryVideo.play().catch(error => console.log("Gallery video error:", error));
        galleryVideo.currentTime = bgVideo.currentTime;
        
        bgMusic.play().then(() => {
            isPlaying = true;
            musicControl.classList.add('visible');
            musicControl.classList.add('playing');
        }).catch(error => {
            musicControl.classList.add('visible'); 
        });

        body.classList.remove('locked-scroll');

        // Mengaktifkan Floating Particles (Animasi Gelembung Emas melayang)
        document.getElementById('particles-container').classList.add('active');
        createFloatingParticles();

        setTimeout(() => {
            coverSection.style.display = 'none';
        }, 1200);
    });

    // --- 2. Floating Background Particles Generator ---
    function createFloatingParticles() {
        const container = document.getElementById('particles-container');
        for (let i = 0; i < 25; i++) {
            let particle = document.createElement('div');
            particle.classList.add('floating-particle');
            let size = Math.random() * 8 + 4; // Ukuran random 4-12px
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = Math.random() * 6 + 6 + 's'; // Kecepatan melayang 6-12s
            particle.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(particle);
        }
    }

    // --- 3. Scroll Animations (Intersection Observer) ---
    // Memunculkan elemen ketika di-scroll masuk layar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 }); // Memicu ketika 15% elemen terlihat di layar

    document.querySelectorAll('.fade-scroll').forEach(el => observer.observe(el));

    // --- 4. Interactive Touch/Hover Sparkles ---
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle-trail');
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        document.body.appendChild(sparkle);
        
        // Hapus elemen setelah animasinya selesai (1 detik)
        setTimeout(() => sparkle.remove(), 1000);
    }
    
    // Untuk Mouse / Laptop
    document.addEventListener('mousemove', (e) => {
        // Beri sedikit jeda matematika agar DOM tidak berat jika terlalu cepat
        if(Math.random() > 0.5) createSparkle(e.clientX, e.clientY);
    });

    // Untuk Layar Sentuh / Handphone
    document.addEventListener('touchmove', (e) => {
        for(let i = 0; i < e.touches.length; i++) {
            if(Math.random() > 0.5) createSparkle(e.touches[i].clientX, e.touches[i].clientY);
        }
    });

    // --- 5. Tombol Music Control ---
    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicControl.classList.remove('playing');
        } else {
            bgMusic.play();
            musicControl.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // --- 6. Dual Countdown Timer Logic ---
    const targetPemberkatan = new Date("Jul 5, 2026 12:30:00").getTime();
    const targetResepsi = new Date("Jul 5, 2026 16:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();

        const distPemberkatan = targetPemberkatan - now;
        if (distPemberkatan >= 0) {
            document.getElementById("days-pemberkatan").innerHTML = String(Math.floor(distPemberkatan / (1000 * 60 * 60 * 24))).padStart(2, '0');
            document.getElementById("hours-pemberkatan").innerHTML = String(Math.floor((distPemberkatan % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById("minutes-pemberkatan").innerHTML = String(Math.floor((distPemberkatan % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById("seconds-pemberkatan").innerHTML = String(Math.floor((distPemberkatan % (1000 * 60)) / 1000)).padStart(2, '0');
        } else {
            document.getElementById("days-pemberkatan").parentElement.parentElement.innerHTML = "<h4 style='color:var(--gold);'>Selesai</h4>";
        }

        const distResepsi = targetResepsi - now;
        if (distResepsi >= 0) {
            document.getElementById("days-resepsi").innerHTML = String(Math.floor(distResepsi / (1000 * 60 * 60 * 24))).padStart(2, '0');
            document.getElementById("hours-resepsi").innerHTML = String(Math.floor((distResepsi % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById("minutes-resepsi").innerHTML = String(Math.floor((distResepsi % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById("seconds-resepsi").innerHTML = String(Math.floor((distResepsi % (1000 * 60)) / 1000)).padStart(2, '0');
        } else {
            document.getElementById("days-resepsi").parentElement.parentElement.innerHTML = "<h4 style='color:var(--gold);'>Selesai</h4>";
        }

        if (distPemberkatan < 0 && distResepsi < 0) clearInterval(timer);
    }, 1000);

    // --- 7. Slideshow Wishes Logic ---
    const wishesTrack = document.getElementById('wishes-track');
    let slides = document.querySelectorAll('.wish-slide');
    let currentIndex = 0;
    let slideInterval;

    function moveToNextSlide() {
        if (slides.length <= 1) return;
        currentIndex++;
        if (currentIndex >= slides.length) currentIndex = 0;
        wishesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startSlider() { slideInterval = setInterval(moveToNextSlide, 3500); }
    startSlider();

    // --- 8. Form Submission Logic ---
    const wishesForm = document.getElementById('wishes-form');
    wishesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sender-name').value;
        const message = document.getElementById('sender-message').value;

        const newSlide = document.createElement('div');
        newSlide.classList.add('wish-slide');
        newSlide.innerHTML = `<h4>${name}</h4><p>"${message}"</p>`;

        wishesTrack.appendChild(newSlide);
        slides = document.querySelectorAll('.wish-slide');
        currentIndex = slides.length - 1;
        wishesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        clearInterval(slideInterval);
        startSlider();
        wishesForm.reset();
    });

    // --- 9. Copy Rekening Logic ---
    window.copyRekening = function(elementId) {
        const rekElement = document.getElementById(elementId);
        navigator.clipboard.writeText(rekElement.innerText).then(() => {
            alert('Nomor rekening berhasil disalin: ' + rekElement.innerText);
        }).catch(err => alert('Gagal menyalin nomor rekening.'));
    };

    // --- 10. Lightbox Gallery Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const zoomableImages = document.querySelectorAll('.zoomable');
    const closeLightboxBtn = document.querySelector('.lightbox-close');

    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.remove('hidden');
            lightboxImg.src = img.src; 
        });
    });

    const closeLightbox = () => { lightbox.classList.add('hidden'); lightboxImg.src = ''; };
    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
});
