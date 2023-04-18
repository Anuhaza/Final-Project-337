const reservationForm = document.querySelector('#reservation-form');
const reservationsList = document.querySelector('#reservations-list');

reservationForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(reservationForm);
  const time = formData.get('time');
  const noOfPersons = formData.get('noOfPersons');
  const phone = formData.get('phone');
  const date = formData.get('date');
  const response = await fetch('/api/reservation', {
    method: 'POST',
    body: JSON.stringify({ time, noOfPersons, phone, date }),
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();
  if (result.ok) {
    const reservationItem = document.createElement('li');
    reservationItem.textContent = `Reservation at ${time} on ${date} for ${noOfPersons} persons, phone number: ${phone}`;
    reservationsList.appendChild(reservationItem);
  } else {
    alert('Failed to make reservation');
  }
});
