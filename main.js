// =========================================
// 1. SIDE PANEL GALLERY LOGIC
// =========================================
function openGallery(id) {
    const panel = document.getElementById(id);
    if (panel) {
        panel.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        alert("ERROR: The button is looking for '" + id + "', but the panel ID doesn't match.");
    }
}

function closeGallery(id) {
    const panel = document.getElementById(id);
    if (panel) {
        panel.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// =========================================
// 2. BULLETPROOF IMAGE ZOOM
// =========================================
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' && (e.target.classList.contains('project-img') || e.target.closest('.gallery-grid'))) {
        const imageModal = document.getElementById("image-modal");
        const expandedImg = document.getElementById("expanded-img");

        if (imageModal && expandedImg) {
            expandedImg.src = e.target.src; 
            imageModal.style.display = "block";
        }
    }
});

function closeImageModal() {
    const imageModal = document.getElementById("image-modal");
    if (imageModal) {
        imageModal.style.display = "none";
    }
}

// =========================================
// 3. FORM SUBMISSION FIX (Sends to Google Sheets)
// =========================================
const contactForm = document.getElementById('sheet-form'); 

// YOUR EXACT GOOGLE SCRIPT URL IS PLUGGED IN HERE:
const scriptURL = 'https://script.google.com/macros/s/AKfycbxgYJj3qz56K3DCdugx6bOCr1hMaRvFopx7Mt3gIpYnnwgoSqyQVBdlhOZJPc9ZUPle/exec';

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const submitBtn = document.querySelector('#sheet-form button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Sending...';
        submitBtn.style.opacity = '0.7';

        fetch(scriptURL, { method: 'POST', body: new FormData(contactForm)})
            .then(response => {
                submitBtn.innerText = 'Submitted!';
                submitBtn.style.background = '#6b7479c3'; 
                submitBtn.style.opacity = '1';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = ''; 
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                submitBtn.innerText = 'Error. Try Again.';
                submitBtn.style.background = '#dc3545'; 
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = ''; 
                    submitBtn.style.opacity = '1';
                }, 3000);
            });
    });
}

// =========================================
// 4. LIVE NAVBAR HIGHLIGHT
// =========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - section.clientHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active'); 
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active'); 
        }
    });
});