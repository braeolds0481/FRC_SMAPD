function logToConsole(message) {
    const consoleBox = document.getElementById('console-output');

    // Create a new line element
    const line = document.createElement('div');
    line.className = 'log-line';
    line.textContent = `> ${message}`;

    // Append it to the console box
    consoleBox.appendChild(line);

    // Automatically scroll down to the newest log
    consoleBox.scrollTop = consoleBox.scrollHeight;
}


// user enters something to the console
const usr_cmd_form = document.getElementById("usr_cmd_form");
usr_cmd_form.addEventListener("submit", function(event) {
    
    const inputValue = document.getElementById("usr_cmd").value;
    alert("Sent a command: " + inputValue);
});





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

const xAxisLabels = ['0', '1', '2', '3', '4'];

const chart1data = [3, 4, 3, 4, 17, 5, 4, 6, 7];
const chart2data = [3, 4, 3, 4, 17, 5, 4, 6, 7];

createChart('firstTestChart', "Chart 1 Title", xAxisLabels, chart1data, "blue");
createChart('secondTestChart', "Chart 2 Title", xAxisLabels, chart2data, "red");