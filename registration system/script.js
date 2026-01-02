// Show specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

// Load users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registration
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = regName.value.trim();
    let email = regEmail.value.trim();
    let username = regUsername.value.trim();
    let password = regPassword.value;

    let users = getUsers();
    if (users.some(u => u.email === email || u.username === username)) {
        regMsg.textContent = "Email or Username already exists!";
        regMsg.style.color = "red";
        return;
    }

    users.push({ name, email, username, password, status: "Pending" });
    saveUsers(users);
    regMsg.textContent = "Registration successful! Await admin approval.";
    regMsg.style.color = "green";
    this.reset();
});

// User Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let userInput = loginUser.value.trim();
    let pass = loginPass.value;

    let users = getUsers();
    let user = users.find(u => (u.email === userInput || u.username === userInput) && u.password === pass);

    if (!user) {
        loginMsg.textContent = "Invalid credentials!";
        loginMsg.style.color = "red";
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userStatus').textContent = user.status;
    showPage('userDashboard');
});

// Admin Login
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let adminU = adminUser.value.trim();
    let adminP = adminProcess.value.trim();
});
