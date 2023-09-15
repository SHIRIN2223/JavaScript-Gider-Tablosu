/*degiskenleri / elementleri tanimlari */
const nameInput = document.getElementByIdElementById("name-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.getElementById("add-btn");
const listArea = document.getElementById("list");
const statusCheckBox = document.getElementById("status-check");
const sumInfo = document.getElementById("sum-info");
const deleteBtn = document.querySelector("delete-btn");
const editBtn = document.querySelector("edit-btn");
const userInfo = document.getElementById("user-input");
const select = document.getElementById("select");

let sum = 0;
/* olayları tanimlama */
addBtn.addEventListener("click", addExpence);
listArea.addEventListener("click", handleUpdate);

//harcama ekle
function addExpence(event) {
  //sayfayı yenilemeyi engelle
  event.preventDefault();

  if (!nameInput.value || !priceInput.value) {
    alert("alanlar bos olamaz");
    return;
  }

  const expenseDiv = document.createElement("div");
  expenseDiv.classList.add("expense");

  // ödenip ödenmediğini kontrol et
  if (statusCheckBox.checked) {
    expenseDiv.classList.add("paid");
  }

  expenseDiv.innerHTML = `
        <h2 class= "name"> ${nameInput.value}</h2>
        <h2 class= "price"> ${priceInput.value}</h2>
        <div class="btns">
        <img id="edit" src="images/credit-128.webp"/>
        <img id="delete" src="images/ekmek.png"/>
    </div>
    

     `;
  listArea.appendChild(expenseDiv);

  //toplamı değiştir
  updateSum(priceInput.value);

  nameInput.value = "";
  priceInput.value = "";
  statusCheckBox.value = false;
  console.log(listArea);
}

/* toplami guncelle*/
function updateSum(price) {
  sum += Number(price);

  sumInfo.innerText = sum;
}

/* liste elemanlari uzerindeki işlemleri yoneltme */
function handleUpdate(event) {
  const item = event.target;

  const parent = item.parentElement.parentElement;
  //silme tikla
  if (item.id == "delete") {
    //kaldır
    parent.remove();
    //toplami guncelle
    const price = parent.querySelector(".price").textContent;
    updateSum(Number(price) * -1);
  }

  //guncelleme tiklanirsa
  if (item.id == "edit") {
    parent.classList.toggle("paid");
  }
}

//kullaniciyi local e kaydet

function saveUser(event) {
  localStorage.setItem("user", event.target.value);
}
// kullanici local den al
function getUser() {
  const username = localStorage.getItem("user") || "";

  userInfo.value = username;
}
