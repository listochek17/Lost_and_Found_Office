// =========================================
// 1. THEME SWITCHER (UI ONLY)
// =========================================

document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.getElementById('themeBtn');
    if (!themeBtn) return;

    const body = document.body;
    const icon = themeBtn.querySelector('i');
    if (!icon) return;

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
});

// =========================================
// 2. SIMPLE LANGUAGE BUTTON LABEL (NO I18N LOGIC)
// =========================================

function changeLanguage(lang) {
    const langBtn = document.getElementById('currentLang');
    if (langBtn) langBtn.innerText = lang.toUpperCase();
}

// =========================================
// 3. DROPDOWN MENUS (HEADER)
// =========================================

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    const langMenu = document.getElementById('langMenu');
    if (profileMenu) profileMenu.classList.toggle('show');
    if (langMenu) langMenu.classList.remove('show');
}

function toggleLangMenu() {
    const langMenu = document.getElementById('langMenu');
    const profileMenu = document.getElementById('profileMenu');
    if (langMenu) langMenu.classList.toggle('show');
    if (profileMenu) profileMenu.classList.remove('show');
}

// Close menus when clicking outside
window.addEventListener('click', function (event) {
    if (!event.target.closest('.profile-dropdown') && !event.target.closest('.lang-dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(el => el.classList.remove('show'));
    }
    // also close category dropdown if clicked outside
    if (!event.target.closest('.cat-dropdown')) {
        document.querySelectorAll('.cat-dropdown-list').forEach(el => el.classList.remove('show'));
    }
});

// CATEGORY DROPDOWN (hero filter / navigation)
function toggleCatDropdown() {
    const list = document.getElementById('catDropdownList');
    if (list) list.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function () {
    const catBtn = document.getElementById('catDropdownBtn');
    if (catBtn) {
        catBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleCatDropdown();
        });
    }

    const items = document.querySelectorAll('.cat-dropdown-list li');
    items.forEach(li => {
        li.addEventListener('click', function () {
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const cat = this.dataset.value;
            // on index redirect to home with parameter
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ) {
                window.location.href = 'home.html?cat=' + cat;
            } else {
                // simple filter placeholder
                console.log('filter by category', cat);
            }
        });
    });
});

// =========================================
// 4. TAB SWITCHING (MAIN PAGE & PROFILE)
// =========================================

// Main page toggle (found / lost) – UI only
function switchTab(type, btn) {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

// Profile page tabs (settings / my-ads)
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));

    const tabContent = document.getElementById('tab-' + tabName);
    if (tabContent) tabContent.style.display = 'block';

    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// =========================================
// 5. PASSWORD VISIBILITY TOGGLE (AUTH FORMS)
// =========================================

document.addEventListener("DOMContentLoaded", function () {
    const toggleIcons = document.querySelectorAll('.toggle-password');
    toggleIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const input = this.closest('.input-group')?.querySelector('input');
            if (!input) return;

            if (input.type === "password") {
                input.type = "text";
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = "password";
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
});

// =========================================
// 6. PRODUCT PAGE GALLERY (UI ONLY)
// =========================================

const productImages = [
    "https://placehold.co/600x600/png?text=iPhone+Main",
    "https://placehold.co/600x600/png?text=Side+View",
    "https://placehold.co/600x600/png?text=Back+View",
    "https://placehold.co/600x600/png?text=Box"
];

let currentImageIndex = 0;

function selectImage(index) {
    currentImageIndex = index;
    updateGallery();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % productImages.length;
    updateGallery();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    updateGallery();
}

function updateGallery() {
    const mainImg = document.getElementById('mainImg');
    const thumbs = document.querySelectorAll('.thumb');

    if (mainImg) {
        mainImg.src = productImages[currentImageIndex];
    }

    thumbs.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// =========================================
// 7. UPLOAD CARD – FILE INPUT UI
// =========================================

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const uploadBox = document.getElementById('uploadBox');

    if (!fileInput || !uploadBox) return;

    fileInput.addEventListener('change', function () {
        if (this.files.length === 0) return;

        const count = this.files.length;
        const titleEl = uploadBox.querySelector('.upload-title');
        const descEl = uploadBox.querySelector('.upload-desc');

        if (titleEl) titleEl.innerText = `Выбрано файлов: ${count}`;
        if (descEl) descEl.innerText = "Нажмите, чтобы изменить";
        uploadBox.style.borderColor = "#1877F2";
        uploadBox.style.background = "#f0f7ff";
    });
});

// =========================================
// 8. CARD VIEW NAVIGATION (CATALOG → PRODUCT PAGE)
// =========================================

function cardView(cardId) {
    window.location.href = 'card-view.html';
}

// =========================================
// 9. FORM FLOW MOCKS (CLICKABLE PROTOTYPE)
// =========================================

document.addEventListener('DOMContentLoaded', function () {
    // Login mock: redirect to home on "login"
    const loginBtn = document.getElementById('login-submit-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'home.html';
        });
    }

    // Register mock: go to OTP
    const registerBtn = document.getElementById('register-submit-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'OTP.html';
        });
    }

    // OTP mock: only "1234" passes
    const otpBtn = document.getElementById('otp-confirm-btn');
    const otpInput = document.getElementById('otpInput');
    if (otpBtn && otpInput) {
        otpBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const code = otpInput.value.trim();
            if (code === '1234') {
                window.location.href = 'home.html';
            } else {
                alert('Неверный код. Введите 1234');
            }
        });
    }
});

