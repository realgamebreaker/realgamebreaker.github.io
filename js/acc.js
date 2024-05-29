document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const welcomeContainer = document.getElementById("welcome-container");
    const loginContainer = document.getElementById("login-container");
    const welcomeMessage = document.getElementById("welcome-message");
    const logoutButton = document.getElementById("logout-button");

    const sha256 = (str) => {
        return CryptoJS.SHA256(str).toString();
    };

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    const getCookie = (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    const eraseCookie = (name) => {
        document.cookie = name + '=; Max-Age=-99999999;';
    };

    const authenticateUser = () => {
        const usernameHash = getCookie("usernameHash");
        const passwordHash = getCookie("passwordHash");

        if (usernameHash && passwordHash) {
            loginContainer.style.display = "none";
            welcomeContainer.style.display = "block";
            welcomeMessage.textContent = `Willkommen zurück!`;
        }
    };

    // Hier sind die SHA-256-gehashten Werte eingefügt
    const storedUsers = {
        'usernameHash': '6d9010b2b7a1483b256ae7477738dba7c530bd9ba53db1d6691441e74b83608a',
        'passwordHash': '6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e'
    };

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const usernameHash = sha256(username);
        const passwordHash = sha256(password);
        console.log(usernameHash);
        console.log(storedUsers['usernameHash']);
        console.log(passwordHash);
        console.log(storedUsers['passwordHash']);
        if (storedUsers['usernameHash'] == usernameHash && storedUsers['usernameHash'] == passwordHash) {
            setCookie("usernameHash", usernameHash, 7);
            setCookie("passwordHash", passwordHash, 7);
            authenticateUser();
        } else {
            alert("Invalid Username or Password!");
        }
    });

    logoutButton.addEventListener("click", () => {
        eraseCookie("usernameHash");
        eraseCookie("passwordHash");
        loginContainer.style.display = "block";
        welcomeContainer.style.display = "none";
    });

    authenticateUser();
});
