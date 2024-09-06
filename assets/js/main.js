const tBody = document.querySelector("#table-body");
const btnNew = document.querySelector("#new-btn");
const btnCreate = document.querySelector("#create-btn");
const btnClose = document.querySelector("#close-btn");
const modal = document.querySelector("#modal");
const imageInput = document.querySelector("#image-input");
const base64Output = document.querySelector("#base64output");

const btnView = document.querySelector("#view-btn");
const btnDelete = document.querySelector("#delete-btn");
const BASE_URL = "https://fakestoreapi.com";
const loader = document.querySelector(".loader");

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}
showLoader();
btnNew.onclick = function () {
  modal.style.display = "flex";
};
btnClose.onclick = function () {
  modal.style.display = "none";
};
btnCreate.onclick = function () {
  fetch(`${BASE_URL}/products`, {
    method: "Post",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  modal.style.display = "none";
};

document.body.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const base64String = reader.result;
      base64Output.innerHTML = `<img src="${base64String}" />`;
    };
    reader.readAsDataURL(file);
  }
});

fetch(`${BASE_URL}/products`)
  .then((res) => res.json())
  .then(
    (data) =>
      data.map((item) => {
        tBody.innerHTML += `
    <tr id="row-${item.id}" onclick="updateItem(${item.id})" style="cursor:pointer">
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td><img src='${item.image}'/></td>
        <td>${item.price} $</td>
         <td>
          <button type="button" id="view-btn" onclick="viewDatas(${item.id})">View</button>
          <button type="button" id="delete-btn" onclick="deleteItem(${item.id},event)">Delete</button>
        </td>
    </tr>
    `;

    hideLoader();
  })
  
  );
function deleteItem(id, event) {
  event.stopPropagation();
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${BASE_URL}/products/${id}`, {
        method: "Delete",
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Item has been deleted.",
            icon: "success",
          });
          const row = document.querySelector(`#row-${id}`);
          if (row) {
            row.remove();
          }
        });
    }
  });
}
function updateItem(id) {
  window.open("./update.html", "_blank");
  localStorage.setItem("Item ID", id);
}
function viewDatas(id) {
  window.open("./details.html", "_blank");
  localStorage.setItem("Item ID", id);
}
