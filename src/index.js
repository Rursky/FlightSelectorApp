import style from "./css/index.scss";



/////////////// Developer window

// document.querySelector("#devbtn").addEventListener("click", () => {
//     if (document.querySelector(".developer_window").classList.contains("showdevwindow")) {
//         document.querySelector(".developer_window").classList.remove("showdevwindow")
//     } else {
//         document.querySelector(".developer_window").classList.add("showdevwindow")
//     }
// })

// document.getElementById("testbtn").addEventListener("click", () => {
//     alert(user_verification)
// });

// document.getElementById("testbtn1").addEventListener("click", () => {
//     alert(user1)
// })

// document.getElementById("testbtn2").addEventListener("click", () => {
//     alert(password1)
// })

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

// const valid_date_put_weather = () => { // obsługa błędu wyboru daty wcześniejszej niż aktualna oraz dodanie "widgetu" pogody dla miasta wylotu (1 miasto w aplikacji, lecz konstrukcja promisa do obsługi wielu)
//     return new Promise((resolve, reject) => {
//         if (document.getElementById("leave-date").value < today) {
//             alert("Wybierz aktualną datę.")
//         } else {
//             fetch(`https:api.openweathermap.org/data/2.5/forecast?q=${document.getElementById("town1").value}&appid=3865d70b9f135bc376b8beb376bb474b`)
//                 .then(resp => resp.json())
//                 .then(data => {
//                     document.getElementById("weather-text").innerText = `${document.getElementById("town1").value}: ${((data.list[0].main.temp)-273.15).toFixed(0)}°c`
//                     document.getElementById("weather-text").classList.add("weather-text1")
//                     resolve()
//                 })
//         }
//     })
// }

const valid_date_put_weather = () => { // obsługa błędu wyboru daty wcześniejszej niż aktualna oraz dodanie "widgetu" pogody dla miasta wylotu (1 miasto w aplikacji, lecz konstrukcja promisa do obsługi wielu)
    return new Promise((resolve, reject) => {
        if (document.getElementById("leave-date").value < today) {
            alert("Wybierz aktualną datę.")
        } else {
            fetch(`https://api.weatherapi.com/v1/current.json?key=0e023a9d7d024767ab084102212705&q=${document.getElementById("town1").value}&aqi=no`)
                .then(resp => resp.json())
                .then(data => {
                    document.getElementById("weather-text").innerText = `${document.getElementById("town1").value}: ${((data.current.temp_c)).toFixed(0)}°c`
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
                        const flight_price = data.Quotes[0].MinPrice * document.getElementById("adults").value
                        resolve(flight_price)
                    }
                })
        }, 1200);
    })
}

const confirm_flight_and_login = (flight_price) => {
    return new Promise((resolve, reject) => {
        document.getElementById("abcd").addEventListener("click", () => {
            if (login_valid == false) {
                reject()
            } else if (login_valid == true) {
                // login_checker = true
                resolve(flight_price)
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

let k = 0
let seats_table = []

const seats_selector = (flight_price) => {
    return new Promise((resolve, reject) => {
        document.querySelector(".results").innerHTML = `<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"         xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="100mm" height="100mm" viewBox="0 0 210 297" version="1.1" id="svg8" inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)" sodipodi:docname="malysamolot.svg">   <!-- <defs      id="defs2" /> -->   <!-- <sodipodi:namedview      id="base"      pagecolor="#ffffff"      bordercolor="#666666"      borderopacity="1.0"      inkscape:pageopacity="0.0"      inkscape:pageshadow="2"      inkscape:zoom="0.35"      inkscape:cx="400"      inkscape:cy="560"      inkscape:document-units="mm"      inkscape:current-layer="layer1"      inkscape:document-rotation="0"      showgrid="false"      inkscape:window-width="1600"      inkscape:window-height="837"      inkscape:window-x="-8"      inkscape:window-y="-8"      inkscape:window-maximized="1" /> -->   <!-- <metadata      id="metadata5">     <rdf:RDF>       <cc:Work          rdf:about="">         <dc:format>image/svg+xml</dc:format>         <dc:type            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />         <dc:title></dc:title>       </cc:Work>     </rdf:RDF>   </metadata> -->   <g      inkscape:label="Warstwa 1"      inkscape:groupmode="layer"      id="layer1">     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="rect848"        width="141.3631"        height="252.48808"        x="26.458336"        y="20.410715"        ry="10.583333" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a1"        width="22.678572"        height="18.898809"        x="34.773811"        y="40.82143"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b1"        width="22.678572"        height="18.898809"        x="57.452385"        y="40.82143"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c1"        width="22.678572"        height="18.898809"        x="113.39286"        y="40.443451"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d1"        width="22.678572"        height="18.898809"        x="136.07143"        y="40.443451"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c2"        width="22.678572"        height="18.898809"        x="113.39288"        y="77.10714"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d2"        width="22.678572"        height="18.898809"        x="136.07143"        y="77.10714"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c3"        width="22.678572"        height="18.898809"        x="114.14881"        y="112.25893"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d3"        width="22.678572"        height="18.898809"        x="136.82738"        y="112.25893"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a2"        width="22.678572"        height="18.898809"        x="34.017857"        y="78.241074"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b2"        width="22.678572"        height="18.898809"        x="56.69643"        y="78.241074"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a3"        width="22.678572"        height="18.898809"        x="34.773815"        y="113.01488"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b3"        width="22.678572"        height="18.898809"        x="57.452374"        y="113.01488"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a4"        width="22.678572"        height="18.898809"        x="35.529766"        y="148.54465"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b4"        width="22.678572"        height="18.898809"        x="58.20834"        y="148.54465"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c4"        width="22.678572"        height="18.898809"        x="114.90476"        y="147.78868"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d4"        width="22.678572"        height="18.898809"        x="137.58334"        y="147.78868"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a5"        width="22.678572"        height="18.898809"        x="36.285717"        y="183.31845"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b5"        width="22.678572"        height="18.898809"        x="58.964291"        y="183.31845"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c5"        width="22.678572"        height="18.898809"        x="114.90475"        y="184.07442"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d5"        width="22.678572"        height="18.898809"        x="137.58333"        y="184.07442"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a6"        width="22.678572"        height="18.898809"        x="36.285713"        y="219.60417"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b6"        width="22.678572"        height="18.898809"        x="58.964287"        y="219.60417"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c6"        width="22.678572"        height="18.898809"        x="114.90477"        y="220.36012"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d6"        width="22.678572"        height="18.898809"        x="137.58333"        y="220.36012"        ry="4.1577392" />     <rect        style="fill:#ff0000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.306019;stroke-opacity:0.967872"        id="rect991-2"        width="4.0243545"        height="19.521347"        x="-167.94371"        y="245.18427"        ry="1.561708"        transform="scale(-1,1)" />     <rect        style="fill:#ff0000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.30208;stroke-opacity:0.967872"        id="rect991-2-7"        width="4.0602021"        height="18.853945"        x="-30.500614"        y="248.01518"        ry="1.5083157"        transform="scale(-1,1)" />     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="41.577381"        y="34.773808"        id="text1025"><tspan          sodipodi:role="line"          id="tspan1023"          x="41.577381"          y="34.773808"          style="stroke-width:0.264583">A</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="65.767853"        y="34.017857"        id="text1029"><tspan          sodipodi:role="line"          id="tspan1027"          x="65.767853"          y="34.017857"          style="stroke-width:0.264583">B</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="120.95238"        y="33.261906"        id="text1033"><tspan          sodipodi:role="line"          id="tspan1031"          x="120.95238"          y="33.261906"          style="stroke-width:0.264583">C</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="144.3869"        y="33.261906"        id="text1037"><tspan          sodipodi:role="line"          id="tspan1035"          x="144.3869"          y="33.261906"          style="stroke-width:0.264583">D</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="94.494041"        y="52.916664"        id="text1041"><tspan          sodipodi:role="line"          id="tspan1039"          x="94.494041"          y="52.916664"          style="stroke-width:0.264583">1</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="94.494049"        y="90.714287"        id="text1045"><tspan          sodipodi:role="line"          id="tspan1043"          x="94.494049"          y="90.714287"          style="stroke-width:0.264583">2</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="95.25"        y="125.4881"        id="text1049"><tspan          sodipodi:role="line"          id="tspan1047"          x="95.25"          y="125.4881"          style="stroke-width:0.264583">3</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="94.494041"        y="161.7738"        id="text1053"><tspan          sodipodi:role="line"          id="tspan1051"          x="94.494041"          y="161.7738"          style="stroke-width:0.264583">4</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="96.005959"        y="197.30357"        id="text1057"><tspan          sodipodi:role="line"          id="tspan1055"          x="96.005959"          y="197.30357"          style="stroke-width:0.264583">5</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="96.761909"        y="232.83334"        id="text1061"><tspan          sodipodi:role="line"          id="tspan1059"          x="96.761909"          y="232.83334"          style="stroke-width:0.264583">6</tspan></text>   </g> </svg>`
        const seats = [document.getElementById("a1"), document.getElementById("b1"), document.getElementById("c1"), document.getElementById("d1"),
            document.getElementById("a2"), document.getElementById("b2"), document.getElementById("c2"), document.getElementById("d2"),
            document.getElementById("a3"), document.getElementById("b3"), document.getElementById("c3"), document.getElementById("d3"),
            document.getElementById("a4"), document.getElementById("b4"), document.getElementById("c4"), document.getElementById("d4"),
            document.getElementById("a5"), document.getElementById("b5"), document.getElementById("c5"), document.getElementById("d5"),
            document.getElementById("a6"), document.getElementById("b6"), document.getElementById("c6"), document.getElementById("d6")
        ]
        for (let i = 0; i < seats.length; i++) {
            seats[i].addEventListener("click", () => {
                if (k < document.getElementById("adults").value) {
                    seats[i].style = "";
                    seats[i].classList = "";
                    seats[i].classList.add("color");
                    seats_table.push(seats[i].id)
                } else {
                    resolve(flight_price)
                }
                k++
            })
        }
    })
}


let luggage_person_qty = ""

const luggage_chooser = (flight_price) => {
    return new Promise((resolve, reject) => {
        document.querySelector(".results").innerHTML = `<table id="table-flight1"><tr><td>Wybór bagażu dodatkowego</td> <td></td> <td></td> <td>Cena biletów</td> <td></td></tr><tr><td id="table_1"></td> <td>+${(flight_price*0.05).toFixed(1)} PLN za osobę</td> <td></td> <td>${flight_price} PLN</td> <td><input type="button" id="abcd1" value="DALEJ"/></td></tr></table>`
        document.getElementById("table_1").innerHTML = `<div id=testtest></div>`

        let person_label = document.createElement('label')
        document.getElementById("testtest").appendChild(person_label)
        person_label.setAttribute("id", `luggage1`);
        person_label.setAttribute("for", `luggage`);
        document.getElementById("luggage1").innerText = "Liczba osób"
        let person_select = document.createElement('select')
        document.getElementById("testtest").appendChild(person_select)
        person_select.setAttribute("id", `pSelect`);
        person_select.setAttribute("name", `luggage`);


        for (let l = 0; l <= document.getElementById("adults").value; l++) {
            let hhh = document.createElement('option')
            hhh.innerText = `${l}`
            document.getElementById(`pSelect`).appendChild(hhh)
            hhh.setAttribute("value", `${l}`);
        }

        document.getElementById("abcd1").addEventListener("click", () => {
            luggage_person_qty = document.getElementById("pSelect").value
            resolve(flight_price)
        })

    })
}


const flight_summary = (flight_price) => {
    return new Promise((resolve, reject) => {
        document.querySelector(".results").innerHTML = `<select name="currency" id="currency" class="currencySelect">
                <option value="" disabled selected>Wybierz walutę:</option>
                <option value="eur">EUR</option>
                <option value="chf" selected>PLN</option>
                <option value="usd" >USD</option></select>
                <a><i class="fas fa-ticket-alt"></i></a>
                <a id="output_price">Cena biletu: ${flight_price} PLN </a>
                <a><i class="fas fa-suitcase-rolling"></i></a>
                <a id="output_price1">Bagaż podręczny: 0 PLN </a>
                <a><i class="fas fa-luggage-cart"></i></a>
                <a id="output_price2">Bagaż dodatkowy: ${(flight_price*0.05*luggage_person_qty).toFixed(2)} PLN
                <a><i class="fas fa-user-check"></i></a>
                <a id="output_price">Zarezerwowane miejsca: ${seats_table}</a>`
        currency.addEventListener("change", function() {
            fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${document.getElementById("currency").value}/?format=json`)
                .then((resp) => resp.json())
                .then(function(data) {
                    if (document.getElementById("currency").value == "eur") {
                        document.getElementById("output_price").innerHTML = `Cena biletu: ${(flight_price / data.rates[0].mid.toFixed(2)).toFixed(0)} EUR`
                        document.getElementById("output_price1").innerHTML = `Bagaż podręczny: 0 EUR`
                        document.getElementById("output_price2").innerHTML = `Bagaż dodatkowy: ${((flight_price*0.05*luggage_person_qty) / (data.rates[0].mid.toFixed(2))).toFixed(0)} EUR `
                    } else if (document.getElementById("currency").value == "usd") {
                        document.getElementById("output_price").innerHTML = `Cena biletu: ${(flight_price / data.rates[0].mid.toFixed(2)).toFixed(0)} USD`
                        document.getElementById("output_price1").innerHTML = `Bagaż podręczny: 0 USD`
                        document.getElementById("output_price2").innerHTML = `Bagaż dodatkowy: ${((flight_price*0.05*luggage_person_qty) / (data.rates[0].mid.toFixed(2))).toFixed(0)} USD`
                    } else if (document.getElementById("currency").value == "chf") {
                        document.getElementById("output_price").innerHTML = `Cena biletu: ${flight_price} PLN`
                        document.getElementById("output_price1").innerHTML = `Bagaż podręczny: 0 PLN`
                        document.getElementById("output_price2").innerHTML = `Bagaż dodatkowy: ${(flight_price*0.05*luggage_person_qty).toFixed(2)} PLN`
                    };
                })
        })

        resolve()
    })
}

const testtest = () => {
    return new Promise((resolve, reject) => {
        // alert("doszło 1")
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
        .then(seats_selector)
        .then(luggage_chooser)
        .then(flight_summary)
        .then(testtest)
}