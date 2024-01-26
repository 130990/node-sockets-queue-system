//HTML References
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnGenerateTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnGenerateTicket.disabled = false;

});

socket.on('disconnect', () => {
    btnGenerateTicket.disabled = true;
});

socket.on('last-ticket', (number) => {
    lblNewTicket.innerText = `Ticket ${number}`;
});


btnGenerateTicket.addEventListener('click', () => {

    socket.emit('next-ticket', null, (ticket) => {
        lblNewTicket.innerText = ticket;
    });

});