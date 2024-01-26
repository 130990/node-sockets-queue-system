//HTML References

lblTicket1 = document.querySelector('#lblTicket1');
lblDesktop1 = document.querySelector('#lblDesktop1');

lblTicket2 = document.querySelector('#lblTicket2');
lblDesktop2 = document.querySelector('#lblDesktop2');

lblTicket3 = document.querySelector('#lblTicket3');
lblDesktop3 = document.querySelector('#lblDesktop3');

lblTicket4 = document.querySelector('#lblTicket4');
lblDesktop4 = document.querySelector('#lblDesktop4');

const socket = io();

socket.on('current-state', (payload) => {
    const audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    const [ticket1, ticket2, ticket3, ticket4] = payload;

    lblTicket1.innerText = `Ticket ${ticket4.number}`;
    lblDesktop1.innerText = ticket4.desktop;

    lblTicket2.innerText = `Ticket ${ticket3.number}`;
    lblDesktop2.innerText = ticket3.desktop;

    lblTicket3.innerText = `Ticket ${ticket2.number}`;
    lblDesktop3.innerText = ticket2.desktop;

    lblTicket4.innerText = `Ticket ${ticket1.number}`;
    lblDesktop4.innerText = ticket1.desktop;
});