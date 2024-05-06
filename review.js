const total_data = async (event) => {
    const result = await fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    console.log(data);
    let newHTML = '';
    for(let i =0; i<data.data.length; i++)
    {
        newHTML = newHTML + `<section class="review">
        <div class="review-text">
          <h2>${data.data[i].f_name} ${data.data[i].l_name}</h2>
          <h3>${data.data[i].email}</h3>
          <p>${data.data[i].review_comment}</p>
          <p>${data.data[i].rating}</p> 
        </div>
      </section>`
    }
    document.querySelector('.review-whole').innerHTML = newHTML;

}
total_data();
const stars = document.querySelectorAll('input[name="rating"]');
let selectedValue;

stars.forEach(star => {
  star.addEventListener('click', () => {

    selectedValue = star.value;

  });
});
const form = document.querySelector('.review-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const review = document.querySelector(".review-text-input").value;
  console.log(selectedValue);
    const res = await fetch("/PostReviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            review: review,
            star: selectedValue
        })
    })
    const data = await res.json();
    // console.log(data)
    window.location.href = data.path;
});