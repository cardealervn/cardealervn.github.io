document.addEventListener("DOMContentLoaded", function () {
  const detailContainer = document.getElementById("detail");
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id");

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const item = data.items.find((item) => item.id == itemId);
      if (item) {
        displayItemDetails(item);
      } else {
        detailContainer.innerHTML = "<p>Item not found</p>";
      }
    })
    .catch((error) => console.error("Error fetching data:", error));

  function displayImagesFromPath(imagePaths) {
    const fullImagePaths = imagePaths;

    return Promise.all(
      fullImagePaths.map((fullPath) =>
        fetch(fullPath)
          .then((response) => response.blob())
          .then((blob) => URL.createObjectURL(blob))
      )
    )
      .then((imageUrls) => {
        return imageUrls
          .map(
            (imageUrl) => `
                            <div class="col-sm-4 col-xs-6" id="img-details">
                                <div>
                                    <img
                                        src="${imageUrl}"
                                        alt=""
                                        class="img-responsive"
                                    />
                                </div>
                                <br />
                            </div>
                        `
          )
          .join("");
      })
      .catch((error) => {
        console.error("Error reading folder:", error);
        return "";
      });
  }

  function displayItemDetails(item) {
    const itemShowList = document.getElementById("item-detail");
    const newDiv = document.createElement("div");
    newDiv.className = "container";

    displayImagesFromPath(item.imagePath).then((imagesHTML) => {
      newDiv.innerHTML = `
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <div>
                <img
                  src="${item.imageLink}"
                  alt=""
                  class="img-responsive wc-image"
                />
              </div>
              <form action="#" method="post" class="form">
                <h2>${item.name}</h2>
                <p class="lead">
                    <strong class="text-primary">${item.price.toLocaleString(
                      "vi-VN"
                    )}₫</strong>
                </p>
              </form>
              <br />
            </div>
            <div class="col-md-6 col-xs-12">
              ${imagesHTML}
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4>Thông tin chi tiết sản phẩm</h4>
                </div>
                <div class="panel-body">
                  <p>
                    ${item.shortDesc}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-xs-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4>Thông tin liên hệ</h4>
                </div>
                <div class="panel-body">
                  <p>
                    <span>Tên</span>
                    <br />
                    <strong>Nguyễn Văn A</strong>
                  </p>
                  <p>
                    <span>Hotline</span>
                    <br />
                    <strong><a href="tel:123-456-789">123-456-789</a></strong>
                  </p>
                  <p>
                    <span>Di động</span>
                    <br />
                    <strong><a href="tel:456789123">456789123</a></strong>
                  </p>
                  <p>
                    <span>Mail</span>
                    <br />
                    <strong><a href="mailto:nguyenvana@carsales.com">nguyenvana@carsales.com</a></strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        `;
      itemShowList.appendChild(newDiv);
    });
  }
});
