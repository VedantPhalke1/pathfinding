  // Global variables
  let map;
  let markers = {};
  let graph = {};
  const cities = [
      { name: "Mumbai", latitude: 19.0760, longitude: 72.8777 },  // Maharashtra
      { name: "Delhi", latitude: 28.7041, longitude: 77.1025 },  // Delhi (Capital of India)
      { name: "Bangalore", latitude: 12.9716, longitude: 77.5946 },  // Karnataka
      { name: "Hyderabad", latitude: 17.3850, longitude: 78.4867 },  // Telangana
      { name: "Ahmedabad", latitude: 23.0225, longitude: 72.5714 },  // Gujarat
      { name: "Chennai", latitude: 13.0827, longitude: 80.2707 },  // Tamil Nadu
      { name: "Kolkata", latitude: 22.5726, longitude: 88.3639 },  // West Bengal
      { name: "Surat", latitude: 21.1702, longitude: 72.8311 },  // Gujarat
      { name: "Pune", latitude: 18.5204, longitude: 73.8567 },  // Maharashtra
      { name: "Jaipur", latitude: 26.9124, longitude: 75.7873 },  // Rajasthan
      { name: "Lucknow", latitude: 26.8467, longitude: 80.9462 },  // Uttar Pradesh
      { name: "Kanpur", latitude: 26.4499, longitude: 80.3319 },  // Uttar Pradesh
      { name: "Nagpur", latitude: 21.1458, longitude: 79.0882 },  // Maharashtra
      { name: "Indore", latitude: 22.7196, longitude: 75.8577 },  // Madhya Pradesh
      { name: "Thane", latitude: 19.2183, longitude: 72.9781 },  // Maharashtra
      { name: "Bhopal", latitude: 23.2599, longitude: 77.4126 },  // Madhya Pradesh
      { name: "Visakhapatnam", latitude: 17.6868, longitude: 83.2185 },  // Andhra Pradesh
      { name: "Pimpri-Chinchwad", latitude: 18.6298, longitude: 73.7997 },  // Maharashtra
      { name: "Patna", latitude: 25.5941, longitude: 85.1376 },  // Bihar
      { name: "Vadodara", latitude: 22.3072, longitude: 73.1812 },  // Gujarat
      { name: "Guwahati", latitude: 26.1445, longitude: 91.7362 },  // Assam
      { name: "Ranchi", latitude: 23.3441, longitude: 85.3096 },  // Jharkhand
      { name: "Shimla", latitude: 31.1048, longitude: 77.1734 },  // Himachal Pradesh
      { name: "Dehradun", latitude: 30.3165, longitude: 78.0322 },  // Uttarakhand
      { name: "Thiruvananthapuram", latitude: 8.5241, longitude: 76.9366 },  // Kerala
      { name: "Gandhinagar", latitude: 23.2156, longitude: 72.6369 },  // Gujarat
      { name: "Raipur", latitude: 21.2514, longitude: 81.6296 },  // Chhattisgarh
      { name: "Panaji", latitude: 15.4909, longitude: 73.8278 },  // Goa
      { name: "Imphal", latitude: 24.8170, longitude: 93.9368 },  // Manipur
      { name: "Shillong", latitude: 25.5788, longitude: 91.8933 },  // Meghalaya
      { name: "Aizawl", latitude: 23.7271, longitude: 92.7176 },  // Mizoram
      { name: "Kohima", latitude: 25.6751, longitude: 94.1077 },  // Nagaland
      { name: "Bhubaneswar", latitude: 20.2961, longitude: 85.8245 },  // Odisha
      { name: "Gangtok", latitude: 27.3314, longitude: 88.6138 },  // Sikkim
      { name: "Agartala", latitude: 23.8315, longitude: 91.2868 },  // Tripura
      { name: "Itanagar", latitude: 27.0844, longitude: 93.6053 },  // Arunachal Pradesh
      { name: "Dispur", latitude: 26.1433, longitude: 91.7898 },  // Assam
      { name: "Amaravati", latitude: 16.5412, longitude: 80.5173 },  // Andhra Pradesh
      { name: "Chandigarh", latitude: 30.7333, longitude: 76.7794 },  // Punjab & Haryana
  ];


  let simulationState = {
      isRunning: false,
      isPaused: false,
      speed: 3,
      currentStep: 0,
      algorithm: null,
      exploredPaths: [],
      finalPath: [],
      pathLines: [],
      availableRoutes: [],
      totalDistance: 0
  };

  // Initialize the map
  function initMap() {
      const mapStyles = [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
          },
          {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
          },
          {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
          },
          {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
          },
          {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
          },
          {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
          },
          {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
          },
          {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
          },
          {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
          },
          {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
          },
          {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
          },
          {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
          },
          {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
          },
          {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
          },
          {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
          }
      ];

      map = new google.maps.Map(document.getElementById('mapContainer'), {
          center: {lat: 22.5726, lng: 78.3639}, // Roughly the center of India
          zoom: 5,
          styles: mapStyles
      });
      
      // Add markers for each city
      cities.forEach(city => {
          let position = new google.maps.LatLng(city.latitude, city.longitude);
          markers[city.name] = new google.maps.Marker({
              position: position,
              map: map,
              title: city.name
          });
      });

      // Create a graph with distances between cities
      createGraph();

      // Display available routes
      displayAvailableRoutes();

      // Populate city dropdowns
      let citySelects = document.querySelectorAll('#startCity, #endCity');
      citySelects.forEach(select => {
          cities.forEach(city => {
              let option = document.createElement('option');
              option.value = city.name;
              option.textContent = city.name;
              select.appendChild(option);
          });
      });

      // Set up event listeners
      document.getElementById('startSimulation').addEventListener('click', startSimulation);
      document.getElementById('playPause').addEventListener('click', togglePlayPause);
      document.getElementById('reset').addEventListener('click', resetSimulation);
      document.getElementById('speedControl').addEventListener('input', updateSpeed);
  }

  // Create a graph with distances between cities
  function createGraph() {
      cities.forEach(city => {
          let distances = cities
              .filter(otherCity => otherCity.name !== city.name)
              .map(otherCity => ({
                  name: otherCity.name,
                  distance: calculateDistance(
                      city.latitude, city.longitude,
                      otherCity.latitude, otherCity.longitude
                  )
              }))
              .sort((a, b) => a.distance - b.distance);

          graph[city.name] = {};
          distances.slice(0, 4).forEach(connection => {
              graph[city.name][connection.name] = connection.distance;
          });
      });
  }

  // Display available routes
  function displayAvailableRoutes() {
      for (let cityName in graph) {
          let city = cities.find(c => c.name === cityName);
          for (let neighborName in graph[cityName]) {
              let neighbor = cities.find(c => c.name === neighborName);
              let path = [
                  { lat: city.latitude, lng: city.longitude },
                  { lat: neighbor.latitude, lng: neighbor.longitude }
              ];
              let line = new google.maps.Polyline({
                  path: path,
                  geodesic: true,
                  strokeColor: '#808080',
                  strokeOpacity: 0.5,
                  strokeWeight: 1
              });
              line.setMap(map);
              simulationState.availableRoutes.push(line);
          }
      }
  }

  // Calculate distance between two points using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c; // Distance in km
  }
// Improved A* algorithm implementation (step-by-step)
function* aStar(graph, start, end, heuristic) {
    let distances = {};
    let previous = {};
    let pq = new PriorityQueue();
    let explored = new Set();

    // Initialize distances and previous nodes
    for (let vertex in graph) {
        distances[vertex] = Infinity;
        previous[vertex] = null;
    }
    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        let currentVertex = pq.dequeue();
        
        if (currentVertex === end) {
            yield { type: 'finish', distances, previous };
            return;
        }

        if (explored.has(currentVertex)) continue;
        explored.add(currentVertex);

        yield { type: 'explore', current: currentVertex, distances, previous };

        // Explore neighbors
        for (let neighbor in graph[currentVertex]) {
            let distance = graph[currentVertex][neighbor];
            let alt = distances[currentVertex] + distance;

            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = currentVertex;
                let priority = alt + heuristic(neighbor, end); // A* priority calculation
                pq.enqueue(neighbor, priority);
                yield { type: 'update', current: currentVertex, neighbor: neighbor, distances, previous };
            }
        }
    }

    yield { type: 'finish', distances, previous };
}

// Priority Queue implementation
class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift().element;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

// Heuristic function for A* (e.g., Euclidean distance)
function heuristic(node, goal) {
    // Example heuristic: this should be replaced with a proper heuristic
    return Math.abs(node.charCodeAt(0) - goal.charCodeAt(0)); // Adjust based on your graph structure
}

// Start simulation
function startSimulation() {
    let start = document.getElementById('startCity').value;
    let end = document.getElementById('endCity').value;

    if (start && end) {
        resetSimulation();
        simulationState.algorithm = aStar(graph, start, end, heuristic);
        simulationState.isRunning = true;
        simulationState.isPaused = false;
        document.getElementById('playPause').textContent = 'Pause';
        runSimulation();
    } else {
        alert('Please select both start and end cities.');
    }
}

// Run simulation
function runSimulation() {
    if (!simulationState.isRunning) return;
    if (simulationState.isPaused) return;

    let result = simulationState.algorithm.next();
    if (!result.done) {
        updateVisualization(result.value);
        simulationState.currentStep++;
        setTimeout(runSimulation, getStepDelay());
    } else {
        finishSimulation();
    }
}

// Update visualization
function updateVisualization(stepResult) {
    switch (stepResult.type) {
        case 'explore':
            highlightCity(stepResult.current, '#FFFF00'); // Yellow for current city
            break;
        case 'update':
            let updatePath = reconstructPath(stepResult.previous, document.getElementById('startCity').value, stepResult.neighbor);
            drawPath(updatePath, '#0000FF', 2); // Blue for explored paths
            break;
        case 'finish':
            let finalPath = reconstructPath(stepResult.previous, document.getElementById('startCity').value, document.getElementById('endCity').value);
            if (finalPath.length > 1) {
                drawPath(finalPath, '#FF0000', 3); // Red and thicker for final path
                displayFinalPath(finalPath, stepResult.distances);
            } else {
                displayNoPathFound();
            }
            break;
    }

    // Update progress display
    document.getElementById('algorithmProgress').textContent = `Exploring: ${stepResult.current}`;
}

function togglePlayPause() {
    if (!simulationState.isRunning) return;

    simulationState.isPaused = !simulationState.isPaused;
    document.getElementById('playPause').textContent = simulationState.isPaused ? 'Play' : 'Pause';

    if (!simulationState.isPaused) {
        runSimulation();
    }
}

// Highlight a city
function highlightCity(cityName, color) {
    let marker = markers[cityName];
    marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: color,
        fillOpacity: 1,
        strokeWeight: 2
    });
}

// Display final path and total distance
function displayFinalPath(path, distances) {
    let endCity = document.getElementById('endCity').value;
    let totalDistance = distances[endCity];
    simulationState.totalDistance = totalDistance;
    simulationState.finalPath = path;

    let pathString = path.join(" → ");
    let distanceString = totalDistance !== Infinity ? totalDistance.toFixed(2) : "No path found";

    let resultDiv = document.getElementById('finalResult');
    resultDiv.innerHTML = `
        <h3>Final Path:</h3>
        <p>${pathString}</p>
        <h3>Total Distance:</h3>
        <p>${distanceString} ${totalDistance !== Infinity ? 'km' : ''}</p>
    `;
    resultDiv.style.display = 'block';

    // Highlight the final path
    path.forEach(city => highlightCity(city, '#00FF00')); // Green for cities in the final path
}

// Display message when no path is found
function displayNoPathFound() {
    let resultDiv = document.getElementById('finalResult');
    resultDiv.innerHTML = `
        <h3>No Path Found</h3>
        <p>There is no valid path between the selected cities.</p>
    `;
    resultDiv.style.display = 'block';
}

// Reconstruct path
function reconstructPath(previous, start, end) {
    let path = [];
    let current = end;
    while (current !== null && current !== start) {
        path.unshift(current);
        current = previous[current];
    }
    if (current === start) {
        path.unshift(start);
    }
    return path;
}

// Draw path on map
function drawPath(path, color, weight = 2) {
    for (let i = 0; i < path.length - 1; i++) {
        let start = markers[path[i]].getPosition();
        let end = markers[path[i + 1]].getPosition();
        let line = new google.maps.Polyline({
            path: [start, end],
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: weight
        });
        line.setMap(map);
        simulationState.pathLines.push(line);
    }
}

// Finish simulation
function finishSimulation() {
    simulationState.isRunning = false;
    document.getElementById('playPause').textContent = 'Play';
    document.getElementById('algorithmProgress').textContent = 'Simulation complete';

    // Highlight the final path
    simulationState.finalPath.forEach(city => highlightCity(city, '#00FF00')); // Green for cities in the final path
}

// Reset simulation
function resetSimulation() {
    simulationState.isRunning = false;
    simulationState.isPaused = false;
    simulationState.currentStep = 0;
    simulationState.algorithm = null;
    simulationState.exploredPaths = [];
    simulationState.finalPath = [];
    simulationState.pathLines.forEach(line => line.setMap(null));
    simulationState.pathLines = [];
    simulationState.totalDistance = 0;
    document.getElementById('playPause').textContent = 'Play';
    document.getElementById('algorithmProgress').textContent = '';
    document.getElementById('finalResult').style.display = 'none';

    // Reset city markers
    for (let cityName in markers) {
        markers[cityName].setIcon(null);
    }
}

// Update speed
function updateSpeed() {
    simulationState.speed = document.getElementById('speedControl').value;
    document.getElementById('speedValue').textContent = simulationState.speed;
}

// Get step delay based on speed
function getStepDelay() {
    return 1000 / simulationState.speed;
}

// Initialize the map when the page loads
window.onload = initMap;

//   // Improved Dijkstra's algorithm implementation (step-by-step)
//   function* dijkstra(graph, start, end) {
//       let distances = {};
//       let previous = {};
//       let pq = new PriorityQueue();
//       let explored = new Set();

//       for (let vertex in graph) {
//           distances[vertex] = Infinity;
//           previous[vertex] = null;
//       }
//       distances[start] = 0;
//       pq.enqueue(start, 0);

//       while (!pq.isEmpty()) {
//           let currentVertex = pq.dequeue();
          
//           if (currentVertex === end) {
//               yield {type: 'finish', distances, previous};
//               return;
//           }

//           if (explored.has(currentVertex)) continue;
//           explored.add(currentVertex);

//           yield {type: 'explore', current: currentVertex, distances, previous};

//           for (let neighbor in graph[currentVertex]) {
//               let distance = graph[currentVertex][neighbor];
//               let alt = distances[currentVertex] + distance;
              
//               if (alt < distances[neighbor]) {
//                   distances[neighbor] = alt;
//                   previous[neighbor] = currentVertex;
//                   pq.enqueue(neighbor, alt);
//                   yield {type: 'update', current: currentVertex, neighbor: neighbor, distances, previous};
//               }
//           }
//       }

//       yield {type: 'finish', distances, previous};
//   }


//   // Priority Queue implementation (simplified)
//   class PriorityQueue {
//       constructor() {
//           this.elements = [];
//       }

//       enqueue(element, priority) {
//           this.elements.push({element, priority});
//           this.elements.sort((a, b) => a.priority - b.priority);
//       }

//       dequeue() {
//           return this.elements.shift().element;
//       }

//       isEmpty() {
//           return this.elements.length === 0;
//       }
//   }

//   // Start simulation
//   function startSimulation() {
//       let start = document.getElementById('startCity').value;
//       let end = document.getElementById('endCity').value;

//       if (start && end) {
//           resetSimulation();
//           simulationState.algorithm = dijkstra(graph, start, end);
//           simulationState.isRunning = true;
//           simulationState.isPaused = false;
//           document.getElementById('playPause').textContent = 'Pause';
//           runSimulation();
//       } else {
//           alert('Please select both start and end cities.');
//       }
//   }

//   // Run simulation
//   function runSimulation() {
//       if (!simulationState.isRunning) return;
//       if (simulationState.isPaused) return;

//       let result = simulationState.algorithm.next();
//       if (!result.done) {
//           updateVisualization(result.value);
//           simulationState.currentStep++;
//           setTimeout(runSimulation, getStepDelay());
//       } else {
//           finishSimulation();
//       }
//   }

//   // Update visualization
//   function updateVisualization(stepResult) {
//       switch (stepResult.type) {
//           case 'explore':
//               highlightCity(stepResult.current, '#FFFF00'); // Yellow for current city
//               break;
//           case 'update':
//               let updatePath = reconstructPath(stepResult.previous, document.getElementById('startCity').value, stepResult.neighbor);
//               drawPath(updatePath, '#0000FF', 2); // Blue for explored paths
//               break;
//           case 'finish':
//               let finalPath = reconstructPath(stepResult.previous, document.getElementById('startCity').value, document.getElementById('endCity').value);
//               if (finalPath.length > 1) {
//                   drawPath(finalPath, '#FF0000', 3); // Red and thicker for final path
//                   displayFinalPath(finalPath, stepResult.distances);
//               } else {
//                   displayNoPathFound();
//               }
//               break;
//       }

//       // Update progress display
//       document.getElementById('algorithmProgress').textContent = `Exploring: ${stepResult.current}`;
//   }

//   function togglePlayPause() {
//       if (!simulationState.isRunning) return;

//       simulationState.isPaused = !simulationState.isPaused;
//       document.getElementById('playPause').textContent = simulationState.isPaused ? 'Play' : 'Pause';

//       if (!simulationState.isPaused) {
//           runSimulation();
//       }
//   }

//   // Highlight a city
//   function highlightCity(cityName, color) {
//       let marker = markers[cityName];
//       marker.setIcon({
//           path: google.maps.SymbolPath.CIRCLE,
//           scale: 7,
//           fillColor: color,
//           fillOpacity: 1,
//           strokeWeight: 2
//       });
//   }

//   // Display final path and total distance
//   function displayFinalPath(path, distances) {
//       let endCity = document.getElementById('endCity').value;
//       let totalDistance = distances[endCity];
//       simulationState.totalDistance = totalDistance;
//       simulationState.finalPath = path;

//       let pathString = path.join(" → ");
//       let distanceString = totalDistance !== Infinity ? totalDistance.toFixed(2) : "No path found";

//       let resultDiv = document.getElementById('finalResult');
//       resultDiv.innerHTML = `
//           <h3>Final Path:</h3>
//           <p>${pathString}</p>
//           <h3>Total Distance:</h3>
//           <p>${distanceString} ${totalDistance !== Infinity ? 'km' : ''}</p>
//       `;
//       resultDiv.style.display = 'block';

//       // Highlight the final path
//       path.forEach(city => highlightCity(city, '#00FF00')); // Green for cities in the final path
//   }

//   // Display message when no path is found
//   function displayNoPathFound() {
//       let resultDiv = document.getElementById('finalResult');
//       resultDiv.innerHTML = `
//           <h3>No Path Found</h3>
//           <p>There is no valid path between the selected cities.</p>
//       `;
//       resultDiv.style.display = 'block';
//   }

//   // Reconstruct path
//   function reconstructPath(previous, start, end) {
//       let path = [];
//       let current = end;
//       while (current !== null && current !== start) {
//           path.unshift(current);
//           current = previous[current];
//       }
//       if (current === start) {
//           path.unshift(start);
//       }
//       return path;
//   }

//   // Draw path on map
//   function drawPath(path, color, weight = 2) {
//       for (let i = 0; i < path.length - 1; i++) {
//           let start = markers[path[i]].getPosition();
//           let end = markers[path[i+1]].getPosition();
//           let line = new google.maps.Polyline({
//               path: [start, end],
//               geodesic: true,
//               strokeColor: color,
//               strokeOpacity: 1.0,
//               strokeWeight: weight
//           });
//           line.setMap(map);
//           simulationState.pathLines.push(line);
//       }
//   }

//   // Finish simulation
//   function finishSimulation() {
//       simulationState.isRunning = false;
//       document.getElementById('playPause').textContent = 'Play';
//       document.getElementById('algorithmProgress').textContent = 'Simulation complete';
      
//       // Highlight the final path
//       simulationState.finalPath.forEach(city => highlightCity(city, '#00FF00')); // Green for cities in the final path
//   }

//   // Reset simulation
//   function resetSimulation() {
//       simulationState.isRunning = false;
//       simulationState.isPaused = false;
//       simulationState.currentStep = 0;
//       simulationState.algorithm = null;
//       simulationState.exploredPaths = [];
//       simulationState.finalPath = [];
//       simulationState.pathLines.forEach(line => line.setMap(null));
//       simulationState.pathLines = [];
//       simulationState.totalDistance = 0;
//       document.getElementById('playPause').textContent = 'Play';
//       document.getElementById('algorithmProgress').textContent = '';
//       document.getElementById('finalResult').style.display = 'none';

//       // Reset city markers
//       for (let cityName in markers) {
//           markers[cityName].setIcon(null);
//       }
//   }
//   // Update speed
//   function updateSpeed() {
//       simulationState.speed = document.getElementById('speedControl').value;
//       document.getElementById('speedValue').textContent = simulationState.speed;
//   }

//   // Get step delay based on speed
//   function getStepDelay() {
//       return 1000 / simulationState.speed;
//   }

//   // Initialize the map when the page loads
//   window.onload = initMap;