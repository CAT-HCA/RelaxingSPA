"use strict";

//document ready event handler
$(function() {
	$("#jtronBtn").on("click", e => {
		getCategories();
		$("#viewCategories").show();
		$("#jtron").addClass("hidden");
	});
});

function getCategories() {
	$.getJSON("/api/categories/", categories => {
		$.each(categories, (index, category) => {
			$("#categoryList").append(
				$("<a />")
					.html(
						`${category.Category}&nbsp;&nbsp;<span class="badge badge-info badge-pill">${
							category.Count
						}</span>`
					)
					.attr("href", "#")
					.addClass("dropdown-item")
					.on("click", e => {
						e.preventDefault();
						$("#categoryName").text(category.Category);
						getServices(category.Value);
					})
			);
		});
	});
	$("#viewCategories").on("click", e => {
		$("#categoryContainer").show();
	});
}

function getServices(category) {
	$("#serviceCard").hide();
	$("#servicesList").html("");
	$.getJSON(`/api/services/bycategory/${category}`, services => {
		$.each(services, (index, service) => {
			$("#servicesList").append(
				$("<li />")
					.addClass("list-group-item")
					.html(
						$("<a />")
							.text(service.ServiceName)
							.attr("href", "#")
							.attr("id", service.ServiceID)
							.on("click", e => {
								e.preventDefault();
								getService(service.ServiceID);
							})
					)
			);
		});
		$("#servicesContainer").show();
	});
}

function getService(serviceId) {
	$.getJSON(`/api/services/${serviceId}`, service => {
		$(`#${service.ServiceID}`).attr("data-toggle", "popover");
		$(`#${service.ServiceID}`).attr("data-placement", "auto");
		$(`#${service.ServiceID}`).attr("data-container", "body");
		$(`#${service.ServiceID}`).attr("data-html", "true");
		$(`#${service.ServiceID}`).css("display", "inline-block");
		$('[data-toggle="popover"]').popover({
			html: true,
			content: function() {
				return $(`#${service.ServiceID}`).html(
					`
                    <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="../images/nailtest.jpg" alt="Card image cap">
  <div class="card-body">
    <p class="card-text">Price: $ ${Number(service.Price).toFixed(2)}</p>

  </div>
</div>`
				);
			},
		});
	});
}
