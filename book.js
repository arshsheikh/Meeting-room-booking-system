document.addEventListener("DOMContentLoaded", function () {
    // Sample data for available rooms and time slots
    const availableRooms = ["Room A", "Room B", "Room C"];
    const timeSlots = ["9:00-9:30", "9:30-10:00", "10:00-10:30", "10:30-11:00"];

    // Initialize room and time slot dropdowns
    const roomDropdown = document.getElementById("room");
    const timeSlotDropdown = document.getElementById("time-slot");

    availableRooms.forEach(room => {
        const option = document.createElement("option");
        option.value = room;
        option.textContent = room;
        roomDropdown.appendChild(option);
    });

    timeSlots.forEach(slot => {
        const option = document.createElement("option");
        option.value = slot;
        option.textContent = slot;
        timeSlotDropdown.appendChild(option);
    });

    // Initialize user's bookings (simulated with local storage)
    const userBookings = JSON.parse(localStorage.getItem("userBookings")) || [];

    // Function to display user's bookings
    function displayUserBookings() {
        const userBookingsList = document.getElementById("user-bookings");
        userBookingsList.innerHTML = "";

        userBookings.forEach(booking => {
            const li = document.createElement("li");
            li.textContent = `${booking.room} - ${booking.timeSlot}`;
            userBookingsList.appendChild(li);
        });
    }

    displayUserBookings();

    // Function to book a room
    const bookButton = document.getElementById("book-button");
    bookButton.addEventListener("click", function () {
        const selectedRoom = roomDropdown.value;
        const selectedTimeSlot = timeSlotDropdown.value;

        // Check for conflicts
        const conflict = userBookings.some(booking =>
            booking.room === selectedRoom && booking.timeSlot === selectedTimeSlot
        );

        if (conflict) {
            alert("Room is already booked for this time slot.");
        } else {
            // Add booking to user's bookings
            userBookings.push({ room: selectedRoom, timeSlot: selectedTimeSlot });
            localStorage.setItem("userBookings", JSON.stringify(userBookings));
            displayUserBookings();
            alert("Booking successful!");
        }
    });
});
