const itemsEl = document.getElementById("items");
const ordersEl = document.getElementById("orders");
const totalEl = document.getElementById("total");
const orderBtn = document.getElementById("order-btn");
const commentField = document.getElementById("comment");
let user;

const order = {
  items: [],
  total: 0,
};
const categories = [
  "Soups",
  "Appetizers",
  "Rice Varieties",
  "Sizzlers",
  "Tongue Ticklers",
  "Desserts",
  "Indian Breads",
  "Beverages",
];
const items = [
  {
    id: 1,
    name: "Chicken Biryani",
    description:
      "A spiced mix of chicken and rice, traditionally cooked over an open fire in a leather pot.",
    price: 15,
    image:
      "https://vaya.in/recipes/wp-content/uploads/2018/03/Ambur-Chicken-Biriyani.jpg",
    category: "Rice Varieties",
  },
  {
    id: 2,
    name: "Vegetable Pulao",
    description:
      " a rice dish, cooked in seasoned broth with rice, vegetables, and a variety of spices including: coriander seeds, cumin, cardamom, cloves and others.",
    price: 25,
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/veg-pulao-recipe.jpg",
    category: "Rice Varieties",
  },
  {
    id: 3,
    name: "Vegetable Samosa",
    description:
      "brittle crust and soft potatoes laced with caraway, coriander and chillies.",
    price: 9,
    image: "https://static.toiimg.com/thumb/55435214.cms?width=1200&height=900",
    category: "Appetizers",
  },
  {
    id: 4,
    name: "Vegetable Steak Sizzler",
    description:
      "a single dish meal, in which vegetables are cooked in a sauce on a hot metal plate.",
    price: 20,
    image:
      "https://www.nehascookbook.com/wp-content/uploads/2022/10/Veg-sizzler-WS.jpg",
    category: "Sizzlers",
  },
  {
    id: 5,
    name: "Seekh Kabab",
    description:
      "A dish consisting of a mixture of minced meat (usually lamb), garlic and spices thinly wrapped around a skewer and grilled, usually in a tandoor.",
    price: 10,
    image: "https://www.ndtv.com/cooks/images/seekh-kebab-620.jpg",
    category: "Appetizers",
  },
  {
    id: 6,
    name: "Masala Chai",
    description: "a mix of spices steeped into a tea-like beverage.",
    price: 5,
    image:
      "https://simmertoslimmer.com/wp-content/uploads/2022/10/Masala-Chai-Tea.jpg",
    category: "Beverages",
  },
  {
    id: 7,
    name: "Garlic Naan",
    description: "",
    price: 4,
    image:
      "https://www.danishfoodlovers.com/wp-content/uploads/2022/03/Garlic-naan-bread-5.jpg",
    category: "Indian Breads",
  },
  {
    id: 8,
    name: "Rasamalai",
    description:
      "Light, spongy, spiced with cardamon and aromatic saffron; this dessert is so irresistible, that I am sure you won't be able to stop at just one Rasmalai.",
    price: 7,
    image:
      "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/moumita.malla-gmail.com/traditional_rasmalai_recipe_400.jpg",
    category: "Desserts",
  },
  {
    id: 9,
    name: "Tandoori Roti",
    description: "",
    price: 3,
    image:
      "https://www.vkrusa.com/wp-content/uploads/2020/04/TANDOORI-ROTI-1.jpg",
    category: "Indian Breads",
  },
  {
    id: 10,
    name: "Fanta",
    description: "",
    price: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fanta_logo_%282009%29.svg/1267px-Fanta_logo_%282009%29.svg.png",
    category: "Beverages",
  },
  {
    id: 11,
    name: "Sprite",
    description: "",
    price: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Sprite_Logo.svg/2500px-Sprite_Logo.svg.png",
    category: "Beverages",
  },
  {
    id: 12,
    name: "Diet Coke",
    description: "",
    price: 3,
    image: "https://logodix.com/logo/1186576.png",
    category: "Beverages",
  },
  {
    id: 13,
    name: "Coke Zero",
    description: "",
    price: 3,
    image:
      "https://seeklogo.com/images/C/coca-cola-zero-logo-B6A2750969-seeklogo.com.png",
    category: "Beverages",
  },
  {
    id: 14,
    name: "Madras South Indian Filter Coffee",
    description:
      "A chicory-laced coffee poured into furiously hot milk, It's stronger than espresso, surprisingly unctuous, and, if properly poured, beautifully frothy.",
    price: 5,
    image:
      "https://www.saffrontrail.com/wp-content/uploads/2006/08/recipe-to-make-filter-kaapi-how-to.1024x1024-1.jpg",
    category: "Beverages",
  },
  {
    id: 15,
    name: "Rasgulla",
    description:
      "A syrupy dessert popular in the eastern part of South Asia. It is made from ball-shaped dumplings of chhena and semolina dough, cooked in light sugar syrup made of sugar. This is done until the syrup permeates the dumplings.",
    price: 4,
    image:
      "https://static.toiimg.com/thumb/52743612.cms?imgsize=134181&width=800&height=800",
    category: "Desserts",
  },
  {
    id: 16,
    name: "Gulab Jamun",
    description:
      "A sweet flavor of milk and sugar and a hint of the rose and cardamom in the sugar syrup.",
    price: 4,
    image:
      "https://static.toiimg.com/thumb/63799510.cms?imgsize=1091643&width=800&height=800",
    category: "Desserts",
  },
  {
    id: 17,
    name: "Dasani Water",
    description: "",
    price: 2,
    image:
      "https://www.trashcreamery.com/uploads/1/3/2/3/132311421/s190842631946611390_p8_i3_w2000.png",
    category: "Beverages",
  },
  {
    id: 18,
    name: "Bhindi Kurkuri",
    description:
      "Kurkuri Bhindi is a spicy, tasty and super crispy fries made with tender okra pods or ladies finger, gram flour and spices.",
    price: 7,
    image:
      "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Curryandvanilla/Bhindi_KurkuriCrispy_Indian_Spiced_Okra_Fry.jpg",
    category: "Appetizers",
  },
  {
    id: 19,
    name: "Vegetable Biryani",
    description:
      "A traditional veg biryani has layers of fried vegetables and fragrant rice, dum cooked with caramelized onions, spices, herbs and saffron-infused milk.",
    price: 14,
    image:
      "https://www.dwarakaorganic.com/wp-content/uploads/2012/06/Veg-Biryani-Recipe.jpg",
    category: "Rice Varieties",
  },
  {
    id: 20,
    name: "Onion Bhaji",
    description:
      "Thinly sliced onions that have been coated in a simple, spiced batter then fried until golden and crisp.",
    price: 6,
    image:
      "https://www.asaucykitchen.com/wp-content/uploads/2021/09/Onion-Bhajis-735x1049.jpg",
    category: "Appetizers",
  },
  {
    id: 21,
    name: "Bubly Watermelon Sparkling Water",
    description: "",
    price: 3,
    image:
      "https://www.bubly.com/mix/assets/img/smiles/SmileAnimation_watermelon.gif",
    category: "Beverages",
  },
  {
    id: 22,
    name: "Kesar Peda",
    description:
      "Soft and creamy (Kesar Peda) is a golden yellow sweet made from milk, sugar and saffron.",
    price: 4,
    image:
      "https://i.pinimg.com/originals/2e/de/4e/2ede4e03529a988eaa1c6681a471cb38.jpg",
    category: "Desserts",
  },
  {
    id: 23,
    name: "Butter Naan",
    description: "",
    price: 3,
    image: "https://incredible.kitchen/wp-content/uploads/2018/11/img_0444.jpg",
    category: "Indian Breads",
  },
  {
    id: 24,
    name: "Mango Lassi",
    description: "",
    price: 4,
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/mango-lassi-recipe-500x500.jpg",
    category: "Beverages",
  },
  {
    id: 25,
    name: "Nimbu Pani (Lemonade)",
    description:
      "Nimbu Pani is an Indian style lemonade made with fresh lemon juice and sugar with a touch of spices.",
    price: 5,
    image: "https://media.currylives.com/2020/06/shikanji.jpeg",
    category: "Beverages",
  },
  {
    id: 26,
    name: "Chapathi",
    description:
      "A round flat unleavened bread of India that is usually made of whole wheat flour and cooked on a griddle.",
    price: 2,
    image:
      "https://static.toiimg.com/thumb/61203720.cms?imgsize=670417&width=800&height=800",
    category: "Indian Breads",
  },
  {
    id: 27,
    name: "Paneer Butter Masala",
    description:
      "Cottage cheese cooked with a paste of spinach seasoned with Indian herbs.",
    price: 12,
    image:
      "https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2.jpg",
    category: "Tongue Ticklers",
  },
  {
    id: 28,
    name: "Chicken Tikka Masala",
    description:
      "A traditional Indian dish made up of chicken that's been marinated in yogurt, charred and simmered in a rich, creamy tomato-based spiced sauce. The gorgeous color comes from Garam Masala, which is blend of cinnamon, black pepper, coriander, cumin, and cardamon.",
    price: 8,
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/06/chicken-tikka-masala.jpg",
    category: "Tongue Ticklers",
  },
  {
    id: 29,
    name: "Mixed Vegetable Curry",
    description:
      "Vegetable Curry made with mixed vegetables, spices and herbs.",
    price: 9,
    image:
      "https://i0.wp.com/vegecravings.com/wp-content/uploads/2018/02/Mix-Veg-Recipe-Step-By-Step-Instructions.jpg?fit=2349%2C1944&quality=65&strip=all&ssl=1",
    category: "Tongue Ticklers",
  },
  {
    id: 30,
    name: "Aloo Gobi",
    description:
      "Aloo gobi is a vegetarian dish made with potatoes, cauliflower, spices and herbs.",
    price: 14,
    image:
      "https://veganhuggs.com/wp-content/uploads/2021/04/aloo-gobi-in-bowl-side-view.jpg",
    category: "Tongue Ticklers",
  },
  {
    id: 31,
    name: "Chana Masala",
    description:
      "Chana masala is a popular Indian dish made with chickpeas in an onion tomato gravy. It goes great as a side with rice, naan or roti.",
    price: 15,
    image:
      "https://www.seriouseats.com/thmb/2KtHVPso7I68piUvR0501CjHJyY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__03__20160328-channa-masala-recipe-8-2ab6195d55ae4068a8c1d36d7371f5f7.jpg",
    category: "Tongue Ticklers",
  },
  {
    id: 32,
    name: "Butter Chicken",
    description:
      "A type of curry made from chicken with a spiced tomato and butter (makhan) sauce. Its sauce is known for its rich texture.",
    price: 10,
    image:
      "https://leitesculinaria.com/wp-content/uploads/fly-images/346503/butter-chicken-1200x1200-c.jpg",
    category: "Tongue Ticklers",
  },
  {
    id: 33,
    name: "Paneer Biryani",
    description:
      "Paneer Biryani is a delicious vegetarian layered dish of paneer, dum cooked with spices, herbs and basmati rice.",
    price: 25,
    image:
      "https://spicecravings.com/wp-content/uploads/2022/06/Achari-Paneer-Biryani-Featured.jpg",
    category: "Rice Varieties",
  },
  {
    id: 34,
    name: "Paneer Tikka Sizzler",
    description:
      "Succulent pieces of paneer marinated in a tantalizing tandoori masala grilled to perfection and served with pulao, a stuffed capsicum and tangy makhani gravy.",
    price: 18,
    image:
      "https://di-cdn.sfo2.digitaloceanspaces.com/cdn/533_9921fd8175b85acd3f92905ce8b8cb44.jpeg",
    category: "Sizzlers",
  },
  {
    id: 35,
    name: "Tandoori Chicken Sizzler",
    description:
      "A half of a chicken marinated in yogurt, ginger garlic and secret blend of spices roasted in our tandoor, a cylindrical clay oven. We add that to a bed of vegetables sauteed over a high heat then serve it all on a sizzling skillet dressed with citrus juice.",
    price: 25,
    image:
      "https://i.pinimg.com/736x/5e/dd/9f/5edd9f4e57867118eccd113ef9dc6baa--tandoori-chicken-chicken-curry.jpg",
    category: "Sizzlers",
  },
  {
    id: 36,
    name: "Kulfi ice cream",
    description:
      "Kulfi is a dessert that is made with boiled ingredients including dairy products, sugar and flavourings which are then kept frozen.",
    price: 5,
    image:
      "https://www.archanaskitchen.com/images/archanaskitchen/Indian_Sweets_Mithai/Kesar_Pista_Kulfi_Recipe_Indian_Ice_Cream-1-2.jpg",
    category: "Desserts",
  },
  {
    id: 37,
    name: "Mango Kulfi ice cream",
    description:
      "Mango kulfi is a frozen summer dessert made with milk, sugar & sweet ripe mangoes.",
    price: 5,
    image:
      "https://bakewithshivesh.com/wp-content/uploads/2020/04/C7F4525D-BE57-4A88-AA55-5F74746288CF.jpeg",
    category: "Desserts",
  },
  {
    id: 38,
    name: "Vegetable Seekh Kabab Sizzler",
    description:
      "Vegetable Seekh Kabab Sizzler are so delicious, gluten free & Loaded with vegetables, they are shaped on skewers and grilled.",
    price: 17,
    image:
      "https://img-global.cpcdn.com/recipes/a77af841914fb174/1200x630cq70/photo.jpg",
    category: "Sizzlers",
  },
  {
    id: 39,
    name: "Aloo Tikki",
    description:
      "A golden fried-potato patty that is often stuffed with peas or dal and served with a variety of spicy chutneys and sometimes chickpeas, while aloo chaat is simply boiled potatoes that are cubed, fried, seasoned, and served hot.",
    price: 5,
    image:
      "https://assets.bonappetit.com/photos/602c3f3947d6e85be58927ab/1:1/w_2560%2Cc_limit/Basically-AlooTikki.jpg",
    category: "Appetizers",
  },
  {
    id: 40,
    name: "Tomato Soup",
    description: "A soup with tomatoes as the main primary ingredient.",
    price: 10,
    image:
      "https://natashaskitchen.com/wp-content/uploads/2021/08/Tomato-Soup-Recipe-SQ.jpg",
    category: "Soups",
  },
  {
    id: 41,
    name: "Sweet Corn Soup",
    description:
      "Sweet corn soup is a Indo Chinese style soup made with mixed veggies, sweet corn kernels & pepper. ",
    price: 10,
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/sweet-corn-soup-recipe.jpg",
    category: "Soups",
  },
  {
    id: 42,
    name: "Chicken Samosa",
    description:
      "It is a crispy deep fry patty filled with delicious Chicken masala, where chicken is cooked and flavored with other ingredients.",
    price: 5,
    image: "https://i.ytimg.com/vi/GuIhCmckdP4/maxresdefault.jpg",
    category: "Appetizers",
  },
  {
    id: 43,
    name: "Chicken Soup",
    description:
      "Chicken soup is a soup made from chicken, simmered in water, usually with various other ingredients.",
    price: 10,
    image:
      "https://www.seriouseats.com/thmb/2nouHHsjM0bN1vwXMOZGUkLFsJ8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2017__12__20171115-chicken-soup-vicky-wasik-11-80db1a04d84a43a089e0559efdddd517.jpg",
    category: "Soups",
  },
  {
    id: 44,
    name: "Mixed Vegetable Soup",
    description:
      "Vegetable soup is a common soup prepared using vegetables and leaf vegetables as primary ingredients.",
    price: 10,
    image:
      "https://www.cookingclassy.com/wp-content/uploads/2014/10/vegetable-soup-7.jpg",
    category: "Soups",
  },
];

function addItemToOrder(itemId) {
  const item = items.find((itm) => itm.id === itemId);
  const exists = order.items.find((itm) => itm.id === itemId);
  const { id, name, price } = item;
  if (exists) {
    exists.qty += 1;
  } else {
    order.items.push({ id, name, price, qty: 1 });
  }

  renderOrder();
}

function removeItemfromOrder(itemId) {
  const item = order.items.find((itm) => itm.id === itemId);
  if (item.qty > 1) {
    item.qty -= 1;
  } else {
    const newOrders = [];
    order.items.forEach((itm) =>
      itm.id !== itemId ? newOrders.push(itm) : null
    );
    order.items = newOrders;
  }

  renderOrder();
}

function renderItems(items) {
  itemsEl.innerHTML = "";
  categories.forEach((category) => {
    const categoryItems = items.filter((item) => item.category == category);
    const categoryDiv = document.createElement("div");
    const categoryItemsDiv = document.createElement("div");
    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category;
    categoryItemsDiv.className = "item-grid";
    categoryItems.forEach((item) => {
      const itemDiv = document.createElement("div");
      const itemImg = document.createElement("img");
      const itemContentDiv = document.createElement("div");
      const titleH2 = document.createElement("h2");
      const priceH4 = document.createElement("h4");
      const descriptionP = document.createElement("p");
      const addBtn = document.createElement("button");

      itemDiv.className = "item";
      itemImg.src = item.image;
      titleH2.textContent = item.name;
      priceH4.textContent = `$ ${item.price}`;
      descriptionP.textContent = item.description;
      addBtn.textContent = "Add";
      addBtn.className = "btn-primary";
      if (user) {
        addBtn.addEventListener("click", () => addItemToOrder(item.id));
      } else {
        addBtn.title = "Login to add Item";
        addBtn.disabled = true;
      }

      itemContentDiv.append(titleH2, priceH4, descriptionP, addBtn);
      itemDiv.append(itemImg, itemContentDiv);

      categoryItemsDiv.append(itemDiv);
    });
    categoryDiv.append(categoryTitle, categoryItemsDiv);
    itemsEl.append(categoryDiv);
  });
}

function renderOrder() {
  order.total = 0;
  order.items.forEach((item) => (order.total += item.qty * item.price));

  ordersEl.innerHTML = "";
  order.items.forEach((item) => {
    const orderDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    const p = document.createElement("p");
    const addBtn = document.createElement("button");
    const subBtn = document.createElement("button");
    const amountSpan = document.createElement("span");

    orderDiv.className = "order-item";
    p.textContent = item.name;
    addBtn.innerHTML = "+";
    subBtn.innerHTML = "&#8722;";
    addBtn.addEventListener("click", () => addItemToOrder(item.id));
    subBtn.addEventListener("click", () => removeItemfromOrder(item.id));
    amountSpan.textContent = `${item.qty} * ${item.price} = ${
      item.qty * item.price
    }`;

    innerDiv.append(addBtn, subBtn, amountSpan);
    orderDiv.append(p, innerDiv);
    ordersEl.append(orderDiv);
  });

  totalEl.textContent = `Total: $ ${order.total}`;
  orderBtn.disabled = order.items.length === 0 ? true : false;
}

function sendOrder() {
  const data = { ...order, comment: commentField.value || "" };

  fetch("/api/currentOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.ok) {
        window.location.href = "/payment";
      } else {
        alert(res.message);
      }
    })
    .catch(() => {
      alert("Something went wrong!");
    });
}

function getUser() {
  fetch("/api/me", { method: "POST" })
    .then((res) => res.json())
    .then((res) => {
      if (res.ok) {
        user = res.data;
      }
    })
    .finally(() => {
      renderItems(items);
      renderOrder();
    });
}

orderBtn.addEventListener("click", sendOrder);

getUser();
