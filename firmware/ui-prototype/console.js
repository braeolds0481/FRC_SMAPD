// =================================================
// === DEFINE CONSOLE COMMANDS AND FUNCTIONALITY ===
// =================================================
const commands = {

    // HELP command get info on any command
    // usage:   help <command>

    'help': Object.assign((args) => {
        const num_args = 2;
        const err_text = 'Either type "help" or "help <command>"';
        
        if (args.length === 1) { // user just typed help, print a list of commands
            const commandList = Object.keys(commands).sort().join('\n\t');
            logMessage(`Available commands (type "help <command>" for more info):\n\t${commandList}`, 'console-log-info');

        } else if (args.length === num_args) { // send the help_text for a command
            const targetCmd = args[1].toLowerCase();
            
            if (commands.hasOwnProperty(targetCmd)) {
                logMessage(commands[targetCmd].help_text, 'console-log-info');
            } else {
                logMessage(`Unknown command: "${targetCmd}"`, 'console-log-warning');
            }

        } else {
            logMessage(err_text, 'console-log-warning');
        }
    }, {
        help_text: "This is rather recursive... :)"
    }),


    // RENAME command to rename ports
    // usage:   rename <port #> <new name>
    //          rename <old name> <new name>

    
    'rename': Object.assign((args) => {
        const num_args = 3; // total # arguments, cmd + args
        const err_text  = `Invalid arguments. Type "help ${args[0]}" for usage`;

        if (args.length !== num_args) {
            logMessage(err_text, 'console-log-warning');

        } else { // run the command

            const result = PORTS.renamePort(args[1], args[2]);
            if(result === null) {
                logMessage("Error: did you specify the correct name or ID?", 'console-log-error');
            } else {
                logMessage(`Port #${result} renamed to ${args[2]}`, 'console-log-info');
                refreshAllDropdowns();
            }
        }
    }, {
        help_text: "Renames a port.\nUsage:\n\t rename <old name or port #> <new name>\nExamples:\n\trename 5 \"Drive Motor\"\n\trename some_strange_name \"better name\""
    })

};


// ===============================
// === HTML ELEMENT REFERENCES ===
// ===============================
const consoleOutput = document.getElementById('console-output');
const consoleInput = document.getElementById('console-input-text');

// populate list of available commands in alphabetical order:



// ============================
// === FUNCTION DEFINITIONS ===
// ============================

function parseConsoleCommand(inputText) {
    if (!inputText.trim()) return; // nothing entered

    logMessage("> " + inputText, 'console-log-command');
    console.log("user input: " + inputText);
    // parse the arguments
    const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g; // regex matches anything inside quotes, or things with no spaces
    const tokens = [];
    let match;

    while ((match = regex.exec(inputText)) !== null) {
        // match[1] or match[2] contains the captured text inside quotes (without the quotes)
        // match[0] is the normal unquoted word
        tokens.push(match[1] !== undefined ? match[1] : (match[2] !== undefined ? match[2] : match[0]));
    }

    if (tokens.length === 0) return; // nothing entered

    // Command name is lowercase (for easy matching), arguments preserve their original case
    const args_entered = tokens;

    // Check if the command exists in our object
    if (commands.hasOwnProperty(args_entered[0])) {
        commands[args_entered[0]](args_entered); // Execute the command
    } else {
        logMessage("\"" + args_entered[0] + "\" is not a valid command. Use help for a list of commands.", 'console-log-warning');
    }
}

function logMessage(text, className = '') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${className}`;

    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.style.whiteSpace = 'pre-wrap';

    entry.appendChild(textSpan);
    consoleOutput.appendChild(entry);

    // Auto-scroll to the bottom when new logs appear
    consoleOutput.scrollTop = consoleOutput.scrollHeight;

    if(className != 'console-log-command')
        console.log("console output: " + text);
}




// =======================================
// === LISTENER FOR CONSOLE INTERATION ===
// =======================================

consoleInput.addEventListener('keydown', (e) => {
      // Handle Command Submission
      if (e.key === 'Enter') {
        parseConsoleCommand(consoleInput.value);
        consoleInput.value = '';
      }

      // Handle Tab Autocomplete
      if (e.key === 'Tab') {
        e.preventDefault(); // Prevent focus from jumping to the next element on the page

        const currentInput = consoleInput.value.trimStart().toLowerCase();
        if (!currentInput) return;

        // Only autocomplete if the user is still typing the first word (the command name)
        if (!currentInput.includes(' ')) {
          const availableCommands = Object.keys(commands);
          const match = availableCommands.find(cmd => cmd.startsWith(currentInput));

          // if the command exists, fill the rest of it in.
          if (match) {
            consoleInput.value = match === 'set-text' ? `${match}` : match;
          }
        }
      }
    });

