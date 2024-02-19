document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            displayItems(data.items);
        })
        .catch(error => console.error("Error fetching data:", error));

    function displayItems(items) {
        const itemShowList = document.getElementById("item-show-list");

        items.forEach(item => {
            const newDiv = document.createElement("div");
            newDiv.className = "col-md-3 col-sm-3 col-custom";

            newDiv.innerHTML = `
                <div class="courses-thumb courses-thumb-secondary">
                    <div class="courses-top">
                        <div class="courses-image">
                        <a href="car-details.html?id=${item.id}">
                            <img src="${item.imageLink}" class="img-responsive" alt="" />
                        </a>
                        </div>
                    </div>
                    <div class="courses-detail">
                        <h3><a href="car-details.html?id=${item.id}">${item.name}</a></h3>
                        <p class="lead"><strong>${item.price.toLocaleString(
                            "vi-VN"
                          )}₫</strong></p>
                    </div>
                    <div class="courses-info">
                        <a href="car-details.html?id=${item.id}" class="section-btn btn btn-primary btn-block">Xem chi tiết</a>
                    </div>
                </div>
            `;

            itemShowList.appendChild(newDiv);
        });
    }
});

// Tự động điều hướng
function scrollToProductStart() {
    const productStart = document.getElementById("product-start");
    productStart.scrollIntoView({ behavior: "smooth" });
  }

  var itemList = document.getElementById("item-list");
  function addItem() {
    var newItem = document.createElement("li");
    newItem.textContent = "Phần tử mới";
    itemList.appendChild(newItem);
  }
  setInterval(addItem, 1000);
  function autoScroll() {
    itemList.style.transform = "translate3d(0, -30px, 0)";
    setTimeout(function () {
      var firstItem = itemList.firstElementChild;
      itemList.appendChild(firstItem);
      itemList.style.transform = "translate3d(0, 0, 0)";
    }, 500);
  }
  setInterval(autoScroll, 1000);
