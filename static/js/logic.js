var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (data) {
    createFeatures(data.features);
   
  });

  function createFeatures(earthquakeData) {
    var eq = [];

    
    for (var i = 0; i < earthquakeData.length; i++) {

        var color = "";
        if (earthquakeData[i].geometry.coordinates[2] > 90) {
            color = "red";
         }
        else if (earthquakeData[i].geometry.coordinates[2] > 70) {
            color = "orange";
        }
        else if (earthquakeData[i].geometry.coordinates[2] > 50) {
            color = "gold";
        }
        else if (earthquakeData[i].geometry.coordinates[2] > 30) {
        color = "yellow";
        }
        else if (earthquakeData[i].geometry.coordinates[2] > 10) {
        color = "green";
        }
        else {
        color = "lime";
        }
      
      eq.push(
        L.circle([earthquakeData[i].geometry.coordinates[1],earthquakeData[i].geometry.coordinates[0]], {
          stroke: false,
          fillOpacity: .75,
          color: 'black',
          fillColor: color,
          radius: (earthquakeData[i].properties.mag)*20000
        }).bindPopup(`<h1>${earthquakeData[i].id}</h1> <hr> <h3>Magnitude: ${earthquakeData[i].properties.mag}</h3>
        </hr><hr><h3> Place: ${earthquakeData[i].properties.place}</h3></hr><hr><h3> Depth(km): ${earthquakeData[i].geometry.coordinates[2]}</h3></hr>`)
      );
    
    var eqLayer = L.layerGroup(eq)
    }
  
      createMap(eqLayer);
    }
  

    
function createMap(earthquakes) {

     
        var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      
        var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
      
        var baseMaps = {
          "Street Map": street,
          "Topographic Map": topo
        };
      
        var overlayMaps = {
          Earthquakes: earthquakes
        };
      
        var myMap = L.map("map", {
          center: [
            37.09, -95.71
          ],
          zoom: 5,
          layers: [street, earthquakes]
        });
      

        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(myMap);


        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend');
        depths = [90,70,50,30,10];
        div.innerHTML += "<h3>Depth(km)</h3>"

   
        for (var i = 0; i < depths.length; i++) {
          var outputs=[]
          var output= ""
            
            if (depths[i] > 89) {
              div.innerHTML += '<i style="background:' + getColor(depths[i]+1) + '"></i> ' + (  '>' + depths[i] + '<br>' );
            }
            else {
              div.innerHTML +='<i style="background:' + getColor(depths[i+1]+1) + '"></i> ' +
            depths[i] + (depths[i+1] ? '&ndash;' + depths[i+1] + '<br>' : '+');}
    }
 
    return div;
}

legend.addTo(myMap);
      
      }

      var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    function getColor(depth){
      
      var color = ""
    if (depth > 90) {
        color = "red";
     }
    else if (depth > 70) {
        color = "orange";
    }
    else if (depth > 50) {
        color = "gold";
    }
    else if (depth > 30) {
    color = "yellow";
    }
    else if (depth > 10) {
    color = "green";
    }
    else {
    color = "lime";
    }
  return color};
  


// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend');
//         depths = [91,71,51,31,11,1];
//         labels = [];

   
//     for (var i = 0; i < depths.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(depths[i]) + '"></i> ' +
//             depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
//     }

//     return div;
// }

// legend.addTo(myMap);