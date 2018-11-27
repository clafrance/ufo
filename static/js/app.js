
// from data.js
var tableData = data;

// Select the submit button
var submit = d3.select("#filter-btn");

// Function to empty the table
function emptyTable() {
	d3.select("#ufo-table > tbody").selectAll('tr').remove();
};


// Function to load data into the table
function loadTable(data) {
	data.forEach((ufo) => {
		var tbody = d3.select("#ufo-table > tbody");
		var row = tbody.append("tr");

		Object.entries(ufo).forEach(([key, value]) => {
			row.append("td").text(value);
			// row.append("td").text(value).attr("id", key);
		});
	});
};


// Find unique Cities
var select = d3.select("#city");

cities = tableData.map(u => u.city);
cities = [...new Set(cities)];
cities.sort().unshift("");

cities.forEach((city) => {
	select.append("option").text(city).attr("id", city);
});


// Initial data loading
loadTable(tableData);


// Button click handler 
submit.on("click", function() {

	// Prevent the page from refreshing
	d3.event.preventDefault();

	// Get the input date
	const inputDate = d3.select("#datetime").property("value");
	var filteredData = [];

	// Get the data filtered by date
	if (inputDate) {
		filteredData = tableData.filter(u => u.datetime === inputDate);
		emptyTable();
	} else {
		filteredData = tableData;
	};

	// Get the data filtered by city
	const inputCity = d3.select('#city option:checked').text();
	if (inputCity) {
		filteredData = filteredData.filter(u => u.city === inputCity);
		console.log(filteredData);
	};



	// Load the filtered data into the table
	loadTable(filteredData);
});






