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

// ==================== SECTION VISIBILITY ====================
const aboutSection = document.getElementById('about');
const contactSection = document.getElementById('contact');
const homeSection = document.getElementById('home');
const productsSection = document.getElementById('products');
const dealsSection = document.getElementById('deals');

// Hide About and Contact sections on page load
if (aboutSection) aboutSection.classList.add('section-hidden');
if (contactSection) contactSection.classList.add('section-hidden');

// Add click handlers for About and Contact nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Handle About link - show only About
        if (href === '#about') {
            e.preventDefault();
            if (aboutSection) {
                aboutSection.classList.remove('section-hidden');
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (contactSection) contactSection.classList.add('section-hidden');
            if (homeSection) homeSection.classList.add('section-hidden');
            if (productsSection) productsSection.classList.add('section-hidden');
            if (dealsSection) dealsSection.classList.add('section-hidden');
        }
        
        // Handle Contact link - show only Contact
        if (href === '#contact') {
            e.preventDefault();
            if (contactSection) {
                contactSection.classList.remove('section-hidden');
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (aboutSection) aboutSection.classList.add('section-hidden');
            if (homeSection) homeSection.classList.add('section-hidden');
            if (productsSection) productsSection.classList.add('section-hidden');
            if (dealsSection) dealsSection.classList.add('section-hidden');
        }
        
        // Show only the clicked section when navigating to Home, Products, or Deals
        if (href === '#home') {
            if (homeSection) homeSection.classList.remove('section-hidden');
            if (productsSection) productsSection.classList.remove('section-hidden');
            if (dealsSection) dealsSection.classList.remove('section-hidden');
            if (aboutSection) aboutSection.classList.add('section-hidden');
            if (contactSection) contactSection.classList.add('section-hidden');
        }
        
        if (href === '#products') {
            if (productsSection) productsSection.classList.remove('section-hidden');
            if (homeSection) homeSection.classList.add('section-hidden');
            if (aboutSection) aboutSection.classList.add('section-hidden');
            if (contactSection) contactSection.classList.add('section-hidden');
            if (dealsSection) dealsSection.classList.add('section-hidden');
        }
        
        if (href === '#deals') {
            if (dealsSection) dealsSection.classList.remove('section-hidden');
            if (homeSection) homeSection.classList.add('section-hidden');
            if (aboutSection) aboutSection.classList.add('section-hidden');
            if (contactSection) contactSection.classList.add('section-hidden');
            if (productsSection) productsSection.classList.add('section-hidden');
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

    filterBtns.forEach(b => b.classList.remove('active'));
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
        message.textContent = 'Invalid email or password. Use admin@khcomputer.com (admin123) for Admin, or register below!';
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
document.querySelector('.cta-button').addEventListener('click', () => {
    alert('Redirecting to products page...\n\nThis would navigate to the products section.');
});

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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Product Selection 

// Product Data
const defaultProducts = [
    {
        id: 1,
        name: 'ROG Strix G16',
        category: 'gaming',
        price: 2499,
        originalPrice: 2999,
        badge: 'Sale',
        image: 'https://dlcdnwebimgs.asus.com/files/media/601ee339-f392-4b62-87c3-972107bda726/v1/img/gaming/pd.jpg',
        rating: 5,
        reviews: 248,
        description: 'Intel i9, RTX 4080, 32GB RAM, 1TB SSD',
        specs: {
            'Processor': 'Intel Core i9-13th Gen',
            'Graphics': 'NVIDIA RTX 4080',
            'RAM': '32GB DDR5',
            'Storage': '1TB NVMe SSD',
            'Display': '16" 144Hz IPS',
            'Weight': '2.4 kg'
        }
    },
    {
        id: 2,
        name: 'Dell XPS 15 Business',
        category: 'business',
        price: 1799,
        originalPrice: 1999,
        badge: null,
        image: 'https://m.media-amazon.com/images/I/81ErR1l0ToL._AC_UF894,1000_QL80_.jpg',
        rating: 4,
        reviews: 156,
        description: 'Intel i7, 16GB RAM, 512GB SSD, 15.6" 4K',
        specs: {
            'Processor': 'Intel Core i7-13th Gen',
            'Graphics': 'Intel Iris Xe',
            'RAM': '16GB DDR5',
            'Storage': '512GB NVMe SSD',
            'Display': '15.6" 4K OLED',
            'Weight': '2.0 kg'
        }
    },
    {
        id: 3,
        name: 'MacBook Pro 16"',
        category: 'ultrabook',
        price: 3499,
        originalPrice: null,
        badge: 'Hot',
        image: 'https://photos5.appleinsider.com/gallery/45240-88149-The-new-MacBook-Pro-16-inch-xl.jpg',
        rating: 5,
        reviews: 512,
        description: 'M3 Max, 36GB RAM, 1TB SSD, 16" Retina',
        specs: {
            'Processor': 'Apple M3 Max',
            'Graphics': '19-core GPU',
            'RAM': '36GB Unified Memory',
            'Storage': '1TB SSD',
            'Display': '16" Liquid Retina XDR',
            'Weight': '2.1 kg'
        }
    },
    {
        id: 4,
        name: 'HP Pavilion 15',
        category: 'budget',
        price: 549,
        originalPrice: 649,
        badge: 'New',
        image: 'https://laptopmedia.com/wp-content/uploads/2022/01/hppaviliongaming1515-dk2000featured.jpg',
        rating: 4,
        reviews: 89,
        description: 'AMD Ryzen 5, 8GB RAM, 256GB SSD',
        specs: {
            'Processor': 'AMD Ryzen 5 5500U',
            'Graphics': 'Radeon Graphics',
            'RAM': '8GB DDR4',
            'Storage': '256GB SSD',
            'Display': '15.6" FHD',
            'Weight': '1.74 kg'
        }
    },
    {
        id: 5,
        name: 'MSI Raider GE77',
        category: 'gaming',
        price: 2799,
        originalPrice: 3299,
        badge: null,
        image: 'https://www.stuff.tv/wp-content/uploads/sites/2/2022/09/MSI-Raider-GE77HX-12UHS-review-lead.jpg?quality=75&w=1080',
        rating: 5,
        reviews: 324,
        description: 'Intel i9, RTX 4090, 32GB RAM, 1TB SSD',
        specs: {
            'Processor': 'Intel Core i9-12th Gen',
            'Graphics': 'NVIDIA RTX 4090',
            'RAM': '32GB DDR5',
            'Storage': '1TB NVMe SSD',
            'Display': '17.3" 240Hz IPS',
            'Weight': '2.7 kg'
        }
    },
    {
        id: 6,
        name: 'Lenovo ThinkPad X1',
        category: 'business',
        price: 1299,
        originalPrice: 1499,
        badge: 'Sale',
        image: 'https://m.media-amazon.com/images/I/61GSvJjxBuL.jpg',
        rating: 4,
        reviews: 201,
        description: 'Intel i7, 16GB RAM, 512GB SSD, 14" FHD',
        specs: {
            'Processor': 'Intel Core i7-13th Gen',
            'Graphics': 'Intel Iris Xe',
            'RAM': '16GB DDR5',
            'Storage': '512GB SSD',
            'Display': '14" FHD IPS',
            'Weight': '1.18 kg'
        }
    },
    {
        id: 7,
        name: 'ASUS ZenBook 14',
        category: 'ultrabook',
        price: 999,
        originalPrice: 1199,
        badge: null,
        image: 'https://wifihifi.com/wp-content/uploads/2024/03/Understated-clean-design-with-light-metals-and-no-seams.jpg',
        rating: 5,
        reviews: 167,
        description: 'Intel i7, 16GB RAM, 512GB SSD, 14" OLED',
        specs: {
            'Processor': 'Intel Core i7-13th Gen',
            'Graphics': 'Intel Iris Xe',
            'RAM': '16GB LPDDR5',
            'Storage': '512GB SSD',
            'Display': '14" OLED 2.8K',
            'Weight': '1.19 kg'
        }
    },
    {
        id: 8,
        name: 'Acer Aspire 5',
        category: 'budget',
        price: 699,
        originalPrice: null,
        badge: null,
        image: 'https://m.media-amazon.com/images/I/71vvXGmdKWL.jpg',
        rating: 3,
        reviews: 73,
        description: 'AMD Ryzen 7, 8GB RAM, 512GB SSD',
        specs: {
            'Processor': 'AMD Ryzen 7 5700U',
            'Graphics': 'Radeon Graphics',
            'RAM': '8GB DDR4',
            'Storage': '512GB SSD',
            'Display': '15.6" FHD IPS',
            'Weight': '1.9 kg'
        }
    },
    {
        id: 9,
        name: 'Razer Blade 15',
        category: 'gaming',
        price: 2199,
        originalPrice: 2499,
        badge: 'Hot',
        image: 'https://thetechrevolutionist.com/wp-content/uploads/2019/08/IMG_20190803_153212.jpg',
        rating: 5,
        reviews: 289,
        description: 'Intel i7, RTX 4070, 16GB RAM, 512GB SSD',
        specs: {
            'Processor': 'Intel Core i7-13th Gen',
            'Graphics': 'NVIDIA RTX 4070',
            'RAM': '16GB DDR5',
            'Storage': '512GB SSD',
            'Display': '15.6" 144Hz QHD',
            'Weight': '2.01 kg'
        }
    },
    {
        id: 10,
        name: 'HP EliteBook 840',
        category: 'business',
        price: 1599,
        originalPrice: 1899,
        badge: null,
        image: 'https://images.pcliquidations.com/images/isaac/152/152094t550.jpg',
        rating: 4,
        reviews: 145,
        description: 'Intel i7, 16GB RAM, 512GB SSD, 14" FHD',
        specs: {
            'Processor': 'Intel Core i7-11th Gen',
            'Graphics': 'Intel Iris Xe',
            'RAM': '16GB DDR4',
            'Storage': '512GB SSD',
            'Display': '14" FHD IPS',
            'Weight': '1.36 kg'
        }
    },
    {
        id: 11,
        name: 'LG Gram 17',
        category: 'ultrabook',
        price: 1299,
        originalPrice: 1599,
        badge: 'New',
        image: 'https://media.wired.com/photos/6671dc7254566d243dc60580/master/pass/LG-Gram-Pro-Laptop-front-Abstract-Background-SOURCE-LG.jpg',
        rating: 5,
        reviews: 198,
        description: 'Intel i7, 16GB RAM, 512GB SSD, 17" OLED',
        specs: {
            'Processor': 'Intel Core i7-13th Gen',
            'Graphics': 'Intel Iris Xe',
            'RAM': '16GB DDR5',
            'Storage': '512GB SSD',
            'Display': '17" OLED',
            'Weight': '1.35 kg'
        }
    },
    {
        id: 12,
        name: 'Asus VivoBook 14',
        category: 'budget',
        price: 479,
        originalPrice: 599,
        badge: 'Sale',
        image: 'https://bmsc-cambodia.com/wp-content/uploads/2024/11/ASUS-Vivobook-14-X1400KA-EK196W.webp',
        rating: 4,
        reviews: 156,
        description: 'AMD Ryzen 5, 8GB RAM, 256GB SSD',
        specs: {
            'Processor': 'AMD Ryzen 5 5500U',
            'Graphics': 'Radeon Graphics',
            'RAM': '8GB DDR4',
            'Storage': '256GB SSD',
            'Display': '14" FHD IPS',
            'Weight': '1.4 kg'
        }
    },
    {
        id: 13,
        name: 'ASUS TUF Gaming A16',
        category: 'gaming',
        price: 1899,
        originalPrice: 2199,
        badge: null,
        image: 'https://www.asus.com/media/Oled-2.png',
        rating: 5,
        reviews: 267,
        description: 'Intel i9, RTX 4070, 32GB RAM, 1TB SSD',
        specs: {
            'Processor': 'Intel Core i9-13th Gen',
            'Graphics': 'NVIDIA RTX 4070',
            'RAM': '32GB DDR5',
            'Storage': '1TB SSD',
            'Display': '16" 240Hz IPS',
            'Weight': '2.5 kg'
        }
    },
    {
        id: 14,
        name: 'Dell Latitude 5550',
        category: 'business',
        price: 1099,
        originalPrice: 1299,
        badge: 'Hot',
        image: 'https://i.dell.com/is/image/DellContent/contexts/zinc/hero-sections/open-graph/Dell_Latitude_5550_social-media.jpg',
        rating: 4,
        reviews: 134,
        description: 'Intel i5, 8GB RAM, 256GB SSD, 15.6" FHD',
        specs: {
            'Processor': 'Intel Core i5-13th Gen',
            'Graphics': 'Intel UHD Graphics',
            'RAM': '8GB DDR5',
            'Storage': '256GB SSD',
            'Display': '15.6" FHD IPS',
            'Weight': '1.64 kg'
        }
    },
    {
        id: 15,
        name: 'MacBook Air M2',
        category: 'ultrabook',
        price: 1599,
        originalPrice: 1799,
        badge: 'New',
        image: 'https://www.apple.com/macbook-air/images/overview/performance_image__c1kdhkq5n2cy_large.jpg',
        rating: 5,
        reviews: 456,
        description: 'M2 Chip, 8GB RAM, 256GB SSD, 13" Retina',
        specs: {
            'Processor': 'Apple M2',
            'Graphics': '10-core GPU',
            'RAM': '8GB Unified Memory',
            'Storage': '256GB SSD',
            'Display': '13.6" Liquid Retina',
            'Weight': '1.24 kg'
        }
    },
    {
        id: 16,
        name: 'Lenovo Yoga Slim 7',
        category: 'budget',
        price: 799,
        originalPrice: 999,
        badge: 'Sale',
        image: 'https://p3-ofp.static.pub/fes/cms/2022/12/20/p8q1kydszu0hxyqp8zf2zxfbvvgh59.png',
        rating: 4,
        reviews: 189,
        description: 'AMD Ryzen 7, 16GB RAM, 512GB SSD',
        specs: {
            'Processor': 'AMD Ryzen 7 5700U',
            'Graphics': 'Radeon Graphics',
            'RAM': '16GB DDR4',
            'Storage': '512GB SSD',
            'Display': '14" FHD IPS',
            'Weight': '1.65 kg'
        }
    }
];

// ==================== PRODUCT PERSISTENCE & STORE INITIALIZATION ====================
function getStoredProducts() {
    const stored = localStorage.getItem('kh_products');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        } catch (e) {
            console.error('Failed to parse kh_products from localStorage', e);
        }
    }
    localStorage.setItem('kh_products', JSON.stringify(defaultProducts));
    return defaultProducts.slice();
}

function saveStoredProducts(productsList) {
    localStorage.setItem('kh_products', JSON.stringify(productsList));
    allProducts = productsList;
}

let allProducts = getStoredProducts();
let displayedCount = 8;
let products = allProducts.slice(0, displayedCount);

// ==================== RENDER PRODUCTS ====================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Update current product slice
    products = allProducts.slice(0, displayedCount);

    const currentUser = getCurrentUser();
    const isAdmin = currentUser && currentUser.role === 'admin';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
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

// ==================== OPEN PRODUCT DETAIL MODAL ====================
function openProductDetail(product) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');

    modalTitle.textContent = product.name;

    let specsHTML = '';
    for (const [key, value] of Object.entries(product.specs)) {
        specsHTML += `
            <div class="spec-item">
                <span class="spec-label">${key}</span>
                <span class="spec-value">${value}</span>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <div class="detail-container">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <h3>${product.name}</h3>
                <div class="detail-rating">
                    <span class="stars-large">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</span>
                    <span class="review-count">${product.reviews} reviews</span>
                </div>
                <div class="detail-price">$${product.price}</div>
                <div class="detail-specs">
                    ${specsHTML}
                </div>
                <p class="detail-description">${product.description}</p>
                <div class="detail-buttons">
                    <button class="detail-add-cart" onclick="addProductToCart(${product.id})">Add to Cart</button>
                    <button class="detail-wishlist" data-product-id="${product.id}" onclick="toggleWishlistDetail(event)">♡ Wishlist</button>
                </div>
            </div>
        </div>
    `;

    // Hide all sections and show only product detail
    if (homeSection) homeSection.classList.add('section-hidden');
    if (productsSection) productsSection.classList.add('section-hidden');
    if (dealsSection) dealsSection.classList.add('section-hidden');
    if (aboutSection) aboutSection.classList.add('section-hidden');
    if (contactSection) contactSection.classList.add('section-hidden');
    
    // Show the product detail modal as a section
    modal.classList.remove('section-hidden');
    modal.classList.add('active');
    modal.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update wishlist button state
    const wishlistBtn = modalBody.querySelector('.detail-wishlist');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.includes(product.id)) {
        wishlistBtn.classList.add('active');
    }
}

// ==================== CLOSE MODAL ====================
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    modal.classList.add('section-hidden');
    
    // Show products section again
    if (productsSection) {
        productsSection.classList.remove('section-hidden');
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

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
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    renderProducts();
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.forEach(productId => {
        const btn = document.querySelector(`.wishlist-btn[data-product-id="${productId}"]`);
        if (btn) {
            btn.classList.add('active');
            btn.textContent = '♥';
        }
    });
    updateWishlistBadge();
});

function startCountdownTimer() {
    // Main deal timer
    const timerInterval = setInterval(() => {
        let days = parseInt(document.getElementById('timerDays').textContent);
        let hours = parseInt(document.getElementById('timerHours').textContent);
        let minutes = parseInt(document.getElementById('timerMinutes').textContent);
        let seconds = parseInt(document.getElementById('timerSeconds').textContent);

        // Decrease seconds
        seconds--;

        // Handle time overflow
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

        // Update display with leading zeros
        document.getElementById('timerDays').textContent = String(days).padStart(2, '0');
        document.getElementById('timerHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('timerMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('timerSeconds').textContent = String(seconds).padStart(2, '0');
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

