const API_BASE = "";
const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DAY_LABELS = {
  uk: { mon: "Пн", tue: "Вт", wed: "Ср", thu: "Чт", fri: "Пт", sat: "Сб", sun: "Нд" },
  en: { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" }
};

const SYMBOLS = ["π", "√", "≈", "≠", "≤", "≥", "∞", "∑", "Δ", "°", "×", "÷", "^", "(", ")", "[", "]", "{", "}"];

const I18N = {
  uk: {
    pageTitle: "Day of number pi",
    authTitle: "Day of number pi",
    authSubtitle: "Sign in or create your account to start solving daily tasks.",
    tabLogin: "Вхід",
    tabRegister: "Реєстрація",
    loginEmailPlaceholder: "Ваш email",
    loginPasswordPlaceholder: "Пароль",
    loginSubmit: "Увійти",
    registerNamePlaceholder: "Ім'я",
    registerEmailPlaceholder: "Ваш email",
    coursePlaceholder: "Курс",
    course1: "Курс 1",
    course2: "Курс 2",
    course3: "Курс 3",
    course4: "Курс 4",
    registerPasswordPlaceholder: "Пароль",
    registerSubmit: "Зареєструватися",
    ratingLabel: "Загальний рейтинг",
    tasksTitle: "3 задачі на день",
    tasksDescription: "Щодня доступно 3 довільні задачі. Обери задачу, розв'яжи її у вікні та отримай бали.",
    tasksComingTitle: "Coming soon",
    tasksComingText: "Задачі будуть доступні з 14.03 (субота) до 21.03.",
    pointsLabel: "Бали акаунту",
    accuracyLabel: "Середня правильність",
    weekTitle: "Статистика задач по днях",
    leaderboardTitle: "Таблиця рейтингу",
    showLeaderboard: "Показати",
    hideLeaderboard: "Сховати",
    lbPlace: "Місце",
    lbName: "Ім'я",
    lbPoints: "Бали",
    lbAccuracy: "Точність",
    lbRating: "Рейтинг",
    noLeaderboardData: "Ще немає даних рейтингу",
    adminTitle: "Адмін журнал",
    adminColTime: "Час",
    adminColUser: "Користувач",
    adminColTask: "Задача",
    adminColPoints: "Бали",
    adminColAnswer: "Відповідь",
    noAdminData: "Поки немає виконаних задач",
    settingsTitle: "Налаштування",
    settingsQuestion: "Що зробити?",
    languageLabel: "Мова",
    changeLanguage: "Змінити мову",
    back: "Повернутись назад",
    deleteAccount: "Видалити акаунт",
    deleteConfirm: "Точно видалити акаунт? Цю дію не можна скасувати.",
    deleteSuccess: "Акаунт видалено",
    deleteAdminBlocked: "Адмін-акаунт видаляти не можна",
    logout: "Вийти з акаунту",
    adminInfoOn: "Режим адміна активний. Нижче доступний журнал дій користувачів.",
    adminInfoOff: "Для адмін-перегляду увійдіть з email, що містить admin.",
    langUk: "Українська",
    langEn: "English",
    welcomePrefix: "Привіт",
    courseWord: "Курс",
    todayPrefix: "Сьогодні",
    pointsWord: "балів",
    accuracyWord: "Правильність",
    done: "Виконано",
    chooseTask: "Відкрити задачу",
    noTask: "нема виконаної задачі",
    updated: "Оновлено",
    fillAll: "Заповніть всі поля",
    registerSuccess: "Реєстрація успішна",
    registerFirst: "Спочатку зареєструйтесь",
    emailExists: "Такий email вже зареєстрований",
    emailDomainOnly: "Для реєстрації використайте пошту @ucu.edu.ua",
    emailReserved: "Ця пошта зарезервована для адміністратора",
    invalidCreds: "Невірний email або пароль",
    logoutSuccess: "Ви вийшли з акаунту",
    taskModalTitle: "Умова задачі",
    answerLabel: "Відповідь",
    answerPlaceholder: "Введіть відповідь...",
    symbolsLabel: "Математичні символи:",
    submitAnswer: "Надіслати відповідь",
    cancelTask: "Скасувати",
    emailSent: "Пароль надіслано на пошту",
    emailNotSent: "Пошта не налаштована, лист не відправлено",
    addBtn: "Створити задачу",
    addTaskTitle: "Створити задачу",
    taskSaved: "Задачу збережено!",
    saveBtn: "Зберегти",
    toggleTasksBtnOpen: "Відкрити задачі для всіх",
    toggleTasksBtnClose: "Закрити задачі",
    tasksOpenSuccess: "Налаштування оновлено!",
    answerCorrect: "Правильно!",
    answerWrong: "Неправильно!"
  },
  en: {
    pageTitle: "Day of number pi",
    authTitle: "Day of number pi",
    authSubtitle: "Sign in or create your account to start solving daily tasks.",
    tabLogin: "Login",
    tabRegister: "Sign up",
    loginEmailPlaceholder: "Your email",
    loginPasswordPlaceholder: "Password",
    loginSubmit: "Log in",
    registerNamePlaceholder: "Name",
    registerEmailPlaceholder: "Your email",
    coursePlaceholder: "Course",
    course1: "Course 1",
    course2: "Course 2",
    course3: "Course 3",
    course4: "Course 4",
    registerPasswordPlaceholder: "Password",
    registerSubmit: "Create account",
    ratingLabel: "Overall rating",
    tasksTitle: "3 tasks per day",
    tasksDescription: "Every day you get 3 random tasks. Open one, solve it in the modal window and get points.",
    tasksComingTitle: "Coming soon",
    tasksComingText: "Tasks will be available from 14.03 (Saturday) to 21.03.",
    pointsLabel: "Account points",
    accuracyLabel: "Average accuracy",
    weekTitle: "Task stats by day",
    leaderboardTitle: "Leaderboard",
    showLeaderboard: "Show",
    hideLeaderboard: "Hide",
    lbPlace: "Place",
    lbName: "Name",
    lbPoints: "Points",
    lbAccuracy: "Accuracy",
    lbRating: "Rating",
    noLeaderboardData: "No leaderboard data yet",
    adminTitle: "Admin Log",
    adminColTime: "Time",
    adminColUser: "User",
    adminColTask: "Task",
    adminColPoints: "Points",
    adminColAnswer: "Answer",
    noAdminData: "No completed tasks yet",
    settingsTitle: "Settings",
    settingsQuestion: "What do you want to do?",
    languageLabel: "Language",
    changeLanguage: "Change language",
    back: "Go back",
    deleteAccount: "Delete account",
    deleteConfirm: "Delete this account? This action cannot be undone.",
    deleteSuccess: "Account deleted",
    deleteAdminBlocked: "Admin account cannot be deleted",
    logout: "Log out",
    adminInfoOn: "Admin mode is active. User activity log is available below.",
    adminInfoOff: "Use an email containing 'admin' to access admin log.",
    langUk: "Українська",
    langEn: "English",
    welcomePrefix: "Hello",
    courseWord: "Course",
    todayPrefix: "Today",
    pointsWord: "points",
    accuracyWord: "Accuracy",
    done: "Done",
    chooseTask: "Open task",
    noTask: "no completed task",
    updated: "Updated",
    fillAll: "Fill in all fields",
    registerSuccess: "Registration successful",
    registerFirst: "Please sign up first",
    emailExists: "This email is already registered",
    emailDomainOnly: "Use an @ucu.edu.ua email for registration",
    emailReserved: "This email is reserved for admin",
    invalidCreds: "Invalid email or password",
    logoutSuccess: "You logged out",
    taskModalTitle: "Task condition",
    answerLabel: "Answer",
    answerPlaceholder: "Type your answer...",
    symbolsLabel: "Math symbols:",
    submitAnswer: "Submit answer",
    cancelTask: "Cancel",
    emailSent: "Password has been sent by email",
    emailNotSent: "Email is not configured, no message sent",
    addBtn: "Create task",
    addTaskTitle: "Create task",
    taskSaved: "Task saved!",
    saveBtn: "Save",
    toggleTasksBtnOpen: "Open tasks for all",
    toggleTasksBtnClose: "Close tasks",
    tasksOpenSuccess: "Settings updated!",
    answerCorrect: "Correct!",
    answerWrong: "Wrong answer!"
  }
};

const showLoginBtn = document.getElementById("show-login");
const showRegisterBtn = document.getElementById("show-register");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const message = document.getElementById("message");
const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const settingsButton = document.getElementById("settings-button");
const settingsModal = document.getElementById("settings-modal");
const backButton = document.getElementById("back-button");
const deleteAccountButton = document.getElementById("delete-account-button");
const logoutButton = document.getElementById("logout-button");
const languageSelect = document.getElementById("language-select");
const saveLanguageButton = document.getElementById("save-language-button");

const authTitle = document.querySelector(".auth-title");
const authSubtitle = document.querySelector(".auth-subtitle");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginSubmitButton = loginForm.querySelector("button[type='submit']");
const registerName = document.getElementById("register-name");
const registerEmail = document.getElementById("register-email");
const registerCourse = document.getElementById("register-course");
const registerPassword = document.getElementById("register-password");
const registerSubmitButton = registerForm.querySelector("button[type='submit']");
const coursePlaceholder = document.getElementById("course-placeholder");
const course1 = document.getElementById("course-1");
const course2 = document.getElementById("course-2");
const course3 = document.getElementById("course-3");
const course4 = document.getElementById("course-4");

const welcomeTitle = document.getElementById("welcome-title");
const userMeta = document.getElementById("user-meta");
const dayLabel = document.getElementById("day-label");
const tasksList = document.getElementById("tasks-list");
const pointsValue = document.getElementById("points-value");
const accuracyValue = document.getElementById("accuracy-value");
const totalRating = document.getElementById("total-rating");
const ratingLabel = document.getElementById("rating-label");
const ratingUpdated = document.getElementById("rating-updated");
const tasksTitle = document.getElementById("tasks-title");
const tasksDescription = document.getElementById("tasks-description");
const tasksComingTitle = document.getElementById("tasks-coming-title");
const tasksComingText = document.getElementById("tasks-coming-text");
const tasksComingSoon = document.getElementById("tasks-coming-soon");
const pointsLabel = document.getElementById("points-label");
const accuracyLabel = document.getElementById("accuracy-label");
const weekTitle = document.getElementById("week-title");
const weekStats = document.getElementById("week-stats");

const leaderboardTitle = document.getElementById("leaderboard-title");
const leaderboardSearchInput = document.getElementById("leaderboard-search");
const toggleLeaderboardButton = document.getElementById("toggle-leaderboard-button");
const leaderboardWrap = document.getElementById("leaderboard-wrap");
const leaderboardBody = document.getElementById("leaderboard-body");
const lbColPlace = document.getElementById("lb-col-place");
const lbColName = document.getElementById("lb-col-name");
const lbColPoints = document.getElementById("lb-col-points");
const lbColAccuracy = document.getElementById("lb-col-accuracy");
const lbColRating = document.getElementById("lb-col-rating");

const adminSection = document.getElementById("admin-section");
const adminTitle = document.getElementById("admin-title");
const adminLogBody = document.getElementById("admin-log-body");
const adminColTime = document.getElementById("admin-col-time");
const adminColUser = document.getElementById("admin-col-user");
const adminColTask = document.getElementById("admin-col-task");
const adminColPoints = document.getElementById("admin-col-points");
const adminColAnswer = document.getElementById("admin-col-answer");

const comingSoonSection = document.getElementById("coming-soon-section");
const comingSoonTitle = document.getElementById("coming-soon-title");
const comingSoonText = document.getElementById("coming-soon-text");

const settingsTitle = document.getElementById("settings-title");
const settingsQuestion = document.getElementById("settings-question");
const languageLabel = document.getElementById("language-label");
const adminInfo = document.getElementById("admin-info");

const taskModal = document.getElementById("task-modal");
const taskModalTitle = document.getElementById("task-modal-title");
const taskModalCondition = document.getElementById("task-modal-condition");
const answerLabel = document.getElementById("answer-label");
const taskAnswer = document.getElementById("task-answer");
const symbolsLabel = document.getElementById("symbols-label");
const mathSymbols = document.getElementById("math-symbols");
const submitAnswerButton = document.getElementById("submit-answer-button");
const cancelTaskButton = document.getElementById("cancel-task-button");

const btnOpenAddTask = document.getElementById("btn-open-add-task");
const btnToggleTasks = document.getElementById("btn-toggle-tasks");

const taskModalImage = document.getElementById("task-modal-image");

let serverConfig = { tasks_open: false, custom_tasks: [] };

let currentLang = getStorage("pi_lang", "uk");
let sessionUser = getStorage("pi_session_user", null);
let sessionToken = getStorage("pi_session_token", null);
let clockTimer = null;
let isLeaderboardOpen = false;
let activeTask = null;
let cachedLeaderboardRows = [];

function t(key) {
  return I18N[currentLang][key] || I18N.uk[key] || key;
}

function escapeHTML(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = `message ${type}`.trim();
}

function authHeaders() {
  if (!sessionToken) return {};
  return { Authorization: `Basic ${sessionToken}` };
}

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Request failed");
  }

  return response.json();
}

function isAdmin(user) {
  return Boolean(user && user.is_admin);
}

function getTodayIndex() {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

function getTodayKey() {
  return DAY_KEYS[getTodayIndex()];
}

function getDateKey() {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

function hashString(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createRng(seed) {
  let tSeed = seed;
  return () => {
    tSeed += 0x6d2b79f5;
    let r = Math.imul(tSeed ^ (tSeed >>> 15), 1 | tSeed);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function formatDay(dayKey) {
  return DAY_LABELS[currentLang][dayKey];
}

function switchTo(mode) {
  const isLogin = mode === "login";
  loginForm.classList.toggle("active", isLogin);
  registerForm.classList.toggle("active", !isLogin);
  showLoginBtn.classList.toggle("active", isLogin);
  showRegisterBtn.classList.toggle("active", !isLogin);
  showMessage("");
}

function openSettings() {
  languageSelect.value = currentLang;
  settingsModal.classList.remove("hidden");
}

function closeSettings() {
  settingsModal.classList.add("hidden");
}

function openTaskModal(task, dayKey) {
  activeTask = { task, dayKey };
  taskModalCondition.textContent = currentLang === "en" ? task.conditionEn : task.conditionUk;
  
  if (task.imgUrl) {
    taskModalImage.src = task.imgUrl;
    taskModalImage.classList.remove("hidden");
  } else {
    taskModalImage.classList.add("hidden");
    taskModalImage.src = "";
  }

  taskAnswer.value = "";
  taskModal.classList.remove("hidden");
  
  // Render LaTeX using MathJax if loaded
  if (window.MathJax) {
    window.MathJax.typesetPromise([taskModalCondition]).catch(() => {});
  }

  taskAnswer.focus();
}

function closeTaskModal() {
  taskModal.classList.add("hidden");
  activeTask = null;
}

function computeStats(items) {
  const totalPoints = items.reduce((sum, item) => sum + item.points, 0);
  const avgAccuracy = items.length
    ? Math.round(items.reduce((sum, item) => sum + item.accuracy, 0) / items.length)
    : 0;
  const dynamicRating = Math.round(totalPoints * 1.55 + avgAccuracy * 4.2);

  return { totalPoints, avgAccuracy, dynamicRating };
}

function buildDailyTasks(dayKey) {
  const dateKey = getDateKey();
  const seed = hashString(`${dateKey}-${dayKey}`);
  const rnd = createRng(seed);
  
  const unrestrictedCustomTasks = [];
  const forcedTasks = [];

  (serverConfig.custom_tasks || []).forEach(t => {
    const taskObj = {
      titleUk: t.titleUk,
      titleEn: t.titleEn,
      build: () => ({ conditionUk: t.conditionUk, conditionEn: t.conditionEn }),
      imgUrl: t.imgUrl || "",
      tags: t.tags || "",
      answers: t.answers || "",
      fixed_points: t.fixed_points || null,
      fixed_accuracy: t.fixed_accuracy || null
    };
    
    if (t.is_hidden) return; // Skip hidden tasks altogether

    if (!t.allowedEmails || t.allowedEmails.trim() === "") {
      unrestrictedCustomTasks.push(taskObj);
    } else {
      const allowed = t.allowedEmails.toLowerCase().split(",").map(e => e.trim());
      if (sessionUser && allowed.includes(sessionUser.email.toLowerCase())) {
        forcedTasks.push(taskObj);
      }
    }
  });

  const source = [...unrestrictedCustomTasks];
  const picked = [];

  for (let i = 0; i < 3; i += 1) {
    if (source.length === 0) break;
    const idx = Math.floor(rnd() * source.length);
    const tmpl = source.splice(idx, 1)[0];
    const conditions = tmpl.build(rnd);
    const points = tmpl.fixed_points != null && tmpl.fixed_points !== "" ? parseInt(tmpl.fixed_points) : 12 + Math.floor(rnd() * 12);
    const accuracy = tmpl.fixed_accuracy != null && tmpl.fixed_accuracy !== "" ? parseInt(tmpl.fixed_accuracy) : 72 + Math.floor(rnd() * 26);

    picked.push({
      id: `${dateKey}-${dayKey}-${i + 1}`,
      titleUk: tmpl.titleUk,
      titleEn: tmpl.titleEn,
      conditionUk: conditions.conditionUk,
      conditionEn: conditions.conditionEn,
      imgUrl: tmpl.imgUrl || "",
      tags: tmpl.tags || "",
      answers: tmpl.answers || "",
      points,
      accuracy
    });
  }

  forcedTasks.forEach((tmpl, i) => {
    const conditions = tmpl.build(rnd);
    const points = tmpl.fixed_points != null && tmpl.fixed_points !== "" ? parseInt(tmpl.fixed_points) : 15 + Math.floor(rnd() * 10);
    const accuracy = tmpl.fixed_accuracy != null && tmpl.fixed_accuracy !== "" ? parseInt(tmpl.fixed_accuracy) : 85 + Math.floor(rnd() * 15);
    picked.push({
      id: `${dateKey}-${dayKey}-f${i + 1}`,
      titleUk: tmpl.titleUk,
      titleEn: tmpl.titleEn,
      conditionUk: conditions.conditionUk,
      conditionEn: conditions.conditionEn,
      imgUrl: tmpl.imgUrl || "",
      tags: tmpl.tags || "",
      answers: tmpl.answers || "",
      points,
      accuracy
    });
  });

  return picked;
}

function ensureMathSymbols() {
  if (mathSymbols.childElementCount > 0) return;
  SYMBOLS.forEach((symbol) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "symbol-btn";
    button.textContent = symbol;
    button.addEventListener("click", () => insertSymbol(symbol));
    mathSymbols.appendChild(button);
  });
}

function insertSymbol(symbol) {
  const start = taskAnswer.selectionStart;
  const end = taskAnswer.selectionEnd;
  const before = taskAnswer.value.slice(0, start);
  const after = taskAnswer.value.slice(end);
  taskAnswer.value = `${before}${symbol}${after}`;
  const pos = start + symbol.length;
  taskAnswer.setSelectionRange(pos, pos);
  taskAnswer.focus();
}

function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.title = t("pageTitle");

  authTitle.textContent = t("authTitle");
  if (authSubtitle) authSubtitle.textContent = t("authSubtitle");

  showLoginBtn.textContent = t("tabLogin");
  showRegisterBtn.textContent = t("tabRegister");

  loginEmail.placeholder = t("loginEmailPlaceholder");
  loginPassword.placeholder = t("loginPasswordPlaceholder");
  loginSubmitButton.textContent = t("loginSubmit");

  registerName.placeholder = t("registerNamePlaceholder");
  registerEmail.placeholder = t("registerEmailPlaceholder");
  coursePlaceholder.textContent = t("coursePlaceholder");
  course1.textContent = t("course1");
  course2.textContent = t("course2");
  course3.textContent = t("course3");
  course4.textContent = t("course4");
  registerPassword.placeholder = t("registerPasswordPlaceholder");
  registerSubmitButton.textContent = t("registerSubmit");

  ratingLabel.textContent = t("ratingLabel");
  tasksTitle.textContent = t("tasksTitle");
  tasksDescription.textContent = t("tasksDescription");
  tasksComingTitle.textContent = t("tasksComingTitle");
  tasksComingText.textContent = t("tasksComingText");
  pointsLabel.textContent = t("pointsLabel");
  accuracyLabel.textContent = t("accuracyLabel");
  weekTitle.textContent = t("weekTitle");

  leaderboardTitle.textContent = t("leaderboardTitle");
  lbColPlace.textContent = t("lbPlace");
  lbColName.textContent = t("lbName");
  lbColPoints.textContent = t("lbPoints");
  lbColAccuracy.textContent = t("lbAccuracy");
  lbColRating.textContent = t("lbRating");
  toggleLeaderboardButton.textContent = isLeaderboardOpen ? t("hideLeaderboard") : t("showLeaderboard");

  adminTitle.textContent = t("adminTitle");
  adminColTime.textContent = t("adminColTime");
  adminColUser.textContent = t("adminColUser");
  adminColTask.textContent = t("adminColTask");
  adminColPoints.textContent = t("adminColPoints");
  adminColAnswer.textContent = t("adminColAnswer");

  comingSoonTitle.textContent = t("comingSoonTitle");
  comingSoonText.textContent = t("comingSoonText");

  taskModalTitle.textContent = t("taskModalTitle");
  answerLabel.textContent = t("answerLabel");
  taskAnswer.placeholder = t("answerPlaceholder");
  symbolsLabel.textContent = t("symbolsLabel");
  submitAnswerButton.textContent = t("submitAnswer");
  cancelTaskButton.textContent = t("cancelTask");

  if (btnToggleTasks) btnToggleTasks.textContent = serverConfig.tasks_open ? t("toggleTasksBtnClose") : t("toggleTasksBtnOpen");

  settingsTitle.textContent = t("settingsTitle");
  settingsQuestion.textContent = t("settingsQuestion");
  languageLabel.textContent = t("languageLabel");
  saveLanguageButton.textContent = t("changeLanguage");
  backButton.textContent = t("back");
  deleteAccountButton.textContent = t("deleteAccount");
  logoutButton.textContent = t("logout");
  settingsButton.setAttribute("aria-label", t("settingsTitle"));
  adminInfo.textContent = isAdmin(sessionUser) ? t("adminInfoOn") : t("adminInfoOff");

  languageSelect.querySelector("option[value='uk']").textContent = t("langUk");
  languageSelect.querySelector("option[value='en']").textContent = t("langEn");

  updateLiveTimestamp();
  if (!appSection.classList.contains("hidden")) {
    renderDashboard();
  }
}

async function renderDayTasks(submissions) {
  if (!sessionUser) return;
  if (!submissions) {
    submissions = await api("/api/submissions/me").catch(() => []);
  }
  const todayKey = getTodayKey();
  const tasks = buildDailyTasks(todayKey);

  dayLabel.textContent = `${t("todayPrefix")}: ${formatDay(todayKey)}`;
  tasksList.innerHTML = "";
  
  if (isAdmin(sessionUser) || serverConfig.tasks_open) {
    tasksList.classList.remove("hidden");
    tasksComingSoon.classList.add("hidden");
  } else {
    tasksList.classList.add("hidden");
    tasksComingSoon.classList.remove("hidden");
  }

  tasks.forEach((task) => {
    const card = document.createElement("article");
    const button = document.createElement("button");
    const title = currentLang === "en" ? task.titleEn : task.titleUk;

    card.className = "task-item";
    let subInfo = `+${task.points} ${t("pointsWord")} • ${t("accuracyWord")} ${task.accuracy}%`;
    if (task.tags) {
      let tagsDisplay = task.tags.split(',').map(tag => `<span style="background:#4CAF50; color:white; padding:2px 6px; border-radius:4px; font-size:0.7em; margin-right:4px;">${tag.trim()}</span>`).join('');
      subInfo += `<br><div style="margin-top:6px;">${tagsDisplay}</div>`;
    }
    card.innerHTML = `<h5>${title}</h5><p>${subInfo}</p>`;
    
    const isSolved = submissions.some(s => s.task_id === task.id && s.day_key === todayKey && s.points > 0);
    
    if (isSolved) {
      button.type = "button";
      button.textContent = currentLang === "en" ? "Solved ✓" : "Вирішено ✓";
      button.disabled = true;
      button.style.background = "#4CAF50";
      button.style.color = "white";
      button.style.cursor = "default";
      button.style.opacity = "0.8";
    } else {
      button.type = "button";
      button.textContent = t("chooseTask");
      button.addEventListener("click", () => openTaskModal(task, todayKey));
    }

    card.appendChild(button);
    tasksList.appendChild(card);
  });
}

function renderWeekStats(submissions) {
  weekStats.innerHTML = "";
  const latestByDay = new Map();

  submissions.forEach((item) => {
    const current = latestByDay.get(item.day_key);
    if (!current || item.ts > current.ts) {
      latestByDay.set(item.day_key, item);
    }
  });

  DAY_KEYS.forEach((dayKey) => {
    const row = document.createElement("div");
    const bar = document.createElement("div");
    const fill = document.createElement("div");
    const info = latestByDay.get(dayKey);

    row.className = "day-row";
    bar.className = "day-bar";
    fill.className = "day-fill";
    fill.style.width = `${info ? info.accuracy : 8}%`;

    bar.appendChild(fill);
    row.innerHTML = `<strong>${formatDay(dayKey)}</strong>`;
    row.appendChild(bar);

    const suffix = document.createElement("span");
    suffix.textContent = info ? `${info.points} ${currentLang === "en" ? "pts" : "б."} • ${info.accuracy}%` : t("noTask");

    row.appendChild(suffix);
    weekStats.appendChild(row);
  });
}

async function renderLeaderboard() {
  leaderboardBody.innerHTML = "";
  
  // fetch only if undefined or empty, basically fetching once or when forced
  let rows = await api("/api/leaderboard");
  cachedLeaderboardRows = rows;
  
  renderLeaderboardRows();
}

function renderLeaderboardRows() {
  leaderboardBody.innerHTML = "";
  const query = (leaderboardSearchInput.value || "").trim().toLowerCase();
  const hiddenEmails = (serverConfig.hidden_users || "").toLowerCase().split(",").map(e => e.trim()).filter(Boolean);

  const filtered = cachedLeaderboardRows.filter(r => {
    // Check if user is hidden
    if (hiddenEmails.includes(r.email.toLowerCase())) return false;
    
    // Check search query
    if (!query) return true;
    const nameMatch = (r.name || "").toLowerCase().includes(query);
    const facultyMatch = (r.faculty || "").toLowerCase().includes(query);
    return nameMatch || facultyMatch;
  });

  if (!filtered.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="5">${t("noLeaderboardData")}</td>`;
    leaderboardBody.appendChild(tr);
    return;
  }

  filtered.forEach((row, idx) => {
    const tr = document.createElement("tr");
    if (sessionUser && row.email === sessionUser.email) tr.classList.add("current-user");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${escapeHTML(row.name)}</td>
      <td>${row.points}</td>
      <td>${row.accuracy}%</td>
      <td>${row.rating}</td>
    `;
    leaderboardBody.appendChild(tr);
  });
}

leaderboardSearchInput.addEventListener("input", renderLeaderboardRows);

async function renderAdminLog() {
  adminLogBody.innerHTML = "";
  if (!isAdmin(sessionUser)) {
    adminSection.classList.add("hidden");
    comingSoonSection.classList.remove("hidden");
    return;
  }

  adminSection.classList.remove("hidden");
  comingSoonSection.classList.add("hidden");

  const submissions = await api("/api/submissions");
  const sorted = [...submissions].sort((a, b) => b.ts - a.ts);

  if (!sorted.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="5">${t("noAdminData")}</td>`;
    adminLogBody.appendChild(tr);
    return;
  }

  sorted.forEach((item) => {
    const tr = document.createElement("tr");
    const locale = currentLang === "en" ? "en-US" : "uk-UA";
    const taskTitle = currentLang === "en" ? item.task_title_en : item.task_title_uk;
    tr.innerHTML = `
      <td>${new Date(item.ts).toLocaleString(locale)}</td>
      <td>${escapeHTML(item.name)} (${escapeHTML(item.email)})</td>
      <td>${escapeHTML(taskTitle)}</td>
      <td>${item.points}</td>
      <td>${escapeHTML((item.answer || "").slice(0, 70))}</td>
    `;
    adminLogBody.appendChild(tr);
  });
}

function toggleLeaderboard() {
  isLeaderboardOpen = !isLeaderboardOpen;
  leaderboardWrap.classList.toggle("hidden", !isLeaderboardOpen);
  toggleLeaderboardButton.textContent = isLeaderboardOpen ? t("hideLeaderboard") : t("showLeaderboard");
}

function updateLiveTimestamp() {
  const now = new Date();
  const locale = currentLang === "en" ? "en-US" : "uk-UA";
  ratingUpdated.textContent = `${t("updated")}: ${now.toLocaleTimeString(locale)}`;
}

async function renderDashboard() {
  if (!sessionUser) return;

  const submissions = await api("/api/submissions/me");
  const stats = computeStats(submissions);

  welcomeTitle.textContent = `${t("welcomePrefix")}, ${sessionUser.name}`;
  userMeta.textContent = `${sessionUser.faculty} • ${t("courseWord")} ${sessionUser.course || "-"}`;

  pointsValue.textContent = `${stats.totalPoints}`;
  accuracyValue.textContent = `${stats.avgAccuracy}%`;
  totalRating.textContent = `${stats.dynamicRating}`;

  if (btnToggleTasks) btnToggleTasks.textContent = serverConfig.tasks_open ? t("toggleTasksBtnClose") : t("toggleTasksBtnOpen");

  await renderDayTasks(submissions);
  renderWeekStats(submissions);
  await renderLeaderboard();
  await renderAdminLog();
  updateLiveTimestamp();
}

async function openApp() {
  authSection.classList.add("hidden");
  appSection.classList.remove("hidden");
  settingsButton.classList.remove("hidden");
  
  try {
    serverConfig = await api("/api/config");
  } catch (e) {
    console.error("Config fetch failed", e);
  }

  try {
    await renderDashboard();
  } catch (err) {
    console.error("Dashboard fetch failed:", err);
    throw err; // Re-throw to propagate if login flow needs to know
  }

  if (clockTimer) clearInterval(clockTimer);
  clockTimer = setInterval(updateLiveTimestamp, 1000);
}

function logout() {
  closeSettings();
  closeTaskModal();
  appSection.classList.add("hidden");
  authSection.classList.remove("hidden");
  settingsButton.classList.add("hidden");
  adminSection.classList.add("hidden");

  sessionUser = null;
  sessionToken = null;
  setStorage("pi_session_user", null);
  setStorage("pi_session_token", null);

  switchTo("login");
  loginForm.reset();
  showMessage(t("logoutSuccess"), "success");

  if (clockTimer) {
    clearInterval(clockTimer);
    clockTimer = null;
  }
}

async function deleteCurrentAccount() {
  if (!sessionUser) return;
  const ok = window.confirm(t("deleteConfirm"));
  if (!ok) return;
  try {
    await api("/api/submissions", { method: "DELETE" });
    showMessage(t("deleteSuccess"), "success");
    logout();
  } catch (err) {
    showMessage(t("deleteAdminBlocked"), "error");
  }
}

async function submitTaskAnswer() {
  if (!activeTask || !sessionUser) return;
  const answer = taskAnswer.value.trim();
  if (!answer) {
    showMessage(t("answerRequired"), "error");
    return;
  }

  let finalPoints = activeTask.task.points;
  let finalAccuracy = activeTask.task.accuracy;

  const expectedAnswers = activeTask.task.answers;
  if (expectedAnswers && expectedAnswers.trim() !== "") {
    const list = expectedAnswers.split(",").map(a => a.trim().toLowerCase());
    if (list.includes(answer.toLowerCase())) {
      finalPoints = activeTask.task.points;
      finalAccuracy = 100;
      showMessage(t("answerCorrect"), "success");
    } else {
      finalPoints = 0;
      finalAccuracy = 0;
      showMessage(t("answerWrong"), "error");
    }
  }

  await api("/api/submissions", {
    method: "POST",
    body: JSON.stringify({
      day_key: activeTask.dayKey,
      date_key: getDateKey(),
      task_id: activeTask.task.id,
      task_title_uk: activeTask.task.titleUk,
      task_title_en: activeTask.task.titleEn,
      points: finalPoints,
      accuracy: finalAccuracy,
      answer
    })
  });

  closeTaskModal();
  await renderDashboard();
}

showLoginBtn.addEventListener("click", () => switchTo("login"));
showRegisterBtn.addEventListener("click", () => switchTo("register"));
settingsButton.addEventListener("click", openSettings);
toggleLeaderboardButton.addEventListener("click", toggleLeaderboard);
backButton.addEventListener("click", closeSettings);
deleteAccountButton.addEventListener("click", deleteCurrentAccount);
logoutButton.addEventListener("click", logout);
saveLanguageButton.addEventListener("click", () => {
  currentLang = languageSelect.value;
  setStorage("pi_lang", currentLang);
  applyLanguage();
  closeSettings();
});
submitAnswerButton.addEventListener("click", submitTaskAnswer);
cancelTaskButton.addEventListener("click", closeTaskModal);

settingsModal.addEventListener("click", (event) => {
  if (event.target === settingsModal) closeSettings();
});

taskModal.addEventListener("click", (event) => {
  if (event.target === taskModal) closeTaskModal();
});

if (btnToggleTasks) {
  btnToggleTasks.addEventListener("click", async () => {
    serverConfig.tasks_open = !serverConfig.tasks_open;
    try {
      await api("/api/config", { method: "POST", body: JSON.stringify(serverConfig) });
      showMessage(t("tasksOpenSuccess"), "success");
      btnToggleTasks.textContent = serverConfig.tasks_open ? t("toggleTasksBtnClose") : t("toggleTasksBtnOpen");
      await renderDayTasks();
    } catch (err) {
      showMessage("Error saving config", "error");
    }
  });
}

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = registerName.value.trim();
  const email = registerEmail.value.trim().toLowerCase();
  const course = registerCourse.value;
  const faculty = document.getElementById("register-faculty").value;
  const password = registerPassword.value;

  if (!name || !email || !course || !faculty || !password) {
    showMessage(t("fillAll"), "error");
    return;
  }

  try {
    const result = await api("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, course, faculty, password })
    });

    registerForm.reset();

    try {
      await loginWithCredentials(email, password);
    } catch (loginErr) {
      console.error("Auto login failed:", loginErr);
      switchTo("login");
      showMessage("Автоматичний вхід відхилено. Будь ласка, авторизуйтесь вручну.", "error");
    }
  } catch (err) {
    const text = (err && err.message) || "";
    if (text.includes("reserved")) showMessage(t("emailReserved"), "error");
    else if (text.includes("domain")) showMessage(t("emailDomainOnly"), "error");
    else if (text.includes("exists")) showMessage(t("emailExists"), "error");
    else showMessage(t("registerFirst"), "error");
  }
});

async function loginWithCredentials(email, password) {
  const token = btoa(unescape(encodeURIComponent(`${email}:${password}`)));
  sessionToken = token;
  setStorage("pi_session_token", token);

  const loginData = await api("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  sessionUser = loginData.user;
  setStorage("pi_session_user", sessionUser);
  await openApp();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;

  try {
    await loginWithCredentials(email, password);
  } catch (err) {
    showMessage(t("invalidCreds"), "error");
  }
});

ensureMathSymbols();
applyLanguage();

const storedUser = getStorage("pi_session_user", null);
const storedToken = getStorage("pi_session_token", null);

if (storedUser && storedToken) {
  sessionUser = storedUser;
  sessionToken = storedToken;
  openApp();
} else {
  switchTo("login");
}
