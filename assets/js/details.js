const tBody = document.querySelector("#table-body");
const BASE_URL = "https://fakestoreapi.com";
const itemId = localStorage.getItem("Item ID");
fetch(`${BASE_URL}/products/${itemId}`)
  .then((res) => res.json())
  .then((item) => {
    tBody.innerHTML = `
    <td>${item.id}</td>
    <td>${item.description}</td>
    <td><img src='${item.image}'/></td>
    <td>${item.price} $</td>`;
  });
