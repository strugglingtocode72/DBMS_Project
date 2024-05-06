// const booking_forms = document.querySelector(".booking-page");
const booking_data = async (event) => {
  id = window.location.href.split("bookme:")[1];
  id = id.split(":")[0]
  room = window.location.href.split(":")[4];
  console.log(room)

  const result = await fetch("/bookme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location: id,
      room: room,
    }),
  });
  const data = await result.json();
  if (data.status === "200") {
    newhtml = "";
    // console.log(data.room_details[0]);
    for (let i = 0; i < data.room_details.length; i++) {
      newhtml =
        newhtml +
        `<div class="card-container">
        <form class="hotel_book">
        <div class="card">
          <div class="card__heading">
              <h2 class="hotel-name">${data.room_details[i].hotel_name}</h2>
          </div>
          <div class="front">
              <div>
                  <img src="roberto-nickson-emqnSQwQQDo-unsplash.jpg" alt="Product Image">
              </div>
              <div class="hotel-desc">
                  <h3>Price: ${data.room_details[i].price}</h3> 
                  <h3>Stars: ${data.room_details[i].rating_stars}</h3>
                  <h3>Room Type: ${data.room_details[i].room_type}</h3>
                  <p class="city-country">Location: ${data.room_details[i].city}, ${data.room_details[i].country}</p>
              </div>
              <div>
                  <input class="submit-btn" type="submit" value="Book Now" data-id=${data.room_details[i].hotel_id}>
              </div>
          </div>
        </div>
        </form>
      </div>`;
    }
  }
  document.querySelector(".cards-section").innerHTML = newhtml;
  document.querySelectorAll(".hotel_book").forEach((item) => {
    item.addEventListener("submit", async (event) => {
      event.preventDefault();
      const hotel_id = event.target.querySelector(".submit-btn").dataset.id;
      room = window.location.href.split(":")[4];
      window.location.href = `/form:${hotel_id}:${room}`;
    });
  });
};
booking_data();
