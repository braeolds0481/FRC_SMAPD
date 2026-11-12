const PORT_OBJECTS = [];

class portObjectsHandler {

    constructor(numPorts = 22) {

        // fill the array of port objects:
        for(let i = 0; i < numPorts; i++) {
            const port = new portObject(i+1);
            PORT_OBJECTS.push(port);
        }
    }

    findByID(target) {
        return PORT_OBJECTS.find(port_object => port_object.id == target) || null;
    }

    findByName(target) {
        return PORT_OBJECTS.find(port_object => port_object.name == target) || null;
    }

    renamePort(target, newName) {
        const isNumber = /^\d+$/.test(target);

        if(isNumber) {
            if(this.findByID(target) != null) 
                return this.findByID(target).rename(newName);
        } else {
            if (this.findByName(target) != null) 
                return this.findByName(target).rename(newName);
        }
        return null;
        
    }

}


class portObject {

    constructor(i) { 
        this.id = i;
        this.max_history_ms = 60000; // default value of 60 sec when keeping data
        this.IV_data = [];
        this.name = `Port ${i}`;
        this.visible = false; // is it on screen?
    }

    add(voltage, current) {
        const now = Date.now(); // milliseconds since Jan 1, 1970

        this.IV_data.push({ voltage: voltage, // create a new object of data
                            current: current, 
                            timestamp: now })
        
        this.#pruneData(now);
    }

    #pruneData(now) { // get rid of old data 
        const cutoff = now - this.max_history_ms; // calculate cutoff
        
        // if data is older than the cutoff, drop the end off
        while(this.IV_data.length > 0 && this.IV_data[0].timestamp < cutoff) {
            this.IV_data.shift();
        }
    }

    rename(newName) {
        this.name = newName;
        return this.id;
    }


    getChartData() {
    return {
        labels: this.IV_data.map(entry => // format the timestamp to something readable
            new Date(entry.timestamp).toLocaleTimeString([], { 
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            fractionalSecondDigits: 3 })
        ),

        voltages: this.IV_data.map(entry => entry.voltage),
        currents: this.IV_data.map(entry => entry.current)
    };
}


}




