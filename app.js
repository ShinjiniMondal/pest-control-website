/**
 * JG PEST CONTROL - ADVANCED INTERACTIVE ENGINE & SCHEDULING SYSTEM
 * State-of-the-art interactive modules, motion graphics, Smarty AI Chatbot,
 * automated appointment booking wizard, and thermal comparison scanner.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPostcodeDispatchRadar();
  initPestCarousel();
  initTeamsCarousel();
  initReviewsCarousel();
  initThermalScanner();
  initDiagnosticQuiz();
  initBookingWizard();
  initPricingCalculator();
  initFaqSearch();
  initSmartyChatbot();
  initSocialProofToasts();
});

/* ==========================================================================
   1. THEME TOGGLE (LIGHT PORCELAIN GLASS DEFAULT / DARK TOGGLE)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('jg_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jg_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    toggleBtn.innerHTML = theme === 'light' 
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  }
}

/* ==========================================================================
   2. HERO POSTCODE LIVE DISPATCH RADAR
   ========================================================================== */
function initPostcodeDispatchRadar() {
  const form = document.getElementById('postcodeForm');
  const input = document.getElementById('postcodeInput');
  const banner = document.getElementById('dispatchStatusBanner');

  if (!form || !input || !banner) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pc = input.value.trim().toUpperCase();
    if (!pc) return;

    banner.className = 'dispatch-status-banner active';
    banner.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <span class="live-dot"></span>
        <span>Scanning GPS radar for active units near <strong>${pc}</strong>...</span>
      </div>
    `;

    setTimeout(() => {
      const vansCount = Math.floor(Math.random() * 3) + 2;
      const eta = Math.floor(Math.random() * 20) + 25;
      banner.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span><strong>${vansCount} Emergency Vans Active</strong> in <strong>${pc}</strong> • Nearest Unit ETA: <strong>${eta} mins</strong></span>
        </div>
        <button type="button" class="btn-primary" style="padding:0.35rem 0.8rem; font-size:0.75rem;" onclick="openBookingWithPostcode('${pc}')">Book Priority</button>
      `;
    }, 700);
  });
}

window.openBookingWithPostcode = function(pc) {
  const scheduler = document.getElementById('bookingSection');
  if (scheduler) {
    scheduler.scrollIntoView({ behavior: 'smooth' });
    const pcField = document.getElementById('bookPostcode');
    if (pcField) pcField.value = pc;
  }
};

/* ==========================================================================
   3. UNIVERSAL SMOOTH CAROUSEL WITH GLASS TILES & PAGINATION
   ========================================================================== */
function setupCarousel({ trackId, prevBtnId, nextBtnId, dotsContainerId = null, filterPillsClass = null, autoPlayInterval = 6000 }) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const dotsContainer = dotsContainerId ? document.getElementById(dotsContainerId) : null;
  if (!track) return;

  let currentIndex = 0;
  let autoTimer = null;

  function getCardWidth() {
    const card = track.querySelector('.pest-card, .team-card, .review-card');
    if (!card) return 340;
    const gap = 28; // 1.75rem
    return card.offsetWidth + gap;
  }

  function getMaxIndex() {
    const cards = Array.from(track.children).filter(c => c.style.display !== 'none');
    const containerWidth = track.parentElement.offsetWidth;
    const cardWidth = getCardWidth();
    const visibleCards = Math.max(1, Math.floor(containerWidth / cardWidth));
    return Math.max(0, cards.length - visibleCards);
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const max = getMaxIndex();
    const totalDots = max + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlide();
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlide() {
    const cardWidth = getCardWidth();
    const max = getMaxIndex();
    if (currentIndex > max) currentIndex = max;
    if (currentIndex < 0) currentIndex = 0;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    if (dotsContainer) {
      Array.from(dotsContainer.children).forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function startAutoPlay() {
    if (autoPlayInterval <= 0) return;
    stopAutoPlay();
    autoTimer = setInterval(() => {
      const max = getMaxIndex();
      currentIndex = currentIndex >= max ? 0 : currentIndex + 1;
      updateSlide();
    }, autoPlayInterval);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const max = getMaxIndex();
      currentIndex = currentIndex >= max ? 0 : currentIndex + 1;
      updateSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const max = getMaxIndex();
      currentIndex = currentIndex <= 0 ? max : currentIndex - 1;
      updateSlide();
      resetAutoPlay();
    });
  }

  // Filter buttons handler
  if (filterPillsClass) {
    const filterButtons = document.querySelectorAll(`.${filterPillsClass}`);
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        Array.from(track.children).forEach(card => {
          const cat = card.dataset.category || 'all';
          if (filter === 'all' || cat.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
        currentIndex = 0;
        renderDots();
        updateSlide();
        resetAutoPlay();
      });
    });
  }

  // Touch and drag support
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoPlay();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) {
      if (nextBtn) nextBtn.click();
    } else if (diff < -50) {
      if (prevBtn) prevBtn.click();
    }
    startAutoPlay();
  });

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', stopAutoPlay);
  track.parentElement.addEventListener('mouseleave', startAutoPlay);

  window.addEventListener('resize', () => {
    renderDots();
    updateSlide();
  });

  renderDots();
  updateSlide();
  startAutoPlay();
}

function initPestCarousel() {
  setupCarousel({
    trackId: 'pestTrack',
    prevBtnId: 'pestPrevBtn',
    nextBtnId: 'pestNextBtn',
    dotsContainerId: 'pestDots',
    filterPillsClass: 'pest-filter-btn',
    autoPlayInterval: 5000
  });
}

function initTeamsCarousel() {
  setupCarousel({
    trackId: 'teamsTrack',
    prevBtnId: 'teamsPrevBtn',
    nextBtnId: 'teamsNextBtn',
    dotsContainerId: 'teamsDots',
    autoPlayInterval: 6500
  });
}

function initReviewsCarousel() {
  setupCarousel({
    trackId: 'reviewsTrack',
    prevBtnId: 'reviewsPrevBtn',
    nextBtnId: 'reviewsNextBtn',
    dotsContainerId: 'reviewsDots',
    autoPlayInterval: 6000
  });
}

/* ==========================================================================
   4. INTERACTIVE THERMAL SCANNER & BEFORE / AFTER COMPARISON
   ========================================================================== */
function initThermalScanner() {
  const container = document.getElementById('thermalComparison');
  const afterWrapper = document.getElementById('thermalAfterWrapper');
  const handle = document.getElementById('thermalHandle');
  const tempReadout = document.getElementById('thermalTempReadout');
  const pestCountReadout = document.getElementById('thermalPestCount');
  const eradicationReadout = document.getElementById('thermalEradicationPct');

  if (!container || !afterWrapper || !handle) return;

  let isSliding = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let pos = (x - rect.left) / rect.width;
    if (pos < 0) pos = 0;
    if (pos > 1) pos = 1;

    const percentage = pos * 100;
    handle.style.left = `${percentage}%`;
    afterWrapper.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;

    // Dynamic telemetry calculation
    // Left side (0-50%): High thermal eradication heat (60°C), count drops
    // Right side (50-100%): Sanitized ambient temperature (21°C), 0 active pests
    if (pos < 0.5) {
      const temp = Math.round(58 + (1 - pos * 2) * 5);
      if (tempReadout) tempReadout.textContent = `${temp}°C`;
      const pests = Math.round((1 - pos * 2) * 45);
      if (pestCountReadout) pestCountReadout.textContent = pests > 0 ? `${pests} Active` : '0 Active';
      const pct = Math.round(pos * 2 * 90);
      if (eradicationReadout) eradicationReadout.textContent = `${pct}%`;
    } else {
      const temp = Math.round(21 + (1 - pos) * 6);
      if (tempReadout) tempReadout.textContent = `${temp}°C Normal`;
      if (pestCountReadout) pestCountReadout.textContent = '0 (Cleared)';
      if (eradicationReadout) eradicationReadout.textContent = '100% Eradicated';
    }
  }

  function onPointerDown(e) {
    isSliding = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setSliderPosition(clientX);
  }

  function onPointerMove(e) {
    if (!isSliding) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setSliderPosition(clientX);
  }

  function onPointerUp() {
    isSliding = false;
  }

  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);
}

/* ==========================================================================
   5. SMART PEST DIAGNOSTIC QUIZ (30-SECOND TRIAGE)
   ========================================================================== */
function initDiagnosticQuiz() {
  const steps = [
    document.getElementById('quizStep1'),
    document.getElementById('quizStep2'),
    document.getElementById('quizStep3'),
    document.getElementById('quizStepResult')
  ];
  const progressBar = document.getElementById('quizProgressFill');
  const btnNext = document.getElementById('quizBtnNext');
  const btnPrev = document.getElementById('quizBtnPrev');
  if (!steps[0] || !btnNext) return;

  let currentStep = 0;
  const quizAnswers = {
    location: '',
    symptoms: '',
    duration: ''
  };

  // Option select handler
  steps.forEach((stepEl, stepIdx) => {
    if (!stepEl) return;
    const cards = stepEl.querySelectorAll('.quiz-option-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const val = card.dataset.value;
        if (stepIdx === 0) quizAnswers.location = val;
        if (stepIdx === 1) quizAnswers.symptoms = val;
        if (stepIdx === 2) quizAnswers.duration = val;
      });
    });
  });

  btnNext.addEventListener('click', () => {
    // Validate selection on current step
    const currentCard = steps[currentStep].querySelector('.quiz-option-card.selected');
    if (!currentCard && currentStep < 3) {
      alert('Please select an option to continue.');
      return;
    }

    if (currentStep < 2) {
      currentStep++;
      updateQuizView();
    } else if (currentStep === 2) {
      // Calculate result
      currentStep = 3;
      showDiagnosis();
    }
  });

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 0 && currentStep < 3) {
        currentStep--;
        updateQuizView();
      }
    });
  }

  function updateQuizView() {
    steps.forEach((s, idx) => {
      if (s) s.classList.toggle('active', idx === currentStep);
    });
    if (btnPrev) btnPrev.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    if (progressBar) progressBar.style.width = `${((currentStep + 1) / 3) * 100}%`;
  }

  function showDiagnosis() {
    steps.forEach((s, idx) => {
      if (s) s.classList.toggle('active', idx === 3);
    });
    if (btnNext) btnNext.style.display = 'none';
    if (btnPrev) btnPrev.style.display = 'none';
    if (progressBar) progressBar.style.width = '100%';

    const titleEl = document.getElementById('diagTitle');
    const descEl = document.getElementById('diagDesc');
    const treatEl = document.getElementById('diagTreatment');

    let pest = 'Bed Bugs (Cimex lectularius)';
    let treatment = 'Thermal 60°C Chemical-Free Heat Treatment (1-Day Eradication Guaranteed)';
    let desc = 'The symptoms of nighttime itching, bites in clusters, and bedding spots strongly indicate active bed bugs.';

    if (quizAnswers.symptoms === 'scratching' || quizAnswers.location === 'attic') {
      pest = 'Rats / Rodents (Rattus norvegicus)';
      treatment = 'Precision Burrow Tracking, Deep Proofing & Commercial Rodent Eradication';
      desc = 'Scratching noises in cavities or lofts alongside droppings indicates rodent ingress requiring immediate proofing.';
    } else if (quizAnswers.symptoms === 'buzzing') {
      pest = 'Wasps / Hornets (Vespula vulgaris)';
      treatment = 'Rapid High-Pressure Insecticidal Dusting & Nest Removal';
      desc = 'Active flight paths and buzzing point to an active wasp nest requiring safe professional neutralisation.';
    } else if (quizAnswers.symptoms === 'scuttling') {
      pest = 'German Cockroaches (Blattella germanica)';
      treatment = 'Micro-Encapsulated Gel Baiting & Insect Growth Regulators (IGR)';
      desc = 'Sightings in kitchens and warm voids indicate cockroach activity with rapid breeding cycles.';
    }

    if (titleEl) titleEl.textContent = pest;
    if (descEl) descEl.textContent = desc;
    if (treatEl) treatEl.textContent = treatment;
  }
}

window.prefillBookingFromQuiz = function() {
  const diagTitle = document.getElementById('diagTitle');
  const pestName = diagTitle ? diagTitle.textContent : 'General Pest';
  
  const scheduler = document.getElementById('bookingSection');
  if (scheduler) {
    scheduler.scrollIntoView({ behavior: 'smooth' });
    const select = document.getElementById('bookPestType');
    if (select) {
      if (pestName.toLowerCase().includes('bed bug')) select.value = 'bedbugs';
      else if (pestName.toLowerCase().includes('rat')) select.value = 'rats';
      else if (pestName.toLowerCase().includes('wasp')) select.value = 'wasps';
      else if (pestName.toLowerCase().includes('cockroach')) select.value = 'cockroaches';
      else select.value = 'bedbugs';
      select.dispatchEvent(new Event('change'));
    }
  }
};

/* ==========================================================================
   6. AUTOMATED BOOKING APPOINTMENT SYSTEM (SCHEDULER ENGINE)
   ========================================================================== */
function initBookingWizard() {
  const bookingState = {
    propertyType: 'House (2-3 Beds)',
    pestType: 'bedbugs',
    packageName: 'Eco-Thermal Heat Eradication',
    packagePrice: 450,
    date: '',
    timeSlot: 'Morning (08:00 - 12:00)',
    fullName: '',
    phone: '',
    postcode: '',
    address: '',
    discreetVan: true,
    bookingRef: ''
  };

  const steps = [
    document.getElementById('bookingStep1'),
    document.getElementById('bookingStep2'),
    document.getElementById('bookingStep3'),
    document.getElementById('bookingStep4'),
    document.getElementById('bookingStep5')
  ];

  const indicatorTabs = document.querySelectorAll('.step-indicator-tab');
  const btnNext = document.getElementById('bookingNextBtn');
  const btnPrev = document.getElementById('bookingPrevBtn');
  const summaryPackageEl = document.getElementById('summaryPackage');
  const summaryPriceEl = document.getElementById('summaryPrice');

  let currentStep = 0;

  // Render 14 consecutive dynamic calendar dates
  renderCalendarDates();

  function renderCalendarDates() {
    const datesContainer = document.getElementById('dateSlotsContainer');
    if (!datesContainer) return;
    datesContainer.innerHTML = '';

    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const pill = document.createElement('div');
      pill.className = `date-pill ${i === 0 ? 'selected' : ''}`;
      pill.dataset.dateString = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;

      if (i === 0) bookingState.date = pill.dataset.dateString;

      pill.innerHTML = `
        <div class="date-day-name">${i === 0 ? 'Today' : (i === 1 ? 'Tomorrow' : days[d.getDay()])}</div>
        <div class="date-day-num">${d.getDate()}</div>
        <div class="date-month-name">${months[d.getMonth()]}</div>
      `;

      pill.addEventListener('click', () => {
        document.querySelectorAll('.date-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        bookingState.date = pill.dataset.dateString;
        updateSummary();
      });

      datesContainer.appendChild(pill);
    }
  }

  // Package card select
  const packageCards = document.querySelectorAll('.package-card');
  packageCards.forEach(card => {
    card.addEventListener('click', () => {
      packageCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      bookingState.packageName = card.dataset.packageName;
      bookingState.packagePrice = parseInt(card.dataset.packagePrice, 10);
      updateSummary();
    });
  });

  // Time slot select
  const timeSlots = document.querySelectorAll('.time-slot-card');
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      bookingState.timeSlot = slot.dataset.time;
      updateSummary();
    });
  });

  function updateSummary() {
    if (summaryPackageEl) {
      summaryPackageEl.textContent = `${bookingState.packageName} • ${bookingState.date} (${bookingState.timeSlot})`;
    }
    if (summaryPriceEl) {
      summaryPriceEl.textContent = `£${bookingState.packagePrice}`;
    }
  }

  // Navigation handlers
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStep === 0) {
        // Collect property info
        const pestSelect = document.getElementById('bookPestType');
        const propSelect = document.getElementById('bookPropType');
        if (pestSelect) bookingState.pestType = pestSelect.value;
        if (propSelect) bookingState.propertyType = propSelect.value;
      } else if (currentStep === 2) {
        // Checked date & time
      } else if (currentStep === 3) {
        // Validate contact details
        const name = document.getElementById('bookName').value.trim();
        const phone = document.getElementById('bookPhone').value.trim();
        const postcode = document.getElementById('bookPostcode').value.trim();
        const address = document.getElementById('bookAddress').value.trim();

        if (!name || !phone || !postcode || !address) {
          alert('Please fill in your name, contact phone, UK postcode, and full address to dispatch.');
          return;
        }

        bookingState.fullName = name;
        bookingState.phone = phone;
        bookingState.postcode = postcode.toUpperCase();
        bookingState.address = address;
        bookingState.discreetVan = document.getElementById('bookDiscreetVan').checked;

        // Generate Booking Confirmation
        generateBookingConfirmation();
      }

      if (currentStep < 4) {
        currentStep++;
        renderWizardStep();
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 0 && currentStep < 4) {
        currentStep--;
        renderWizardStep();
      }
    });
  }

  indicatorTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      if (index <= currentStep && currentStep < 4) {
        currentStep = index;
        renderWizardStep();
      }
    });
  });

  function renderWizardStep() {
    steps.forEach((stepEl, idx) => {
      if (stepEl) stepEl.classList.toggle('active', idx === currentStep);
    });

    indicatorTabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === currentStep);
      tab.classList.toggle('completed', idx < currentStep);
    });

    if (btnPrev) btnPrev.style.visibility = currentStep === 0 || currentStep === 4 ? 'hidden' : 'visible';
    if (btnNext) {
      if (currentStep === 3) {
        btnNext.innerHTML = '⚡ Confirm & Dispatch Appointment';
      } else if (currentStep === 4) {
        btnNext.style.display = 'none';
      } else {
        btnNext.innerHTML = 'Continue to Next Step →';
      }
    }

    const summaryBar = document.getElementById('schedulerSummaryBar');
    if (summaryBar) summaryBar.style.display = currentStep === 4 ? 'none' : 'flex';
  }

  function generateBookingConfirmation() {
    const ref = `JG-${Math.floor(1000 + Math.random() * 9000)}-UK`;
    bookingState.bookingRef = ref;

    // Populate confirmation DOM
    document.getElementById('confRefCode').textContent = ref;
    document.getElementById('confPestService').textContent = `${bookingState.packageName} (${bookingState.pestType.toUpperCase()})`;
    document.getElementById('confDateTime').textContent = `${bookingState.date} • ${bookingState.timeSlot}`;
    document.getElementById('confAddress').textContent = `${bookingState.address}, ${bookingState.postcode}`;
    document.getElementById('confDiscreetStatus').textContent = bookingState.discreetVan ? 'Yes (Unmarked Fleet Unit)' : 'Standard Branded Fleet';
    document.getElementById('confFinalCost').textContent = `£${bookingState.packagePrice} (Guaranteed No Hidden Charges)`;

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('jg_active_bookings') || '[]');
    saved.unshift({
      ref: ref,
      date: bookingState.date,
      time: bookingState.timeSlot,
      service: bookingState.packageName,
      address: `${bookingState.address}, ${bookingState.postcode}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('jg_active_bookings', JSON.stringify(saved));
  }

  updateSummary();
}

window.downloadCalendarInvite = function() {
  const ref = document.getElementById('confRefCode').textContent || 'JG-APPT';
  const service = document.getElementById('confPestService').textContent || 'Pest Control Eradication';
  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//JG Pest Control//Appointment System//EN
BEGIN:VEVENT
SUMMARY:JG Pest Control Appointment (${ref})
DESCRIPTION:Technician scheduled for ${service}. 24/7 Hotline: 0330 053 9002.
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT2H
ACTION:DISPLAY
DESCRIPTION:Technician arrival in 2 hours
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ref}-appointment.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/* ==========================================================================
   7. INSTANT PRICING CALCULATOR
   ========================================================================== */
function initPricingCalculator() {
  const roomsSlider = document.getElementById('calcRoomsSlider');
  const roomsVal = document.getElementById('calcRoomsVal');
  const severitySelect = document.getElementById('calcSeveritySelect');
  const urgencyRadios = document.querySelectorAll('input[name="urgencyOption"]');
  const totalDisplay = document.getElementById('calcTotalDisplay');

  if (!roomsSlider || !totalDisplay) return;

  function calculatePrice() {
    const rooms = parseInt(roomsSlider.value, 10);
    if (roomsVal) roomsVal.textContent = rooms === 1 ? '1 Room / Studio' : `${rooms} Rooms / House`;

    let base = 120 + (rooms * 35);
    const severity = severitySelect ? severitySelect.value : 'moderate';
    if (severity === 'heavy') base += 60;
    if (severity === 'severe') base += 120;

    let urgencyMultiplier = 1;
    urgencyRadios.forEach(radio => {
      if (radio.checked) {
        if (radio.value === 'same_day') urgencyMultiplier = 1.25;
        if (radio.value === 'emergency_2hr') urgencyMultiplier = 1.5;
      }
    });

    const finalTotal = Math.round(base * urgencyMultiplier);
    totalDisplay.textContent = `£${finalTotal}`;
  }

  roomsSlider.addEventListener('input', calculatePrice);
  if (severitySelect) severitySelect.addEventListener('change', calculatePrice);
  urgencyRadios.forEach(r => r.addEventListener('change', calculatePrice));

  calculatePrice();
}

/* ==========================================================================
   8. FAQ LIVE SEARCH ACCORDION
   ========================================================================== */
function initFaqSearch() {
  const searchInput = document.getElementById('faqSearchInput');
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(q)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* ==========================================================================
   9. "SMARTY" AI PEST CHATBOT ASSISTANT
   ========================================================================== */
function initSmartyChatbot() {
  const launcher = document.getElementById('smartyLauncher');
  const drawer = document.getElementById('smartyDrawer');
  const closeBtn = document.getElementById('smartyCloseBtn');
  const sendBtn = document.getElementById('chatSendBtn');
  const input = document.getElementById('chatTextInput');
  const messagesBox = document.getElementById('chatMessagesBody');
  const quickChips = document.querySelectorAll('.chat-quick-chips .chip-btn');

  if (!launcher || !drawer || !messagesBox) return;

  launcher.addEventListener('click', () => {
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open') && input) {
      input.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  function playUiBeep() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  function addMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.innerHTML = `
      <div class="chat-msg-bubble">${text}</div>
      <span class="chat-msg-time">${time}</span>
    `;

    messagesBox.appendChild(msg);
    messagesBox.scrollTop = messagesBox.scrollHeight;
    playUiBeep();
  }

  function getSmartyResponse(userText) {
    const q = userText.toLowerCase();

    if (q.includes('bed bug') || q.includes('heat') || q.includes('bites')) {
      return `Our <strong>Thermal Heat Treatment</strong> kills 100% of bed bugs and their eggs in just 1 single visit at 60°C! It is 100% chemical-free and pet-safe. Would you like me to reserve a heat team for you?`;
    }
    if (q.includes('rat') || q.includes('mice') || q.includes('mouse') || q.includes('rodent')) {
      return `For rodents, our RSPH technicians use fluorescent non-toxic tracking dyes to find ingress holes, seal burrows, and eradicate the colony. We offer same-day dispatch nationwide!`;
    }
    if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('how much')) {
      return `Treatments start from £120 for targeted eradication, with full-house guarantees from £250, and 1-day whole-house Bed Bug Heat Eradication at £450. You can get an instant estimate in our Calculator!`;
    }
    if (q.includes('pet') || q.includes('child') || q.includes('safe')) {
      return `Yes! All our treatments strictly adhere to UK COSHH regulations. We use eco-friendly thermal heat and tamper-resistant pet-safe bait stations. No toxic fumes!`;
    }
    if (q.includes('emergency') || q.includes('urgent') || q.includes('asap') || q.includes('now')) {
      return `🚨 <strong>Emergency Rapid Dispatch:</strong> We have active vans in your region right now with an average arrival under 45 minutes! Call our 24/7 hotline directly on <a href="tel:03300539002" style="color:#34d399; font-weight:700;">0330 053 9002</a> or select "Emergency 2-Hr Rush" in our booking wizard!`;
    }
    if (q.includes('book') || q.includes('schedule') || q.includes('appointment')) {
      setTimeout(() => {
        const sec = document.getElementById('bookingSection');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
      return `I am scrolling you directly to our Automated Appointment Scheduler so you can pick your preferred date and time slot!`;
    }

    return `I can help you diagnose your pest problem, get an instant price estimate, explain our 1-day Eco Heat Treatment, or schedule a certified technician. What would you like assistance with?`;
  }

  function handleSend() {
    const val = input.value.trim();
    if (!val) return;
    addMessage('user', val);
    input.value = '';

    // Simulate smart thinking indicator
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chat-msg bot';
    typingMsg.id = 'chatTypingIndicator';
    typingMsg.innerHTML = `<div class="chat-msg-bubble" style="color:#6ee7b7; font-style:italic;">Smarty is thinking...</div>`;
    messagesBox.appendChild(typingMsg);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    setTimeout(() => {
      const ind = document.getElementById('chatTypingIndicator');
      if (ind) ind.remove();
      const reply = getSmartyResponse(val);
      addMessage('bot', reply);
    }, 600);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.dataset.prompt || chip.textContent;
      if (input) input.value = text;
      handleSend();
    });
  });
}

/* ==========================================================================
   10. LIVE SOCIAL PROOF TOAST ROTATOR
   ========================================================================== */
function initSocialProofToasts() {
  const toast = document.getElementById('socialProofToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastTime = document.getElementById('toastTime');
  if (!toast) return;

  const sampleBookings = [
    { name: 'Sarah M.', city: 'Camden, London NW1', service: 'Bed Bug Thermal Heat Treatment', mins: '3 mins ago' },
    { name: 'David K.', city: 'Didsbury, Manchester M20', service: 'Commercial Rat Eradication', mins: '7 mins ago' },
    { name: 'Emma T.', city: 'Solihull, Birmingham B91', service: 'Wasp Nest Urgent Neutralisation', mins: '11 mins ago' },
    { name: 'Oliver B.', city: 'Clifton, Bristol BS8', service: 'Canine K9 Bed Bug Inspection', mins: '15 mins ago' },
    { name: 'Rachel H.', city: 'Headingley, Leeds LS6', service: 'Residential Mice Proofing & Baiting', mins: '19 mins ago' },
    { name: 'Liam P.', city: 'Morningside, Edinburgh EH10', service: 'Emergency Pest Callout', mins: '24 mins ago' }
  ];

  let index = 0;

  function showNextToast() {
    const item = sampleBookings[index];
    if (toastTitle) toastTitle.textContent = `${item.name} in ${item.city} booked ${item.service}`;
    if (toastTime) toastTime.textContent = item.mins;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5500);

    index = (index + 1) % sampleBookings.length;
  }

  // Initial trigger after 4s, then every 20s
  setTimeout(showNextToast, 4000);
  setInterval(showNextToast, 22000);
}
