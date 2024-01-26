//HTML References
const lblDesktop = document.querySelector('h1');
const lblPending = document.querySelector('#lblPending');
const lblTicket = document.querySelector('small');
const btnAttendTicket = document.querySelector('button');
const divAlert = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is required!!')
}

const currentDesktop = searchParams.get('desktop');
lblDesktop.innerText = currentDesktop;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {


});

socket.on('disconnect', () => {
    btnAttendTicket.disabled = true;
});

socket.on('pending-tickets', (pendingTicketsNumber) => {
    if(pendingTicketsNumber == 0){
        lblPending.style.display = 'none';
    }
    else{
        lblPending.style.display = '';
    }
    
    lblPending.innerHTML = pendingTicketsNumber;
});


btnAttendTicket.addEventListener('click', () => {

    socket.emit('attend-ticket', { currentDesktop }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerText = 'Nobody';
            return divAlert.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.number}`
    });

});