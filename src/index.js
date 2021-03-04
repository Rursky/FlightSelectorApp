import style from "./css/index.scss";

/////////////// Developer window

document.getElementById("testbtn").addEventListener("click", () => {
    alert(user_verification)
});

document.getElementById("testbtn1").addEventListener("click", () => {
    alert(user1)
})

document.getElementById("testbtn2").addEventListener("click", () => {
    alert(password1)
})

//////////////// Obsługa rejestracji

document.getElementById("register").addEventListener("click", () => {
    openRegisterForm()
})

let user_verification1 = false
let user_verification = false
document.getElementById("popup-register-btn").addEventListener("click", () => {
    for (let k = 0; k < 1; k++) {
        if (document.getElementById("username1").value == "" || document.getElementById("password1").value == "") {
            alert("Żadne z pól nie moze byc puste")
        } else {
            for (let i = 0; i < user1.length; i++) {
                if (document.getElementById("username1").value == user1[i]) {
                    user_verification = true
                }
            }
            if (user_verification == true) {
                alert("user istnieje")
                user_verification = false
            } else if (user_verification == false) {
                // alert("user NIE istnieje")
                user_verification1 = true
            }
        }
    }
    if (user_verification1 == true) {
        user1.push(document.getElementById("username1").value)
        password1.push(document.getElementById("password1").value)
        user_verification1 = false
        closeRegisterForm()
        alert("zarejestrowano Cie")
    }
});

document.querySelector("#register-popup-close").addEventListener("click", closeRegisterForm)


//////////////// LOGIN DANE UZYTKOWANIA ROZWIAZANIE TYMCZASOWE

let login_valid_inner = false
let login_valid = false

const user1 = ["tanieloty", "tanieloty1", "tanieloty2"]
const password1 = ["admin", "admin1", "admin2"]


//////////////// POPUP - (obsługa)

function openRegisterForm() {
    document.querySelector("#popup-register").classList.add("showpopup")
}

function closeRegisterForm() {
    document.querySelector("#popup-register").classList.remove("showpopup")
}

function openLoginForm() {
    document.querySelector(".popup").classList.add("showpopup")
}

function closeLoginForm() {
    document.querySelector(".popup").classList.remove("showpopup")
}

//////////////// Randomowe godziny wylotu i przylotu

// const a = (Math.floor(Math.random() * (10 - 1)) + 1)
// const b = Math.floor(Math.random() * (59 - 10)) + 10

//////////////// Aktualna data - (do obsługi błędu, jeżeli wybierzemy w formularzu datę wcześniejszą niż aktualna).

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

///////////////// Obsługa zaloguj - event listener

document.getElementById("login").addEventListener("click", () => {
    if (login_valid == false) {
        document.getElementById("popup-username").classList.remove("wrongpassword")
        document.getElementById("popup-password").classList.remove("wrongpassword")
        openLoginForm()
        resolve()
    } else if (login_valid == true) {
        alert("wylogowano")
        document.getElementById("login").innerText = `Zaloguj`
        login_valid = false;
    }
})

document.getElementById("popup-login-btn").addEventListener("click", () => {
    for (let i = 0; i < user1.length; i++) {
        if (document.getElementById("popup-username").value == user1[i] && document.getElementById("popup-password").value == password1[i]) {
            login_valid_inner = true
            login_valid = true
            document.getElementById("login").innerText = `Wyloguj, ${document.getElementById("popup-username").value}`
            closeLoginForm()
            break
        } else {
            login_valid_inner = false
        }
    }
    if (login_valid_inner == true) {
        alert("Zalogowany pomyślnie")
        resolve()
    } else if (login_valid_inner == false) {
        document.getElementById("popup-username").classList.add("wrongpassword")
        document.getElementById("popup-password").classList.add("wrongpassword")
        alert("Podano błędny login lub hasło! Nie masz konta? Chcesz się zarejestrować? KLIKNIJ ZAREJESTRUJ")
    }
})

document.querySelector(".popup-close").addEventListener("click", closeLoginForm)

///////////////// Wywołanie promisów (uruchomienie promisów po kliknięciu "szukaj")

document.getElementById("search-flight").addEventListener("click", makeFly)

///////////////// Obsługa wyboru lotu + wymuś zalogowanie - Promisy

const valid_data = () => { // obsługa braku wyboru w formularzu tj zostawienie pustych okienek
    return new Promise((resolve, reject) => {
        if (document.getElementById("town1").value == "") {
            alert("Podaj miasto wylotu")
        } else if (document.getElementById("town2").value == "") {
            alert("Podaj miasto przylotu")
        } else if (document.getElementById("leave-date").value == "") {
            alert("Podaj date wylotu")
        } else {
            resolve()
        }
    })
}

const valid_date_put_weather = () => { // obsługa błędu wyboru daty wcześniejszej niż aktualna oraz dodanie "widgetu" pogody dla miasta wylotu (1 miasto w aplikacji, lecz konstrukcja promisa do obsługi wielu)
    return new Promise((resolve, reject) => {
        if (document.getElementById("leave-date").value < today) {
            alert("Wybierz aktualną datę")
        } else {
            fetch(`https:api.openweathermap.org/data/2.5/forecast?q=${document.getElementById("town1").value}&appid=3865d70b9f135bc376b8beb376bb474b`)
                .then(resp => resp.json())
                .then(data => {
                    document.getElementById("weather-text").innerText = `${document.getElementById("town1").value}: ${((data.list[0].main.temp)-273.15).toFixed(0)}°c`
                    document.getElementById("weather-text").classList.add("weather-text1")
                    resolve()
                })
        }
    })
}

const put_flight = () => {
    return new Promise((resolve, reject) => {
        document.querySelector(".results").innerHTML = `<p>LOADING...</p><p id="loading"><i class="fas fa-circle"></i></p>`
        setTimeout(() => {
            if (document.getElementById("town2").value == "Warszawa") {
                document.querySelector(".results").innerHTML = `<table><tr><td>Z</td> <td>Do</td> <td>Wylot</td> <td>Przylot</td> <td>Bilet</td></tr><tr><td>${document.getElementById("town1").value}</td> <td>${document.getElementById("town2").value}</td> <td>8:23</td> <td>9:37</td> <td><input type="button" id="abcd" value="WYBIERZ"/></td></tr></table>`
            } else if (document.getElementById("town2").value == "Paryż") {
                document.querySelector(".results").innerHTML = `<table><tr><td>Z</td> <td>Do</td> <td>Wylot</td> <td>Przylot</td> <td>Bilet</td></tr><tr><td>${document.getElementById("town1").value}</td> <td>${document.getElementById("town2").value}</td> <td>9:29</td> <td>11:17</td> <td><input type="button" id="abcd" value="WYBIERZ"/></td></tr></table>`
            } else if (document.getElementById("town2").value == "Nowy Jork") {
                document.querySelector(".results").innerHTML = `<table><tr><td>Z</td> <td>Do</td> <td>Wylot</td> <td>Przylot</td> <td>Bilet</td></tr><tr><td>${document.getElementById("town1").value}</td> <td>${document.getElementById("town2").value}</td> <td>5:29</td> <td>16:17</td> <td><input type="button" id="abcd" value="WYBIERZ"/></td></tr></table>`
            }
            resolve()
        }, 1200);
    })
}

const confirm_flight_and_login = () => {
    return new Promise((resolve, reject) => {
        document.getElementById("abcd").addEventListener("click", () => {
            if (login_valid == false) {
                reject()
            } else if (login_valid == true) {
                // login_checker = true
                resolve()
            }
        })
    })
}

const login_error = () => {
    return new Promise((resolve, reject) => {
        document.querySelector(".results").innerHTML = "<p>Wyszukaj ponownie lot po zalogowaniu</p>"
        openLoginForm()
            // resolve()
    })
}


const login_btn = () => {
    return new Promise((resolve, reject) => {
        alert("doszło")
        resolve()
    })
}

const testtest = () => {
    return new Promise((resolve, reject) => {
        alert("doszło 1")
        resolve()
    })
}

const testtest1 = () => {
    return new Promise((resolve, reject) => {
        alert("doszło 2")
        resolve()
    })
}

///////////////// Promisy - rozruch (NIE RUSZAĆ)
const uruchomienie = () => {
    return new Promise((resolve, reject) => {
        resolve()
    })
}

const uruchomienie1 = () => {
    return new Promise((resolve, reject) => {
        resolve()
    })
}

function makeFly() {
    uruchomienie()
        .then(valid_data)
        .then(valid_date_put_weather)
        .then(put_flight)
        .then(confirm_flight_and_login)
        .catch(login_error)
        .then(login_btn)
        .then(testtest)
        .then(testtest1)
}