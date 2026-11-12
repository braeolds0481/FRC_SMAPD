// ========================
// === GLOBAL CONSTANTS ===
// ========================

const VISIBLE_PORTS = 5;
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
            option.value = index;
            option.textContent = port.name;

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
const portSelectionArea = document.getElementById('portSelectionArea');
portSelectionArea.innerHTML = ''; // clear the inner HTML

for(let i = 0; i < VISIBLE_PORTS; i++) {

    const dropdownInstance = new portDropdown();
    portDropdowns.push(dropdownInstance);
    portSelectionArea.appendChild(dropdownInstance.selectElement);
}


function updateVisibleCharts() {
    PORT_OBJECTS.forEach(element => {
        if(element.visible === true) {
            // later code
        }
    });

}



