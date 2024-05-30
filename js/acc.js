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
    
    const storedUsers = {
        'usernameHash': '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
        'passwordHash': '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
    };

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log(username);

        const usernameHash = sha256(username);
        const passwordHash = sha256(password);
        console.log(usernameHash);
        console.log(storedUsers['usernameHash']);
        console.log(passwordHash);
        console.log(storedUsers['passwordHash']);
        if (storedUsers['usernameHash'] === usernameHash && storedUsers['usernameHash'] === passwordHash) {
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
