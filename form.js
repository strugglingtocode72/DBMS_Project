const booking_forms = document.querySelector(".booking-page");
const booking_data = async (event) => {
  id = window.location.href.split("form:")[1];
  id = id.split(":")[0]
  room = window.location.href.split(":")[4];
  console.log(room)
  const result = await fetch("/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      room:room,
    }),
  });
  const data = await result.json();
  if (data.status === "200") {
    booking_forms.querySelector(".firstname").value = data.user.f_name;
    booking_forms.querySelector(".lastname").value = data.user.l_name;
    booking_forms.querySelector(".email").value = data.user.email;
    booking_forms.querySelector(".location__select").value = data.hotel.city;
    booking_forms.querySelector(".h-name").value = data.hotel.hotel_name;
    booking_forms.querySelector(".r-type").value = data.room.room_type;
  }
  booking_forms.addEventListener("submit", async (event) => {
    event.preventDefault();
    const firstname = booking_forms.querySelector(".firstname").value;
    const lastname = booking_forms.querySelector(".lastname").value;
    const email = booking_forms.querySelector(".email").value;
    const phone = booking_forms.querySelector(".phone-no").value;
    const location = booking_forms.querySelector(".location__select").value;
    const hotelname = booking_forms.querySelector(".h-name").value;
    const roomtype = booking_forms.querySelector(".r-type").value;
    const no_person = booking_forms.querySelector(".no-person").value;
    const cin = booking_forms.querySelector(".cin-date").value;
    const cout = booking_forms.querySelector(".cout-date").value;
    const date1 = new Date(cin);
    const date2 = new Date(cout);
    const total_value = (date2 - date1)/(1000 * 60 * 60 * 24);
    const hotel_id = id;
    let room_type;
    if(roomtype === 'EXECUTIVE ROOM') room_type = 2;
    else if (roomtype === 'PRIME ROOM') room_type = 1;
    else if (roomtype === 'DELUXE ROOM') room_type = 0;
    const result = await fetch("/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phone,
        location,
        hotelname,
        roomtype,
        no_person,
        cin,
        cout,
        hotel_id,
      }),
    });
    console.log(total_value)
    const data = await result.json();
    if (data.status === "200") {
      const result = await fetch("/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_type: room_type,
          quantity: total_value,
        }),
      });
      const url = await result.json();
      window.location.href = url.path;
    }
  });
};
booking_data();
