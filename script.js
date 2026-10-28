// ==================== DOM ELEMENTS ====================
const hamburgerMenu = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const dropdowns = document.querySelectorAll('.dropdown');
const cartIcon = document.querySelector('.cart-icon');
const cartBadge = document.getElementById('cartBadge');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeToggleIcon = document.getElementById('themeToggleIcon');

// ==================== THEME MANAGEMENT (LIGHT / DARK MODE) ====================
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('kh_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
}

function applyTheme(theme, animate = false) {
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-theme', isDark);

    if (themeToggleIcon) {
        if (animate && themeToggleBtn) {
            themeToggleBtn.classList.add('theme-animating');
            setTimeout(() => {
                themeToggleBtn.classList.remove('theme-animating');
            }, 400);
        }

        if (isDark) {
            themeToggleIcon.className = 'fa-solid fa-sun';
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
                themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
            }
        } else {
            themeToggleIcon.className = 'fa-solid fa-moon';
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
                themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
            }
        }
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('kh_theme', newTheme);
    applyTheme(newTheme, true);

    if (typeof showNotification === 'function') {
        showNotification(newTheme === 'dark' ? '🌙 Switched to Dark Mode' : '☀️ Switched to Light Mode');
    }
}

// Make toggleTheme accessible globally
window.toggleTheme = toggleTheme;

// Apply theme on initial script execution
applyTheme(getPreferredTheme());

// Bind click event to theme toggle button
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
    });
}

// Listen to system OS preference changes if user hasn't explicitly set preference
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('kh_theme')) {
            applyTheme(e.matches ? 'dark' : 'light', true);
        }
    });
}

// ==================== MULTI-LANGUAGE SYSTEM (ENGLISH & KHMER) ====================
const translations = {
    en: {
        nav_home: 'Home',
        nav_products: 'Products',
        nav_brands: 'Brands',
        nav_deals: 'Deals',
        nav_about: 'About',
        nav_contact: 'Contact',
        nav_admin: 'Admin',
        cat_ultrabooks: 'Ultrabooks',
        cat_gaming: 'Gaming Laptops',
        cat_business: 'Business Laptops',
        cat_2in1: '2-in-1 Laptops',
        cat_student: 'Student Laptops',
        cat_workstation: 'Workstations',
        hero_tag: 'NEXT GENERATION TECH',
        hero_title: 'Smarter Devices.<br><span class="hero-title-accent">Limitless Power.</span>',
        hero_desc: 'Discover innovative electronics and groundbreaking dual-screen performance engineered to power your life, work, and play without limits.',
        hero_shop_now: 'Shop Now',
        hero_explore: 'Explore Models',
        section_category: 'SHOP BY CATEGORY',
        pop_title: 'POPULAR LAPTOPS',
        pop_view_all: 'VIEW ALL PRODUCTS',
        featured_title: 'Featured Laptops',
        featured_sub: 'Discover our premium collection of high-performance laptops',
        filter_all: 'All',
        filter_ultrabook: 'Ultrabooks',
        filter_gaming: 'Gaming',
        filter_business: 'Business',
        filter_2in1: '2-in-1',
        filter_student: 'Student',
        filter_workstation: 'Workstations',
        btn_add_cart: 'Add to Cart',
        btn_buy_now: 'Buy Now',
        toast_en: '🇬🇧 Switched to English',
        toast_kh: '🇰🇭 បានប្តូរទៅជា ភាសាខ្មែរ'
    },
    kh: {
        nav_home: 'ទំព័រដើម',
        nav_products: 'ផលិតផល',
        nav_brands: 'ម៉ាកយីហោ',
        nav_deals: 'ប្រូម៉ូសិន',
        nav_about: 'អំពីយើង',
        nav_contact: 'ទំនាក់ទំនង',
        nav_admin: 'អ្នកគ្រប់គ្រង',
        cat_ultrabooks: 'Ultrabooks (ស្តើង ស្រាល)',
        cat_gaming: 'Gaming (លេងហ្គេម)',
        cat_business: 'Business (ការងារ)',
        cat_2in1: '2-in-1 (បត់បាន)',
        cat_student: 'Student (សិស្ស/និស្សិត)',
        cat_workstation: 'Workstations (ជំនាញធ្ងន់ៗ)',
        hero_tag: 'បច្ចេកវិទ្យាជំនាន់ថ្មី',
        hero_title: 'ឧបករណ៍ឆ្លាតវៃជាងមុន។<br><span class="hero-title-accent">ថាមពលគ្មានដែនកំណត់។</span>',
        hero_desc: 'ស្វែងរកឧបករណ៍អេឡិចត្រូនិកទំនើប និងប្រសិទ្ធភាពអេក្រង់ភ្លោះដ៏អស្ចារ្យ ដែលរចនាឡើងដើម្បីពង្រឹងជីវិត ការងារ និងការកម្សាន្តរបស់អ្នកដោយគ្មានដែនកំណត់។',
        hero_shop_now: 'ទិញឥឡូវនេះ',
        hero_explore: 'ស្វែងរកម៉ូឌែល',
        section_category: 'ជ្រើសរើសតាមប្រភេទ',
        pop_title: 'កុំព្យូទ័រពេញនិយមបំផុត',
        pop_view_all: 'មើលផលិតផលទាំងអស់',
        featured_title: 'កុំព្យូទ័រឆ្នើមៗ',
        featured_sub: 'ស្វែងរកការប្រមូលផ្តុំកុំព្យូទ័រយួរដៃលំដាប់ខ្ពស់ និងមានសមត្ថភាពខ្លាំងក្លា',
        filter_all: 'ទាំងអស់',
        filter_ultrabook: 'Ultrabooks',
        filter_gaming: 'លេងហ្គេម',
        filter_business: 'ការងារ',
        filter_2in1: '2-in-1',
        filter_student: 'សិស្ស/និស្សិត',
        filter_workstation: 'Workstations',
        btn_add_cart: 'ដាក់ចូលកន្ត្រក',
        btn_buy_now: 'ទិញភ្លាមៗ',
        toast_en: '🇬🇧 Switched to English',
        toast_kh: '🇰🇭 បានប្តូរទៅជា ភាសាខ្មែរ'
    }
};

function getPreferredLanguage() {
    return localStorage.getItem('kh_language') || 'en';
}

function applyLanguage(lang) {
    if (lang !== 'en' && lang !== 'kh') lang = 'en';
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'kh' ? 'km' : 'en');

    // Update active state on toggle buttons
    const btnEn = document.getElementById('langBtnEn');
    const btnKh = document.getElementById('langBtnKh');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');
    if (btnKh) btnKh.classList.toggle('active', lang === 'kh');

    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            const arrow = el.querySelector('.dropdown-arrow');
            if (arrow) {
                el.innerHTML = dict[key] + ' <span class="dropdown-arrow">▼</span>';
            } else if (dict[key].includes('<')) {
                el.innerHTML = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });

    // Update Add to Cart buttons inside product cards
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.textContent = dict.btn_add_cart;
    });
}

function setLanguage(lang, showToast = true) {
    if (lang !== 'en' && lang !== 'kh') lang = 'en';
    localStorage.setItem('kh_language', lang);
    applyLanguage(lang);
    if (showToast && typeof showNotification === 'function') {
        showNotification(lang === 'kh' ? translations.kh.toast_kh : translations.en.toast_en, 2500);
    }
}

function toggleLanguage() {
    const current = getPreferredLanguage();
    setLanguage(current === 'en' ? 'kh' : 'en', true);
}

// Global exposure
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
window.applyLanguage = applyLanguage;

// Initial application
applyLanguage(getPreferredLanguage());

// ==================== SECTION NAVIGATION & SMOOTH SCROLL ====================
// Keep all sections visible and smoothly scroll to the selected section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const nav = document.querySelector('.navbar');
                const navHeight = nav ? nav.offsetHeight : 70;
                const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
                window.scrollTo({ top, behavior: 'smooth' });

                // Update active state in navMenu
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Close mobile menu if open
                if (hamburgerMenu && hamburgerMenu.classList.contains('active')) {
                    hamburgerMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        }
    });
});

// ==================== HAMBURGER MENU TOGGLE ====================
hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ==================== CLOSE MENU ON LINK CLICK ====================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Check if it's a dropdown toggle
        if (!link.classList.contains('dropdown-toggle')) {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ==================== DROPDOWN MENU TOGGLE (MOBILE) ====================
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
        // Only handle dropdown on mobile screens
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
    });
});

// ==================== CLOSE MOBILE MENU ON OUTSIDE CLICK ====================
document.addEventListener('click', (e) => {
    const isClickInsideNav = document.querySelector('.navbar').contains(e.target);
    
    if (!isClickInsideNav) {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 0) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ==================== SEARCH FUNCTIONALITY ====================
document.querySelector('.search-icon').addEventListener('click', (e) => {
    e.preventDefault();
    openSearchModal();
});

function openSearchModal() {
    const searchQuery = prompt('Search for laptops (name, category, or keyword):');
    if (searchQuery !== null) {
        console.log('Searching for:', searchQuery);
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery.length === 0) {
            showNotification('Please enter a search term.', 'info');
            return;
        }
        searchProducts(trimmedQuery);
    }
}

function searchProducts(query) {
    const normalizedQuery = query.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    let matches = 0;

    cards.forEach(card => {
        const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
        const category = card.getAttribute('data-category')?.toLowerCase() || '';
        const price = card.querySelector('.current-price')?.textContent.toLowerCase() || '';

        const isMatch = name.includes(normalizedQuery)
            || description.includes(normalizedQuery)
            || category.includes(normalizedQuery)
            || price.includes(normalizedQuery);

        if (isMatch) {
            card.classList.remove('hidden');
            matches += 1;
        } else {
            card.classList.add('hidden');
        }
    });

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');

    if (matches > 0) {
        showNotification(`Found ${matches} product${matches === 1 ? '' : 's'} for "${query}"`, 'success');
    } else {
        showNotification(`No products found for "${query}".`, 'error');
    }

    const productsSection = document.getElementById('products');
    if (productsSection) {
        const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 70;
        const top = productsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

// ==================== SHOPPING CART FUNCTIONALITY ====================
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
updateCartBadge();

function addProductToCart(productId) {
    const list = (typeof allProducts !== 'undefined' && allProducts.length > 0) ? allProducts : defaultProducts;
    let product = list.find(p => p.id == productId);
    if (!product && typeof defaultProducts !== 'undefined') {
        product = defaultProducts.find(p => p.id == productId);
    }
    if (!product && typeof popularProducts !== 'undefined') {
        product = popularProducts.find(p => p.id == productId);
    }
    if (!product && typeof categoryFlagshipProducts !== 'undefined') {
        product = Object.values(categoryFlagshipProducts).find(p => p.id == productId);
    }
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id == productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', cartCount);
    updateCartBadge();

    if (typeof showNotification === 'function') {
        showNotification(`Added ${product.name} to cart! 🛒`);
    }
}
window.addProductToCart = addProductToCart;

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

function openCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartModal = document.getElementById('cartModal');
    const cartModalBody = document.getElementById('cartModalBody');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartModalBody.innerHTML = '<div class="empty-cart-msg">Your cart is empty. Add a laptop to get started!</div>';
        cartTotal.textContent = '0';
    } else {
        let total = 0;
        let html = '';

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item-row">
                    <div class="cart-item-row-info">
                        <span class="cart-item-row-name">${item.name}</span>
                        <span class="cart-item-row-details">$${item.price} each</span>
                    </div>
                    <div class="cart-item-row-actions">
                        <div class="cart-qty-control">
                            <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                            <span class="cart-qty-display">${item.quantity}</span>
                            <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <div class="cart-item-price">$${itemTotal}</div>
                        <button class="cart-remove-btn" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
                    </div>
                </div>
            `;
        });

        cartModalBody.innerHTML = html;
        cartTotal.textContent = total.toFixed(2);
    }

    cartModal.classList.add('active');
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);

    if (item) {
        cart = cart.filter(p => p.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));

        cartCount = Math.max(0, cartCount - item.quantity);
        localStorage.setItem('cartCount', cartCount);
        updateCartBadge();

        showNotification(`${item.name} removed from cart`);
        openCart();
    }
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        cartCount = cart.reduce((sum, p) => sum + p.quantity, 0);
        localStorage.setItem('cartCount', cartCount);
        updateCartBadge();

        openCart();
    }
}

// ==================== TELEGRAM BOTFATHER CONFIGURATION ====================
// 👉 PASTE YOUR BOTFATHER BOT TOKEN AND YOUR CHAT ID HERE:
const DEFAULT_TELEGRAM_BOT_TOKEN = '8766120266:AAFDlCm0_pKAZr1vTkrlaaqzE4rP2A2stgs'; // Bot: @kh_computer007_bot
const DEFAULT_TELEGRAM_CHAT_ID = '1116505751';                                      // Chat ID of JangWuJi007
const DEFAULT_TELEGRAM_USERNAME = 'JangWuJi007';                                    // Telegram username without @

function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart || cart.length === 0) {
        showNotification('Your cart is empty! Add a laptop before checking out.', 3000);
        return;
    }

    closeCartModal();
    openCheckoutModal();
}

function openCheckoutModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutModal = document.getElementById('checkoutModal');
    const itemsList = document.getElementById('checkoutItemsList');
    const totalEl = document.getElementById('checkoutTotal');
    const itemsCountEl = document.getElementById('checkoutItemsCount');

    if (!checkoutModal) return;

    let total = 0;
    let totalItems = 0;
    let html = '';

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        total += itemSubtotal;
        totalItems += item.quantity;
        html += `
            <div class="checkout-item-line">
                <div>
                    <span class="checkout-item-name">${item.name}</span>
                    <span class="checkout-item-qty">× ${item.quantity}</span>
                </div>
                <div class="checkout-item-price">$${itemSubtotal.toFixed(2)}</div>
            </div>
        `;
    });

    if (itemsList) itemsList.innerHTML = html;
    if (totalEl) totalEl.textContent = total.toFixed(2);
    if (itemsCountEl) itemsCountEl.textContent = `${totalItems} item${totalItems > 1 ? 's' : ''}`;

    // Autofill name if user is logged in
    const currentUser = getCurrentUser();
    const nameInput = document.getElementById('orderCustomerName');
    if (currentUser && currentUser.name && nameInput && !nameInput.value) {
        nameInput.value = currentUser.name;
    }

    // Load saved Telegram settings or fallback to defaults
    const savedBotToken = localStorage.getItem('kh_tg_bot_token') || DEFAULT_TELEGRAM_BOT_TOKEN || '';
    const savedChatId = localStorage.getItem('kh_tg_chat_id') || DEFAULT_TELEGRAM_CHAT_ID || '';
    const savedUsername = localStorage.getItem('kh_tg_username') || DEFAULT_TELEGRAM_USERNAME || 'JangWuJi007';

    const tokenInput = document.getElementById('tgBotToken');
    const chatIdInput = document.getElementById('tgChatId');
    const usernameInput = document.getElementById('tgUsernameTarget');

    if (tokenInput) tokenInput.value = savedBotToken;
    if (chatIdInput) chatIdInput.value = savedChatId;
    if (usernameInput) usernameInput.value = savedUsername;

    checkoutModal.classList.add('active');

    // Initialize payment QR code display based on selected method
    handlePaymentMethodChange();
}

function handlePaymentMethodChange() {
    const paymentSelect = document.getElementById('orderPaymentMethod');
    const qrSection = document.getElementById('paymentQrSection');
    const qrAmountDisplay = document.getElementById('khqrAmountDisplay');
    const qrImage = document.getElementById('khqrImage');
    const bankTitle = document.getElementById('khqrBankTitle');
    const accountNum = document.getElementById('khqrAccountNum');

    if (!paymentSelect || !qrSection) return;

    const method = paymentSelect.value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (method === 'ABA Pay / KHQR') {
        qrSection.style.display = 'flex';
        if (bankTitle) bankTitle.textContent = 'ABA BANK';
        if (accountNum) accountNum.textContent = '017 830 021 (ABA)';
        if (qrAmountDisplay) qrAmountDisplay.textContent = `$${total.toFixed(2)}`;

        const customQr = localStorage.getItem('kh_custom_qr');
        if (customQr && qrImage) {
            qrImage.src = customQr;
        } else if (qrImage) {
            // High resolution dynamic QR code for ABA Pay / Bakong KHQR
            const qrPayload = `https://link.payway.com.kh/aba?id=1116505751&account=017830021&amount=${total.toFixed(2)}&name=SAR%20CHANRITHY`;
            qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrPayload)}`;
        }
    } else if (method === 'Wing / TrueMoney') {
        qrSection.style.display = 'flex';
        if (bankTitle) bankTitle.textContent = 'WING / TRUEMONEY';
        if (accountNum) accountNum.textContent = '017 830 021 (Wing/True)';
        if (qrAmountDisplay) qrAmountDisplay.textContent = `$${total.toFixed(2)}`;
        if (qrImage) {
            qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent('WING_TRUEMONEY_017830021_USD_' + total.toFixed(2))}`;
        }
    } else if (method === 'Bank Transfer') {
        qrSection.style.display = 'flex';
        if (bankTitle) bankTitle.textContent = 'BANK TRANSFER';
        if (accountNum) accountNum.textContent = '017 830 021 (Sar Chanrithy)';
        if (qrAmountDisplay) qrAmountDisplay.textContent = `$${total.toFixed(2)}`;
        if (qrImage) {
            qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent('BANK_TRANSFER_017830021_USD_' + total.toFixed(2))}`;
        }
    } else {
        // Cash on Delivery (COD) -> hide QR
        qrSection.style.display = 'none';
    }
}

function handleCustomQrUpload(event) {
    const file = event.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        localStorage.setItem('kh_custom_qr', dataUrl);
        const qrImage = document.getElementById('khqrImage');
        if (qrImage) qrImage.src = dataUrl;
        showNotification('Custom ABA QR code applied! 👍', 3000);
    };
    reader.readAsDataURL(file);
}

function resetDefaultQr() {
    localStorage.removeItem('kh_custom_qr');
    handlePaymentMethodChange();
    showNotification('Reset to auto-generated QR code.', 2500);
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) checkoutModal.classList.remove('active');
}

function backToCart() {
    closeCheckoutModal();
    openCart();
}

function toggleTelegramSettings() {
    const box = document.getElementById('telegramSettingsBox');
    const arrow = document.getElementById('tgSettingsArrow');
    if (!box) return;
    const isHidden = box.style.display === 'none' || !box.style.display;
    box.style.display = isHidden ? 'flex' : 'none';
    if (arrow) arrow.textContent = isHidden ? '▲' : '▼';
}

function saveTelegramConfig() {
    const botToken = document.getElementById('tgBotToken')?.value.trim() || '';
    const chatId = document.getElementById('tgChatId')?.value.trim() || '';
    const username = document.getElementById('tgUsernameTarget')?.value.trim() || DEFAULT_TELEGRAM_USERNAME;

    localStorage.setItem('kh_tg_bot_token', botToken);
    localStorage.setItem('kh_tg_chat_id', chatId);
    localStorage.setItem('kh_tg_username', username);

    showNotification('Telegram Bot settings saved successfully! 👍', 3000);
}

function submitOrderToTelegram(e) {
    if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
    }

    try {
        const name = document.getElementById('orderCustomerName')?.value.trim();
        const phone = document.getElementById('orderCustomerPhone')?.value.trim();
        const address = document.getElementById('orderCustomerAddress')?.value.trim();
        const payment = document.getElementById('orderPaymentMethod')?.value || 'Cash on Delivery (COD)';
        const note = document.getElementById('orderCustomerNote')?.value.trim() || 'None';

        if (!name || !phone || !address) {
            showNotification('Please fill in Name, Phone, and Address!', 3000);
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!cart || cart.length === 0) {
            showNotification('Your cart is empty!', 3000);
            closeCheckoutModal();
            return;
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const now = new Date();
        const orderId = `KH-${Math.floor(100000 + Math.random() * 900000)}`;

        // Format Cambodia Time
        const cambodiaTime = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }) + ', ' + now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }) + ' (Cambodia Time)';

        // Total quantity of items
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

        // 1. Build list of items purchased
        let itemsTextHTML = '';
        let itemsTextPlain = '';
        cart.forEach(item => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            itemsTextHTML += `• <b>${escapeHtml(item.name)}</b> × ${item.quantity} ($${itemTotal})\n`;
            itemsTextPlain += `• ${item.name} × ${item.quantity} ($${itemTotal})\n`;
        });

        // 2. HTML formatted message for BotFather Telegram Bot API (Matches user's Book-store screenshot style)
        const orderMessageHTML = 
`🛍️ <b>NEW ORDER RECEIVED! — KH Computer Store</b>
━━━━━━━━━━━━━━━━━━━━
📦 <b>Order Number:</b> <code>#KHC-${orderId.replace('KH-', '')}</code>
👤 <b>Full Name:</b> ${escapeHtml(name)}
📞 <b>Phone Number:</b> <code>${escapeHtml(phone)}</code>
📍 <b>Address:</b> ${escapeHtml(address)}
💳 <b>Payment:</b> ${escapeHtml(payment)}
${note && note !== 'None' ? `📝 <b>Note:</b> ${escapeHtml(note)}\n` : ''}
💻 <b>ITEMS ORDERED (${totalQty}):</b>
${itemsTextHTML}
━━━━━━━━━━━━━━━━━━━━
💰 <b>Subtotal:</b> $${total.toFixed(2)}
🚚 <b>Shipping:</b> Free Shipping ($0.00)
💵 <b>TOTAL AMOUNT:</b> <b>$${total.toFixed(2)}</b>
⏰ <b>Time:</b> ${cambodiaTime}
━━━━━━━━━━━━━━━━━━━━
✅ <i>Please contact customer to confirm delivery!</i>`;

        // 3. Plain text format for Direct Telegram Web/App Link
        const orderMessagePlain = 
`🛍️ NEW ORDER RECEIVED! — KH Computer Store
━━━━━━━━━━━━━━━━━━━━
📦 Order Number: #KHC-${orderId.replace('KH-', '')}
👤 Full Name: ${name}
📞 Phone Number: ${phone}
📍 Address: ${address}
💳 Payment: ${payment}
${note && note !== 'None' ? `📝 Note: ${note}\n` : ''}
💻 ITEMS ORDERED (${totalQty}):
${itemsTextPlain}
━━━━━━━━━━━━━━━━━━━━
💰 Subtotal: $${total.toFixed(2)}
🚚 Shipping: Free Shipping ($0.00)
💵 TOTAL AMOUNT: $${total.toFixed(2)}
⏰ Time: ${cambodiaTime}
━━━━━━━━━━━━━━━━━━━━
✅ Please contact customer to confirm delivery!`;

        // 4. Send via BotFather Telegram Bot API
        const botToken = (document.getElementById('tgBotToken')?.value || localStorage.getItem('kh_tg_bot_token') || DEFAULT_TELEGRAM_BOT_TOKEN || '').trim();
        const chatId = (document.getElementById('tgChatId')?.value || localStorage.getItem('kh_tg_chat_id') || DEFAULT_TELEGRAM_CHAT_ID || '').trim();

        if (botToken && chatId) {
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: orderMessageHTML,
                    parse_mode: 'HTML'
                })
            })
            .then(res => res.json())
            .then(result => {
                if (result.ok) {
                    console.log('✅ Telegram Bot received order:', result);
                } else {
                    console.error('❌ Telegram Bot Error:', result.description);
                }
            })
            .catch(err => {
                console.warn('Telegram Bot API network issue:', err);
            });
        }

        // 5. Open Direct Telegram chat with seller
        const targetUsername = (document.getElementById('tgUsernameTarget')?.value || localStorage.getItem('kh_tg_username') || DEFAULT_TELEGRAM_USERNAME).trim().replace('@', '');
        const telegramDirectUrl = `https://t.me/${targetUsername}?text=${encodeURIComponent(orderMessagePlain)}`;

        try {
            window.open(telegramDirectUrl, '_blank');
        } catch (e) {
            console.warn('Could not open new window automatically:', e);
        }

        // Update reopen button and order badge on Order Success modal
        const reopenBtn = document.getElementById('reopenTelegramBtn');
        if (reopenBtn) reopenBtn.href = telegramDirectUrl;

        const idBadge = document.getElementById('successOrderIdBadge');
        if (idBadge) idBadge.textContent = `Order #${orderId}`;

        // Save order to kh_orders for Admin Dashboard
        try {
            const savedOrder = {
                id: orderId,
                customerName: name,
                customerPhone: phone,
                customerAddress: address,
                paymentMethod: payment,
                note: note,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: total,
                date: cambodiaTime,
                timestamp: Date.now()
            };
            const existingOrders = JSON.parse(localStorage.getItem('kh_orders')) || [];
            existingOrders.unshift(savedOrder);
            localStorage.setItem('kh_orders', JSON.stringify(existingOrders));
        } catch (storageErr) {
            console.warn('Could not store order in localStorage:', storageErr);
        }

        // Clear cart and update count
        localStorage.removeItem('cart');
        cartCount = 0;
        localStorage.setItem('cartCount', 0);
        updateCartBadge();

        // Close checkout modal and show success modal
        closeCheckoutModal();

        const successModal = document.getElementById('orderSuccessModal');
        if (successModal) {
            successModal.classList.add('active');
        }

        showNotification('Order submitted to Telegram Bot! 🚀', 4000);
    } catch (err) {
        console.error('Error during checkout:', err);
        showNotification('Error processing order: ' + err.message, 4000);
    }
}

function closeOrderSuccessModal() {
    const successModal = document.getElementById('orderSuccessModal');
    if (successModal) successModal.classList.remove('active');
}

function addProductToCart(productId) {
    let product = (typeof products !== 'undefined' ? products : []).find(p => p.id == productId);
    if (!product && typeof allProducts !== 'undefined') {
        product = allProducts.find(p => p.id == productId);
    }
    if (!product && typeof defaultProducts !== 'undefined') {
        product = defaultProducts.find(p => p.id == productId);
    }
    if (!product && typeof popularProducts !== 'undefined') {
        product = popularProducts.find(p => p.id == productId);
    }
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id == productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    updateCartBadge();
    showNotification(`${product.name} added to cart!`);
    openCart();
}

function updateCartBadge() {
    cartBadge.textContent = cartCount;
    if (cartCount > 0) {
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
}

// ==================== ACCOUNT & ROLE-BASED ACCESS CONTROL ====================
document.querySelector('.account-icon').addEventListener('click', (e) => {
    e.preventDefault();
    openAccount();
});

function openAccount() {
    const modal = document.getElementById('accountModal');
    if (!modal) return;
    const user = getCurrentUser();
    if (user) {
        updateAuthUI();
        const titleEl = document.getElementById('accountModalTitle');
        if (titleEl) titleEl.textContent = user.role === 'admin' ? 'Admin Profile' : 'Client Profile';
    } else {
        switchAccountTab(null, 'login');
    }
    modal.classList.add('active');
}

function closeAccountModal() {
    const modal = document.getElementById('accountModal');
    if (modal) modal.classList.remove('active');
}

function switchAccountTab(event, tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loggedInView = document.getElementById('loggedInView');
    const tabs = document.querySelectorAll('.account-tab');
    const selectedTab = tabName || event?.target?.getAttribute('data-tab');

    if (loggedInView) loggedInView.style.display = 'none';

    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === selectedTab);
    });

    if (loginForm) loginForm.style.display = selectedTab === 'login' ? 'flex' : 'none';
    if (registerForm) registerForm.style.display = selectedTab === 'register' ? 'flex' : 'none';
    const titleEl = document.getElementById('accountModalTitle');
    if (titleEl) titleEl.textContent = selectedTab === 'login' ? 'Login' : 'Register';
    const msgEl = document.getElementById('accountMessage');
    if (msgEl) msgEl.textContent = '';
}

function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts')) || [];
}

function saveAccounts(accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function registerAccount() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerPasswordConfirm').value;
    const message = document.getElementById('accountMessage');

    if (!name || !email || !password || !confirmPassword) {
        message.textContent = 'Please fill in all registration fields.';
        message.style.color = '#dc2626';
        return;
    }
    if (password !== confirmPassword) {
        message.textContent = 'Passwords do not match.';
        message.style.color = '#dc2626';
        return;
    }

    const accounts = getAccounts();
    if (accounts.some(account => account.email === email)) {
        message.textContent = 'This email is already registered.';
        message.style.color = '#dc2626';
        return;
    }

    // Register as client / user
    const newClient = { name, email, password, role: 'user' };
    accounts.push(newClient);
    saveAccounts(accounts);
    localStorage.setItem('currentUser', JSON.stringify({ name, email, role: 'user' }));

    message.textContent = 'Registration successful! Logged in as ' + name + '.';
    message.style.color = '#16a34a';
    showNotification('Registered successfully as Client! 🛒');
    updateAuthUI();
    setTimeout(() => {
        closeAccountModal();
    }, 1200);
}

function loginAccount() {
    const emailInput = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const message = document.getElementById('accountMessage');

    // 1. Check for Admin Credentials (admin@khcomputer.com / admin123 or admin / admin123)
    if ((emailInput === 'admin@khcomputer.com' || emailInput === 'admin') && password === 'admin123') {
        const adminUser = {
            name: 'Administrator',
            email: 'admin@khcomputer.com',
            role: 'admin'
        };
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        message.textContent = 'Welcome back, Administrator! Unlocking full dashboard...';
        message.style.color = '#16a34a';
        showNotification('Logged in as Admin (Full Access)! 🛡️', 3000);
        updateAuthUI();
        setTimeout(() => {
            closeAccountModal();
            openAdminDashboard();
        }, 800);
        return;
    }

    // 2. Regular Client login
    const accounts = getAccounts();
    const account = accounts.find(acc => acc.email === emailInput && acc.password === password);

    if (!account) {
        message.textContent = 'Invalid email or password. Please try again or register below!';
        message.style.color = '#dc2626';
        return;
    }

    const clientUser = {
        name: account.name,
        email: account.email,
        role: 'user'
    };
    localStorage.setItem('currentUser', JSON.stringify(clientUser));
    message.textContent = 'Welcome back, ' + account.name + '!';
    message.style.color = '#16a34a';
    showNotification('Logged in successfully as Client! 🛍️');
    updateAuthUI();
    setTimeout(() => {
        closeAccountModal();
    }, 1000);
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
}

function logoutAccount() {
    localStorage.removeItem('currentUser');
    updateAuthUI();
    closeAdminDashboard();
    closeAccountModal();
    showNotification('Logged out successfully.');
}

function updateAuthUI() {
    const user = getCurrentUser();
    const adminNavItem = document.getElementById('adminNavItem');
    const loggedInView = document.getElementById('loggedInView');
    const accountModalTabs = document.getElementById('accountModalTabs');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const profileUserName = document.getElementById('profileUserName');
    const profileUserEmail = document.getElementById('profileUserEmail');
    const profileRoleBadge = document.getElementById('profileRoleBadge');
    const profileAdminBtn = document.getElementById('profileAdminBtn');
    const profileRoleIcon = document.getElementById('profileRoleIcon');

    if (user) {
        if (adminNavItem) {
            adminNavItem.style.display = user.role === 'admin' ? 'block' : 'none';
        }
        if (loggedInView) loggedInView.style.display = 'flex';
        if (accountModalTabs) accountModalTabs.style.display = 'none';
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'none';

        if (profileUserName) profileUserName.textContent = user.name || 'User';
        if (profileUserEmail) profileUserEmail.textContent = user.email || '';
        
        if (profileRoleBadge) {
            if (user.role === 'admin') {
                profileRoleBadge.textContent = 'ADMINISTRATOR (Full Control)';
                profileRoleBadge.className = 'role-pill-badge role-admin';
            } else {
                profileRoleBadge.textContent = 'CLIENT / USER (View & Buy)';
                profileRoleBadge.className = 'role-pill-badge role-client';
            }
        }
        if (profileRoleIcon) {
            profileRoleIcon.className = user.role === 'admin' ? 'fa-solid fa-user-shield' : 'fa-solid fa-user';
        }
        if (profileAdminBtn) {
            profileAdminBtn.style.display = user.role === 'admin' ? 'inline-flex' : 'none';
        }
    } else {
        if (adminNavItem) adminNavItem.style.display = 'none';
        if (loggedInView) loggedInView.style.display = 'none';
        if (accountModalTabs) accountModalTabs.style.display = 'flex';
        if (loginForm) loginForm.style.display = 'flex';
        if (registerForm) registerForm.style.display = 'none';
        if (profileAdminBtn) profileAdminBtn.style.display = 'none';
    }

    // Refresh products view so inline admin controls can show/hide
    if (typeof renderProducts === 'function' && typeof allProducts !== 'undefined' && allProducts.length > 0) {
        renderProducts();
    }
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #34a853;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

function getNewsletterSubscribers() {
    return JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
}

function saveNewsletterSubscribers(subscribers) {
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
}

function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const messageBox = document.getElementById('newsletterMessage');
    const email = emailInput.value.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        messageBox.textContent = 'Please enter your email address.';
        messageBox.style.color = '#f87171';
        return;
    }

    if (!emailPattern.test(email)) {
        messageBox.textContent = 'Please enter a valid email address.';
        messageBox.style.color = '#f87171';
        return;
    }

    const subscribers = getNewsletterSubscribers();
    if (subscribers.includes(email)) {
        messageBox.textContent = 'You are already subscribed.';
        messageBox.style.color = '#fbbf24';
        return;
    }

    subscribers.push(email);
    saveNewsletterSubscribers(subscribers);
    emailInput.value = '';
    messageBox.textContent = 'Thanks for subscribing! You will receive our latest deals soon.';
    messageBox.style.color = '#a3e635';
    showNotification('Subscription received! Thank you.');
}

// ==================== SMOOTH SCROLL FOR ANCHORS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            // Allow default behavior for home link
            // For other sections, you might add custom logic
        }
    });
});

// ==================== SHOP NOW BUTTON ====================
const ctaBtn = document.querySelector('.cta-button');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        const prodSec = document.getElementById('products');
        if (prodSec) prodSec.scrollIntoView({ behavior: 'smooth' });
    });
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu and modals
    if (e.key === 'Escape') {
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        if (typeof closeModal === 'function') closeModal();
        if (typeof closeCartModal === 'function') closeCartModal();
        if (typeof closeFavoritesModal === 'function') closeFavoritesModal();
        if (typeof closeAccountModal === 'function') closeAccountModal();
        if (typeof closeCheckoutModal === 'function') closeCheckoutModal();
        if (typeof closeOrderSuccessModal === 'function') closeOrderSuccessModal();
        if (typeof closeAdminDashboard === 'function') closeAdminDashboard();
        if (typeof closeAdminEditModal === 'function') closeAdminEditModal();
    }
    
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
});

// ==================== WINDOW RESIZE HANDLER ====================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Close mobile menu on resize to desktop
        hamburgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// ==================== INITIALIZATION ====================
console.log('LaptopHub Navbar initialized successfully!');
console.log('Cart items:', cartCount);

// ==================== CSS ANIMATIONS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Supplementary Popular Highlight Laptops (supporting IDs 101-105 from Popular Laptops Section)
const popularProducts = [
    {
        id: 101,
        name: 'Apple MacBook Air M3',
        brand: 'Apple',
        category: 'ultrabook',
        price: 1099,
        originalPrice: null,
        badge: 'Popular',
        image: 'image/laptop/Apple MacBook Air M4.png',
        rating: 5,
        reviews: 128,
        description: 'Apple M3 Chip, 13.6" Liquid Retina, 8GB Unified RAM, 256GB SSD',
        specs: {
            'Processor': 'Apple M3 (8-core CPU)',
            'Graphics': '10-core GPU',
            'RAM': '8GB Unified Memory',
            'Storage': '256GB NVMe SSD',
            'Display': '13.6" Liquid Retina Display',
            'Weight': '1.24 kg'
        }
    },
    {
        id: 102,
        name: 'Dell XPS 13 Plus',
        brand: 'Dell',
        category: 'business',
        price: 1299,
        originalPrice: 1420,
        badge: 'Sale',
        image: 'image/laptop/Dell XPS 13.png',
        rating: 5,
        reviews: 95,
        description: 'Intel Core i7-1360P, 16GB LPDDR5, 512GB SSD, 13.4" FHD+ InfinityEdge',
        specs: {
            'Processor': 'Intel Core i7-1360P',
            'Graphics': 'Intel Iris Xe Graphics',
            'RAM': '16GB LPDDR5 6000MHz',
            'Storage': '512GB PCIe 4.0 NVMe',
            'Display': '13.4" FHD+ (1920x1200) 500 nits',
            'Weight': '1.23 kg'
        }
    },
    {
        id: 103,
        name: 'HP Spectre x360 14',
        brand: 'HP',
        category: '2in1',
        price: 1199,
        originalPrice: 1399,
        badge: '2-in-1',
        image: 'image/laptop/HP Spectre x360 14.png',
        rating: 5,
        reviews: 87,
        description: 'Intel Core Ultra 7 155H, 16GB LPDDR5x, 512GB SSD, 14.0" 2.8K OLED Touch',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB LPDDR5x 7467MHz',
            'Storage': '512GB PCIe Gen4 NVMe',
            'Display': '14" 2.8K OLED 120Hz Touch',
            'Weight': '1.44 kg'
        }
    },
    {
        id: 104,
        name: 'Lenovo ThinkPad X1 Carbon',
        brand: 'Lenovo',
        category: 'business',
        price: 1249,
        originalPrice: 1499,
        badge: 'Top Pick',
        image: 'image/laptop/Lenovo ThinkPad X1 Carbon Gen 13.png',
        rating: 5,
        reviews: 74,
        description: 'Intel Core i7-1365U vPro, 16GB LPDDR5, 512GB SSD, 14.0" WUXGA Ultralight',
        specs: {
            'Processor': 'Intel Core i7-1365U vPro',
            'Graphics': 'Intel Iris Xe',
            'RAM': '16GB LPDDR5',
            'Storage': '512GB Performance SSD',
            'Display': '14.0" WUXGA (1920 x 1200) IPS',
            'Weight': '1.12 kg'
        }
    },
    {
        id: 105,
        name: 'ASUS ROG Zephyrus G14',
        brand: 'ASUS',
        category: 'gaming',
        price: 1599,
        originalPrice: 1899,
        badge: 'Gaming',
        image: 'image/laptop/ASUS ROG Strix G16.png',
        rating: 5,
        reviews: 165,
        description: 'AMD Ryzen 9 8945HS, RTX 4060, 16GB LPDDR5X, 1TB SSD, 14.0" 3K OLED 120Hz',
        specs: {
            'Processor': 'AMD Ryzen 9 8945HS (8-core/16-thread)',
            'Graphics': 'NVIDIA GeForce RTX 4060 8GB GDDR6',
            'RAM': '16GB LPDDR5X 6400MHz',
            'Storage': '1TB PCIe 4.0 NVMe SSD',
            'Display': '14.0" 3K (2880 x 1800) OLED 120Hz',
            'Weight': '1.50 kg'
        }
    }
];

// Product Data - Featured Laptops Catalog (30 Models Across 6 Categories)
const defaultProducts = [
    // ==================== 1. ULTRABOOKS ====================
    {
        id: 1,
        name: 'ASUS Zenbook 14 OLED (UX3405)',
        brand: 'ASUS',
        category: 'ultrabook',
        price: 1299,
        originalPrice: 1499,
        badge: 'OLED Flagship',
        image: 'image/laptop/ASUS Zenbook 14 OLED (UX3405).png',
        rating: 5,
        reviews: 142,
        description: 'Intel Core Ultra 7 155H, 16GB LPDDR5X, 1TB SSD, 14" 3K OLED 120Hz display with ultra-slim all-metal chassis.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB LPDDR5X 7467MHz',
            'Storage': '1TB M.2 NVMe PCIe 4.0 SSD',
            'Display': '14.0" 3K (2880 x 1800) OLED 16:10 120Hz 500 nits',
            'Weight': '1.20 kg'
        }
    },
    {
        id: 2,
        name: 'Dell XPS 13',
        brand: 'Dell',
        category: 'ultrabook',
        price: 1199,
        originalPrice: 1399,
        badge: 'Ultra Thin',
        image: 'image/laptop/Dell XPS 13.png',
        rating: 5,
        reviews: 98,
        description: 'Intel Core Ultra 7 155H, 16GB LPDDR5x, 512GB SSD, 13.4" FHD+ InfinityEdge display, CNC aluminum chassis.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB LPDDR5x 7467MHz',
            'Storage': '512GB PCIe 4.0 NVMe SSD',
            'Display': '13.4" FHD+ (1920 x 1200) InfinityEdge 500 nits',
            'Weight': '1.19 kg'
        }
    },
    {
        id: 3,
        name: 'Apple MacBook Air M4',
        brand: 'Apple',
        category: 'ultrabook',
        price: 1099,
        originalPrice: 1199,
        badge: 'Apple Silicon',
        image: 'image/laptop/Apple MacBook Air M4.png',
        rating: 5,
        reviews: 165,
        description: 'Apple M4 Chip (10-core CPU, 10-core GPU), 16GB Unified Memory, 512GB SSD, 13.6" Liquid Retina Display.',
        specs: {
            'Processor': 'Apple M4 Chip with 10-core CPU & 16-core Neural Engine',
            'Graphics': '10-core GPU with hardware-accelerated ray tracing',
            'RAM': '16GB Unified Memory',
            'Storage': '512GB Ultra-Fast SSD',
            'Display': '13.6" Liquid Retina (2560 x 1664) True Tone 500 nits',
            'Weight': '1.24 kg'
        }
    },
    {
        id: 4,
        name: 'HP Spectre x360 14',
        brand: 'HP',
        category: 'ultrabook',
        price: 1399,
        originalPrice: 1599,
        badge: 'Premium Slim',
        image: 'image/laptop/HP Spectre x360 14.png',
        rating: 5,
        reviews: 86,
        description: 'Intel Core Ultra 7 155H, 16GB LPDDR5x, 1TB SSD, 14.0" 2.8K OLED 120Hz display with 9MP AI camera.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB LPDDR5x 7467MHz',
            'Storage': '1TB PCIe Gen4 NVMe TLC M.2 SSD',
            'Display': '14.0" 2.8K (2880 x 1800) OLED 120Hz 500 nits HDR',
            'Weight': '1.44 kg'
        }
    },
    {
        id: 5,
        name: 'Lenovo Yoga Slim 7i',
        brand: 'Lenovo',
        category: 'ultrabook',
        price: 1049,
        originalPrice: 1249,
        badge: 'Aura Edition',
        image: 'image/laptop/lenovo yoga slim 7i.png',
        rating: 5,
        reviews: 92,
        description: 'Intel Core Ultra 7 155H, 32GB LPDDR5X, 1TB SSD, 14.0" WUXGA OLED 100% DCI-P3 aluminum slim design.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '32GB LPDDR5X 7467MHz',
            'Storage': '1TB M.2 PCIe 4.0 NVMe SSD',
            'Display': '14.0" WUXGA (1920 x 1200) OLED 400 nits 100% DCI-P3',
            'Weight': '1.39 kg'
        }
    },

    // ==================== 2. GAMING LAPTOPS ====================
    {
        id: 6,
        name: 'ASUS ROG Strix G16',
        brand: 'ASUS',
        category: 'gaming',
        price: 1599,
        originalPrice: 1799,
        badge: 'RTX 4070',
        image: 'image/laptop/ASUS ROG Strix G16.png',
        rating: 5,
        reviews: 178,
        description: 'Intel Core i9-14900HX, NVIDIA RTX 4070 8GB, 16GB DDR5, 1TB SSD, 16" QHD+ 240Hz ROG Nebula Display.',
        specs: {
            'Processor': 'Intel Core i9-14900HX (24 cores / 32 threads, up to 5.8 GHz)',
            'Graphics': 'NVIDIA GeForce RTX 4070 Laptop GPU 8GB GDDR6 (140W TGP)',
            'RAM': '16GB DDR5-5600MHz (expandable to 64GB)',
            'Storage': '1TB PCIe 4.0 NVMe M.2 SSD',
            'Display': '16" QHD+ (2560 x 1600) ROG Nebula 240Hz 3ms 100% DCI-P3',
            'Weight': '2.50 kg'
        }
    },
    {
        id: 7,
        name: 'Acer Predator Helios Neo 16',
        brand: 'Acer',
        category: 'gaming',
        price: 1349,
        originalPrice: 1499,
        badge: 'High FPS',
        image: 'image/laptop/Acer Predator Helios Neo 16.png',
        rating: 5,
        reviews: 130,
        description: 'Intel Core i7-14700HX, NVIDIA RTX 4060 8GB, 16GB DDR5, 1TB SSD, 16" WQXGA 165Hz IPS Display.',
        specs: {
            'Processor': 'Intel Core i7-14700HX (20 cores / 28 threads, up to 5.5 GHz)',
            'Graphics': 'NVIDIA GeForce RTX 4060 8GB GDDR6 (140W MGP)',
            'RAM': '16GB DDR5 5600MHz',
            'Storage': '1TB PCIe Gen4 NVMe SSD',
            'Display': '16.0" WQXGA (2560 x 1600) IPS 165Hz 500 nits 100% sRGB',
            'Weight': '2.60 kg'
        }
    },
    {
        id: 8,
        name: 'MSI Katana 15',
        brand: 'MSI',
        category: 'gaming',
        price: 1199,
        originalPrice: 1399,
        badge: 'GeForce RTX',
        image: 'image/laptop/MSI Katana 15.png',
        rating: 5,
        reviews: 118,
        description: 'Intel Core i7-13620H, NVIDIA RTX 4060 8GB, 16GB DDR5, 1TB SSD, 15.6" FHD 144Hz 4-Zone RGB Keyboard.',
        specs: {
            'Processor': 'Intel Core i7-13620H (10 cores, up to 4.9 GHz)',
            'Graphics': 'NVIDIA GeForce RTX 4060 Laptop GPU 8GB GDDR6 (105W)',
            'RAM': '16GB DDR5 5200MHz',
            'Storage': '1TB NVMe PCIe SSD Gen4x4',
            'Display': '15.6" FHD (1920x1080) 144Hz IPS-Level Display',
            'Weight': '2.25 kg'
        }
    },
    {
        id: 9,
        name: 'Lenovo Legion Pro 5i',
        brand: 'Lenovo',
        category: 'gaming',
        price: 1499,
        originalPrice: 1699,
        badge: 'Esports Ready',
        image: 'image/laptop/Lenovo Legion Pro 5i.png',
        rating: 5,
        reviews: 154,
        description: 'Intel Core i9-14900HX, NVIDIA RTX 4070 8GB, 32GB DDR5, 1TB SSD, 16" WQXGA 240Hz 500nits PureSight.',
        specs: {
            'Processor': 'Intel Core i9-14900HX (24 cores, up to 5.8 GHz)',
            'Graphics': 'NVIDIA GeForce RTX 4070 8GB GDDR6 (140W)',
            'RAM': '32GB DDR5 5600MHz (Dual Channel)',
            'Storage': '1TB M.2 2280 PCIe 4.0 NVMe SSD',
            'Display': '16" WQXGA (2560x1600) IPS 240Hz 500nits 100% sRGB DisplayHDR 400',
            'Weight': '2.50 kg'
        }
    },
    {
        id: 10,
        name: 'Alienware m16 R2',
        brand: 'Dell',
        category: 'gaming',
        price: 1799,
        originalPrice: 1999,
        badge: 'Extreme Power',
        image: 'image/laptop/Alienware m16 R2.png',
        rating: 5,
        reviews: 95,
        description: 'Intel Core Ultra 9 185H, NVIDIA RTX 4070 8GB, 32GB DDR5, 1TB SSD, 16" QHD+ 240Hz Cryo-tech cooling.',
        specs: {
            'Processor': 'Intel Core Ultra 9 185H (16 cores, up to 5.1 GHz)',
            'Graphics': 'NVIDIA GeForce RTX 4070 8GB GDDR6 (140W)',
            'RAM': '32GB DDR5 5600MT/s',
            'Storage': '1TB M.2 PCIe NVMe SSD',
            'Display': '16" QHD+ (2560 x 1600) 240Hz 3ms 100% sRGB ComfortView Plus',
            'Weight': '2.61 kg'
        }
    },

    // ==================== 3. BUSINESS LAPTOPS ====================
    {
        id: 11,
        name: 'Lenovo ThinkPad X1 Carbon Gen 13',
        brand: 'Lenovo',
        category: 'business',
        price: 1649,
        originalPrice: 1899,
        badge: 'Aura Edition',
        image: 'image/laptop/Lenovo ThinkPad X1 Carbon Gen 13.png',
        rating: 5,
        reviews: 88,
        description: 'Intel Core Ultra 7 258V Lunar Lake, 32GB LPDDR5x, 1TB SSD, 14" 2.8K OLED 120Hz, carbon fiber under 1kg.',
        specs: {
            'Processor': 'Intel Core Ultra 7 258V (8 cores, Intel AI Boost NPU)',
            'Graphics': 'Intel Arc 140V GPU',
            'RAM': '32GB LPDDR5x 8533MHz',
            'Storage': '1TB M.2 2280 PCIe 4.0 NVMe Opal 2.0 SSD',
            'Display': '14.0" 2.8K (2880 x 1800) OLED 120Hz 400 nits Anti-Glare 100% DCI-P3',
            'Weight': '0.98 kg'
        }
    },
    {
        id: 12,
        name: 'Dell Latitude 7450',
        brand: 'Dell',
        category: 'business',
        price: 1429,
        originalPrice: 1629,
        badge: 'Enterprise AI',
        image: 'image/laptop/Dell Latitude 7450.png',
        rating: 5,
        reviews: 76,
        description: 'Intel Core Ultra 7 165U vPro, 16GB LPDDR5x, 512GB SSD, 14" FHD+ IPS display, enterprise grade security.',
        specs: {
            'Processor': 'Intel Core Ultra 7 165U vPro (12 cores, up to 4.9 GHz)',
            'Graphics': 'Intel Graphics with AI Boost',
            'RAM': '16GB LPDDR5x 6400MT/s',
            'Storage': '512GB M.2 2230 PCIe Gen4 NVMe SSD',
            'Display': '14.0" FHD+ (1920x1200) Anti-Glare IPS Non-Touch 400 nits',
            'Weight': '1.33 kg'
        }
    },
    {
        id: 13,
        name: 'HP EliteBook 840 G11',
        brand: 'HP',
        category: 'business',
        price: 1349,
        originalPrice: 1549,
        badge: 'Sure Start',
        image: 'image/laptop/HP EliteBook 840 G11.png',
        rating: 5,
        reviews: 94,
        description: 'Intel Core Ultra 7 155H, 16GB DDR5, 512GB SSD, 14" WUXGA Anti-Glare 400 nits, HP Wolf Security.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB DDR5-5600 MHz RAM (supports up to 64GB)',
            'Storage': '512GB PCIe Gen4 NVMe TLC SSD',
            'Display': '14" WUXGA (1920 x 1200) IPS anti-glare 400 nits 100% sRGB',
            'Weight': '1.41 kg'
        }
    },
    {
        id: 14,
        name: 'ASUS ExpertBook B5',
        brand: 'ASUS',
        category: 'business',
        price: 1299,
        originalPrice: 1450,
        badge: 'Ultra Secure',
        image: 'image/laptop/ASUS ExpertBook B5.png',
        rating: 5,
        reviews: 65,
        description: 'Intel Core Ultra 7 155H, 16GB DDR5, 1TB SSD, 14" 2.5K 16:10 144Hz display, military-grade MIL-STD 810H.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB DDR5 5600MHz (Dual SO-DIMM slots)',
            'Storage': '1TB M.2 2280 NVMe PCIe 4.0 SSD',
            'Display': '14.0" WQXGA (2560 x 1600) 16:10 144Hz 400 nits Anti-Glare',
            'Weight': '1.29 kg'
        }
    },
    {
        id: 15,
        name: 'Microsoft Surface Laptop 7',
        brand: 'Microsoft',
        category: 'business',
        price: 1199,
        originalPrice: 1399,
        badge: 'Copilot+ PC',
        image: 'image/laptop/Microsoft Surface Laptop 7.png',
        rating: 5,
        reviews: 112,
        description: 'Snapdragon X Elite 12-core, 16GB LPDDR5x, 512GB SSD, 13.8" PixelSense Flow Touchscreen, 20hr battery life.',
        specs: {
            'Processor': 'Snapdragon X Elite (12 cores, 45 TOPS NPU)',
            'Graphics': 'Qualcomm Adreno GPU',
            'RAM': '16GB LPDDR5x RAM',
            'Storage': '512GB Removable Gen 4 SSD',
            'Display': '13.8" PixelSense Flow (2304 x 1536) Touch 120Hz HDR 600 nits',
            'Weight': '1.34 kg'
        }
    },

    // ==================== 4. 2-IN-1 LAPTOPS ====================
    {
        id: 16,
        name: 'HP Spectre x360 14',
        brand: 'HP',
        category: '2in1',
        price: 1449,
        originalPrice: 1649,
        badge: 'Convertible OLED',
        image: 'image/laptop/HP Spectre x360 14.png',
        rating: 5,
        reviews: 82,
        description: 'Intel Core Ultra 7 155H, 16GB LPDDR5x, 1TB SSD, 14.0" 2.8K OLED Touch 360° flip with tilt pen included.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB LPDDR5x 7467MHz',
            'Storage': '1TB PCIe Gen4 NVMe M.2 SSD',
            'Display': '14.0" 2.8K (2880 x 1800) OLED 120Hz Touch 500 nits HDR, 360° hinge',
            'Weight': '1.44 kg'
        }
    },
    {
        id: 17,
        name: 'Lenovo Yoga 9i 2-in-1',
        brand: 'Lenovo',
        category: '2in1',
        price: 1499,
        originalPrice: 1749,
        badge: 'Bowers & Wilkins',
        image: 'image/laptop/Lenovo Yoga 9i 2-in-1.png',
        rating: 5,
        reviews: 97,
        description: 'Intel Core Ultra 7 155H, 16GB LPDDR5x, 1TB SSD, 14" 4K OLED PureSight Touch, Bowers & Wilkins soundbar hinge.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB LPDDR5x 7467MHz',
            'Storage': '1TB SSD M.2 2280 PCIe 4.0 NVMe',
            'Display': '14.0" 4K (3840 x 2400) OLED 60Hz / 2.8K 120Hz Touch 400 nits',
            'Weight': '1.35 kg'
        }
    },
    {
        id: 18,
        name: 'Dell Inspiron 14 2-in-1',
        brand: 'Dell',
        category: '2in1',
        price: 899,
        originalPrice: 1049,
        badge: 'Touch 360°',
        image: 'image/laptop/Dell Inspiron 14 2-in-1.png',
        rating: 5,
        reviews: 73,
        description: 'Intel Core 7 150U, 16GB DDR5, 1TB SSD, 14.0" FHD+ 16:10 Touch Display with Active Pen support.',
        specs: {
            'Processor': 'Intel Core 7 150U (10 cores, up to 5.4 GHz)',
            'Graphics': 'Intel Graphics',
            'RAM': '16GB DDR5 5200MHz',
            'Storage': '1TB M.2 PCIe NVMe Solid State Drive',
            'Display': '14.0" 16:10 FHD+ (1920 x 1200) Touch ComfortView 300 nits',
            'Weight': '1.71 kg'
        }
    },
    {
        id: 19,
        name: 'ASUS Vivobook S 14 Flip',
        brand: 'ASUS',
        category: '2in1',
        price: 849,
        originalPrice: 999,
        badge: 'OLED Touch',
        image: 'image/cat-2in1.png',
        rating: 5,
        reviews: 89,
        description: 'AMD Ryzen 7 7730U, 16GB DDR4, 512GB SSD, 14.0" 2.8K OLED 90Hz 16:10 Touch Corning Gorilla Glass.',
        specs: {
            'Processor': 'AMD Ryzen 7 7730U (8 cores / 16 threads, up to 4.5 GHz)',
            'Graphics': 'AMD Radeon Graphics',
            'RAM': '16GB DDR4 3200MHz',
            'Storage': '512GB M.2 NVMe PCIe 3.0 SSD',
            'Display': '14.0" 2.8K (2880 x 1800) OLED 90Hz 16:10 Touch 500 nits HDR',
            'Weight': '1.50 kg'
        }
    },
    {
        id: 20,
        name: 'Microsoft Surface Pro 11',
        brand: 'Microsoft',
        category: '2in1',
        price: 999,
        originalPrice: 1199,
        badge: 'Snapdragon X Plus',
        image: 'https://support.microsoft.com/en-us/surface/media/surface-pro-11th-edition.png',
        rating: 5,
        reviews: 140,
        description: 'Snapdragon X Plus 10-core, 16GB RAM, 512GB SSD, 13" PixelSense Flow OLED 120Hz 2-in-1 Tablet + Laptop.',
        specs: {
            'Processor': 'Snapdragon X Plus (10 cores, up to 3.4 GHz, 45 TOPS NPU)',
            'Graphics': 'Qualcomm Adreno GPU',
            'RAM': '16GB LPDDR5x RAM',
            'Storage': '512GB Removable Gen 4 SSD',
            'Display': '13.0" OLED PixelSense Flow (2880 x 1920) 120Hz Touch 600 nits',
            'Weight': '0.89 kg'
        }
    },

    // ==================== 5. STUDENT LAPTOPS ====================
    {
        id: 21,
        name: 'Acer Aspire 5',
        brand: 'Acer',
        category: 'budget',
        price: 549,
        originalPrice: 649,
        badge: 'Best Value',
        image: 'image/laptop/Acer Aspire 5.png',
        rating: 5,
        reviews: 162,
        description: 'Intel Core i5-1335U, 16GB LPDDR5, 512GB SSD, 15.6" Full HD IPS Slim Bezel Display with Wi-Fi 6E.',
        specs: {
            'Processor': 'Intel Core i5-1335U (10 cores, up to 4.6 GHz)',
            'Graphics': 'Intel Iris Xe Graphics',
            'RAM': '16GB LPDDR5 Dual-Channel',
            'Storage': '512GB PCIe Gen4 NVMe SSD',
            'Display': '15.6" Full HD (1920 x 1080) IPS Acer ComfyView LED-backlit',
            'Weight': '1.77 kg'
        }
    },
    {
        id: 22,
        name: 'ASUS Vivobook 15',
        brand: 'ASUS',
        category: 'budget',
        price: 599,
        originalPrice: 699,
        badge: 'Student Favorite',
        image: 'image/laptop/ASUS Vivobook 15.png',
        rating: 5,
        reviews: 180,
        description: 'Intel Core i5-1335U, 16GB DDR4, 512GB SSD, 15.6" FHD NanoEdge Anti-Glare Display with 180° lay-flat hinge.',
        specs: {
            'Processor': 'Intel Core i5-1335U (10 cores, up to 4.6 GHz)',
            'Graphics': 'Intel Iris Xe Graphics',
            'RAM': '16GB DDR4 3200MHz',
            'Storage': '512GB M.2 NVMe PCIe 3.0 SSD',
            'Display': '15.6" FHD (1920 x 1080) NanoEdge Anti-Glare 250 nits',
            'Weight': '1.70 kg'
        }
    },
    {
        id: 23,
        name: 'Lenovo IdeaPad Slim 3',
        brand: 'Lenovo',
        category: 'budget',
        price: 529,
        originalPrice: 629,
        badge: 'All-Day Battery',
        image: 'image/laptop/Lenovo IdeaPad Slim 3.png',
        rating: 5,
        reviews: 132,
        description: 'AMD Ryzen 5 7530U, 16GB DDR4, 512GB SSD, 15.6" FHD IPS Display with Dolby Audio and Rapid Charge.',
        specs: {
            'Processor': 'AMD Ryzen 5 7530U (6 cores / 12 threads, up to 4.5 GHz)',
            'Graphics': 'Integrated AMD Radeon Graphics',
            'RAM': '16GB Soldered DDR4-3200',
            'Storage': '512GB SSD M.2 2242 PCIe 4.0x4 NVMe',
            'Display': '15.6" FHD (1920x1080) IPS 300nits Anti-glare',
            'Weight': '1.62 kg'
        }
    },
    {
        id: 24,
        name: 'HP Pavilion 15',
        brand: 'HP',
        category: 'budget',
        price: 629,
        originalPrice: 749,
        badge: 'Fast Charging',
        image: 'image/laptop/HP Pavilion 15.png',
        rating: 5,
        reviews: 104,
        description: 'Intel Core i5-1335U, 16GB DDR4, 512GB SSD, 15.6" FHD Micro-Edge Display, B&O Audio, lightweight body.',
        specs: {
            'Processor': 'Intel Core i5-1335U (10 cores, up to 4.6 GHz)',
            'Graphics': 'Intel Iris Xe Graphics',
            'RAM': '16GB DDR4-3200 MHz RAM (2 x 8 GB)',
            'Storage': '512GB PCIe NVMe M.2 SSD',
            'Display': '15.6" FHD (1920 x 1080) IPS micro-edge 250 nits',
            'Weight': '1.75 kg'
        }
    },
    {
        id: 25,
        name: 'Dell Inspiron 15 3530',
        brand: 'Dell',
        category: 'budget',
        price: 569,
        originalPrice: 679,
        badge: 'Reliable Core',
        image: 'image/laptop/Dell Inspiron 15 3530.png',
        rating: 5,
        reviews: 95,
        description: 'Intel Core i5-1334U, 16GB DDR4, 512GB SSD, 15.6" FHD 120Hz Anti-Glare Display with numeric keypad.',
        specs: {
            'Processor': 'Intel Core i5-1334U (10 cores, up to 4.60 GHz)',
            'Graphics': 'Intel Iris Xe Graphics',
            'RAM': '16GB DDR4 2666MHz',
            'Storage': '512GB M.2 PCIe NVMe Solid State Drive',
            'Display': '15.6" FHD (1920 x 1080) 120Hz WVA Anti-Glare 250 nits',
            'Weight': '1.65 kg'
        }
    },

    // ==================== 6. WORKSTATIONS ====================
    {
        id: 26,
        name: 'Dell Precision 7680',
        brand: 'Dell',
        category: 'workstation',
        price: 2399,
        originalPrice: 2699,
        badge: 'ISV Certified',
        image: 'image/laptop/Dell Precision 7680.png',
        rating: 5,
        reviews: 58,
        description: 'Intel Core i9-13950HX vPro, NVIDIA RTX 3500 Ada 12GB, 64GB DDR5, 1TB SSD, 16.0" FHD+ 500 nits CAMM memory.',
        specs: {
            'Processor': 'Intel Core i9-13950HX vPro (24 cores, up to 5.50 GHz)',
            'Graphics': 'NVIDIA RTX 3500 Ada Generation 12GB GDDR6',
            'RAM': '64GB CAMM DDR5 5600MHz Non-ECC',
            'Storage': '1TB PCIe NVMe Class 40 M.2 SSD',
            'Display': '16.0" FHD+ 1920x1200, 60Hz, Anti-Glare, Non-Touch, 100% DCI-P3, 500 nits',
            'Weight': '2.60 kg'
        }
    },
    {
        id: 27,
        name: 'Lenovo ThinkPad P16 Gen 2',
        brand: 'Lenovo',
        category: 'workstation',
        price: 2199,
        originalPrice: 2499,
        badge: 'Workstation',
        image: 'image/laptop/Lenovo ThinkPad P16 Gen 2 .png',
        rating: 5,
        reviews: 64,
        description: 'Intel Core i9-13980HX, NVIDIA RTX 4080 12GB, 32GB DDR5, 1TB SSD, 16.0" 4K OLED 500 nits professional workstation.',
        specs: {
            'Processor': 'Intel Core i9-13980HX (24 cores, up to 5.60 GHz)',
            'Graphics': 'NVIDIA GeForce RTX 4080 Laptop GPU 12GB GDDR6',
            'RAM': '32GB DDR5-5600MHz (Supports up to 192GB)',
            'Storage': '1TB SSD M.2 2280 PCIe Gen4 Performance TLC Opal',
            'Display': '16.0" WQUXGA (3840 x 2400) OLED Touch 100% DCI-P3 500 nits',
            'Weight': '2.95 kg'
        }
    },
    {
        id: 28,
        name: 'HP ZBook Fury 16 G11',
        brand: 'HP',
        category: 'workstation',
        price: 2599,
        originalPrice: 2899,
        badge: 'Max Performance',
        image: 'image/laptop/HP ZBook Fury 16 G11.png',
        rating: 5,
        reviews: 52,
        description: 'Intel Core i9-14900HX, NVIDIA RTX 4000 Ada 12GB, 64GB DDR5, 2TB SSD, 16.0" 4K OLED Touch HP DreamColor.',
        specs: {
            'Processor': 'Intel Core i9-14900HX (24 cores / 32 threads, up to 5.8 GHz)',
            'Graphics': 'NVIDIA RTX 4000 Ada Generation Laptop GPU (12GB GDDR6)',
            'RAM': '64GB DDR5-5600 MHz RAM (2 x 32GB, up to 128GB)',
            'Storage': '2TB PCIe Gen4 NVMe TLC M.2 SSD',
            'Display': '16" 4K UHD (3840 x 2400) OLED Touch, 100% DCI-P3, HP DreamColor',
            'Weight': '2.40 kg'
        }
    },
    {
        id: 29,
        name: 'ASUS ProArt P16',
        brand: 'ASUS',
        category: 'workstation',
        price: 1999,
        originalPrice: 2299,
        badge: 'Creator Dial',
        image: 'image/laptop/ASUS ProArt P16.png',
        rating: 5,
        reviews: 72,
        description: 'AMD Ryzen AI 9 HX 370, NVIDIA RTX 4070 8GB, 32GB LPDDR5X, 2TB SSD, 16" 4K OLED 16:10 Touch with ASUS DialPad.',
        specs: {
            'Processor': 'AMD Ryzen AI 9 HX 370 (12 cores / 24 threads, up to 5.1 GHz, 50 TOPS NPU)',
            'Graphics': 'NVIDIA GeForce RTX 4070 Laptop GPU 8GB GDDR6',
            'RAM': '32GB LPDDR5X on board',
            'Storage': '2TB M.2 NVMe PCIe 4.0 Performance SSD',
            'Display': '16.0" 4K (3840 x 2400) OLED 16:10 Touch 500 nits HDR True Black 500',
            'Weight': '1.85 kg'
        }
    },
    {
        id: 30,
        name: 'MSI CreatorPro X17',
        brand: 'MSI',
        category: 'workstation',
        price: 2799,
        originalPrice: 3199,
        badge: 'HX Powerhouse',
        image: 'image/laptop/MSI CreatorPro X17.png',
        rating: 5,
        reviews: 44,
        description: 'Intel Core i9-13980HX, NVIDIA RTX 5000 Ada 16GB, 64GB DDR5, 2TB SSD, 17.3" 4K Mini-LED 144Hz 1000 nits display.',
        specs: {
            'Processor': 'Intel Core i9-13980HX (24 cores, up to 5.60 GHz)',
            'Graphics': 'NVIDIA RTX 5000 Ada Generation Laptop GPU 16GB GDDR6',
            'RAM': '64GB DDR5 5600MHz (4 slots, up to 128GB)',
            'Storage': '2TB NVMe PCIe Gen5 SSD',
            'Display': '17.3" UHD (3840x2160) 144Hz Mini LED, HDR 1000, 100% DCI-P3',
            'Weight': '3.30 kg'
        }
    }
];

// ==================== PRODUCT PERSISTENCE & STORE INITIALIZATION ====================
function getStoredProducts() {
    const STORE_KEY = 'kh_products_v12_laptop_all_images';
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length >= 30) {
                return parsed;
            }
        } catch (e) {
            console.error('Failed to parse kh_products_v12_laptop_all_images from localStorage', e);
        }
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(defaultProducts));
    localStorage.setItem('kh_products', JSON.stringify(defaultProducts));
    return defaultProducts.slice();
}

function saveStoredProducts(productsList) {
    localStorage.setItem('kh_products_v12_laptop_all_images', JSON.stringify(productsList));
    localStorage.setItem('kh_products', JSON.stringify(productsList));
    allProducts = productsList;
}

let allProducts = getStoredProducts();
let displayedCount = 30;
let products = allProducts.slice(0, displayedCount);

// Helper function to add product to cart safely across all interfaces
function addProductToCart(productId) {
    const list = (typeof allProducts !== 'undefined' && allProducts.length > 0) ? allProducts : defaultProducts;
    let product = list.find(p => p.id == productId);
    if (!product && typeof defaultProducts !== 'undefined') {
        product = defaultProducts.find(p => p.id == productId);
    }
    if (!product && typeof popularProducts !== 'undefined') {
        product = popularProducts.find(p => p.id == productId);
    }
    if (!product && typeof categoryFlagshipProducts !== 'undefined') {
        product = Object.values(categoryFlagshipProducts).find(p => p.id == productId);
    }
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id == productId);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    localStorage.setItem('cartCount', cartCount);
    if (typeof updateCartBadge === 'function') updateCartBadge();
    if (typeof showNotification === 'function') {
        showNotification(`${product.name} added to cart! 🛒`);
    }
}
window.addProductToCart = addProductToCart;

// Helper to open details by product ID (used by both static and dynamic cards)
function openProductDetailById(id) {
    const list = (typeof allProducts !== 'undefined' && allProducts.length > 0) ? allProducts : defaultProducts;
    let p = list.find(item => item.id == id);
    if (!p && typeof defaultProducts !== 'undefined') {
        p = defaultProducts.find(item => item.id == id);
    }
    if (!p && typeof popularProducts !== 'undefined') {
        p = popularProducts.find(item => item.id == id);
    }
    if (!p && typeof categoryFlagshipProducts !== 'undefined') {
        p = Object.values(categoryFlagshipProducts).find(item => item.id == id);
    }
    if (p) openProductDetail(p);
}
window.openProductDetailById = openProductDetailById;

// ==================== RENDER PRODUCTS ====================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    // Update current product slice
    products = (allProducts || []).slice(0, displayedCount);

    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!products || products.length === 0) {
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }
    if (loadMoreBtn) {
        loadMoreBtn.style.display = (allProducts && products.length >= allProducts.length) ? 'none' : 'block';
    }

    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const isAdmin = currentUser && currentUser.role === 'admin';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);
        card.setAttribute('data-id', product.id);
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='image/cat-${product.category || 'ultrabook'}.png'">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                ${isAdmin ? `<div class="admin-quick-badge"><i class="fa-solid fa-shield-halved"></i> Admin Control</div>` : ''}
                <button class="wishlist-btn" data-product-id="${product.id}" onclick="toggleWishlist(event)">♡</button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(product.rating || 5)}${'☆'.repeat(5 - (product.rating || 5))}</span>
                    <span class="reviews">(${product.reviews || 0} reviews)</span>
                </div>
                <p class="product-description">${product.description || ''}</p>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions-bar">
                    <button class="add-to-cart-btn" onclick="addProductToCart(${product.id})">Add to Cart</button>
                    ${isAdmin ? `
                        <div class="admin-inline-btns">
                            <button type="button" class="admin-mini-btn edit-btn" onclick="event.stopPropagation(); openEditProductModal(${product.id});" title="Edit Laptop"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                            <button type="button" class="admin-mini-btn del-btn" onclick="event.stopPropagation(); deleteProductById(${product.id});" title="Delete Laptop"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                openProductDetail(product);
            }
        });

        grid.appendChild(card);
    });
}

// Run render immediately if DOM is already parsed
if (typeof document !== 'undefined' && document.getElementById('productsGrid')) {
    try { renderProducts(); } catch (e) { console.error('Immediate render error:', e); }
}

// ==================== CATEGORY FLAGSHIP PRODUCTS (FOR CATEGORY CARDS) ====================
const categoryFlagshipProducts = {
    'ultrabook': {
        id: 1,
        name: 'ASUS Zenbook 14 OLED (UX3405)',
        brand: 'ASUS',
        category: 'ultrabook',
        price: 1299,
        originalPrice: 1499,
        badge: 'OLED Flagship',
        image: 'image/laptop/ASUS Zenbook 14 OLED (UX3405).png',
        rating: 5,
        reviews: 142,
        description: 'Intel Core Ultra 7 155H, 16GB LPDDR5X, 1TB SSD, 14" 3K OLED 120Hz display with ultra-slim all-metal chassis.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB LPDDR5X 7467MHz',
            'Storage': '1TB M.2 NVMe PCIe 4.0 SSD',
            'Display': '14.0" 3K (2880 x 1800) OLED 16:10 120Hz 500 nits',
            'Weight': '1.20 kg'
        }
    },
    'gaming': {
        id: 6,
        name: 'ASUS ROG Strix G16',
        brand: 'ASUS',
        category: 'gaming',
        price: 1599,
        originalPrice: 1799,
        badge: 'RTX 4070',
        image: 'image/laptop/ASUS ROG Strix G16.png',
        rating: 5,
        reviews: 178,
        description: 'Intel Core i9-14900HX, NVIDIA RTX 4070 8GB, 16GB DDR5, 1TB SSD, 16" QHD+ 240Hz ROG Nebula Display.',
        specs: {
            'Processor': 'Intel Core i9-14900HX (24 cores / 32 threads, up to 5.8 GHz)',
            'Graphics': 'NVIDIA GeForce RTX 4070 Laptop GPU 8GB GDDR6 (140W TGP)',
            'RAM': '16GB DDR5-5600MHz (expandable to 64GB)',
            'Storage': '1TB PCIe 4.0 NVMe M.2 SSD',
            'Display': '16" QHD+ (2560 x 1600) ROG Nebula 240Hz 3ms 100% DCI-P3',
            'Weight': '2.50 kg'
        }
    },
    'business': {
        id: 11,
        name: 'Lenovo ThinkPad X1 Carbon Gen 13',
        brand: 'Lenovo',
        category: 'business',
        price: 1649,
        originalPrice: 1899,
        badge: 'Aura Edition',
        image: 'image/laptop/Lenovo ThinkPad X1 Carbon Gen 13.png',
        rating: 5,
        reviews: 88,
        description: 'Intel Core Ultra 7 258V Lunar Lake, 32GB LPDDR5x, 1TB SSD, 14" 2.8K OLED 120Hz, carbon fiber under 1kg.',
        specs: {
            'Processor': 'Intel Core Ultra 7 258V (8 cores, Intel AI Boost NPU)',
            'Graphics': 'Intel Arc 140V GPU',
            'RAM': '32GB LPDDR5x 8533MHz',
            'Storage': '1TB M.2 2280 PCIe 4.0 NVMe Opal 2.0 SSD',
            'Display': '14.0" 2.8K (2880 x 1800) OLED 120Hz 400 nits Anti-Glare 100% DCI-P3',
            'Weight': '0.98 kg'
        }
    },
    '2in1': {
        id: 16,
        name: 'HP Spectre x360 14',
        brand: 'HP',
        category: '2in1',
        price: 1449,
        originalPrice: 1649,
        badge: 'Convertible OLED',
        image: 'image/laptop/HP Spectre x360 14.png',
        rating: 5,
        reviews: 82,
        description: 'Intel Core Ultra 7 155H, 16GB LPDDR5x, 1TB SSD, 14.0" 2.8K OLED Touch 360° flip with tilt pen included.',
        specs: {
            'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8 GHz)',
            'Graphics': 'Intel Arc Graphics',
            'RAM': '16GB LPDDR5x 7467MHz',
            'Storage': '1TB PCIe Gen4 NVMe M.2 SSD',
            'Display': '14.0" 2.8K (2880 x 1800) OLED 120Hz Touch 500 nits HDR, 360° hinge',
            'Weight': '1.44 kg'
        }
    },
    'budget': {
        id: 22,
        name: 'ASUS Vivobook 15',
        brand: 'ASUS',
        category: 'budget',
        price: 599,
        originalPrice: 699,
        badge: 'Student Favorite',
        image: 'image/laptop/ASUS Vivobook 15.png',
        rating: 5,
        reviews: 180,
        description: 'Intel Core i5-1335U, 16GB DDR4, 512GB SSD, 15.6" FHD NanoEdge Anti-Glare Display with 180° lay-flat hinge.',
        specs: {
            'Processor': 'Intel Core i5-1335U (10 cores, up to 4.6 GHz)',
            'Graphics': 'Intel Iris Xe Graphics',
            'RAM': '16GB DDR4 3200MHz',
            'Storage': '512GB M.2 NVMe PCIe 3.0 SSD',
            'Display': '15.6" FHD (1920 x 1080) NanoEdge Anti-Glare 250 nits',
            'Weight': '1.70 kg'
        }
    },
    'workstation': {
        id: 27,
        name: 'Lenovo ThinkPad P16 Gen 2',
        brand: 'Lenovo',
        category: 'workstation',
        price: 2199,
        originalPrice: 2499,
        badge: 'Workstation',
        image: 'image/laptop/Lenovo ThinkPad P16 Gen 2 .png',
        rating: 5,
        reviews: 64,
        description: 'Intel Core i9-13980HX, NVIDIA RTX 4080 12GB, 32GB DDR5, 1TB SSD, 16.0" 4K OLED 500 nits professional workstation.',
        specs: {
            'Processor': 'Intel Core i9-13980HX (24 cores, up to 5.60 GHz)',
            'Graphics': 'NVIDIA GeForce RTX 4080 Laptop GPU 12GB GDDR6',
            'RAM': '32GB DDR5-5600MHz (Supports up to 192GB)',
            'Storage': '1TB SSD M.2 2280 PCIe Gen4 Performance TLC Opal',
            'Display': '16.0" WQUXGA (3840 x 2400) OLED Touch 100% DCI-P3 500 nits',
            'Weight': '2.95 kg'
        }
    }
};
window.categoryFlagshipProducts = categoryFlagshipProducts;

// ==================== OPEN CATEGORY PRODUCT DETAIL (ON CLICK CATEGORY CARDS) ====================
function openCategoryProductDetail(category, element) {
    selectCategory(category, element);
}
window.openCategoryProductDetail = openCategoryProductDetail;

// ==================== BROWSE CATEGORY FROM MODAL ====================
function browseCategoryFromModal(categoryKey) {
    closeModal();
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.classList.remove('section-hidden');
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(b => {
            if (b.getAttribute('data-filter') === categoryKey) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
        if (typeof filterProducts === 'function') {
            filterProducts(categoryKey);
        }
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const top = productsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}
window.browseCategoryFromModal = browseCategoryFromModal;

// ==================== OPEN PRODUCT DETAIL MODAL ====================
function openProductDetail(product) {
    if (!product) return;
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');
    if (!modal || !modalBody) return;

    const brandName = product.brand || 'Official';
    const categoryName = (product.category || 'Laptop').toUpperCase();

    if (modalTitle) {
        modalTitle.innerHTML = `
            <div class="modal-header-meta">
                <span class="modal-meta-brand"><i class="fa-solid fa-laptop"></i> ${brandName}</span>
                <span class="modal-meta-divider">•</span>
                <span class="modal-meta-category">${categoryName}</span>
            </div>
        `;
    }

    // Spec Icons mapping
    const specIcons = {
        'processor': 'fa-solid fa-microchip',
        'cpu': 'fa-solid fa-microchip',
        'graphics': 'fa-solid fa-display',
        'gpu': 'fa-solid fa-display',
        'ram': 'fa-solid fa-memory',
        'memory': 'fa-solid fa-memory',
        'storage': 'fa-solid fa-hard-drive',
        'ssd': 'fa-solid fa-hard-drive',
        'display': 'fa-solid fa-tv',
        'screen': 'fa-solid fa-tv',
        'weight': 'fa-solid fa-weight-scale',
        'battery': 'fa-solid fa-battery-full',
        'os': 'fa-brands fa-windows',
        'category': 'fa-solid fa-layer-group',
        'brand': 'fa-solid fa-tag',
        'price': 'fa-solid fa-dollar-sign'
    };

    // Safe specs parsing
    let specsHTML = '';
    const specs = (product.specs && typeof product.specs === 'object') ? product.specs : {
        'Processor': product.description || 'High Performance Processor',
        'Category': product.category || 'Laptop',
        'Brand': product.brand || 'Premium Brand',
        'Price': `$${product.price}`
    };

    for (const [key, value] of Object.entries(specs)) {
        const iconKey = key.toLowerCase().trim();
        const iconClass = specIcons[iconKey] || 'fa-solid fa-circle-check';
        specsHTML += `
            <div class="spec-item">
                <span class="spec-label">
                    <i class="${iconClass}"></i>
                    <span>${key}</span>
                </span>
                <span class="spec-value">${value}</span>
            </div>
        `;
    }

    const ratingVal = Math.min(5, Math.max(1, parseInt(product.rating, 10) || 5));
    const starsHTML = '★'.repeat(ratingVal) + '☆'.repeat(5 - ratingVal);
    const reviewsVal = product.reviews || 84;
    const priceVal = product.price || 999;
    const origPriceHTML = product.originalPrice ? `<span class="detail-original-price">$${product.originalPrice}</span>` : '';

    let discountBadgeHTML = '';
    if (product.originalPrice && product.originalPrice > priceVal) {
        const discountPercent = Math.round(((product.originalPrice - priceVal) / product.originalPrice) * 100);
        const savedAmount = product.originalPrice - priceVal;
        discountBadgeHTML = `
            <span class="detail-discount-badge">
                <i class="fa-solid fa-tag"></i> SAVE $${savedAmount} (${discountPercent}% OFF)
            </span>
        `;
    }

    const categoryKey = product.category || 'all';

    let fallbackImg = 'image/cat-ultrabook.png';
    if (product.category === 'gaming') fallbackImg = 'image/laptop/ASUS ROG Strix G16.png';
    else if (product.category === 'business') fallbackImg = 'image/laptop/Lenovo ThinkPad X1 Carbon Gen 13.png';
    else if (product.category === '2in1') fallbackImg = 'image/laptop/HP Spectre x360 14.png';
    else if (product.category === 'budget') fallbackImg = 'image/laptop/ASUS Vivobook 15.png';
    else if (product.category === 'workstation') fallbackImg = 'image/laptop/Dell Precision 7680.png';

    if (product.brand === 'Apple' || (product.name && product.name.toLowerCase().includes('macbook'))) {
        fallbackImg = 'image/laptop/Apple MacBook Air M4.png';
    }

    // Clean badge string
    let badgeText = product.badge || '';
    if (badgeText.includes('')) {
        badgeText = badgeText.replace('', '°');
    }

    modalBody.innerHTML = `
        <div class="detail-container">
            <!-- Left: Showcase Image + Guarantees -->
            <div class="detail-visual-col">
                <div class="detail-image-box">
                    <img src="${product.image || fallbackImg}" alt="${product.name}" onerror="this.onerror=null; this.src='${fallbackImg}'">
                    ${badgeText ? `<div class="detail-badge"><i class="fa-solid fa-bolt"></i> ${badgeText}</div>` : ''}
                </div>
                <div class="detail-guarantees">
                    <div class="guarantee-chip">
                        <i class="fa-solid fa-shield-halved"></i>
                        <span>100% Genuine</span>
                    </div>
                    <div class="guarantee-chip">
                        <i class="fa-solid fa-truck-fast"></i>
                        <span>Free Shipping</span>
                    </div>
                    <div class="guarantee-chip">
                        <i class="fa-solid fa-rotate-left"></i>
                        <span>7-Day Return</span>
                    </div>
                </div>
            </div>

            <!-- Right: Product Information & Specs -->
            <div class="detail-info">
                <div class="detail-brand-badge-row">
                    <span class="detail-brand-tag">${brandName}</span>
                    <span class="detail-stock-status"><i class="fa-solid fa-circle-check"></i> In Stock</span>
                </div>

                <h3 class="detail-title">${product.name}</h3>

                <div class="detail-rating">
                    <span class="stars-large">${starsHTML}</span>
                    <span class="rating-num">${ratingVal}.0</span>
                    <span class="review-count">(${reviewsVal} verified reviews)</span>
                </div>

                <div class="detail-price-box">
                    <span class="detail-price">$${priceVal}</span>
                    ${origPriceHTML}
                    ${discountBadgeHTML}
                </div>

                <div class="detail-specs-box">
                    <div class="specs-box-header">
                        <i class="fa-solid fa-sliders"></i>
                        <span>KEY SPECIFICATIONS</span>
                    </div>
                    <div class="detail-specs-grid">
                        ${specsHTML}
                    </div>
                </div>

                <p class="detail-description">${product.description || ''}</p>

                <div class="detail-actions">
                    <button class="detail-add-cart" onclick="addProductToCart(${product.id}); if(typeof showNotification==='function') showNotification('Added ${product.name.replace(/'/g, "\\'")} to cart! 🛒');">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                    <button class="detail-wishlist" data-product-id="${product.id}" onclick="toggleWishlistDetail(event)" title="Add to Wishlist">
                        ♡ Wishlist
                    </button>
                </div>

                <button class="detail-browse-more-btn" onclick="browseCategoryFromModal('${categoryKey}')">
                    <i class="fa-solid fa-arrow-down"></i> Browse All ${product.brand || ''} &amp; Similar Models
                </button>
            </div>
        </div>
    `;

    // Open modal as an overlay
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update wishlist button state
    const wishlistBtn = modalBody.querySelector('.detail-wishlist');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.includes(product.id) && wishlistBtn) {
        wishlistBtn.classList.add('active');
        wishlistBtn.innerHTML = '♥ Wishlist';
    }
}
window.openProductDetail = openProductDetail;

// ==================== CLOSE MODAL ====================
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
window.closeModal = closeModal;

// Close modal when clicking outside modal-content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeModal();
    }
});

// ==================== FILTER PRODUCTS ====================
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        filterProducts(filterValue);
    });
});

function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (category === 'all') {
            card.classList.remove('hidden');
        } else {
            if (card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

// Handle dropdown menu filter clicks (Products > ...)
const dropdownItems = document.querySelectorAll('.dropdown-item[data-filter]');
dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const filterValue = item.getAttribute('data-filter');

        // Activate corresponding filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
        if (targetBtn) targetBtn.classList.add('active');

        // Filter products
        filterProducts(filterValue);

        // Smooth scroll to products section accounting for navbar
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 70;
            const top = productsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 8;
            window.scrollTo({ top, behavior: 'smooth' });
        }

        // Close mobile menu if open
        if (hamburgerMenu.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ==================== CATEGORY CAROUSEL & SELECTION ====================
function selectCategory(category, element) {
    // 1. Highlight the clicked category card
    const allCatCards = document.querySelectorAll('.category-card');
    allCatCards.forEach(c => c.classList.remove('active'));

    if (element) {
        element.classList.add('active');
    } else if (typeof event !== 'undefined' && event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // 2. Ensure products and home sections are visible
    const productsSection = document.getElementById('products');
    const homeSection = document.getElementById('home');
    if (productsSection) productsSection.classList.remove('section-hidden');
    if (homeSection) homeSection.classList.remove('section-hidden');

    // 3. Update active filter button in products section
    const filterBtns = document.querySelectorAll('.filter-btn');
    let matched = false;
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
            matched = true;
        } else {
            btn.classList.remove('active');
        }
    });

    if (!matched && category !== 'all') {
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.classList.remove('active');
    }

    // 4. Perform product filtering
    if (typeof filterProducts === 'function') {
        filterProducts(category);
    }

    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = (category === 'all' && typeof displayedCount !== 'undefined' && typeof allProducts !== 'undefined' && displayedCount < allProducts.length) ? 'block' : 'none';
    }

    // 5. Smooth scroll down to products section
    if (productsSection) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const top = productsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 12;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    // 6. User notification
    const catMap = {
        'all': 'All',
        'ultrabook': 'Ultrabook',
        'gaming': 'Gaming',
        'business': 'Business',
        '2in1': '2-in-1',
        'budget': 'Student',
        'workstation': 'Workstation'
    };
    const catName = catMap[category] || (category ? (category.charAt(0).toUpperCase() + category.slice(1)) : 'All');
    if (typeof showNotification === 'function') {
        showNotification(`Browsing ${catName} Laptops 💻`, 2200);
    }
}
window.selectCategory = selectCategory;

function scrollCategoryGrid(direction = 'next') {
    const grid = document.getElementById('categoryCardsGrid');
    if (!grid) return;

    const scrollAmount = 450;
    const maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth);

    if (maxScroll <= 5) {
        grid.style.transition = 'transform 0.2s ease';
        grid.style.transform = direction === 'next' ? 'translateX(-12px)' : 'translateX(12px)';
        setTimeout(() => { grid.style.transform = 'translateX(0)'; }, 200);
        return;
    }

    if (direction === 'prev') {
        if (grid.scrollLeft <= 15) {
            grid.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
            grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    } else {
        if (grid.scrollLeft >= maxScroll - 15) {
            grid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
}
window.scrollCategoryGrid = scrollCategoryGrid;

// Bind keyboard support (Enter / Space) to category & popular cards
document.addEventListener('DOMContentLoaded', () => {
    const interactiveCards = document.querySelectorAll('.category-card, .popular-card');
    interactiveCards.forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target && e.target.closest('button')) return;
                e.preventDefault();
                card.click();
            }
        });
    });
});

// ==================== TOGGLE WISHLIST ====================
function toggleWishlist(event) {
    event.stopPropagation();
    const btn = event.target.closest('.wishlist-btn');
    if (!btn) return;
    const productId = parseInt(btn.getAttribute('data-product-id'));
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';

    if (btn.classList.contains('active')) {
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
        }
        showNotification('Added to favorites!');
    } else {
        wishlist = wishlist.filter(id => id !== productId);
        showNotification('Removed from favorites');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
}

function toggleWishlistDetail(event) {
    event.stopPropagation();
    const btn = event.target.closest('.detail-wishlist');
    if (!btn) return;
    const productId = parseInt(btn.getAttribute('data-product-id'));
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥ Wishlist' : '♡ Wishlist';

    if (btn.classList.contains('active')) {
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
        }
        showNotification('Added to favorites!');
    } else {
        wishlist = wishlist.filter(id => id !== productId);
        showNotification('Removed from favorites');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();

    // Update main card wishlist button
    const mainCard = document.querySelector(`.wishlist-btn[data-product-id="${productId}"]`);
    if (mainCard) {
        if (btn.classList.contains('active')) {
            mainCard.classList.add('active');
            mainCard.textContent = '♥';
        } else {
            mainCard.classList.remove('active');
            mainCard.textContent = '♡';
        }
    }
}

function openFavorites() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const dealWishlist = JSON.parse(localStorage.getItem('dealWishlist')) || [];
    const modal = document.getElementById('favoritesModal');
    const modalBody = document.getElementById('favoritesModalBody');

    if (wishlist.length === 0 && dealWishlist.length === 0) {
        modalBody.innerHTML = '<div class="empty-cart-msg">Your favorites list is empty. Tap the heart icon to save products you love.</div>';
    } else {
        let html = '';

        wishlist.forEach(productId => {
            const product = allProducts.find(p => p.id === productId);
            if (!product) return;

            html += `
                <div class="cart-item-row">
                    <div class="cart-item-row-info">
                        <span class="cart-item-row-name">${product.name}</span>
                        <span class="cart-item-row-details">$${product.price}</span>
                    </div>
                    <div class="cart-item-row-actions">
                        <button class="checkout-btn" onclick="addFavoriteToCart(${product.id})">Add to Cart</button>
                        <button class="cart-remove-btn" onclick="removeFromFavorites(${product.id})">Remove</button>
                    </div>
                </div>
            `;
        });

        if (dealWishlist.length > 0) {
            html += '<div class="favorites-section-title">Deal Favorites</div>';
            dealWishlist.forEach(productName => {
                const dealInfo = getDealInfoByName(productName);
                html += `
                    <div class="cart-item-row">
                        <div class="cart-item-row-info">
                            <span class="cart-item-row-name">${dealInfo.name}</span>
                            <span class="cart-item-row-details">${dealInfo.price || 'Special deal'}</span>
                        </div>
                        <div class="cart-item-row-actions">
                            <button class="checkout-btn" onclick="addDealToCartByName('${dealInfo.name.replace(/'/g, "\\'")}')">Add to Cart</button>
                            <button class="cart-remove-btn" onclick="removeDealFromFavorites('${dealInfo.name.replace(/'/g, "\\'")}')">Remove</button>
                        </div>
                    </div>
                `;
            });
        }

        modalBody.innerHTML = html;
    }

    modal.classList.add('active');
}

function closeFavoritesModal() {
    document.getElementById('favoritesModal').classList.remove('active');
}

function removeFromFavorites(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const product = allProducts.find(p => p.id === productId);
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    showNotification(`${product ? product.name : 'Item'} removed from favorites`);
    openFavorites();

    const mainCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (mainCard) {
        mainCard.classList.remove('active');
    }
}

function addFavoriteToCart(productId) {
    let product = products.find(p => p.id === productId);
    if (!product) {
        product = allProducts.find(p => p.id === productId);
    }
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    updateCartBadge();
    showNotification(`${product.name} added to cart!`);
}

function updateWishlistBadge() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const dealWishlist = JSON.parse(localStorage.getItem('dealWishlist')) || [];
    const totalFavorites = wishlist.length + dealWishlist.length;
    const badge = document.getElementById('favoriteBadge');
    if (badge) {
        badge.textContent = totalFavorites;
        badge.style.display = totalFavorites > 0 ? 'flex' : 'none';
    }
}

function getDealInfoByName(productName) {
    const dealCards = document.querySelectorAll('.deal-card');
    for (const card of dealCards) {
        const name = card.querySelector('.deal-product-name')?.textContent;
        if (name === productName) {
            return {
                name,
                price: card.querySelector('.deal-current-price')?.textContent || ''
            };
        }
    }
    return { name: productName, price: '' };
}

function addDealToCartByName(productName) {
    const dealInfo = getDealInfoByName(productName);
    const priceValue = parseFloat(dealInfo.price.replace(/[^0-9.]/g, '')) || 0;
    addDealToCart(null, dealInfo.name, priceValue);
}

function removeDealFromFavorites(productName) {
    let dealWishlist = JSON.parse(localStorage.getItem('dealWishlist')) || [];
    dealWishlist = dealWishlist.filter(name => name !== productName);
    localStorage.setItem('dealWishlist', JSON.stringify(dealWishlist));
    updateWishlistBadge();
    showDealNotification(`${productName} removed from favorites`, 'info');
    openFavorites();

    const matchingBtn = Array.from(document.querySelectorAll('.deal-wishlist')).find(btn => {
        return btn.closest('.deal-card')?.querySelector('.deal-product-name')?.textContent === productName;
    });
    if (matchingBtn) {
        matchingBtn.classList.remove('active');
        matchingBtn.textContent = '♡';
    }
}

// ==================== SHOW NOTIFICATION ====================
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #34a853;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        font-size: 14px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// ==================== ADMIN DASHBOARD FUNCTIONALITY ====================
function openAdminDashboard() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        showNotification('Access denied: Admins only! Please login with admin account.', 3500);
        openAccount();
        return;
    }
    const modal = document.getElementById('adminDashboardModal');
    if (modal) {
        modal.classList.add('active');
        updateAdminStats();
        renderAdminProductsTable();
        renderAdminOrdersTable();
        switchAdminTab(null, 'manageProducts');
    }
}

function closeAdminDashboard() {
    const modal = document.getElementById('adminDashboardModal');
    if (modal) modal.classList.remove('active');
}

function switchAdminTab(event, tabName) {
    const tabs = document.querySelectorAll('.admin-tab');
    const selectedTab = tabName || event?.target?.getAttribute('data-tab');

    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === selectedTab);
    });

    const addProductContent = document.getElementById('adminTabAddProduct');
    const manageProductsContent = document.getElementById('adminTabManageProducts');
    const viewOrdersContent = document.getElementById('adminTabViewOrders');

    if (addProductContent) addProductContent.classList.toggle('active', selectedTab === 'addProduct');
    if (manageProductsContent) manageProductsContent.classList.toggle('active', selectedTab === 'manageProducts');
    if (viewOrdersContent) viewOrdersContent.classList.toggle('active', selectedTab === 'viewOrders');
}

function updateAdminStats() {
    const productsCount = allProducts.length;
    const orders = JSON.parse(localStorage.getItem('kh_orders')) || [];
    const accounts = getAccounts();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
    const totalUsers = accounts.length + 1; // +1 for Administrator

    const statProductsEl = document.getElementById('statTotalProducts');
    const statOrdersEl = document.getElementById('statTotalOrders');
    const statRevenueEl = document.getElementById('statTotalRevenue');
    const statUsersEl = document.getElementById('statTotalUsers');
    const tabProdCountEl = document.getElementById('adminTabProdCount');
    const tabOrdersCountEl = document.getElementById('adminTabOrdersCount');

    if (statProductsEl) statProductsEl.textContent = productsCount;
    if (statOrdersEl) statOrdersEl.textContent = totalOrders;
    if (statRevenueEl) statRevenueEl.textContent = `$${totalRevenue.toFixed(2)}`;
    if (statUsersEl) statUsersEl.textContent = totalUsers;
    if (tabProdCountEl) tabProdCountEl.textContent = productsCount;
    if (tabOrdersCountEl) tabOrdersCountEl.textContent = totalOrders;
}

function renderAdminProductsTable(query = '') {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    const normalizedQuery = (query || '').toLowerCase().trim();
    const filtered = allProducts.filter(p => {
        if (!normalizedQuery) return true;
        return (p.name || '').toLowerCase().includes(normalizedQuery) ||
               (p.category || '').toLowerCase().includes(normalizedQuery) ||
               (p.description || '').toLowerCase().includes(normalizedQuery);
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 30px; color: #94a3b8;">No laptops found matching "${escapeHtml(query)}".</td></tr>`;
        return;
    }

    let html = '';
    filtered.forEach(prod => {
        const badgeClass = prod.badge ? `badge-${prod.badge.toLowerCase()}` : 'badge-none';
        const badgeText = prod.badge || '—';
        html += `
            <tr>
                <td><img src="${prod.image}" alt="${escapeHtml(prod.name)}" class="admin-prod-thumb" onerror="this.src='https://via.placeholder.com/50?text=Laptop'"></td>
                <td>
                    <strong style="color: var(--text-dark, #0f172a);">${escapeHtml(prod.name)}</strong>
                    <div style="font-size: 11.5px; color: #64748b;">${escapeHtml(prod.description || '')}</div>
                </td>
                <td><span style="text-transform: capitalize; font-weight: 500;">${escapeHtml(prod.category)}</span></td>
                <td>
                    <strong style="color: #16a34a;">$${prod.price}</strong>
                    ${prod.originalPrice ? `<span style="text-decoration: line-through; font-size: 11.5px; color: #94a3b8; margin-left: 4px;">$${prod.originalPrice}</span>` : ''}
                </td>
                <td><span class="admin-badge-pill ${badgeClass}">${badgeText}</span></td>
                <td>
                    <div class="admin-action-btns">
                        <button type="button" class="admin-btn-edit" onclick="openEditProductModal(${prod.id})">
                            <i class="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        <button type="button" class="admin-btn-delete" onclick="deleteProductById(${prod.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function filterAdminProductsTable() {
    const input = document.getElementById('adminProductSearch');
    renderAdminProductsTable(input ? input.value : '');
}

function renderAdminOrdersTable() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    const orders = JSON.parse(localStorage.getItem('kh_orders')) || [];

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 40px; color: #94a3b8;">
            <i class="fa-solid fa-inbox" style="font-size: 32px; display: block; margin-bottom: 8px;"></i>
            No customer orders received yet. When clients buy items via checkout, the slips and orders will appear here automatically!
        </td></tr>`;
        return;
    }

    let html = '';
    orders.forEach(order => {
        let itemsSnippet = '';
        if (Array.isArray(order.items)) {
            itemsSnippet = order.items.map(it => `• ${escapeHtml(it.name)} × ${it.quantity}`).join('<br>');
        }

        html += `
            <tr>
                <td><span class="order-id-badge">#${escapeHtml(order.id || 'N/A')}</span></td>
                <td><strong>${escapeHtml(order.customerName || 'Customer')}</strong></td>
                <td><a href="tel:${escapeHtml(order.customerPhone || '')}" class="order-phone-link">${escapeHtml(order.customerPhone || 'N/A')}</a></td>
                <td style="max-width: 180px; font-size: 12px;">${escapeHtml(order.customerAddress || 'N/A')}</td>
                <td><div class="order-items-snippet">${itemsSnippet}</div></td>
                <td><span class="order-total-cell">$${(parseFloat(order.total) || 0).toFixed(2)}</span></td>
                <td><span class="order-payment-pill">${escapeHtml(order.paymentMethod || 'COD')}</span></td>
                <td style="white-space: nowrap; font-size: 11.5px; color: #64748b;">${escapeHtml(order.date || 'Recent')}</td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function handleAdminAddProduct() {
    const name = document.getElementById('adminProdName')?.value.trim();
    const category = document.getElementById('adminProdCategory')?.value;
    const badge = document.getElementById('adminProdBadge')?.value;
    const price = parseFloat(document.getElementById('adminProdPrice')?.value);
    const originalPrice = document.getElementById('adminProdOriginalPrice')?.value ? parseFloat(document.getElementById('adminProdOriginalPrice').value) : null;
    const image = document.getElementById('adminProdImage')?.value.trim();
    const desc = document.getElementById('adminProdDesc')?.value.trim();

    const specCPU = document.getElementById('adminSpecCPU')?.value.trim();
    const specGPU = document.getElementById('adminSpecGPU')?.value.trim();
    const specRAM = document.getElementById('adminSpecRAM')?.value.trim();
    const specStorage = document.getElementById('adminSpecStorage')?.value.trim();
    const specDisplay = document.getElementById('adminSpecDisplay')?.value.trim();
    const specWeight = document.getElementById('adminSpecWeight')?.value.trim();

    if (!name || !category || isNaN(price) || !image || !desc) {
        showNotification('Please fill in all required fields marked with *', 3500);
        return;
    }

    const newProd = {
        id: Date.now(),
        name: name,
        category: category,
        price: price,
        originalPrice: originalPrice,
        badge: badge || null,
        image: image,
        rating: 5,
        reviews: 0,
        description: desc,
        specs: {
            'Processor': specCPU || 'Intel / AMD Processor',
            'Graphics': specGPU || 'Integrated Graphics',
            'RAM': specRAM || '16GB DDR5',
            'Storage': specStorage || '512GB SSD',
            'Display': specDisplay || '15.6" IPS Display',
            'Weight': specWeight || '1.8 kg'
        }
    };

    allProducts.unshift(newProd);
    saveStoredProducts(allProducts);

    renderProducts();
    updateAdminStats();
    renderAdminProductsTable();

    document.getElementById('adminAddProductForm')?.reset();
    showNotification(`Laptop "${name}" added to store! 🎉`, 3500);
    switchAdminTab(null, 'manageProducts');
}

function deleteProductById(productId) {
    const prod = allProducts.find(p => p.id === productId);
    const prodName = prod ? prod.name : 'this laptop';
    if (!confirm(`Are you sure you want to delete "${prodName}" from the store?`)) {
        return;
    }

    allProducts = allProducts.filter(p => p.id !== productId);
    saveStoredProducts(allProducts);

    renderProducts();
    updateAdminStats();
    renderAdminProductsTable();
    showNotification(`Deleted "${prodName}" from store.`, 3000);
}

function openEditProductModal(productId) {
    const prod = allProducts.find(p => p.id === productId);
    if (!prod) return;

    document.getElementById('editProdId').value = prod.id;
    document.getElementById('editProdName').value = prod.name;
    document.getElementById('editProdCategory').value = prod.category;
    document.getElementById('editProdBadge').value = prod.badge || '';
    document.getElementById('editProdPrice').value = prod.price;
    document.getElementById('editProdOriginalPrice').value = prod.originalPrice || '';
    document.getElementById('editProdImage').value = prod.image;
    document.getElementById('editProdDesc').value = prod.description;

    const specs = prod.specs || {};
    document.getElementById('editSpecCPU').value = specs['Processor'] || '';
    document.getElementById('editSpecGPU').value = specs['Graphics'] || '';
    document.getElementById('editSpecRAM').value = specs['RAM'] || '';
    document.getElementById('editSpecStorage').value = specs['Storage'] || '';
    document.getElementById('editSpecDisplay').value = specs['Display'] || '';
    document.getElementById('editSpecWeight').value = specs['Weight'] || '';

    const modal = document.getElementById('adminEditModal');
    if (modal) modal.classList.add('active');
}

function closeAdminEditModal() {
    const modal = document.getElementById('adminEditModal');
    if (modal) modal.classList.remove('active');
}

function saveEditedProduct() {
    const id = parseInt(document.getElementById('editProdId').value);
    const prodIndex = allProducts.findIndex(p => p.id === id);
    if (prodIndex === -1) return;

    const name = document.getElementById('editProdName').value.trim();
    const category = document.getElementById('editProdCategory').value;
    const badge = document.getElementById('editProdBadge').value;
    const price = parseFloat(document.getElementById('editProdPrice').value);
    const originalPrice = document.getElementById('editProdOriginalPrice').value ? parseFloat(document.getElementById('editProdOriginalPrice').value) : null;
    const image = document.getElementById('editProdImage').value.trim();
    const desc = document.getElementById('editProdDesc').value.trim();

    const specCPU = document.getElementById('editSpecCPU').value.trim();
    const specGPU = document.getElementById('editSpecGPU').value.trim();
    const specRAM = document.getElementById('editSpecRAM').value.trim();
    const specStorage = document.getElementById('editSpecStorage').value.trim();
    const specDisplay = document.getElementById('editSpecDisplay').value.trim();
    const specWeight = document.getElementById('editSpecWeight').value.trim();

    allProducts[prodIndex].name = name;
    allProducts[prodIndex].category = category;
    allProducts[prodIndex].badge = badge || null;
    allProducts[prodIndex].price = price;
    allProducts[prodIndex].originalPrice = originalPrice;
    allProducts[prodIndex].image = image;
    allProducts[prodIndex].description = desc;

    if (!allProducts[prodIndex].specs) allProducts[prodIndex].specs = {};
    if (specCPU) allProducts[prodIndex].specs['Processor'] = specCPU;
    if (specGPU) allProducts[prodIndex].specs['Graphics'] = specGPU;
    if (specRAM) allProducts[prodIndex].specs['RAM'] = specRAM;
    if (specStorage) allProducts[prodIndex].specs['Storage'] = specStorage;
    if (specDisplay) allProducts[prodIndex].specs['Display'] = specDisplay;
    if (specWeight) allProducts[prodIndex].specs['Weight'] = specWeight;

    saveStoredProducts(allProducts);
    renderProducts();
    updateAdminStats();
    renderAdminProductsTable();

    closeAdminEditModal();
    showNotification(`Laptop "${name}" updated successfully! ✏️`, 3500);
}

// ==================== CLOSE MODAL WHEN CLICKING OUTSIDE ====================
window.addEventListener('click', (event) => {
    const productModal = document.getElementById('productModal');
    const cartModal = document.getElementById('cartModal');
    const favoritesModal = document.getElementById('favoritesModal');
    const accountModal = document.getElementById('accountModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const orderSuccessModal = document.getElementById('orderSuccessModal');
    const adminDashboardModal = document.getElementById('adminDashboardModal');
    const adminEditModal = document.getElementById('adminEditModal');

    if (event.target === productModal) {
        closeModal();
    }
    if (event.target === cartModal) {
        closeCartModal();
    }
    if (event.target === favoritesModal) {
        closeFavoritesModal();
    }
    if (event.target === accountModal) {
        closeAccountModal();
    }
    if (event.target === checkoutModal) {
        closeCheckoutModal();
    }
    if (event.target === orderSuccessModal) {
        closeOrderSuccessModal();
    }
    if (event.target === adminDashboardModal) {
        closeAdminDashboard();
    }
    if (event.target === adminEditModal) {
        closeAdminEditModal();
    }
});

// ==================== LOAD MORE PRODUCTS ====================
const loadMoreBtn = document.querySelector('.load-more-btn');
loadMoreBtn.addEventListener('click', () => {
    const nextCount = displayedCount + 4;
    const newProducts = allProducts.slice(displayedCount, nextCount);
    
    if (newProducts.length > 0) {
        loadMoreBtn.textContent = 'Loading...';
        
        setTimeout(() => {
            products = allProducts.slice(0, nextCount);
            displayedCount = nextCount;
            renderProducts();
            
            // Restore wishlist states
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlist.forEach(productId => {
                const btn = document.querySelector(`.wishlist-btn[data-product-id="${productId}"]`);
                if (btn) {
                    btn.classList.add('active');
                    btn.textContent = '♥';
                }
            });
            
            loadMoreBtn.textContent = 'Load More Products';
            
            // Hide button if all products loaded
            if (displayedCount >= allProducts.length) {
                loadMoreBtn.style.display = 'none';
                showNotification('All products loaded!');
            }
        }, 500);
    }
});

// ==================== INITIALIZE ====================
function initStore() {
    updateAuthUI();
    renderProducts();
    updateCartBadge();
    if (loadMoreBtn && displayedCount >= allProducts.length) {
        loadMoreBtn.style.display = 'none';
    }
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.forEach(productId => {
        const btn = document.querySelector(`.wishlist-btn[data-product-id="${productId}"]`);
        if (btn) {
            btn.classList.add('active');
            btn.textContent = '♥';
        }
    });
    updateWishlistBadge();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStore);
} else {
    initStore();
}

function startCountdownTimer() {
    const daysEl = document.getElementById('timerDays');
    const hoursEl = document.getElementById('timerHours');
    const minutesEl = document.getElementById('timerMinutes');
    const secondsEl = document.getElementById('timerSeconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    let days = parseInt(daysEl.textContent) || 0;
    let hours = parseInt(hoursEl.textContent) || 0;
    let minutes = parseInt(minutesEl.textContent) || 0;
    let seconds = parseInt(secondsEl.textContent) || 0;

    const timerInterval = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        if (hours < 0) {
            hours = 23;
            days--;
        }
        if (days < 0) {
            clearInterval(timerInterval);
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ==================== DEAL FILTERS ====================
function filterDeals(filterType, event) {
    const dealCards = document.querySelectorAll('.deal-card');
    const filterBtns = document.querySelectorAll('.deal-filter-btn');

    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filterType);
    });

    // Filter cards
    dealCards.forEach(card => {
        if (filterType === 'all') {
            card.classList.remove('hidden');
            card.style.animation = 'slideIn 0.3s ease';
        } else {
            if (card.getAttribute('data-deal-type') === filterType) {
                card.classList.remove('hidden');
                card.style.animation = 'slideIn 0.3s ease';
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

function viewAllDeals() {
    const hiddenDeals = document.querySelectorAll('.deal-card.hidden');
    if (hiddenDeals.length === 0) {
        showDealNotification('No more deals to load.', 'info');
        return;
    }

    hiddenDeals.forEach(card => {
        card.classList.remove('hidden');
        card.style.animation = 'slideIn 0.3s ease';
    });

    showDealNotification('Loaded more deals!', 'success');
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.textContent = 'All Deals Loaded';
        viewAllBtn.disabled = true;
        viewAllBtn.style.opacity = '0.65';
        viewAllBtn.style.cursor = 'not-allowed';
    }
}

// ==================== ADD DEAL TO CART ====================
function addDealToCart(event, productName, price) {
    if (event) {
        event.preventDefault();
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            name: productName,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    let storedCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    storedCartCount++;
    cartCount = storedCartCount;
    localStorage.setItem('cartCount', storedCartCount);

    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.textContent = storedCartCount;
        cartBadge.style.display = 'flex';
    }

    showDealNotification(`${productName} added to cart! 🎉`, 'success');
    openCart();

    const btn = event?.target;
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Added to Cart';
        btn.style.backgroundColor = 'var(--secondary-color)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
        }, 2000);
    }
}

// ==================== TOGGLE DEAL WISHLIST ====================
function toggleDealWishlist(event) {
    event.preventDefault();
    const btn = event.target.closest('.deal-wishlist, .modal-btn.secondary');
    if (!btn) return;
    const isModalButton = btn.classList.contains('modal-btn') && btn.classList.contains('secondary');

    btn.classList.toggle('active');
    if (isModalButton) {
        btn.textContent = btn.classList.contains('active') ? '♥ Wishlist' : '♡ Wishlist';
    } else {
        btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    }

    let productName = '';
    const card = btn.closest('.deal-card');
    if (card) {
        productName = card.querySelector('.deal-product-name').textContent;
    } else {
        const modalTitle = btn.closest('.modal-content')?.querySelector('h2');
        productName = modalTitle ? modalTitle.textContent : '';
    }

    if (btn.classList.contains('active')) {
        showDealNotification(`${productName} added to favorites! ♥`, 'success');
    } else {
        showDealNotification(`Removed from favorites`, 'info');
    }

    let dealWishlist = JSON.parse(localStorage.getItem('dealWishlist')) || [];
    if (btn.classList.contains('active')) {
        if (productName && !dealWishlist.includes(productName)) {
            dealWishlist.push(productName);
        }
    } else {
        dealWishlist = dealWishlist.filter(name => name !== productName);
    }
    localStorage.setItem('dealWishlist', JSON.stringify(dealWishlist));
    updateWishlistBadge();

    if (productName && isModalButton) {
        const matchingCardBtn = Array.from(document.querySelectorAll('.deal-wishlist')).find(cardBtn => {
            const cardName = cardBtn.closest('.deal-card')?.querySelector('.deal-product-name')?.textContent;
            return cardName === productName;
        });
        if (matchingCardBtn) {
            matchingCardBtn.classList.toggle('active', btn.classList.contains('active'));
            matchingCardBtn.textContent = btn.classList.contains('active') ? '♥' : '♡';
        }
    }
}

// ==================== DEAL NOTIFICATIONS ====================
function showDealNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;

    let bgColor = 'var(--secondary-color)';
    if (type === 'info') bgColor = 'var(--primary-color)';
    if (type === 'error') bgColor = '#d32f2f';

    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        font-size: 14px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== VIEW ALL DEALS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Hide extra deal cards so View All Deals can load them on demand
    const dealCards = document.querySelectorAll('.deal-card');
    dealCards.forEach((card, index) => {
        if (index >= 4) {
            card.classList.add('hidden');
        }
    });

    // Start countdown timer
    startCountdownTimer();

    // Load wishlist
    loadDealWishlist();
});

// ==================== LOAD DEAL WISHLIST ====================
function loadDealWishlist() {
    let dealWishlist = JSON.parse(localStorage.getItem('dealWishlist')) || [];
    const wishlistBtns = document.querySelectorAll('.deal-wishlist');

    wishlistBtns.forEach(btn => {
        const productName = btn.closest('.deal-card').querySelector('.deal-product-name').textContent;
        if (dealWishlist.includes(productName)) {
            btn.classList.add('active');
            btn.textContent = '♥';
        }
    });

    updateWishlistBadge();
}

// ==================== DEAL CARD CLICK MODAL ====================
document.addEventListener('DOMContentLoaded', () => {
    const dealCards = document.querySelectorAll('.deal-card');

    dealCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on buttons
            if (e.target.closest('button')) return;

            openDealModal(card);
        });
    });
});

function openDealModal(card) {
    const productName = card.querySelector('.deal-product-name').textContent;
    const image = card.querySelector('.deal-image img').src;
    const price = card.querySelector('.deal-current-price').textContent;
    const originalPrice = card.querySelector('.deal-original-price').textContent;
    const description = card.querySelector('.deal-description').textContent;
    const discount = card.querySelector('.discount-percent').textContent;
    const savings = card.querySelector('.discount-off').textContent;
    const rating = card.querySelector('.rating-stars').textContent;
    const reviews = card.querySelector('.rating-count').textContent;

    const dealWishlist = JSON.parse(localStorage.getItem('dealWishlist')) || [];
    const isDealFavorited = productName && dealWishlist.includes(productName);
    const wishlistButtonText = isDealFavorited ? '♥ Wishlist' : '♡ Wishlist';
    const wishlistButtonClass = isDealFavorited ? 'modal-btn secondary active' : 'modal-btn secondary';

    const modal = document.createElement('div');
    modal.className = 'deal-modal show';
    modal.id = 'dealModal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeDealModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeDealModal()">&times;</button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${image}" alt="${productName}">
                </div>
                <div class="modal-info">
                    <h2>${productName}</h2>
                    <div class="modal-rating">
                        <span class="rating-stars">${rating}</span>
                        <span class="rating-count">${reviews}</span>
                    </div>
                    <p class="modal-description">${description}</p>
                    
                    <div class="modal-price">
                        <span class="current-price">${price}</span>
                        <span class="original-price">${originalPrice}</span>
                    </div>
                    
                    <div class="modal-discount">
                        <span class="discount-label">${discount}</span>
                        <span class="discount-savings">${savings}</span>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="modal-btn primary" onclick="addDealToCart(event, '${productName}', ${price.replace('$', '')})">Buy Now - ${price}</button>
                        <button class="${wishlistButtonClass}" onclick="toggleDealWishlist(event)">${wishlistButtonText}</button>
                    </div>
                    
                    <div class="modal-benefits">
                        <h4>Special Benefits:</h4>
                        <ul>
                            <li>✓ Free shipping on orders over $500</li>
                            <li>✓ 2-year warranty included</li>
                            <li>✓ 30-day money-back guarantee</li>
                            <li>✓ 24/7 customer support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles if not exists
    if (!document.getElementById('dealModalStyles')) {
        addDealModalStyles();
    }

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDealModal();
        }
    });
}

function closeDealModal() {
    const modal = document.getElementById('dealModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function addDealModalStyles() {
    const style = document.createElement('style');
    style.id = 'dealModalStyles';
    style.textContent = `
        .deal-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3000;
        }

        .deal-modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }

        .deal-modal .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            cursor: pointer;
        }

        .deal-modal .modal-content {
            position: relative;
            background-color: white;
            border-radius: 12px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(211, 47, 47, 0.3);
            z-index: 3001;
        }

        .deal-modal .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: white;
            border: 2px solid #dadce0;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .deal-modal .modal-close:hover {
            background-color: #f1f3f4;
            transform: rotate(90deg);
        }

        .deal-modal .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            padding: 30px;
        }

        .deal-modal .modal-image {
            position: relative;
        }

        .deal-modal .modal-image img {
            width: 100%;
            border-radius: 8px;
            background-color: #f1f3f4;
        }

        .deal-modal .modal-info {
            display: flex;
            flex-direction: column;
        }

        .deal-modal .modal-info h2 {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--text-dark);
        }

        .deal-modal .modal-description {
            font-size: 15px;
            color: var(--text-light);
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .deal-modal .modal-price {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 15px;
        }

        .deal-modal .current-price {
            font-size: 26px;
            font-weight: 700;
            color: #d32f2f;
        }

        .deal-modal .original-price {
            font-size: 16px;
            color: var(--text-light);
            text-decoration: line-through;
        }

        .deal-modal .modal-discount {
            background: linear-gradient(135deg, #ffebee, #ffcdd2);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .deal-modal .discount-label {
            background: linear-gradient(135deg, #d32f2f, #ff5252);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 16px;
        }

        .deal-modal .discount-savings {
            color: #d32f2f;
            font-weight: 600;
        }

        .deal-modal .modal-actions {
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
        }

        .deal-modal .modal-btn {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
        }

        .deal-modal .modal-btn.primary {
            background: linear-gradient(135deg, #d32f2f, #ff5252);
            color: white;
        }

        .deal-modal .modal-btn.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(211, 47, 47, 0.3);
        }

        .deal-modal .modal-btn.secondary {
            background-color: white;
            border: 2px solid #d32f2f;
            color: #d32f2f;
        }

        .deal-modal .modal-btn.secondary:hover {
            background-color: #ffebee;
        }

        .deal-modal .modal-benefits {
            border-top: 1px solid #dadce0;
            padding-top: 20px;
        }

        .deal-modal .modal-benefits h4 {
            margin-bottom: 12px;
            font-weight: 600;
        }

        .deal-modal .modal-benefits ul {
            list-style: none;
            padding: 0;
        }

        .deal-modal .modal-benefits li {
            padding: 6px 0;
            font-size: 14px;
            color: var(--text-dark);
        }

        @media (max-width: 768px) {
            .deal-modal .modal-body {
                grid-template-columns: 1fr;
                gap: 20px;
                padding: 20px;
            }

            .deal-modal .modal-info h2 {
                font-size: 20px;
            }

            .deal-modal .current-price {
                font-size: 22px;
            }

            .deal-modal .modal-actions {
                flex-direction: column;
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ==================== INITIALIZE ====================
console.log('Deals section initialized successfully!');

document.addEventListener("DOMContentLoaded", () => {
    const imageWrapper = document.querySelector('.about-image-wrapper');
    if (!imageWrapper) return;

    // Set initial invisible state dynamically via JS
    imageWrapper.style.opacity = "0";
    imageWrapper.style.transform = "translateX(50px)";
    imageWrapper.style.transition = "all 0.8s ease-out";

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger the animation
                imageWrapper.style.opacity = "1";
                imageWrapper.style.transform = "translateX(0)";
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    scrollObserver.observe(imageWrapper);
});

// Contact selection

// Function to dynamic link or handle copy events cleanly
function handleContact(platform, destination) {
    let url = '';
    
    switch(platform) {
        case 'telegram':
            // Removes '@' and links out
            url = `https://t.me/${destination.replace('@', '')}`;
            break;
        case 'facebook':
            url = `https://facebook.com/${destination}`;
            break;
        case 'phone':
            url = `tel:${destination.replace(/\s+/g, '')}`;
            break;
        case 'maps':
            url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
            break;
        default:
            return;
    }

    // Opens up the platform target smoothly in a separate browser tab
    if (url) {
        window.open(url, '_blank');
    }
}


