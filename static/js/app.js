
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
			row.append("td").text(value).attr("id", key);
		});
	});
};


// Initial data loading
loadTable(tableData);


// Button click handler 
submit.on("click", function() {

	// Prevent the page from refreshing
	d3.event.preventDefault();

	// Get the input value
	var inputValue = d3.select("#datetime").property("value");
	var filteredData = [];

	// Get the filtered data
	if (inputValue) {
		filteredData = tableData.filter(u => u.datetime == inputValue);
		emptyTable();
	} else {
		filteredData = tableData;
	};

	// Load the filtered data into the table
	loadTable(filteredData);
});






