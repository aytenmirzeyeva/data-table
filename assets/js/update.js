const title = document.querySelector("#title");
const description = document.querySelector("#description");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const btnUpdate = document.querySelector("#btn-update");

const BASE_URL = "https://fakestoreapi.com";
const itemId = localStorage.getItem("Item ID");

fetch(`${BASE_URL}/products/${itemId}`)
  .then((res) => res.json())
  .then((data) => {
    title.value = `${data.title}`;
    description.value = `${data.description}`;
    image.value = `${data.image}`;
    price.value = `${data.price}`;
  });

btnUpdate.onclick = () => {
  const data = {};
  data.id = itemId;
  data.title = title.value;
  data.description = description.value;
  data.price = price.value;

  fetch(`${BASE_URL}/products/${itemId}`, {
    method: "Put",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      console.log(data);
      Swal.fire({
        title: "Updated!",
        text: `Item ${itemId} has been updated.`,
        icon: "success",
      });
    });
};
