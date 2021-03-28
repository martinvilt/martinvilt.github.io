(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            if (h < 12){
                h = h;
                c.innerHTML = h + ":" + m + ":" + s + "am";
            }
            if(h >= 12){
                h = (h - 12);
                c.innerHTML = "0" + h + ":" + m + ":" + s + "pm";
            }

            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        var sisaldabNumbrid = /\d/;
        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perekonnanimi = document.getElementById("lname");
        let kingitus = document.getElementById("v1");
        let kontaktivaba = document.getElementById("v2");
        let omniva = document.getElementById("omniva");
        let kuller = document.getElementById("kuller");
        let dpd = document.getElementById("dpd");
        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;


        }else if(sisaldabNumbrid.test(eesnimi.value) === true || sisaldabNumbrid.test(perekonnanimi.value) === true || linn.value === "" || eesnimi.value.length == 0|| perekonnanimi.value.length == 0 || (kingitus.checked === false && kontaktivaba.checked === false) ||
            (omniva.checked === false && kuller.checked === false && dpd.checked === false)){
            alert("Palun täitke kõik väljad")
        }
        else if (linn.value === "tln"){
            document.getElementById("delivery").value = 0 + "€"
            e.innerHTML = "0 &euro;";


        } else if (linn.value === "trt"){
            document.getElementById("delivery").value = 2.50 + "€"
            e.innerHTML = "2.50 &euro;";


        } else if (linn.value === "nrv"){
            document.getElementById("delivery").value = 2.50 + "€"
            e.innerHTML = "2.50 &euro;";


        } else if (linn.value === "prn"){
            document.getElementById("delivery").value = 3 + "€"
            e.innerHTML = "3 &euro;";


        } else {
            e.innerHTML = "x,xx &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104,
            26.71992
        );

    let rõhu = new Microsoft.Maps.Location(
        58.35038,
        26.52337
    );
    rõhu.metadata = {
        title: 'Pin Title',
        description: 'Pin discription'
    };

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 11,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    let infobox = new Microsoft.Maps.Infobox(rõhu, {
        title: "Rõhu",
        description: "Tartust väljas",
        visible: false
    })
    infobox.setMap(map);
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    let pushpin2 = new Microsoft.Maps.Pushpin(rõhu, {
        title: 'Rõhu',
        //subTitle: 'Tartust väljas',
        //text: 'RH'
    });

    Microsoft.Maps.Events.addHandler(pushpin2, 'click', function () {
        infobox.setOptions({ visible: true });
    });
    map.entities.push(pushpin);
    map.entities.push(pushpin2);



}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

