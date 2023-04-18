const ordersEl = document.getElementById("orders");

function getOrdersHistory() {
  fetch("/api/ordersHistory")
    .then((response) => response.json())
    .then((res) => {
      if (!res.ok) return alert(res.message);

      ordersEl.innerHTML = "";
      const orders = res.data;

      orders.forEach((order) => {
        let itemsHtml = "";
        order.items.forEach((item) => {
          itemsHtml += `
						<tr>
							<td>${item.name}</td>
							<td>${item.qty}</td>
							<td>${item.price}</td>
						</tr>
				`;
        });

        const orderHtml = `
					<div class="order-box">
						<div class="order-date">Order Date: ${order.date.split("T")[0]}</div>
						<table>
							<thead>
								<tr>
									<th>Item Name</th>
									<th>Quantity</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
							${itemsHtml}
							</tbody>
						</table>
						<div class="order-total">Total Price: $${order.total}</div>
					</div>
					`;

        ordersEl.innerHTML += orderHtml;
      });
    })
    .catch((error) => alert(error));
}

getOrdersHistory();
