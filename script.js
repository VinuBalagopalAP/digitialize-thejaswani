// product_card_i = (name, price, i) => {
//   document.getElementById(`product-name${i}`).innerHTML = name;
//   document.getElementById(`product-price${i}`).innerHTML = price;
// };

// snippet_code = (products) => {
//   text = "";
//   for (let i in products) {
//     console.log(products[i]);
//     text += `
//         <div class="card-container" id="card-snippet${i}">
//         <div class="card-image">
//             <img src=${products[i].imageUrl}
//                 alt="">
//         </div>
//         <div class="card-content">
//             <div class="top" id="product-name${i}"></div>
//             <div class="bottom">

//                 <div class="recommended">Recommended </div>
//                 <div class="item-price" >₹<span id="product-price${i}"></span></div>
//             </div>
//         </div>
//     </div>
//     `;
//   }
//   document.getElementById("cards").innerHTML = text;
//   for (let i in products) {
//     product_card_i(products[i].item_name, products[i].item_price, i);
//   }
// };
// snippet_code(product);

// fetch("data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     snippet_code(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// let shops = [];

// fetch("data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     // Code to handle the data goes here
//     shops = data.shops;
//     console.log(shops);
//     console.log(data);
//   })
//   .catch((error) => console.error(error));

// const cardContainer = document.getElementById("cards");

// // Loop through each shop in the JSON file
// shops.forEach((shop) => {
//   // Check if the shop exists before displaying its items
//   if (shop.shop_exists) {
//     // Loop through each category in the shop
//     shop.shop_items.forEach((category) => {
//       // Create a div element for the category
//       const categoryDiv = document.createElement("div");
//       categoryDiv.classList.add("card-container");

//       // Create a div element for the category image
//       const imageDiv = document.createElement("div");
//       imageDiv.classList.add("card-image");

//       // Create an img element for the category image
//       const image = document.createElement("img");
//       image.src = category.items[0].item_image;
//       image.alt = category.category_name;
//       imageDiv.appendChild(image);
//       categoryDiv.appendChild(imageDiv);

//       // Create a div element for the category content
//       const contentDiv = document.createElement("div");
//       contentDiv.classList.add("card-content");

//       // Create a span element for the category name
//       const nameSpan = document.createElement("span");
//       nameSpan.classList.add("top");
//       nameSpan.textContent = category.category_name;
//       contentDiv.appendChild(nameSpan);

//       // Loop through each item in the category
//       category.items.forEach((item) => {
//         // Create a span element for the item name
//         const itemSpan = document.createElement("span");
//         itemSpan.textContent = item.item_name;

//         // If the item is recommended, add a recommended class to the span
//         if (item.recommended) {
//           itemSpan.classList.add("recommended");
//         }

//         // Create a span element for the item price
//         const priceSpan = document.createElement("span");
//         priceSpan.classList.add("item-price");
//         priceSpan.textContent = "$" + item.item_price.toFixed(2);

//         // Add the item name and price spans to the content div
//         contentDiv.appendChild(itemSpan);
//         contentDiv.appendChild(priceSpan);
//       });

//       // Add the content div to the category div
//       categoryDiv.appendChild(contentDiv);

//       // Add the category div to the card container
//       cardContainer.appendChild(categoryDiv);
//     });
//   }
// });

// Fetch the JSON data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Call the function to generate the HTML
    const shopsContainer = document.getElementById("shops-container");
    shopsContainer.innerHTML = generateHTML(data);
  });

function generateHTML(data) {
  let html = "";

  // Loop through each shop
  data.shops.forEach((shop) => {
    // Check if the shop exists
    if (shop.shop_exists) {
      const shopName = shop.shop_name.toUpperCase();
      html += `<h2 style="text-align:center; margin-bottom:2rem;">${shopName}</h2>`;

      // Loop through each category and item
      shop.shop_items.forEach((category) => {
        const categoryName = category.category_name.toUpperCase();

        html += `<h3 style="text-align: center; border-top: 1px solid rgba(223, 189, 105, 0.5); color: #DFBD69;  line-height: 0.1em; margin: 10px 0 20px;">
    <span style="background-color: white; padding: 0 10px;">${categoryName}</h3>`;

        category.items.forEach((item) => {
          // Check if the item is recommended
          const recommendedClass = item.recommended ? "recommended" : "";

          html += `
             <div class="item ${recommendedClass}">
             <h4>${item.item_name}</h4>
              <p>Rs: ${item.item_price}</p>
             </div>
            <div id="cards"></div>
          `;
        });
      });
    }
  });

  return html;
}
