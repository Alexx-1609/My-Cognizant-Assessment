// ===== Local Community Event Portal =====
console.log("Welcome to the Community Portal");

// --- Data Model ---
class Event {
  constructor({ id, name, category, date, location, seats, image, status = "upcoming", fee = 0 }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.date = date;
    this.location = location;
    this.seats = seats;
    this.image = image;
    this.status = status;
    this.fee = fee;
  }
  checkAvailability() { return this.seats > 0; }
}
Event.prototype.describe = function () {
  return `${this.name} on ${this.date} @ ${this.location}`;
};

// --- State ---
let allEvents = [];
const registrations = { count: 0, byCategory: {} };

// --- Helpers ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Higher-order: create a logger that wraps an action
const withLog = (label, fn) => (...args) => { console.log(`[${label}]`, ...args); return fn(...args); };

// --- Load events ---
async function loadEvents() {
  $("#loadingSpinner").style.display = "block";
  try {
    const res = await fetch("assets/data/events.json");
    if (!res.ok) throw new Error("Failed to load events");
    const data = await res.json();
    allEvents = data.map((e) => new Event(e));
  } catch (err) {
    console.warn("Falling back to inline events:", err);
    allEvents = fallbackEvents().map((e) => new Event(e));
  } finally {
    $("#loadingSpinner").style.display = "none";
    populateFilters();
    renderAll();
    updateStats();
    restorePreferences();
  }
}

function fallbackEvents() {
  return [
    { id: 1, name: "Sunset Jazz Night", category: "Music", date: "2026-07-12", location: "Riverside Park", seats: 40, fee: 10, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600", status: "upcoming" },
    { id: 2, name: "Street Food Carnival", category: "Food", date: "2026-07-20", location: "Downtown Square", seats: 120, fee: 5, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600", status: "upcoming" },
    { id: 3, name: "5K Charity Run", category: "Sports", date: "2026-08-02", location: "City Stadium", seats: 200, fee: 0, image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600", status: "upcoming" },
    { id: 4, name: "AI Builders Meetup", category: "Tech", date: "2026-06-15", location: "Innovation Hub", seats: 60, fee: 0, image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600", status: "ongoing" },
    { id: 5, name: "Open Air Yoga", category: "Wellness", date: "2026-06-08", location: "Botanic Garden", seats: 30, fee: 0, image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600", status: "ongoing" },
    { id: 6, name: "Local Art Walk", category: "Art", date: "2026-05-10", location: "Old Town", seats: 0, fee: 0, image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600", status: "past" },
    { id: 7, name: "Indie Film Night", category: "Art", date: "2026-04-22", location: "Community Theater", seats: 0, fee: 8, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600", status: "past" },
    { id: 8, name: "Bakery Workshop", category: "Food", date: "2026-08-18", location: "Maker Space", seats: 15, fee: 25, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600", status: "upcoming" },
    { id: 9, name: "Tech Career Fair", category: "Tech", date: "2026-09-05", location: "Convention Center", seats: 300, fee: 0, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", status: "upcoming" },
  ];
}

// --- Filters / Search ---
function populateFilters() {
  const cats = [...new Set(allEvents.map((e) => e.category))];
  const locs = [...new Set(allEvents.map((e) => e.location))];
  const cf = $("#categoryFilter"); const lf = $("#locationFilter");
  cats.forEach((c) => cf.insertAdjacentHTML("beforeend", `<option>${c}</option>`));
  locs.forEach((l) => lf.insertAdjacentHTML("beforeend", `<option>${l}</option>`));
}

function filterEventsByCategory(list, cat) {
  return cat ? list.filter((e) => e.category === cat) : list;
}
function searchEvents(term) {
  $("#liveSearch").value = term;
  applyFilters();
}

function applyFilters() {
  const cat = $("#categoryFilter").value;
  const loc = $("#locationFilter").value;
  const q = $("#liveSearch").value.trim().toLowerCase();

  const filtered = allEvents
    .filter((e) => (cat ? e.category === cat : true))
    .filter((e) => (loc ? e.location === loc : true))
    .filter((e) => (q ? e.name.toLowerCase().includes(q) : true));

  renderAll(filtered);
}

$("#liveSearch").addEventListener("input", applyFilters);

// --- Render ---
function renderAll(list = allEvents) {
  renderGroup("eventsUpcoming", list.filter((e) => e.status === "upcoming"));
  renderGroup("eventsOngoing", list.filter((e) => e.status === "ongoing"));
  renderGroup("eventsPast", list.filter((e) => e.status === "past"));
}

function renderGroup(containerId, list) {
  const c = document.getElementById(containerId);
  c.innerHTML = "";
  if (!list.length) {
    c.innerHTML = `<div class="col-12 text-center text-muted py-4">No events found.</div>`;
    return;
  }
  list.forEach((ev) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    const soldOut = !ev.checkAvailability();
    col.innerHTML = `
      <article class="event-card card h-100">
        <img src="${ev.image}" alt="${ev.name}" loading="lazy" />
        <div class="card-body d-flex flex-column">
          <span class="badge badge-cat align-self-start mb-2">${ev.category}</span>
          <h5 class="card-title">${ev.name}</h5>
          <p class="card-text text-muted small mb-2">
            <i class="bi bi-calendar3 me-1"></i>${ev.date}<br>
            <i class="bi bi-geo-alt me-1"></i>${ev.location}
          </p>
          <p class="mb-3"><strong>Seats:</strong> <span data-seats="${ev.id}">${ev.seats}</span></p>
          <button class="btn ${soldOut ? "btn-danger" : "btn-primary"} mt-auto" ${soldOut ? "disabled" : ""} onclick="registerForEvent(${ev.id})">
            ${soldOut ? "Sold Out" : '<i class="bi bi-ticket-perforated me-1"></i>Register'}
          </button>
        </div>
      </article>`;
    c.appendChild(col);
  });

  // jQuery fade-in
  if (window.jQuery) $(`#${containerId}`).hide().fadeIn(400);
}

// --- Registration logic ---
function registerForEvent(id) {
  try {
    const ev = allEvents.find((e) => e.id === id);
    if (!ev) throw new Error("Event not found");
    if (!ev.checkAvailability()) throw new Error("No seats left");
    ev.seats -= 1;
    registrations.count += 1;
    registrations.byCategory[ev.category] = (registrations.byCategory[ev.category] || 0) + 1;
    sessionStorage.setItem("lastRegistration", JSON.stringify({ id, name: ev.name, at: Date.now() }));
    $(`[data-seats="${id}"]`).textContent = ev.seats;
    showModal(`You're registered for <strong>${ev.name}</strong>! Seats remaining: ${ev.seats}.`);
    updateStats();
    renderAll(currentFilteredList());
  } catch (err) {
    showModal(`<span class="text-danger">${err.message}</span>`);
  }
}
function currentFilteredList() {
  const cat = $("#categoryFilter").value, loc = $("#locationFilter").value, q = $("#liveSearch").value.trim().toLowerCase();
  return allEvents
    .filter((e) => (cat ? e.category === cat : true))
    .filter((e) => (loc ? e.location === loc : true))
    .filter((e) => (q ? e.name.toLowerCase().includes(q) : true));
}

function showModal(html) {
  $("#modalBody").innerHTML = html;
  new bootstrap.Modal($("#successModal")).show();
}

// --- Stats ---
function updateStats() {
  $("#statEvents").textContent = allEvents.length;
  $("#statUsers").textContent = registrations.count;
  $("#statSeats").textContent = allEvents.reduce((s, e) => s + e.seats, 0);
  $("#statCats").textContent = new Set(allEvents.map((e) => e.category)).size;
}

// --- Registration form (AJAX) ---
$("#registrationForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) { form.classList.add("was-validated"); return; }

  const payload = {
    name: $("#fullName").value, email: $("#email").value, phone: $("#phone").value,
    date: $("#eventDate").value, type: $("#eventType").value, message: $("#message").value,
  };

  localStorage.setItem("preferredCategory", payload.type);
  sessionStorage.setItem("tempRegistration", JSON.stringify(payload));

  const conf = $("#formConfirm");
  conf.innerHTML = `<div class="alert alert-info"><div class="spinner-border spinner-border-sm me-2"></div>Submitting...</div>`;

  try {
    await new Promise((resolve, reject) => setTimeout(() => Math.random() > 0.05 ? resolve() : reject(new Error("Network error")), 900));
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    }).then((r) => r.json()).catch(() => ({}));
    conf.innerHTML = `<div class="alert alert-success">🎉 Thanks ${payload.name}! Confirmation sent to ${payload.email}.</div>`;
    registrations.count += 1; updateStats();
    showModal(`Registration confirmed for <strong>${payload.type}</strong> on ${payload.date}.`);
    form.reset(); form.classList.remove("was-validated");
  } catch (err) {
    conf.innerHTML = `<div class="alert alert-danger">❌ ${err.message}. Please try again.</div>`;
  }
});

// --- Preferences ---
function restorePreferences() {
  const pref = localStorage.getItem("preferredCategory");
  if (pref) {
    const sel = $("#eventType"); if (sel) sel.value = pref;
    const cat = $("#categoryFilter"); if (cat && [...cat.options].some(o => o.value === pref)) cat.value = pref;
    applyFilters();
  }
}
function clearPreferences() {
  localStorage.clear(); sessionStorage.clear();
  $("#formConfirm").innerHTML = `<div class="alert alert-warning">Preferences cleared.</div>`;
}

// --- Geolocation ---
$("#findNearbyBtn").addEventListener("click", () => {
  const out = $("#geoResult");
  if (!navigator.geolocation) { out.textContent = "Geolocation not supported."; return; }
  out.innerHTML = `<div class="spinner-border spinner-border-sm"></div> Locating...`;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const nearest = allEvents.filter(e => e.status === "upcoming")[0];
      out.innerHTML = `📍 Lat: ${latitude.toFixed(3)}, Lng: ${longitude.toFixed(3)} — Nearest: <strong>${nearest ? nearest.name + " @ " + nearest.location : "N/A"}</strong>`;
    },
    (err) => {
      const msgs = { 1: "Permission denied", 2: "Position unavailable", 3: "Request timed out" };
      out.innerHTML = `<span class="text-warning">⚠️ ${msgs[err.code] || err.message}</span>`;
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
});

// --- Feedback ---
function validateFb(el) {
  el.classList.toggle("is-invalid", el.value.trim().length < 2);
}
function showFee(sel) {
  const fee = +sel.value;
  $("#feeDisplay").textContent = fee ? `Event fee: $${fee}` : "Free event ✨";
}
function countChars() {
  const t = $("#fbText"); $("#charCount").textContent = `${t.value.length} / 300`;
}
function submitFeedback() {
  const name = $("#fbName").value.trim(); const text = $("#fbText").value.trim();
  if (!name || !text) { alert("Please enter your name and feedback."); return; }
  if (confirm(`Send feedback as ${name}?`)) {
    showModal(`Thanks for your feedback, <strong>${name}</strong>!`);
    $("#fbName").value = ""; $("#fbText").value = ""; countChars();
  }
}

// --- Image Zoom ---
function zoomImage(img) {
  $("#zoomImg").src = img.src;
  new bootstrap.Modal($("#zoomModal")).show();
}

// --- Video ---
function onVideoReady() { $("#videoStatus").textContent = "🎬 Video Ready To Play"; }

// --- Init ---
window.addEventListener("DOMContentLoaded", withLog("init", () => {
  alert("👋 Welcome to the Local Community Event Portal!");
  loadEvents();
  // jQuery hover fade demo
  if (window.jQuery) {
    $(document).on("mouseenter", ".stat-card", function () { $(this).fadeTo(150, 0.85); });
    $(document).on("mouseleave", ".stat-card", function () { $(this).fadeTo(150, 1); });
  }
}));
