const TrackingTicket = require("../models/tracking-ticket");

const trackingTicket = new TrackingTicket();


const socketController = (socket) => {

    socket.emit('last-ticket', trackingTicket.last);
    socket.emit('current-state', trackingTicket.queueAttendingTickets);
    socket.emit('pending-tickets', trackingTicket.queueAttendingTickets.length);
    
    socket.on('next-ticket', ( payload, callback ) => {      
      const nextTicket = trackingTicket.next();
      callback(nextTicket);
      socket.broadcast.emit('pending-tickets', trackingTicket.queuePendingTickets.length);
    })
    
    socket.on('attend-ticket', ({currentDesktop}, callback) => {
      if(!currentDesktop){
        return callback({
          msg: 'Desktop is required!!',
          ok: false
        });
      }
      
      const ticket = trackingTicket.attendTicketFromQueue(currentDesktop);
      socket.broadcast.emit('current-state', trackingTicket.queueAttendingTickets);
      
      socket.emit('pending-tickets', trackingTicket.queuePendingTickets.length);
      socket.broadcast.emit('pending-tickets', trackingTicket.queuePendingTickets.length);


      if(!ticket){
        return callback({
          msg: 'No pending tickets',
          ok: false
        });
      }
      else{
        callback({
          ticket,
          ok: true
        });
      }
  });

}



module.exports = {
    socketController
}

