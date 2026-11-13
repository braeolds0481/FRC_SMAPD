// ========================
// === GLOBAL CONSTANTS ===
// ========================

const VISIBLE_PORTS = 2;
// create an array of dropdown port menu objects
const portDropdowns = [];

const PORTS = new portObjectsHandler(22);   // specify 22 ports in use


function createChart(canvasID, title, labels, data, lineColor) {
    return new Chart(document.getElementById(canvasID), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderColor: lineColor,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

// =========================
// === CLASS DEFINITIONS ===
// =========================


class portDropdown {
    constructor() {
        this.selectElement = document.createElement('select');
        this.populateOptions();
    }

    populateOptions() {
        // reset the contents of the menu
        this.selectElement.innerHTML = '<option value="" disabled selected>Select a port...</option>';

        // for every port object, add its name as an option
        PORT_OBJECTS.forEach((port, index) => {
            const option = document.createElement('option');
            option.value = index+1;
            option.textContent = `#${port.id}: ${port.name}`;

            this.selectElement.appendChild(option); // add the new option to the array of options
        });
    }
    
}

function refreshAllDropdowns() {
    portDropdowns.forEach(dropdown => {
        dropdown.populateOptions();
    });
}





// ===========================
// === MAIN JS TO RUN ONCE ===
// ===========================





// add the dropdowns to the selection area
const portSelectionArea = document.getElementById('port-selection-area');
const chartDisplayArea = document.getElementById('chart-display-area')
portSelectionArea.innerHTML = ''; // clear the inner HTML

for(let i = 0; i < VISIBLE_PORTS; i++) {

    const dropdownInstance = new portDropdown();
    portDropdowns.push(dropdownInstance);

    // dropdown changed listener
    dropdownInstance.selectElement.addEventListener('change', () => {
        displayCharts();
    });

    portSelectionArea.appendChild(dropdownInstance.selectElement);
}



function displayCharts() {
    chartDisplayArea.innerHTML = ''; 

    portDropdowns.forEach((dropdown, index) => {
        const selectedPortIndex = dropdown.selectElement.value;

        // Check if a valid port is selected (ignoring the default disabled prompt)
        if (selectedPortIndex !== "") {
            // Grab the actual port object from your global PORT_OBJECTS array
            const port = PORT_OBJECTS[selectedPortIndex];
            const chartData = port.getChartData(); // Fetches labels, voltages, currents

            // 1. Create a container "card" for this port's charts
            const portCard = document.createElement('div');
            portCard.className = 'port-chart-card';
            portCard.style.cssText = 'background: #fff; padding: 15px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #ddd;';

            // 2. Add a title showing the port's current name
            const titleHeading = document.createElement('h3');
            titleHeading.textContent = port.name;
            portCard.appendChild(titleHeading);

            // 3. Create unique IDs for the two canvases
            const voltageCanvasId = `canvas-voltage-${index}`;
            const currentCanvasId = `canvas-current-${index}`;

            // Create wrapper divs or canvas elements directly
            const voltageWrapper = document.createElement('canvas');
            voltageWrapper.id = voltageCanvasId;
            portCard.appendChild(voltageWrapper);

            const currentWrapper = document.createElement('canvas');
            currentWrapper.id = currentCanvasId;
            portCard.appendChild(currentWrapper);

            // 4. Append the card to the main display area FIRST (so DOM elements exist)
            chartDisplayArea.appendChild(portCard);

            // 5. NOW create the charts using your existing createChart function
            createChart(
                voltageCanvasId, 
                `${port.name} - Voltage (V)`, 
                chartData.labels, 
                chartData.voltages, 
                'rgba(75, 192, 192, 1)'
            );

            createChart(
                currentCanvasId, 
                `${port.name} - Current (A)`, 
                chartData.labels, 
                chartData.currents, 
                'rgba(255, 99, 132, 1)'
            );
        }
    });
}

function updateVisibleCharts() {
    PORT_OBJECTS.forEach(element => {
        if(element.visible === true) {
            // later code
        }
    });

}




// AI GENERATED BELOW:

// ==========================================
// === SSE PACKET RECEIVER & SENDER SETUP ===
// ==========================================

// 1. Establish SSE Connection to receive packets every 100ms
const eventSource = new EventSource('/events');

eventSource.onmessage = function(event) {
    try {
        const packet = JSON.parse(event.data);
        
        // Find the matching port object and add data
        const targetPort = PORT_OBJECTS.find(p => p.id === packet.port);
        if (targetPort) {
            targetPort.add(packet.voltage, packet.current);
            
            // If charts are currently displayed, update them dynamically
            if (typeof displayCharts === 'function') {
                displayCharts();
            }
        }
    } catch (e) {
        console.error("Failed to parse incoming SSE packet:", e);
    }
};

eventSource.onerror = function(err) {
    console.error("SSE connection error:", err);
};


// 2. Function to send packets or console commands back to the C server
function sendCommandToServer(commandText) {
    fetch('/command', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: commandText
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
    })
    .catch(error => {
        console.error("Error sending command to server:", error);
    });
}

// Hook into your existing console command parser (in console.js or scripts.js)
// Whenever a command is successfully processed, notify the server:
const originalParseCommand = window.parseConsoleCommand;
if (typeof parseConsoleCommand === 'function') {
    // We can wrap or call sendCommandToServer inside parseConsoleCommand
}




