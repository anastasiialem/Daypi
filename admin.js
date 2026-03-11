const API_BASE = "";
let sessionToken = localStorage.getItem("pi_session_token");
let sessionUser = null;
try {
  let u = localStorage.getItem("pi_session_user");
  if(u) sessionUser = JSON.parse(u);
} catch(e) {}

const loginOverlay = document.getElementById("login-overlay");
const adminContent = document.getElementById("admin-content");
const tasksContainer = document.getElementById("tasks-container");
const btnAddNew = document.getElementById("btn-add-new");

let serverConfig = { tasks_open: false, custom_tasks: [] };

function authHeaders() {
  if (!sessionToken) return {};
  return { Authorization: `Basic ${sessionToken}` };
}

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {})
    },
    ...options
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function loadConfig() {
  try {
    serverConfig = await api("/api/config");
    document.getElementById("global-disabled-tags").value = serverConfig.disabled_tags || "";
    document.getElementById("global-hidden-users").value = serverConfig.hidden_users || "";
    renderTasks();
  } catch (e) {
    alert("Помилка завантаження конфігурації");
  }
}

async function saveConfig() {
  try {
    await api("/api/config", { method: "POST", body: JSON.stringify(serverConfig) });
    alert("Збережено!");
    renderTasks();
  } catch (e) {
    alert("Помилка збереження");
  }
}

window.saveGlobalConfig = function() {
  serverConfig.disabled_tags = document.getElementById("global-disabled-tags").value.trim();
  serverConfig.hidden_users = document.getElementById("global-hidden-users").value.trim();
  saveConfig();
}

function renderTasks() {
  tasksContainer.innerHTML = "";
  serverConfig.custom_tasks = serverConfig.custom_tasks || [];
  
  if (serverConfig.custom_tasks.length === 0) {
      tasksContainer.innerHTML = "<p style='color:#777;'>У вас ще немає кастомних задач. Створіть першу!</p>";
      return;
  }

  serverConfig.custom_tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = "task-card";
    
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
         <h4>Задача #${index + 1}</h4>
         <button class="modal-btn delete" onclick="deleteTask(${index})" style="background:#e53935; width:auto; padding:4px 8px; font-size:0.8em; margin:0;">Видалити</button>
      </div>
      
      <div style="display:flex; gap:10px;">
          <div style="flex:1;">
             <label class="muted">Назва (UA):</label>
             <input type="text" id="t-name-uk-${index}" value="${task.titleUk || ''}" />
             
             <label class="muted">Умова LaTeX (UA):</label>
             <textarea rows="3" id="t-cond-uk-${index}">${task.conditionUk || ''}</textarea>
          </div>
          <div style="flex:1;">
             <label class="muted">Назва (EN):</label>
             <input type="text" id="t-name-en-${index}" value="${task.titleEn || ''}" />
             
             <label class="muted">Умова LaTeX (EN):</label>
             <textarea rows="3" id="t-cond-en-${index}">${task.conditionEn || ''}</textarea>
          </div>
      </div>
      
      <label class="muted">URL Зображення:</label>
      <input type="url" id="t-img-${index}" value="${task.imgUrl || ''}" placeholder="https://..." />
      
      <label class="muted">Обмеження доступу (Emails через кому):</label>
      <input type="text" id="t-emails-${index}" value="${task.allowedEmails || ''}" placeholder="Залиште порожнім, щоб була доступна всім" />
      
      <div style="display:flex; gap:10px;">
          <div style="flex:1;">
             <label class="muted">Теги (через кому):</label>
             <input type="text" id="t-tags-${index}" value="${task.tags || ''}" placeholder="math, logic, easy" />
          </div>
          <div style="flex:1;">
             <label class="muted">Очікувана/можлива відповідь:</label>
             <input type="text" id="t-answers-${index}" value="${task.answers || ''}" placeholder="10.5" />
          </div>
      </div>
      
      <div style="display:flex; gap:10px;">
          <div style="flex:1;">
             <label class="muted">Фіксовані бали (можна залишити порожнім):</label>
             <input type="number" id="t-points-${index}" value="${task.fixed_points || ''}" placeholder="Напр. 50" min="0" />
          </div>
          <div style="flex:1;">
             <label class="muted">Фіксована правильність % (можна порожнім):</label>
             <input type="number" id="t-accuracy-${index}" value="${task.fixed_accuracy || ''}" placeholder="Напр. 100" min="0" max="100" />
          </div>
      </div>
      
      <div style="margin-top:10px;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
             <input type="checkbox" id="t-hidden-${index}" ${task.is_hidden ? 'checked' : ''} style="width:auto; height:18px; width:18px;" />
             <span style="color:#ffaa00;">Приховати задачу (вона більше не буде випадати користувачам)</span>
          </label>
      </div>
      
      <button class="modal-btn" onclick="saveTask(${index})" style="width:100%; margin-top:10px; background:#4CAF50;">Зберегти редагування</button>
    `;
    
    tasksContainer.appendChild(card);
  });
}

window.deleteTask = function(index) {
  if (confirm("Точно видалити цю задачу?")) {
    serverConfig.custom_tasks.splice(index, 1);
    saveConfig();
  }
}

window.saveTask = function(index) {
  serverConfig.custom_tasks[index] = {
    titleUk: document.getElementById(`t-name-uk-${index}`).value.trim(),
    titleEn: document.getElementById(`t-name-en-${index}`).value.trim(),
    conditionUk: document.getElementById(`t-cond-uk-${index}`).value.trim(),
    conditionEn: document.getElementById(`t-cond-en-${index}`).value.trim(),
    imgUrl: document.getElementById(`t-img-${index}`).value.trim(),
    allowedEmails: document.getElementById(`t-emails-${index}`).value.trim(),
    tags: document.getElementById(`t-tags-${index}`).value.trim(),
    answers: document.getElementById(`t-answers-${index}`).value.trim(),
    fixed_points: document.getElementById(`t-points-${index}`).value,
    fixed_accuracy: document.getElementById(`t-accuracy-${index}`).value,
    is_hidden: document.getElementById(`t-hidden-${index}`).checked
  };
  saveConfig();
}

btnAddNew.addEventListener("click", () => {
  serverConfig.custom_tasks.unshift({
     titleUk: "Нова задача",
     titleEn: "New task",
     conditionUk: "", conditionEn: "", imgUrl: "", allowedEmails: "", tags: "", answers: "", fixed_points: "", fixed_accuracy: "", is_hidden: false
  });
  renderTasks();
});

if (!sessionUser || !sessionUser.is_admin) {
  loginOverlay.style.display = "block";
} else {
  adminContent.style.display = "block";
  loadConfig();
}
