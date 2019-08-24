"use strict";

//document ready event handler
$(function() {
	$("#jtronBtn").on("click", e => {
		$("#viewCategories").css("display", "block");
		$("#servicesHeader").css("display", "block");
		$("#jtron").addClass("hidden");
		$("#viewCategories").on("click", e => {
			$("#categoryList").empty();
			getCategories();
		});
	});
});

function getCategories() {
	$.getJSON("/api/categories", categories => {
		$("#categoryContainer").css("display", "inline-block");
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
						$("#cardBtn0").html("");
						$("#servicesList div:not(.dontEmpty)").empty();
						$("#categoryName").text(category.Category);
						$("#servicesContainer").css("display", "block");

						getServices(category.Value);
					})
			);
		});
	});
}

function getServices(category) {
	$.getJSON(`/api/services/bycategory/${category}`, services => {
		$("#cardBtn0")
			.html(services[0].ServiceName)
			.on("click", e => {
				$(".card-body").remove()
				e.preventDefault();
				getService(services[0].ServiceID, 0);
			});
		for (let i = 1; i < services.length; i++) {
			$("#accordion").append(
				$("<div />")
					.addClass("card")
					.attr("id", `cardId${[i]}`)
			);
			let cardId = $(`#cardId${[i]}`);
			cardId.append(
				$("<div />")
					.addClass("card-header")
					.attr("id", `cardHeadingDiv${[i]}`)
			);
			$(`#cardHeadingDiv${[i]}`).append(
				$("<h2 />")
					.addClass("mb-0")
					.attr("id", `cardHeading${[i]}`)
			);
			$(`#cardHeading${[i]}`).append(
				$("<button />")
					.addClass("btn btn-link collapsed")
					.html(services[i].ServiceName)
					.attr({
						id: `cardBtn${[i]}`,
						type: "button",
						"data-toggle": "collapse",
						"data-target": `#collapse${[i]}`,
						"aria-expanded": "false",
						"aria-controls": `collapse${[i]}`,
					})
					.on("click", e => {
						e.preventDefault();
						$(".card-body").remove()
						getService(services[i].ServiceID, i);
					})
			);
		}
	});
}

function getService(serviceId, cardIdNum) {
	$(`#cardId${cardIdNum}`).append(
		$("<div />")
			.addClass("collapsed")
			.attr({
				id: `collapse${cardIdNum}`,
				"aria-labelledby": `#cardHeading${cardIdNum}`,
				"data-parent": "#accordion",
			})
	);
	$.getJSON(`/api/services/${serviceId}`, service => {
		$(".card-body").remove()

		$(`#cardId${cardIdNum}`).append(
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
