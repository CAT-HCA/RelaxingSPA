"use strict";

//document ready event handler
$(function() {
	$("#jtronBtn").on("click", e => {
		$("#servicesHeader").show();
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
        getFirstCardBody()
		$.each(services, (index, service) => {
			$("#accordion").append(
				$("<div />")
					.addClass("card")
					.attr("id", `cardId${service[i + 1].ServiceID}`)
			);
			$(`#cardId${service[i + 1].ServiceID}`).append(
				$("<div />")
					.addClass("card-header")
					.attr("id", `cardHeadingDiv${service[i + 1].ServiceID}`)
			);
			$(`#cardHeadingDiv${service[i + 1].ServiceID}`).append(
				$("<h2 />")
					.addClass("mb-0")
					.attr("id", `cardHeading${service[i + 1].ServiceID}`)
			);
			$(`#cardHeading${service[i + 1].ServiceID}`).append(
				$("<button />")
					.addClass("btn btn-link collapsed")
					.html(service[i + 1].ServiceName)
					.attr({
						id: `cardBtn${service[i + 1].ServiceID}`,
						type: "button",
						"data-toggle": "collapse",
						"data-target": `#collapse${service[i + 1].ServiceID}`,
						"aria-expanded": "false",
						"aria-controls": `#collapse${service[i + 1].ServiceID}`,
					})
					.on("click", e => {
						e.preventDefault();
						getService(service[i + 1].ServiceID);
					})
			);
		});
		$("#servicesContainer").show();
	});
}

function getService(serviceId) {
	$.getJSON(`/api/services/${serviceId}`, service => {
		$(`#cardId${service.ServiceID}`).append(
			$("<div />")
				.addClass("collapse-show")
				.attr({
					id: `collapse${service.ServiceID}`,
					"aria-labelledby": `#cardHeading${service.ServiceID}`,
					"data-parent": "#accordion",
				})
		);
		$(`#cardId${service.ServiceID}`).append(
			$("<div />")
				.addClass("card-body")
				.html(
					`<p class="serviceDescription">${service.Description}</p>
                <p class="servicePrice">Price:$ ${service.Description}</p>
                <p class="serviceLength">Duration: ${service.Minutes} minutes</p>

                `
				)
		);
	});
}

function getFirstCardBody(){
    $.getJSON(`/api/services/${serviceId}`, service => {
        $("#cardBtn1").html(service[i + 1].ServiceName)
        $("#collapse1").html(
            `<p class="serviceDescription">${service[0].Description}</p>
            <p class="servicePrice">Price:$ ${service[0].Description}</p>
            <p class="serviceLength">Duration: ${service[0].Minutes} minutes</p>
            ` 
        )
	});
}


