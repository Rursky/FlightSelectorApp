import style from "./css/index.scss";


document.getElementById("contact").addEventListener("click", () => {
    document.getElementById("footer").classList.add("footer_active")
    setTimeout(() => {
        document.getElementById("footer").classList.remove("footer_active")
    }, 1000)
})


///// -- GODZINY WYLOTU -- /////

// const a = (Math.floor(Math.random() * (10 - 1)) + 1)
// const b = Math.floor(Math.random() * (59 - 10)) + 10

///// -- AKTUALNA GODZINA LIVE + DATA (do obsługi wyboru wcześniejszej daty niż dzisiajesza) -- /////

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

function timeIs() {
    let d = new Date();
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();
    let hourIs =
        ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
    document.getElementById("time-text").innerHTML = `Godzina: ${hourIs} Data: ${today}`
}

setInterval(timeIs, 1000);

///// -- OBSŁUGA POPUP'ÓW -- /////

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

///// -- OBSŁUGA REJESTRACJI -- /////

document.getElementById("register").addEventListener("click", () => {
    openRegisterForm()
})

let user_verification1 = false
let user_verification = false
document.getElementById("popup-register-btn").addEventListener("click", () => {
    for (let k = 0; k < 1; k++) {
        if (document.getElementById("username1").value == "" || document.getElementById("password1").value == "") {
            alert("Żadne z pól nie może być puste.")
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
        alert("Rejestracja przebiegła pomyślnie!")
        document.getElementById("username1").value = "" // czyszczenie okienek username po zarejestrowniu
        document.getElementById("password1").value = "" // czyszczenie okienek password po zarejestrowaniu
    }
});

document.querySelector("#register-popup-close").addEventListener("click", closeRegisterForm)

///// -- DANE LOGOWANIA -- /////

const user1 = ["tanieloty", "tanieloty1", "tanieloty2", "marcin"]
const password1 = ["admin", "admin1", "admin2", "dlubis"]

///// -- OBSŁUGA LOGOWANIA -- /////

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

///// -- WYWOŁANIE PROMISÓW -- /////

document.getElementById("search-flight").addEventListener("click", makeFly)

///// -- OBSŁUGA WYBORU LOTU + WYMUSZANIE LOGOWANIA -- /////

const valid_data = () => {
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

const valid_date_put_weather = () => {
    return new Promise((resolve, reject) => {
        if (document.getElementById("leave-date").value < today) {
            alert("Wybierz aktualną datę.")
        } else {
            fetch(`https://api.weatherapi.com/v1/current.json?key=0e023a9d7d024767ab084102212705&q=${document.getElementById("town1").value}&aqi=no`)
                .then(resp => resp.json())
                .then(data => {
                    document.getElementById("weather-text").innerText = `${document.getElementById("town1").value}: ${((data.current.temp_c)).toFixed(0)}°c`
                    document.getElementById("weather-text").classList.add("weather-text-inputed")
                    k = 0 // reset licznika miejsc
                    seats_table = [] // reset miejsc
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
                .then((resp) => resp.json())
                .then(function(data) {
                    console.log(data)
                    if (data.Carriers[0] == undefined) { // jeżeli w tym dniu nie bedzie lotu APi nie wygeneruje data.Carriers[0] i pokaże komunikat
                        document.querySelector(".results").innerHTML = `<p>Nie znaleziono lotu w tym dniu. Wybierz inną datę.</p>`
                    } else {
                        document.querySelector(".results").innerHTML = `<table id="table-flight1"><tr><td>Z <i class="fas fa-arrow-right"></i> Do</td> <td>Przewoźnik</td> <td>Wylot <i class="fas fa-arrow-right"></i> Przylot</td> <td>Cena(${document.getElementById("adults").value} osób)</td> <td>Bilet</td></tr><tr><td>${document.getElementById("town1").value}<br><i class="fas fa-arrow-down"></i><br>${document.getElementById("town2").value}</td> <td>${data.Carriers[0].Name}</td> <td>8:23 <br><i class="fas fa-arrow-down"></i><br> 9:27</td> <td>${data.Quotes[0].MinPrice *document.getElementById("adults").value} PLN</td> <td><input type="button" id="buyButton" value="KUP"/></td></tr></table>`
                        const flight_price = data.Quotes[0].MinPrice * document.getElementById("adults").value
                        resolve(flight_price)
                    }
                })
        }, 1200);
    })
}

const confirm_flight_and_login = (flight_price) => {
    return new Promise((resolve, reject) => {
        document.getElementById("buyButton").addEventListener("click", () => {
            if (login_valid == false) {
                reject()
            } else if (login_valid == true) {
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

///// -- OBSŁUGA WYBORU MIEJSC -- /////

let k = 0
let seats_table = []

const seats = []
let seats_creator = (row_qty) => {
    for (let i = 1; i < row_qty + 1; i++) {
        let sign = `a` + `${i}`
        let sign1 = `b` + `${i}`
        let sign2 = `c` + `${i}`
        let sign3 = `d` + `${i}`
        seats.push(document.getElementById(`${sign}`), document.getElementById(`${sign1}`), document.getElementById(`${sign2}`), document.getElementById(`${sign3}`))
    }
}


const seats_selector = (flight_price) => {
    return new Promise((resolve, reject) => {
        if (document.getElementById("town2").value == "Katowice") {
            document.querySelector(".results").innerHTML = `<a>Wybierz miejsca:</a><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"         xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="100mm" height="100mm" viewBox="0 0 210 297" version="1.1" id="svg8" inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)" sodipodi:docname="malysamolot.svg">   <!-- <defs      id="defs2" /> -->   <!-- <sodipodi:namedview      id="base"      pagecolor="#ffffff"      bordercolor="#666666"      borderopacity="1.0"      inkscape:pageopacity="0.0"      inkscape:pageshadow="2"      inkscape:zoom="0.35"      inkscape:cx="400"      inkscape:cy="560"      inkscape:document-units="mm"      inkscape:current-layer="layer1"      inkscape:document-rotation="0"      showgrid="false"      inkscape:window-width="1600"      inkscape:window-height="837"      inkscape:window-x="-8"      inkscape:window-y="-8"      inkscape:window-maximized="1" /> -->   <!-- <metadata      id="metadata5">     <rdf:RDF>       <cc:Work          rdf:about="">         <dc:format>image/svg+xml</dc:format>         <dc:type            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />         <dc:title></dc:title>       </cc:Work>     </rdf:RDF>   </metadata> -->   <g      inkscape:label="Warstwa 1"      inkscape:groupmode="layer"      id="layer1">     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="rect848"        width="141.3631"        height="252.48808"        x="26.458336"        y="20.410715"        ry="10.583333" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a1"        width="22.678572"        height="18.898809"        x="34.773811"        y="40.82143"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b1"        width="22.678572"        height="18.898809"        x="57.452385"        y="40.82143"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c1"        width="22.678572"        height="18.898809"        x="113.39286"        y="40.443451"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d1"        width="22.678572"        height="18.898809"        x="136.07143"        y="40.443451"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c2"        width="22.678572"        height="18.898809"        x="113.39288"        y="77.10714"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d2"        width="22.678572"        height="18.898809"        x="136.07143"        y="77.10714"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c3"        width="22.678572"        height="18.898809"        x="114.14881"        y="112.25893"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d3"        width="22.678572"        height="18.898809"        x="136.82738"        y="112.25893"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a2"        width="22.678572"        height="18.898809"        x="34.017857"        y="78.241074"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b2"        width="22.678572"        height="18.898809"        x="56.69643"        y="78.241074"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a3"        width="22.678572"        height="18.898809"        x="34.773815"        y="113.01488"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b3"        width="22.678572"        height="18.898809"        x="57.452374"        y="113.01488"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a4"        width="22.678572"        height="18.898809"        x="35.529766"        y="148.54465"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b4"        width="22.678572"        height="18.898809"        x="58.20834"        y="148.54465"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c4"        width="22.678572"        height="18.898809"        x="114.90476"        y="147.78868"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d4"        width="22.678572"        height="18.898809"        x="137.58334"        y="147.78868"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a5"        width="22.678572"        height="18.898809"        x="36.285717"        y="183.31845"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b5"        width="22.678572"        height="18.898809"        x="58.964291"        y="183.31845"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c5"        width="22.678572"        height="18.898809"        x="114.90475"        y="184.07442"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d5"        width="22.678572"        height="18.898809"        x="137.58333"        y="184.07442"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a6"        width="22.678572"        height="18.898809"        x="36.285713"        y="219.60417"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b6"        width="22.678572"        height="18.898809"        x="58.964287"        y="219.60417"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c6"        width="22.678572"        height="18.898809"        x="114.90477"        y="220.36012"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d6"        width="22.678572"        height="18.898809"        x="137.58333"        y="220.36012"        ry="4.1577392" />     <rect        style="fill:#ff0000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.306019;stroke-opacity:0.967872"        id="rect991-2"        width="4.0243545"        height="19.521347"        x="-167.94371"        y="245.18427"        ry="1.561708"        transform="scale(-1,1)" />     <rect        style="fill:#ff0000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.30208;stroke-opacity:0.967872"        id="rect991-2-7"        width="4.0602021"        height="18.853945"        x="-30.500614"        y="248.01518"        ry="1.5083157"        transform="scale(-1,1)" />     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="41.577381"        y="34.773808"        id="text1025"><tspan          sodipodi:role="line"          id="tspan1023"          x="41.577381"          y="34.773808"          style="stroke-width:0.264583">A</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="65.767853"        y="34.017857"        id="text1029"><tspan          sodipodi:role="line"          id="tspan1027"          x="65.767853"          y="34.017857"          style="stroke-width:0.264583">B</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="120.95238"        y="33.261906"        id="text1033"><tspan          sodipodi:role="line"          id="tspan1031"          x="120.95238"          y="33.261906"          style="stroke-width:0.264583">C</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="144.3869"        y="33.261906"        id="text1037"><tspan          sodipodi:role="line"          id="tspan1035"          x="144.3869"          y="33.261906"          style="stroke-width:0.264583">D</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="94.494041"        y="52.916664"        id="text1041"><tspan          sodipodi:role="line"          id="tspan1039"          x="94.494041"          y="52.916664"          style="stroke-width:0.264583">1</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="94.494049"        y="90.714287"        id="text1045"><tspan          sodipodi:role="line"          id="tspan1043"          x="94.494049"          y="90.714287"          style="stroke-width:0.264583">2</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="95.25"        y="125.4881"        id="text1049"><tspan          sodipodi:role="line"          id="tspan1047"          x="95.25"          y="125.4881"          style="stroke-width:0.264583">3</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="94.494041"        y="161.7738"        id="text1053"><tspan          sodipodi:role="line"          id="tspan1051"          x="94.494041"          y="161.7738"          style="stroke-width:0.264583">4</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="96.005959"        y="197.30357"        id="text1057"><tspan          sodipodi:role="line"          id="tspan1055"          x="96.005959"          y="197.30357"          style="stroke-width:0.264583">5</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="96.761909"        y="232.83334"        id="text1061"><tspan          sodipodi:role="line"          id="tspan1059"          x="96.761909"          y="232.83334"          style="stroke-width:0.264583">6</tspan></text>   </g> </svg><a id="forForwardButton"></a>`
            seats_creator(6)
        } else if (document.getElementById("town2").value == "Paryż") {
            document.querySelector(".results").innerHTML = `<a>Wybierz miejsca:</a><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"         xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="100mm" height="100mm" viewBox="0 0 169 334" version="1.1" id="svg8" inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)" sodipodi:docname="srednisamolot.svg">      <g         inkscape:label="Warstwa 1"         inkscape:groupmode="layer"         id="layer1">        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.292632;stroke-opacity:0.967872"           id="rect848"           width="141.33147"           height="317.46835"           x="14.378913"           y="9.8431969"           ry="13.307057" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="a1"           width="22.678572"           height="18.898809"           x="22.678574"           y="30.238096"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="b1"           width="22.678572"           height="18.898809"           x="45.357147"           y="30.238096"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="c1"           width="22.678572"           height="18.898809"           x="101.29762"           y="29.860117"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="d1"           width="22.678572"           height="18.898809"           x="123.97619"           y="29.860117"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="c2"           width="22.678572"           height="18.898809"           x="101.29765"           y="66.523804"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="d2"           width="22.678572"           height="18.898809"           x="123.97619"           y="66.523804"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="c3"           width="22.678572"           height="18.898809"           x="102.05357"           y="101.6756"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="d3"           width="22.678572"           height="18.898809"           x="124.73214"           y="101.6756"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="a2"           width="22.678572"           height="18.898809"           x="21.922619"           y="67.657738"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="b2"           width="22.678572"           height="18.898809"           x="44.601192"           y="67.657738"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="a3"           width="22.678572"           height="18.898809"           x="22.678577"           y="102.43155"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="b3"           width="22.678572"           height="18.898809"           x="45.357136"           y="102.43155"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="a4"           width="22.678572"           height="18.898809"           x="23.434528"           y="137.96132"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="b4"           width="22.678572"           height="18.898809"           x="46.113102"           y="137.96132"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="c4"           width="22.678572"           height="18.898809"           x="102.80952"           y="137.20535"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="d4"           width="22.678572"           height="18.898809"           x="125.48811"           y="137.20535"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="a5"           width="22.678572"           height="18.898809"           x="24.190479"           y="172.73511"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="b5"           width="22.678572"           height="18.898809"           x="46.869053"           y="172.73511"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="c5"           width="22.678572"           height="18.898809"           x="102.80951"           y="173.49107"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="d5"           width="22.678572"           height="18.898809"           x="125.48809"           y="173.49107"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="a6"           width="22.678572"           height="18.898809"           x="24.190483"           y="209.02083"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="b6"           width="22.678572"           height="18.898809"           x="46.869053"           y="209.02083"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="c6"           width="22.678572"           height="18.898809"           x="102.80953"           y="209.77678"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="d6"           width="22.678572"           height="18.898809"           x="125.48809"           y="209.77678"           ry="4.1577392" />        <rect           style="fill:#ff0000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.306019;stroke-opacity:0.967872"           id="rect991-2"           width="4.0243545"           height="19.521347"           x="-155.84848"           y="234.60092"           ry="1.561708"           transform="scale(-1,1)" />        <rect           style="fill:#ff0000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.30208;stroke-opacity:0.967872"           id="rect991-2-7"           width="4.0602021"           height="18.853945"           x="-18.405376"           y="237.43184"           ry="1.5083157"           transform="scale(-1,1)" />        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="29.482143"           y="24.190475"           id="text1025"><tspan             sodipodi:role="line"             id="tspan1023"             x="29.482143"             y="24.190475"             style="stroke-width:0.264583">A</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="53.672619"           y="23.434525"           id="text1029"><tspan             sodipodi:role="line"             id="tspan1027"             x="53.672619"             y="23.434525"             style="stroke-width:0.264583">B</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="108.85714"           y="22.678574"           id="text1033"><tspan             sodipodi:role="line"             id="tspan1031"             x="108.85714"             y="22.678574"             style="stroke-width:0.264583">C</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="132.29167"           y="22.678574"           id="text1037"><tspan             sodipodi:role="line"             id="tspan1035"             x="132.29167"             y="22.678574"             style="stroke-width:0.264583">D</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="82.398796"           y="42.333332"           id="text1041"><tspan             sodipodi:role="line"             id="tspan1039"             x="82.398796"             y="42.333332"             style="stroke-width:0.264583">1</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="82.398811"           y="80.130951"           id="text1045"><tspan             sodipodi:role="line"             id="tspan1043"             x="82.398811"             y="80.130951"             style="stroke-width:0.264583">2</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="83.154762"           y="114.90477"           id="text1049"><tspan             sodipodi:role="line"             id="tspan1047"             x="83.154762"             y="114.90477"             style="stroke-width:0.264583">3</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="82.398796"           y="151.19046"           id="text1053"><tspan             sodipodi:role="line"             id="tspan1051"             x="82.398796"             y="151.19046"             style="stroke-width:0.264583">4</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="83.910721"           y="186.72023"           id="text1057"><tspan             sodipodi:role="line"             id="tspan1055"             x="83.910721"             y="186.72023"             style="stroke-width:0.264583">5</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="84.666672"           y="222.25"           id="text1061"><tspan             sodipodi:role="line"             id="tspan1059"             x="84.666672"             y="222.25"             style="stroke-width:0.264583">6</tspan></text>        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="a8"           width="22.678572"           height="18.898809"           x="23.434521"           y="294.06546"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="b8"           width="22.678572"           height="18.898809"           x="46.113094"           y="294.06546"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="c8"           width="22.678572"           height="18.898809"           x="102.05358"           y="294.82141"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"           id="d8"           width="22.678572"           height="18.898809"           x="124.73214"           y="294.82141"           ry="4.1577392" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"           id="a7"           width="22.665005"           height="19.70586"           x="23.471619"           y="262.35257"           ry="4.3352904" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"           id="b7"           width="22.665005"           height="19.70586"           x="46.136623"           y="262.35257"           ry="4.3352904" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"           id="c7"           width="22.665005"           height="19.70586"           x="102.04363"           y="263.14081"           ry="4.3352904" />        <rect           style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"           id="d7"           width="22.665005"           height="19.70586"           x="124.70863"           y="263.14081"           ry="4.3352904" />        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="83.910713"           y="275.16666"           id="text958"><tspan             sodipodi:role="line"             id="tspan956"             x="83.910713"             y="275.16666"             style="stroke-width:0.264583">7</tspan></text>        <text           xml:space="preserve"           style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"           x="83.910713"           y="307.67261"           id="text962"><tspan             sodipodi:role="line"             id="tspan960"             x="83.910713"             y="307.67261"             style="stroke-width:0.264583">8</tspan></text>      </g>    </svg><a id="forForwardButton"></a>`
            seats_creator(8)
        } else if (document.getElementById("town2").value == "Nowy Jork") {
            document.querySelector(".results").innerHTML = `<a>Wybierz miejsca:</a><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"         xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="100mm" height="100mm" viewBox="0 0 327 334" version="1.1" id="svg8" inkscape:version="1.0.1 (3bc2e813f5, 2020-09-07)" sodipodi:docname="duzysamolot.svg">   <g      inkscape:label="Warstwa 1"      inkscape:groupmode="layer"      id="layer1">     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.292632;stroke-opacity:0.967872"        id="rect848"        width="141.33147"        height="317.46835"        x="14.378913"        y="9.8431969"        ry="13.307057" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a1"        width="22.678572"        height="18.898809"        x="22.678574"        y="30.238096"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b1"        width="22.678572"        height="18.898809"        x="45.357147"        y="30.238096"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c1"        width="22.678572"        height="18.898809"        x="101.29762"        y="29.860117"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d1"        width="22.678572"        height="18.898809"        x="123.97619"        y="29.860117"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c2"        width="22.678572"        height="18.898809"        x="101.29765"        y="66.523804"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d2"        width="22.678572"        height="18.898809"        x="123.97619"        y="66.523804"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c3"        width="22.678572"        height="18.898809"        x="102.05357"        y="101.6756"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d3"        width="22.678572"        height="18.898809"        x="124.73214"        y="101.6756"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a2"        width="22.678572"        height="18.898809"        x="21.922619"        y="67.657738"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b2"        width="22.678572"        height="18.898809"        x="44.601192"        y="67.657738"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a3"        width="22.678572"        height="18.898809"        x="22.678577"        y="102.43155"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b3"        width="22.678572"        height="18.898809"        x="45.357136"        y="102.43155"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a4"        width="22.678572"        height="18.898809"        x="23.434528"        y="137.96132"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b4"        width="22.678572"        height="18.898809"        x="46.113102"        y="137.96132"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c4"        width="22.678572"        height="18.898809"        x="102.80952"        y="137.20535"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d4"        width="22.678572"        height="18.898809"        x="125.48811"        y="137.20535"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a5"        width="22.678572"        height="18.898809"        x="24.190479"        y="172.73511"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b5"        width="22.678572"        height="18.898809"        x="46.869053"        y="172.73511"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c5"        width="22.678572"        height="18.898809"        x="102.80951"        y="173.49107"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d5"        width="22.678572"        height="18.898809"        x="125.48809"        y="173.49107"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a6"        width="22.678572"        height="18.898809"        x="24.190483"        y="209.02083"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b6"        width="22.678572"        height="18.898809"        x="46.869053"        y="209.02083"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c6"        width="22.678572"        height="18.898809"        x="102.80953"        y="209.77678"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d6"        width="22.678572"        height="18.898809"        x="125.48809"        y="209.77678"        ry="4.1577392" />     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="29.482143"        y="24.190475"        id="text1025"><tspan          sodipodi:role="line"          id="tspan1023"          x="29.482143"          y="24.190475"          style="stroke-width:0.264583">A</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="53.672619"        y="23.434525"        id="text1029"><tspan          sodipodi:role="line"          id="tspan1027"          x="53.672619"          y="23.434525"          style="stroke-width:0.264583">B</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="108.85714"        y="22.678574"        id="text1033"><tspan          sodipodi:role="line"          id="tspan1031"          x="108.85714"          y="22.678574"          style="stroke-width:0.264583">C</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="132.29167"        y="22.678574"        id="text1037"><tspan          sodipodi:role="line"          id="tspan1035"          x="132.29167"          y="22.678574"          style="stroke-width:0.264583">D</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="82.398796"        y="42.333332"        id="text1041"><tspan          sodipodi:role="line"          id="tspan1039"          x="82.398796"          y="42.333332"          style="stroke-width:0.264583">1</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="82.398811"        y="80.130951"        id="text1045"><tspan          sodipodi:role="line"          id="tspan1043"          x="82.398811"          y="80.130951"          style="stroke-width:0.264583">2</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="83.154762"        y="114.90477"        id="text1049"><tspan          sodipodi:role="line"          id="tspan1047"          x="83.154762"          y="114.90477"          style="stroke-width:0.264583">3</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="82.398796"        y="151.19046"        id="text1053"><tspan          sodipodi:role="line"          id="tspan1051"          x="82.398796"          y="151.19046"          style="stroke-width:0.264583">4</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="83.910721"        y="186.72023"        id="text1057"><tspan          sodipodi:role="line"          id="tspan1055"          x="83.910721"          y="186.72023"          style="stroke-width:0.264583">5</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="84.666672"        y="222.25"        id="text1061"><tspan          sodipodi:role="line"          id="tspan1059"          x="84.666672"          y="222.25"          style="stroke-width:0.264583">6</tspan></text>     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a8"        width="22.678572"        height="18.898809"        x="24.946426"        y="280.45831"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b8"        width="22.678572"        height="18.898809"        x="47.625"        y="280.45831"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c8"        width="22.678572"        height="18.898809"        x="103.56548"        y="281.21426"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d8"        width="22.678572"        height="18.898809"        x="126.24404"        y="281.21426"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"        id="a7"        width="22.665005"        height="19.70586"        x="24.227571"        y="244.20972"        ry="4.3352904" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"        id="b7"        width="22.665005"        height="19.70586"        x="46.892574"        y="244.20972"        ry="4.3352904" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"        id="c7"        width="22.665005"        height="19.70586"        x="102.79958"        y="244.99796"        ry="4.3352904" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"        id="d7"        width="22.665005"        height="19.70586"        x="125.46458"        y="244.99796"        ry="4.3352904" />     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="84.666664"        y="257.0238"        id="text958"><tspan          sodipodi:role="line"          id="tspan956"          x="84.666664"          y="257.0238"          style="stroke-width:0.264583">7</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="85.422615"        y="294.06546"        id="text962"><tspan          sodipodi:role="line"          id="tspan960"          x="85.422615"          y="294.06546"          style="stroke-width:0.264583">8</tspan></text>     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.292632;stroke-opacity:0.967872"        id="rect848-3"        width="141.33147"        height="317.46835"        x="174.60918"        y="9.8431969"        ry="13.307057" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a9"        width="22.678572"        height="18.898809"        x="182.15289"        y="43.089283"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b9"        width="22.678572"        height="18.898809"        x="204.83145"        y="43.089283"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c9"        width="22.678572"        height="18.898809"        x="260.77194"        y="42.711292"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d9"        width="22.678572"        height="18.898809"        x="283.4505"        y="42.711292"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c10"        width="22.678572"        height="18.898809"        x="260.77197"        y="79.375"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d10"        width="22.678572"        height="18.898809"        x="283.4505"        y="79.375"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a10"        width="22.678572"        height="18.898809"        x="181.39694"        y="80.508926"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b10"        width="22.678572"        height="18.898809"        x="204.0755"        y="80.508926"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a11"        width="22.678572"        height="18.898809"        x="182.90884"        y="150.8125"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b11"        width="22.678572"        height="18.898809"        x="205.58742"        y="150.8125"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c11"        width="22.678572"        height="18.898809"        x="262.28384"        y="150.05652"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d11"        width="22.678572"        height="18.898809"        x="284.96243"        y="150.05652"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a12"        width="22.678572"        height="18.898809"        x="183.66479"        y="185.58627"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b12"        width="22.678572"        height="18.898809"        x="206.34337"        y="185.58627"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c12"        width="22.678572"        height="18.898809"        x="262.28384"        y="186.34225"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d12"        width="22.678572"        height="18.898809"        x="284.9624"        y="186.34225"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a13"        width="22.678572"        height="18.898809"        x="183.66479"        y="221.87201"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b13"        width="22.678572"        height="18.898809"        x="206.34337"        y="221.87201"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c13"        width="22.678572"        height="18.898809"        x="262.28384"        y="222.62796"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d13"        width="22.678572"        height="18.898809"        x="284.9624"        y="222.62796"        ry="4.1577392" />     <rect        style="fill:#ff0000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.429682;stroke-opacity:0.967872"        id="rect991-2-0"        width="3.9525118"        height="39.185696"        x="-316.04282"        y="104.5316"        ry="3.134856"        transform="scale(-1,1)" />     <rect        style="fill:#ff0000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.415136;stroke-opacity:0.967872"        id="rect991-2-7-7"        width="4.0022097"        height="36.123253"        x="-179.36259"        y="107.49664"        ry="2.8898604"        transform="scale(-1,1)" />     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="189.7124"        y="321.27975"        id="text1025-1"><tspan          sodipodi:role="line"          id="tspan1023-7"          x="189.7124"          y="321.27975"          style="stroke-width:0.264583">A</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="213.90288"        y="321.27975"        id="text1029-8"><tspan          sodipodi:role="line"          id="tspan1027-6"          x="213.90288"          y="321.27975"          style="stroke-width:0.264583">B</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="269.84335"        y="320.5238"        id="text1033-5"><tspan          sodipodi:role="line"          id="tspan1031-7"          x="269.84335"          y="320.5238"          style="stroke-width:0.264583">C</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="292.52194"        y="320.5238"        id="text1037-3"><tspan          sodipodi:role="line"          id="tspan1035-9"          x="292.52194"          y="320.5238"          style="stroke-width:0.264583">D</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="241.87311"        y="55.184513"        id="text1041-0"><tspan          sodipodi:role="line"          id="tspan1039-7"          x="241.87311"          y="55.184513"          style="stroke-width:0.264583">9</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="238.09337"        y="92.982147"        id="text1045-3"><tspan          sodipodi:role="line"          id="tspan1043-0"          x="238.09337"          y="92.982147"          style="stroke-width:0.264583">10</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="238.09335"        y="164.04163"        id="text1053-4"><tspan          sodipodi:role="line"          id="tspan1051-4"          x="238.09335"          y="164.04163"          style="stroke-width:0.264583">11</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="239.60527"        y="199.57141"        id="text1057-6"><tspan          sodipodi:role="line"          id="tspan1055-9"          x="239.60527"          y="199.57141"          style="stroke-width:0.264583">12</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="240.36124"        y="235.1012"        id="text1061-1"><tspan          sodipodi:role="line"          id="tspan1059-9"          x="240.36124"          y="235.1012"          style="stroke-width:0.264583">13</tspan></text>     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="a15"        width="22.678572"        height="18.898809"        x="183.66479"        y="288.7738"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="b15"        width="22.678572"        height="18.898809"        x="206.34335"        y="288.7738"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="c15"        width="22.678572"        height="18.898809"        x="262.28384"        y="289.52972"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="d15"        width="22.678572"        height="18.898809"        x="284.9624"        y="289.52972"        ry="4.1577392" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"        id="a14"        width="22.665005"        height="19.70586"        x="183.70187"        y="257.06088"        ry="4.3352904" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"        id="b14"        width="22.665005"        height="19.70586"        x="206.36688"        y="257.06088"        ry="4.3352904" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"        id="c14"        width="22.665005"        height="19.70586"        x="262.2739"        y="257.84912"        ry="4.3352904" />     <rect        style="fill:#ffffff;fill-rule:evenodd;stroke:#00000c;stroke-width:0.266435;stroke-opacity:0.967872"        id="d14"        width="22.665005"        height="19.70586"        x="284.9389"        y="257.84912"        ry="4.3352904" />     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="240.36122"        y="269.87497"        id="text958-4"><tspan          sodipodi:role="line"          id="tspan956-2"          x="240.36122"          y="269.87497"          style="stroke-width:0.264583">14</tspan></text>     <text        xml:space="preserve"        style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"        x="240.36122"        y="302.38095"        id="text962-2"><tspan          sodipodi:role="line"          id="tspan960-0"          x="240.36122"          y="302.38095"          style="stroke-width:0.264583">15</tspan></text>     <path        sodipodi:type="star"        style="fill:#000000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="path1207-0-4"        sodipodi:sides="3"        sodipodi:cx="-161.01785"        sodipodi:cy="86.178574"        sodipodi:r1="26.066658"        sodipodi:r2="13.033329"        sodipodi:arg1="0.51554901"        sodipodi:arg2="1.5627466"        inkscape:flatsided="true"        inkscape:rounded="0.06"        inkscape:randomized="0"        d="m -138.33928,99.029764 c -1.33554,2.356826 -43.77401,2.698456 -45.14732,0.363433 -1.3733,-2.33502 19.55008,-39.258631 22.25892,-39.280437 2.70884,-0.02181 24.22393,36.560178 22.8884,38.917004 z"        inkscape:transform-center-x="-0.021666985"        inkscape:transform-center-y="-1.4655576"        transform="matrix(0.22114001,0,0,0.29035816,83.209844,290.383)" />     <rect        style="fill:#000000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.188814;stroke-opacity:0.967872"        id="rect1266-6"        width="5.3489776"        height="11.741501"        x="44.978661"        y="319.13708"        ry="0.7827673" />     <path        sodipodi:type="star"        style="fill:#000000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="path1207-0-9"        sodipodi:sides="3"        sodipodi:cx="-161.01785"        sodipodi:cy="86.178574"        sodipodi:r1="26.066658"        sodipodi:r2="13.033329"        sodipodi:arg1="0.51554901"        sodipodi:arg2="1.5627466"        inkscape:flatsided="true"        inkscape:rounded="0.06"        inkscape:randomized="0"        d="m -138.33928,99.029764 c -1.33554,2.356826 -43.77401,2.698456 -45.14732,0.363433 -1.3733,-2.33502 19.55008,-39.258631 22.25892,-39.280437 2.70884,-0.02181 24.22393,36.560178 22.8884,38.917004 z"        inkscape:transform-center-x="-0.021666985"        inkscape:transform-center-y="-1.4655576"        transform="matrix(0.22114001,0,0,0.29035816,161.82888,290.383)" />     <rect        style="fill:#000000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.188814;stroke-opacity:0.967872"        id="rect1266-5"        width="5.3489776"        height="11.741501"        x="123.59771"        y="319.13708"        ry="0.7827673" />     <path        sodipodi:type="star"        style="fill:#000000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="path1207-0-1"        sodipodi:sides="3"        sodipodi:cx="-161.01785"        sodipodi:cy="86.178574"        sodipodi:r1="26.066658"        sodipodi:r2="13.033329"        sodipodi:arg1="0.51554901"        sodipodi:arg2="1.5627466"        inkscape:flatsided="true"        inkscape:rounded="0.06"        inkscape:randomized="0"        d="m -138.33928,99.029764 c -1.33554,2.356826 -43.77401,2.698456 -45.14732,0.363433 -1.3733,-2.33502 19.55008,-39.258631 22.25892,-39.280437 2.70884,-0.02181 24.22393,36.560178 22.8884,38.917004 z"        inkscape:transform-center-x="-0.021666985"        inkscape:transform-center-y="-1.7049907"        transform="matrix(0.22114001,0,0,0.33779518,240.44794,-15.605472)" />     <rect        style="fill:#000000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.203654;stroke-opacity:0.967872"        id="rect1266-58"        width="5.3489776"        height="13.659758"        x="202.21675"        y="17.846302"        ry="0.91065121" />     <path        sodipodi:type="star"        style="fill:#000000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.261;stroke-opacity:0.967872"        id="path1207-0-44"        sodipodi:sides="3"        sodipodi:cx="-161.01785"        sodipodi:cy="86.178574"        sodipodi:r1="26.066658"        sodipodi:r2="13.033329"        sodipodi:arg1="0.51554901"        sodipodi:arg2="1.5627466"        inkscape:flatsided="true"        inkscape:rounded="0.06"        inkscape:randomized="0"        d="m -138.33928,99.029764 c -1.33554,2.356826 -43.77401,2.698456 -45.14732,0.363433 -1.3733,-2.33502 19.55008,-39.258631 22.25892,-39.280437 2.70884,-0.02181 24.22393,36.560178 22.8884,38.917004 z"        inkscape:transform-center-x="-0.021666985"        inkscape:transform-center-y="-1.6595379"        transform="matrix(0.22114001,0,0,0.32878968,319.82294,-15.105692)" />     <rect        style="fill:#000000;fill-rule:evenodd;stroke:#00000c;stroke-width:0.20092;stroke-opacity:0.967872"        id="rect1266-0"        width="5.3489776"        height="13.295592"        x="281.59174"        y="17.454273"        ry="0.88637358" />   </g> </svg><a id="forForwardButton"></a>`
            seats_creator(15)
        }

        for (let i = 0; i < seats.length; i++) {
            seats[i].addEventListener("click", () => {
                if (k < document.getElementById("adults").value) {
                    seats[i].style = "";
                    seats[i].classList = "";
                    seats[i].classList.add("color");
                    seats_table.push(seats[i].id)
                    if (k == document.getElementById("adults").value - 1) {
                        document.querySelector("#forForwardButton").innerHTML = `<input type="button" id="seatsForwardButton" value="DALEJ"/>`
                        document.getElementById("seatsForwardButton").addEventListener("click", () => {
                            resolve(flight_price)
                        })
                    }
                }
                k++
            })
        }
    })
}

///// -- OBSŁUGA WYBORU BAGAŻU DODATKOWEGO -- /////

let luggage_person_qty = ""

const luggage_chooser = (flight_price) => {
    return new Promise((resolve, reject) => {
        document.querySelector(".results").innerHTML = `<a id="table_1"></a> <a>+${(flight_price*0.05).toFixed(1)} PLN za osobę</a> <a>Cena biletów: ${flight_price} PLN</a> <a><input type="button" id="forwardButton" value="DALEJ"/></a>`
        document.getElementById("table_1").innerHTML = `<div id=personSelect></div>`

        let person_label = document.createElement('label')
        document.getElementById("personSelect").appendChild(person_label)
        person_label.setAttribute("id", `luggage1`);
        person_label.setAttribute("for", `luggage`);
        document.getElementById("luggage1").innerText = "Liczba osób"
        let person_select = document.createElement('select')
        document.getElementById("personSelect").appendChild(person_select)
        person_select.setAttribute("id", `pSelect`);
        person_select.setAttribute("name", `luggage`);


        for (let l = 0; l <= document.getElementById("adults").value; l++) {
            let hhh = document.createElement('option')
            hhh.innerText = `${l}`
            document.getElementById(`pSelect`).appendChild(hhh)
            hhh.setAttribute("value", `${l}`);
        }

        document.getElementById("forwardButton").addEventListener("click", () => {
            luggage_person_qty = document.getElementById("pSelect").value
            resolve(flight_price)
        })

    })
}

///// -- OBSŁUGA PODSUMOWANIA -- /////

const flight_summary = (flight_price) => {
    return new Promise((resolve, reject) => {
        let date_today = new Date(today.split("-")); // różnica dat - wybranej od dzisiejszej
        let date_leave = new Date(document.getElementById("leave-date").value.split("-"));
        let timeDiff = Math.abs(date_leave.getTime() - date_today.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        document.querySelector(".results").innerHTML = `<p>Zmień walutę:<select name="currency" id="currency" class="currencySelect"></p>
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
                <a id="output_price">Zarezerwowane miejsca: ${seats_table}</a>
                <a id="results_icon"></a>
                <a id="results_date"></a>
                <a><input type="button" id="finalConfirmButton" value="Potwierdź"/></a>`
        document.querySelector("#finalConfirmButton").addEventListener("click", () => {
            resolve()
        })
        if (diffDays < 5) {
            fetch(`https:api.openweathermap.org/data/2.5/forecast?q=${document.getElementById("town1").value}&appid=3865d70b9f135bc376b8beb376bb474b`)
                .then(resp => resp.json())
                .then(data => {
                    document.querySelector("#results_icon").innerHTML = '<i class="fas fa-sun"></i>'
                    document.querySelector("#results_date").innerText = `Prognoza w dniu przylotu: ${((data.list[diffDays*3].main.temp)-273.15).toFixed(0)}°c`
                })
        };
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
    })
}

///// -- PODZIĘKOWANIE ZA ZAKUP -- /////

const thanks_for_buy = () => {
    return new Promise((resolve, reject) => {
        document.querySelector(".results").innerHTML = `<a>Dziękujemy za zakup biletu. Życzymy bezpiecznego lotu!</a><a><i class="far fa-smile-beam"></i></a>`
        resolve()
    })
}

///// -- PROMISTY KOLEJNOŚĆ -- /////

const uruchomienie = () => {
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
        .then(thanks_for_buy)
}