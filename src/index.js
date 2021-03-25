import style from "./css/index.scss";

/////////////// Developer window

document.querySelector("#devbtn").addEventListener("click", () => {
    if (document.querySelector(".developer_window").classList.contains("showdevwindow")) {
        document.querySelector(".developer_window").classList.remove("showdevwindow")
    } else {
        document.querySelector(".developer_window").classList.add("showdevwindow")
    }
})

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
            alert("Żadne z pól nie moze byc puste.")
        } else {
            for (let i = 0; i < user1.length; i++) {
                if (document.getElementById("username1").value == user1[i]) {
                    user_verification = true
                }
            }
            if (user_verification == true) {
                alert("Użytkownik istnieje w bazie. Podaj inną nazwę.")
                user_verification = false
                document.getElementById("username1").value = "" // czyszczenie okienek username po podaniu istniejacego usera
                document.getElementById("password1").value = "" // czyszczenie okienek password po podaniu istniejacego usera
            } else if (user_verification == false) {
                user_verification1 = true
            }
        }
    }
    if (user_verification1 == true) {
        user1.push(document.getElementById("username1").value)
        password1.push(document.getElementById("password1").value)
        user_verification1 = false
        closeRegisterForm()
        alert("Zarejestrowano Cię.")
        document.getElementById("username1").value = "" // czyszczenie okienek username po zarejestrowniu
        document.getElementById("password1").value = "" // czyszczenie okienek password po zarejestrowaniu
    }
});

document.querySelector("#register-popup-close").addEventListener("click", closeRegisterForm)


//////////////// LOGIN DANE UZYTKOWANIA

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

let login_valid_inner = false
let login_valid = false

document.getElementById("login").addEventListener("click", () => {
    if (login_valid == false) {
        document.getElementById("popup-username").classList.remove("wrongpassword")
        document.getElementById("popup-password").classList.remove("wrongpassword")
        openLoginForm()
        resolve()
    } else if (login_valid == true) {
        alert("Zostałeś wylogowany")
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
        alert(`Cześć ${document.getElementById("popup-username").value}! Zostałeś zalogowany.`)
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
            alert("Podaj miasto wylotu.")
        } else if (document.getElementById("town2").value == "") {
            alert("Podaj miasto przylotu.")
        } else if (document.getElementById("leave-date").value == "") {
            alert("Podaj date wylotu.")
        } else {
            resolve()
        }
    })
}

const valid_date_put_weather = () => { // obsługa błędu wyboru daty wcześniejszej niż aktualna oraz dodanie "widgetu" pogody dla miasta wylotu (1 miasto w aplikacji, lecz konstrukcja promisa do obsługi wielu)
    return new Promise((resolve, reject) => {
        if (document.getElementById("leave-date").value < today) {
            alert("Wybierz aktualną datę.")
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
        if (login_valid == false) {
            alert("Nie jesteś Zalogowany! Możesz kupić bilet dopiero PO ZALOGOWANIU.")
        }
        document.querySelector(".results").innerHTML = `<p>SZUKAM LOTÓW...</p><p id="loading"><i class="fas fa-circle"></i></p>`
        setTimeout(() => {
            let cityStart = "" // Zamiana nazwy miasta na symbol lotniska
            if (document.getElementById("town1").value == "Warszawa") {
                cityStart = "WAW-sky"
            }
            let cityEnd = "" // Zamiana nazwy miasta na symbol lotniska
            if (document.getElementById("town2").value == "Katowice") {
                cityEnd = "KTW-sky"
            } else if (document.getElementById("town2").value == "Paryż") {
                cityEnd = "PARI-sky"
            } else if (document.getElementById("town2").value == "Nowy Jork") {
                cityEnd = "JFK-sky"
            }
            fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/PL/PLN/en-US/${cityStart}/${cityEnd}/${document.getElementById("leave-date").value}?inboundpartialdate=anytime`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "f7f8324186mshd96928fd91e60f4p14b669jsn40ed176a2005",
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
                    }
                })
                .then((resp) => resp.json()) //mówimy, ze pobrane dane to JSON
                .then(function(data) { //data = pobrane dane
                    console.log(data)
                    if (data.Carriers[0] == undefined) { // jeżeli w tym dniu nie bedzie lotu APi nie wygeneruje data.Carriers[0] i pokaże komunikat
                        document.querySelector(".results").innerHTML = `<p>Nie znaleziono lotu w tym dniu. Wybierz inną datę.</p>`
                    } else {
                        document.querySelector(".results").innerHTML = `<table id="table-flight1"><tr><td>Z > Do</td> <td>Przewoźnik</td> <td>Wylot > Przylot</td> <td>Cena(${document.getElementById("adults").value} osób)</td> <td>Bilet</td></tr><tr><td>${document.getElementById("town1").value}<br>v<br>${document.getElementById("town2").value}</td> <td>${data.Carriers[0].Name}</td> <td>8:23 <br>v<br> 9:27</td> <td>${data.Quotes[0].MinPrice *document.getElementById("adults").value} PLN</td> <td><input type="button" id="abcd" value="KUP"/></td></tr></table>`
                        resolve()
                    }
                })
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
        // alert("doszło")
        document.querySelector(".results").innerHTML = `<div id=testtest></div>`
        for (let i = 0; i < document.getElementById("adults").value; i++) {
            let fff = document.createElement('p')
            document.getElementById("testtest").appendChild(fff)
            fff.innerText = `Osoba ${i+1}`
            let ggg = document.createElement('select')
            document.getElementById("testtest").appendChild(ggg)
            ggg.setAttribute("id", `div${i}`);
            for (let l = 0; l < 8; l++) {
                let hhh = document.createElement('option')
                hhh.innerText = `${l+1}`
                document.getElementById(`div${i}`).appendChild(hhh)
                hhh.setAttribute("value", `${l}`);
            }
        }
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