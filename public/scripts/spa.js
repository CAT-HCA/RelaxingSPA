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
					.text(category.Category)
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
		$("#cardTitle").html("Service ID: " + service.ServiceID);
		$("#cardText1").html(service.ServiceName);
		$("#cardText2").html("$" + Number(service.Price).toFixed(2));
		$("#serviceCard").css("display", "inline-block");
	});
}
