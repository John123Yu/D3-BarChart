var dataArray = [[23,"one"], [13,"two"], [21,"three"], [14,"four"], [37,"five"], [15,"six"], [18,"seven"], [34,"eight"], [30,"nine"]];

var margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%d-%b-%y");


var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var maxValue = d3.max(dataArray, function(d) { return d[0]; }) + 10
y.domain([0, maxValue]);

var svg = d3.select("body").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.selectAll("rect")
    .data(dataArray)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("height", function(d, i) {return (d[0] * (height/maxValue))})
    .attr("width","40")
	.attr("x", function(d, i) {return i * 50 + 25;})
	.attr("y", function(d, i) {return height - (d[0] * (height/maxValue))});

svg.selectAll("text")
    .data(dataArray)
    .enter().append("text")
    .text(function(d) {return d[0];})
    .attr("x", function(d, i) {return (i * 50) + 36})
	.attr("y", function(d, i) {return height - 8 - (d[0] * (height/maxValue))});

svg.selectAll("label")
    .data(dataArray)
    .enter().append("text")
    .attr("class", "label")
    .text(function(d) {return d[1];})
    .attr("x", function(d, i) {return (i * 50) + 36})
	.attr("y", function(d, i) {return height + 20});

svg.append("g")
	.attr("class", 'y-axis')
	.call(d3.axisLeft(y));
