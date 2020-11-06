
var width = 11000//1024;
var height = 6200//768;

// width=1024
// height=6200

d3.json("./maps/cnty_nys_nprj.topojson", function(error, ny) {


  let nyc_box = {
  "type": "FeatureCollection",
  "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -74.3115234375,
                    40.46993497635156
                  ],
                  [
                    -73.40240478515625,
                    40.46993497635156
                  ],
                  [
                    -73.40240478515625,
                    41.18692242290296
                  ],
                  [
                    -74.3115234375,
                    41.18692242290296
                  ],
                  [
                    -74.3115234375,
                    40.46993497635156
                  ]
                ]
              ]
            }
          }
        ]
      }


  let offices = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Buffalo"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -78.8653564453125,
            42.89206418807337
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Syracuse"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -76.1407470703125,
            43.08894918346591
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Rochester"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.618408203125,
            43.135065496929165
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Albany"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -73.7457275390625,
            42.64204079304426
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Binghamton"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.9100341796875,
            42.08599350447723
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Peekskill"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -73.92425537109375,
            41.285030454601916
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Melville"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -73.41527938842773,
            40.793506160096605
          ]
        }
      },
      {
        "type": "Feature",
        "properties": { "name":"New York"},
        "geometry": {
          "type": "Point",
          "coordinates": [
            -73.96888732910156,
            40.77482185003984
          ]
        }
      }
    ]
  }


  //convert topojson to geojson
  let countyGeoJson = topojson.feature(ny, ny.objects.cnty_nys_nprj)

  let arrayData = countyGeoJson.features

  let officesLocation = offices.features
    console.log('officesLocation---', officesLocation)
 
  var center = d3.geoCentroid(countyGeoJson)
  var scale  = 54500
  var offset = [width/2.7, height/2.1];

  var projection = d3.geoMercator().scale(scale).center(center)
      .translate(offset);

  var path = d3.geoPath()
      .projection(projection);  // 


  // var scaleBarProjection = d3.geoMercator()
  //     .fitSize([width, height], countyGeoJson);

  // var scaleBarTest = d3.geoScaleBar()
  //     .projection(scaleBarProjection)
  //     .size([width+50, height+50]);



//svg container 
var svg = d3.select(".flex-container").append("svg")
      .attr("width", width)
      .attr("height", height)
     .attr('style', 'border: 1px solid black');

    

d3.json("./maps/cnty_ot_nys_4269.topojson", function(error, manj) {

  let countyGeoJson = topojson.feature(manj, manj.objects.cnty_ot_nys_4269)
  
  var path = d3.geoPath()
                 .projection(projection);  // 


  svg.append("path")
     .datum(countyGeoJson)
     .attr("class", "county")
     .attr("d", path);

  let countyBoundaries = topojson.mesh(manj, manj.objects.cnty_ot_nys_4269, function(a, b) { return a ; })

  svg.append("path")
     .datum(countyBoundaries)
     .attr("class", "scounty-boundary")
     .attr("d", path);

});


  let countyBoundaries = topojson.mesh(ny, ny.objects.cnty_nys_nprj, function(a, b) { return a !== b; })

  svg.append("path")
      .datum(countyBoundaries)
      .attr("class", "county-boundary")
      .attr("d", path);

  let stateBoundaries = topojson.mesh(ny, ny.objects.cnty_nys_nprj, function(a, b) { return a === b; })

  svg.append("path")
      .datum(stateBoundaries)
      .attr("class", "state-boundary")
      .attr("d", path);


   // for region boundary
   //region sets     
    var selected_Albany = d3.set([
      "Albany","Fulton","Greene","Warren","Hamilton","Washington","Rensselaer","Saratoga","Schenectady","Clinton","Montgomery","Schoharie","Columbia","Essex","Franklin"                 
    ]);
    var selected_Syracuse = d3.set([
    "Oswego","Herkimer","Cayuga","Lewis","Madison","Oneida","Jefferson","Cortland","St Lawrence","Onondaga"                           
    ]);
    var selected_Rochester = d3.set([
      "Genesee","Wayne","Wyoming","Livingston","Yates","Monroe","Seneca","Ontario","Orleans"                
    ]);
    var selected_Buffalo = d3.set([
      "Cattaraugus","Chautauqua","Niagara","Erie"                   
    ]);
    var selected_Binghamton = d3.set([
      "Tompkins","Allegany","Otsego","Broome","Chemung","Chenango","Schuyler","Delaware","Steuben","Tioga"                            
    ]);
    var selected_Peekskill = d3.set([
      "Ulster","Putnam","Westchester","Rockland","Dutchess","Orange","Sullivan"                      
    ]);
    var selected_Melville = d3.set([
        "Nassau","Suffolk"        
    ]);
    var selected_NYC = d3.set([
      "Bronx","Queens","Kings","Richmond","New York", "Westchester", "Rockland"      
    ]);
    var selected_NYC_1 = d3.set([
      "Nassau", "Suffolk"
    ]);

  //region boundary 
  svg.append("path")
      .datum(topojson.merge(ny, ny.objects.cnty_nys_nprj.geometries.filter(function(d) { 
        //console.log('merge---',d.properties.NAME)
        return selected_Albany.has(d.properties.NAME); 
      }
      )))
      .attr("class", "county selected")
      .attr("d", path);

 svg.append("path")
    .datum(topojson.merge(ny, ny.objects.cnty_nys_nprj.geometries.filter(function(d) { 
     // console.log('merge---',d.properties.NAME)
      return selected_Syracuse.has(d.properties.NAME); 
    }
    )))
    .attr("class", "county selected")
    .attr("d", path);   

  svg.append("path")
    .datum(topojson.merge(ny, ny.objects.cnty_nys_nprj.geometries.filter(function(d) { 
     // console.log('merge---',d.properties.NAME)
      return selected_Rochester.has(d.properties.NAME); 
    }
    )))
    .attr("class", "county selected")
    .attr("d", path);     
    
 svg.append("path")
  .datum(topojson.merge(ny, ny.objects.cnty_nys_nprj.geometries.filter(function(d) { 
   // console.log('merge---',d.properties.NAME)
    return selected_Buffalo.has(d.properties.NAME); 
  }
  )))
  .attr("class", "county selected")
  .attr("d", path);         

 svg.append("path")
    .datum(topojson.merge(ny, ny.objects.cnty_nys_nprj.geometries.filter(function(d) { 
     // console.log('merge---',d.properties.NAME)
      return selected_Binghamton.has(d.properties.NAME); 
    }
    )))
    .attr("class", "county selected")
    .attr("d", path);  

 svg.append("path")
    .datum(topojson.merge(ny, ny.objects.cnty_nys_nprj.geometries.filter(function(d) { 
     // console.log('merge---',d.properties.NAME)
      return selected_Peekskill.has(d.properties.NAME); 
    }
    )))
    .attr("class", "county selected")
    .attr("d", path);       
 svg.append("path")
    .datum(topojson.merge(ny, ny.objects.cnty_nys_nprj.geometries.filter(function(d) { 
     // console.log('merge---',d.properties.NAME)
      return selected_Melville.has(d.properties.NAME); 
    }
    )))
    .attr("class", "county selected")
    .attr("d", path);   


//Regional offfices(circle) to svg
svg.append('g')
  .selectAll("circle")  
  .data(officesLocation)
  .enter()
  .append("circle")
  .attr("cx", function (d) { 
   //  console.log('test---',projection(d.geometry.coordinates)) 
    return projection(d.geometry.coordinates)[0]; })
  .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
  .attr("r", "20px")
  .attr("fill", "none")
  .attr("stroke", "#000000")
  .attr("stroke-width", 22);

 //lables regional offices 
svg.append('g')
    .selectAll("text")  
    .data(officesLocation)
    .enter()
    .append("text")
       .attr("class", "region-label")
       .attr("x", function(d){return projection(d.geometry.coordinates)[0]})
       .attr("y", function(d){return projection(d.geometry.coordinates)[1] - 80})
       .text(function(d) { 
           console.log('name---', d.properties.name)
           return d.properties.name
         })
       .attr("text-anchor", "middle")
       .attr("alignment-baseline", "central")


//for NYC box 
var nyc_projection = d3.geoMercator().scale(114500).center( [
  -73.99515151977538,
  40.73828290651089
      ])
    .translate(offset);

var nyc_path = d3.geoPath()
    .projection(nyc_projection);




//NYC Box Container
let nyc = svg
  .append('g')
  .attr("class", "small-map")
  .attr('style', "width:100px")
  .attr('transform','translate(-2900,-1600)')

// clippath --making a mask to cookie cut outside of box

// define the clipPath
let cpath = nyc.append('clipPath').attr('id', 'nyc_mask')

// draw clipped path on the screen 
  cpath
    .append('rect')
    .attr('x',3435)
    .attr('y',1770)
    .attr('width',1825)
    .attr('height',1900)



nyc.append("path")
  .datum(topojson.merge(ny, ny.objects.cnty_nys_nprj.geometries.filter(function(d) { 
   // console.log('merge---',d.properties.NAME)
    return selected_NYC.has(d.properties.NAME); 
  }
  )))
  .attr("class", "county selected nyc_data")
  .attr("d", nyc_path)
  .attr('clip-path', 'url(#nyc_mask')


  nyc.append("path")
  .datum(topojson.merge(ny, ny.objects.cnty_nys_nprj.geometries.filter(function(d) { 
   // console.log('merge---',d.properties.NAME)
    return selected_NYC_1.has(d.properties.NAME); 
  }
  )))
  .attr("class", "county selected nyc_data")
  .attr("d", nyc_path)
  .attr('clip-path', 'url(#nyc_mask')


  nyc.append("path")
      .datum(countyBoundaries)
      .attr("class", "county-boundary")
      .attr("d", nyc_path)
      .attr('clip-path', 'url(#nyc_mask')


  nyc.append("path")
      .datum(stateBoundaries)
      .attr("class", "state-boundary")
      .attr("d", nyc_path)
      .attr('clip-path', 'url(#nyc_mask')


  nyc.append("g")
  .selectAll(".county-labels")
  .data(arrayData)
  .enter()
  .append("text")
    .attr("class", "county-labels")
    .attr("x", function(d){return nyc_path.centroid(d)[0]})
    .attr("y", function(d){return nyc_path.centroid(d)[1]})
    .text(function(d) { 
        //console.log('name---', d.properties.NAME)
        if (d.properties.NAME != 'Suffolk' ){return d.properties.NAME}
        
      })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")

    nyc.append('g')
    .selectAll("circle")  
    .data(officesLocation)
    .enter()
    .append("circle")
    .attr("cx", function (d) { 
     //  console.log('test---',projection(d.geometry.coordinates)) 
      return nyc_projection(d.geometry.coordinates)[0]; })
    .attr("cy", function (d) { return nyc_projection(d.geometry.coordinates)[1]; })
    .attr("r", "20px")
    .attr("fill", "none")
    .attr("stroke", "#000000")
    .attr("stroke-width", 25);
   
    nyc.append('g')
    .selectAll("text")  
    .data(officesLocation)
    .enter()
    .append("text")
           .attr("class", "region-label")
           .attr("x", function(d){return nyc_projection(d.geometry.coordinates)[0]})
           .attr("y", function(d){return nyc_projection(d.geometry.coordinates)[1] - 80})
           .text(function(d) { 
               console.log('name---', d.properties.name)
               return d.properties.name
             })
           .attr("text-anchor", "middle")
           .attr("alignment-baseline", "central")



//NYC zoomin  box 
nyc.append('path')
.datum(nyc_box)
.attr('class', 'state-boundary nyc_box')
.attr("d", nyc_path);  



//adding  BOX to nyc region
svg.append('path')
.datum(nyc_box)
.attr('class', 'state-boundary nyc_box')
.attr("d", path);




//County lable
  svg.append("g")
      .selectAll(".county-labels")
      .data(arrayData)
      .enter()
      .append("text")
        .attr("class", "county-labels")
        .attr("x", function(d){return path.centroid(d)[0]})
        .attr("y", function(d){return path.centroid(d)[1]})
        .text(function(d) { 
            //console.log('name---', d.properties.NAME)
            return d.properties.NAME
          })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")

// Map title 
    svg.append("text")
     // .attr("class", "region-label")
      .attr("class", "title-label")
      .attr("x", width * 0.18)
      .attr("y", height * 0.86)
      .text('NEW YORK STATE')

      svg.append("text")
      // .attr("class", "region-label")
       .attr("class", "subtitle-label")
       .attr("x", width * 0.18)
       .attr("y", height * 0.885)
       .text('COUNTIES')
 
//scalebar trials 

/*const scaleBarMiles = svg.append("g");
miles.size([width, height]).projection(projection);
scaleBarMiles.call(miles);*/

 // scaleBarTest
/*    svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("width-test", 0)
    .call(scaleBar);*/
/*  svg.append("g")
      .attr("scalebar_test", 0)
      .call(miles);
*/


 //adding scale bar 

 let scaleBar = d3.geoScaleBar()
 /*  .orient(d3.geoScaleTop)*/
     .projection(projection)
    // .orient(d3.geoScaleBottom) // Redundant as this is the default
     .size([width, height])
     .left(0.138)
     .top(0.92)
     .units(d3.geoScaleMiles) // The units will be miles instead of kilometers
     .distance(50) // The distance of the scale bar
     .label(null)//"NEW YORK STATE COUNTIES") // The label on top of the scale bar
     .labelAnchor("middle") // The position of the label (you can also pass "start" and "end")
     .tickPadding(10) // How far the tick text labels are from the lines
     .tickFormat((d, i, e) => i === e.length - 1 ? `${d} Miles` : d)
     //.tickValues([0, 20,40,60, 80,100]);

     svg.append("g")
     .attr('class', 'scale-bar')
     .call(scaleBar)
     //.attr("transform", "translate(2210,5000) scale(1 1)");
    


 let BoxScaleBar = d3.geoScaleBar()
 /*  .orient(d3.geoScaleTop)*/
     .projection(nyc_projection)
    // .orient(d3.geoScaleBottom) // Redundant as this is the default
     .size([width/1.33, height/2.91])
     .left(0.138)
     .top(0.92)
     .units(d3.geoScaleMiles) // The units will be miles instead of kilometers
     .distance(20) // The distance of the scale bar
     .label(null)//"NEW YORK STATE COUNTIES") // The label on top of the scale bar
     .labelAnchor("middle") // The position of the label (you can also pass "start" and "end")
     //.tickPadding(10) // How far the tick text labels are from the lines
     .tickFormat((d, i, e) => i === e.length - 1 ? `${d} Miles` : d)
     //.tickValues([0, 20,40,60, 80,100]);

     svg.append("g")
     .attr('class', 'scale-bar')
     .call(BoxScaleBar)
     //.attr("transform", "translate(2210,5000) scale(1 1)");


     // reformat scale bar format getting from lib
     // for styling --DOM modification --lib don't have css but direct styling so go to each class and change style of library 
     d3.select('.scale-bar path')
     .attr('transform', 'scale(1 10)')
      
     d3.select('.label')
      .attr('font-size', '272px')

     d3.selectAll('.tick text')
     .attr('font-size', '52px')
     .attr('y', '40')

     d3.selectAll('.tick rect')
     .attr('transform', 'scale(1 5)')


});

d3.select(self.frameElement).style("height", height + "px");


