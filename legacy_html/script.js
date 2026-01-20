document.addEventListener('DOMContentLoaded', () => {
    console.log('CarMazium loaded');

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Theme Toggle (Placeholder for now)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode'); // Example class
            const icon = themeToggle.querySelector('i');
            if (icon.classList.contains('fa-sun')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }

    // Dashboard Sidebar Navigation
    const dashboardLinks = document.querySelectorAll('.dashboard-sidebar-nav a');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    if (dashboardLinks.length > 0) {
        dashboardLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all links
                dashboardLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');

                // Hide all sections
                dashboardSections.forEach(section => section.style.display = 'none');

                // Show target section
                const targetId = link.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    // The original instruction had this line here, but it was syntactically incorrect
                    // as targetSection was not yet defined at that point in the snippet.
                    // Keeping the original logic of adding 'active' to the link.
                    // if (targetSection) {
                    //     targetSection.classList.add('active');
                    // }
                }
            });
        });
    }

    // Wizard Step Logic
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const steps = document.querySelectorAll('.wizard-steps .step');
    const stepContents = document.querySelectorAll('.wizard-step-content');

    function showStep(stepIndex) {
        // Update Steps Indicator
        steps.forEach(s => s.classList.remove('active'));
        steps.forEach(s => {
            if (parseInt(s.getAttribute('data-step')) <= stepIndex) {
                s.classList.add('active');
            }
        });

        // Update Step Content
        stepContents.forEach(content => content.style.display = 'none');
        document.querySelector(`.wizard-step-content[data-step="${stepIndex}"]`).style.display = 'block';
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = parseInt(btn.closest('.wizard-step-content').getAttribute('data-step'));
            showStep(currentStep + 1);
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = parseInt(btn.closest('.wizard-step-content').getAttribute('data-step'));
            showStep(currentStep - 1);
        });
    });

    // Pricing Type Toggle (Fixed vs Auction)
    const pricingRadios = document.querySelectorAll('input[name="listing_type"]');
    const fixedPricingDiv = document.getElementById('pricing-fixed');
    const auctionPricingDiv = document.getElementById('pricing-auction');

    if (pricingRadios.length > 0) {
        pricingRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'fixed') {
                    fixedPricingDiv.style.display = 'block';
                    auctionPricingDiv.style.display = 'none';
                } else {
                    fixedPricingDiv.style.display = 'none';
                    auctionPricingDiv.style.display = 'block';
                }
            });
        });
    }

    // Custom Select Logic (Moved to main scope)
    const customSelectWrapper = document.querySelector('.custom-select-wrapper');
    if (customSelectWrapper) {
        const trigger = customSelectWrapper.querySelector('.custom-select-trigger');
        const optionsContainer = customSelectWrapper.querySelector('.custom-options');
        const options = customSelectWrapper.querySelectorAll('.custom-option');
        const hiddenInput = customSelectWrapper.querySelector('#selected-role');
        const triggerSpan = trigger.querySelector('span');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing immediately
            const isVisible = optionsContainer.style.display === 'flex';
            optionsContainer.style.display = isVisible ? 'none' : 'flex';
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all
                options.forEach(opt => opt.classList.remove('selected'));
                // Add to clicked
                option.classList.add('selected');

                // Update trigger text and icon
                const iconClass = option.querySelector('i').className;
                const titleText = option.querySelector('div > div:first-child').textContent;

                triggerSpan.innerHTML = `<i class="${iconClass}"></i> <span>${titleText}</span>`;

                // Update Value
                hiddenInput.value = option.getAttribute('data-value');

                // Close dropdown
                optionsContainer.style.display = 'none';
            });
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!customSelectWrapper.contains(e.target)) {
                optionsContainer.style.display = 'none';
            }
        });
    }

    // Finance Calculator Logic
    const calcSubmit = document.getElementById('calc-submit');
    const calcReset = document.getElementById('calc-reset');

    if (calcSubmit) {
        calcSubmit.addEventListener('click', () => {
            const price = parseFloat(document.getElementById('calc-price').value) || 0;
            const deposit = parseFloat(document.getElementById('calc-deposit').value) || 0;
            const rate = parseFloat(document.getElementById('calc-rate').value) || 0;
            const term = parseFloat(document.getElementById('calc-term').value) || 0;

            if (price > 0 && term > 0) {
                const loanAmount = price - deposit;
                const monthlyRate = (rate / 100) / 12;

                let monthlyPayment = 0;
                if (rate === 0) {
                    monthlyPayment = loanAmount / term;
                } else {
                    monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
                }

                // Display Result
                const resultDiv = document.getElementById('calc-result');
                const paymentSpan = document.getElementById('monthly-payment');

                paymentSpan.textContent = monthlyPayment.toFixed(2);
                resultDiv.style.display = 'block';

                // Add simple animation
                resultDiv.animate([
                    { opacity: 0, transform: 'translateY(10px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 400,
                    easing: 'ease-out'
                });
            }
        });
    }

    if (calcReset) {
        calcReset.addEventListener('click', () => {
            document.getElementById('calc-price').value = '';
            document.getElementById('calc-deposit').value = '';
            document.getElementById('calc-rate').value = '';
            document.getElementById('calc-term').value = '';
            document.getElementById('calc-result').style.display = 'none';
        });
    }

    // Initialize Mazium AI Widget
    if (typeof initMaziumWidget === 'function') {
        initMaziumWidget();
    }
});

function initMaziumWidget() {
    // 1. Create HTML Structure
    const widgetHTML = `
        <!-- Floating Bubble -->
        <div class="mazium-bubble" id="maziumBubble">
            <i class="fas fa-robot"></i>
        </div>

        <!-- Chat Window -->
        <div class="mazium-window" id="maziumWindow">
            <div class="mazium-header">
                <div class="mazium-title">
                    <span class="status-dot"></span>
                    Mazium 2.0
                </div>
                <button class="close-btn" id="closeMazium"><i class="fas fa-times"></i></button>
            </div>
            <div class="mazium-body" style="height: 350px;">
                <div class="message bot">
                    Hello! I'm Mazium 2.0, your AI automotive assistant. How can I help you find your dream car today?
                </div>
            </div>
            <div class="mazium-footer">
                <input type="text" class="mazium-input" placeholder="Ask anything..." id="maziumInput">
                <button class="send-btn"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;

    // 2. Inject into Body
    const widgetContainer = document.createElement('div');
    widgetContainer.innerHTML = widgetHTML;
    document.body.appendChild(widgetContainer);

    // 3. Add Event Listeners
    const bubble = document.getElementById('maziumBubble');
    const windowEl = document.getElementById('maziumWindow');
    const closeBtn = document.getElementById('closeMazium');
    const input = document.getElementById('maziumInput');
    const sendBtn = document.querySelector('.send-btn');
    const body = document.querySelector('.mazium-body');

    if (!bubble || !windowEl) return;

    // Toggle Window
    bubble.addEventListener('click', () => {
        if (windowEl.style.display === 'flex') {
            windowEl.style.display = 'none';
            bubble.innerHTML = '<i class="fas fa-robot"></i>';
        } else {
            windowEl.style.display = 'flex';
            bubble.innerHTML = '<i class="fas fa-chevron-down"></i>';
            setTimeout(() => input.focus(), 100);
        }
    });

    closeBtn.addEventListener('click', () => {
        windowEl.style.display = 'none';
        bubble.innerHTML = '<i class="fas fa-robot"></i>';
    });

    // Message Handling
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // User Message
        addMessage(text, 'user');
        input.value = '';

        // Simulated Bot Response
        setTimeout(() => {
            const responses = [
                "I can help you compare models, check financing rates, or schedule a test drive.",
                "That's a great choice! Would you like to see similar vehicles in our inventory?",
                "I'm searching our database for the best matches based on your preferences...",
                "Our finance team offers rates as low as 5.9% APR. Shall I calculate a quote?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'bot');
        }, 1000);
    }

    function addMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.innerText = text;
        body.appendChild(msgDiv);
        body.scrollTop = body.scrollHeight;
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}
