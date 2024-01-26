const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TrackingTicket {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.queuePendingTickets = [];
        this.queueAttendingTickets = [];

        this.init();
    }

    get ToJson() {
        return {
            last: this.last,
            today: this.today,
            queuePendingTickets: this.queuePendingTickets,
            queueAttendingTickets: this.queueAttendingTickets
        }
    }

    init() {
        const { today, queuePendingTickets, last, queueAttendingTickets } = require('../db/data.json');

        if (today == this.today) {
            this.last = last;
            this.queuePendingTickets = queuePendingTickets;
            this.queueAttendingTickets = queueAttendingTickets;
        }
        else {
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.ToJson));
    }

    next(){
        this.last += 1;
        const newTicket = new Ticket(this.last, null);
        this.queuePendingTickets.push(newTicket);

        this.saveDB();
        return `Ticket ${newTicket.number}`
    }

    attendTicketFromQueue(desktop){
        //Validate no tickets on queue
        if(this.queuePendingTickets.length === 0){
            return null;
        }

        //get ticket to attend
        const ticketToAttend = this.queuePendingTickets.shift();
        ticketToAttend.desktop = desktop;
        this.queueAttendingTickets.push(ticketToAttend);

        //remove last attended ticket  on queue
        if(this.queueAttendingTickets.length > 4){
            this.queueAttendingTickets.shift();
        }

        this.saveDB();
        
        return ticketToAttend;
    }
}

module.exports = TrackingTicket