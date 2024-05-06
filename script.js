if(window.location.href === 'http://localhost:8800/success')
{
  document.querySelector('.success-div').classList.add('display');
}
if(window.location.href === 'http://localhost:8800/failure')
{
  document.querySelector('.failure-div').classList.add('display');
}
const total_data = async (event) => {
  const result = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  // console.log(data.prices);
  locationHTML = '<option value="">--- Select Option ---</option>';
  for (let i = 0; i < data.location.length; i++) {
    locationHTML =
      locationHTML +
      `<option value="${data.location[i].city}">${data.location[i].city}</option>`;
  }
  
  document.querySelector(".location").innerHTML = locationHTML;
  newHTML = "";
  for (let i = 0; i < 6; i++) {
    newHTML =
      newHTML +
      `<div class="card-container">
        <div class="card">
          <div class="front">
            <img src="/roberto-nickson-emqnSQwQQDo-unsplash.jpg" alt="Product Image">
            <h2 class="hotel-name">${data.hotel[i].hotel_name}</h2>
            <p>${data.hotel[i].city}, ${data.hotel[i].country}</p>
          </div>
          <div class="back">
            <div class="rating" id="rating-container">
              <ion-icon class="star" name="star"></ion-icon>
              <ion-icon class="star" name="star"></ion-icon>
              <ion-icon class="star" name="star"></ion-icon>
              <ion-icon class="star" name="star"></ion-icon>
              <ion-icon class="star" name="star"></ion-icon>
            </div>
            <ul>
              <li><a href="form.html" class="card-link" data-id=${data.hotel[i].hotel_id}>Executive Room: <span>Rs ${data.prices[i][0].price}</span></a></li>
              <li><a href="form.html" class="card-link" data-id=${data.hotel[i].hotel_id}>Prime Room: <span>Rs ${data.prices[i][1].price}</span></a></li>
              <li><a href="/form" class="card-link" data-id=${data.hotel[i].hotel_id}>Deluxe Room: <span>Rs ${data.prices[i][2].price}</span></a></li>
            </ul>
          </div>
        </div>
      </div>`;
  }
  document.querySelector(".cards-section").innerHTML = newHTML;
  const stars = document.querySelectorAll(".rating");
  for(let i=0; i<6; i++)
  {
      const star = stars[i].querySelectorAll(".star")
      for(let z = 0; z<data.hotel[i].rating_stars; z++)
      {
        star[z].classList.add("filled");
      }
  }
  document.querySelectorAll(".card-link").forEach((item) => {
    item.addEventListener("click", async (event) => {
      event.preventDefault();
      const hotel_id = item.dataset.id;
      window.location.href = `/form:${hotel_id}`;
    });
  });
  const search = document.querySelector(".search");
  search.addEventListener("submit", async (event) => {
    event.preventDefault();
    const location = search.querySelector(".location").value;
    let room = search.querySelector(".room").value;
    console.log(room)
    console.log(location);
    if(room === '')
    {
      room = 'ANY'
    }
    const result = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location,
        room,
      }),
    });
    const data = await result.json();
    if (data.status === "200") {
      window.location.href = data.path;
    }
  });
};
total_data();
