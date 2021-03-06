var margin = {
        top: 30,
        right: 100,
        bottom: 30,
        left: 100
    },
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

export default const dataset = [{
    x: 1976,
    y: 200000
}, {
    x: 1977,
    y: 328813
}, {
    x: 1978,
    y: 234986
}, {
    x: 1979,
    y: 443721
}, {
    x: 1980,
    y: 333666
}, {
    x: 1981,
    y: 202922
}, {
    x: 1982,
    y: 773729
}, {
    x: 1983,
    y: 909876
}, {
    x: 1984,
    y: 456789
}, {
    x: 1985,
    y: 238867
}, {
    x: 1986,
    y: 293847
}, {
    x: 1987,
    y: 483374
}, {
    x: 1988,
    y: 499922
}, {
    x: 1989,
    y: 335577
}, {
    x: 1990,
    y: 827364
}, {
    x: 1991,
    y: 882223
}, {
    x: 1992,
    y: 334455
}, {
    x: 1993,
    y: 772211
}, {
    x: 1994,
    y: 112255
}, {
    x: 1995,
    y: 437262
}, {
    x: 1996,
    y: 662522
}, {
    x: 1997,
    y: 445577
}, {
    x: 1998,
    y: 222277
}, {
    x: 1999,
    y: 683833
}, {
    x: 2000,
    y: 198762
}, {
    x: 2001,
    y: 334477
}, {
    x: 2002,
    y: 289977
}, {
    x: 2003,
    y: 445533
}, {
    x: 2004,
    y: 233456
}, {
    x: 2005,
    y: 128374
}, {
    x: 2006,
    y: 445587
}, {
    x: 2007,
    y: 737485
}, {
    x: 2008,
    y: 123433
}, {
    x: 2009,
    y: 556633
}, {
    x: 2010,
    y: 883736
}, {
    x: 2011,
    y: 593300
}, {
    x: 2012,
    y: 746382
}, {
    x: 2013,
    y: 773344
}, {
    x: 2014,
    y: 884466
}, {
    x: 2015,
    y: 337744
}, ];

var xScale = d3.scale.linear()
    .domain([d3.min(dataset, function(d) {
        return d.x;
    }), d3.max(dataset, function(d) {
        return d.x;
    })])
    .range([0, width]);

var yScale = d3.scale.linear()
    .domain([0,1000000])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10)
    .ticks(33)
    .tickFormat(d3.format("d"));

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .innerTickSize(-width)
    .outerTickSize(0)
    .tickPadding(10);

var line = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d) {
        return xScale(d.x);
    })
    .y(function(d) {
        return yScale(d.y);
    });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) {
        return xScale(d.x);
    })
    .y0(height)
    .y1(function(d) {
        return yScale(d.y);
    });

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([75, 0])
    .html(function(d) {
        return d.y;
    });


var svg = d3.select(".line-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

svg.append("rect")
  .attr("width",width)
  .attr("height",height)
  .attr("fill", "#f2f0df");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "translate(0,23), rotate(-45)");

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("path")
    .data([dataset])
    .attr("class", "line")
    .attr("d", line);

svg.append("path")
    .datum(dataset)
    .attr("class", "area")
    .attr("d", area);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d.x);
    })
    .attr("cy", function(d) {
        return yScale(d.y);
    })
    .attr("r", 6)
    .style("fill", "rgb(214, 205, 30)")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
