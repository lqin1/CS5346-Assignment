function displayPlot(category) {
    d3.select("svg").remove();    
    var categories = ['successful', 'failed', 'canceled', 'suspended', ''];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var margin = {
            top: 40,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%y-%b-%d").parse,
        formatPercent = d3.format(".0%");

    var bisectDate = d3.bisector(function (d) {
        return d.date;
    }).left;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category20();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    var area = d3.svg.area()
        .x(function (d) {
            return x(d.date);
        })
        .y0(function (d) {
            return y(d.y0);
        })
        .y1(function (d) {
            return y(d.y0 + d.y);
        });

    var stack = d3.layout.stack()
        .values(function (d) {
            return d.values;
        });
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var temp = {};
    d3.csv('../kickstarter-2016.csv', function (error, dataset) {
        dataset.forEach(function (d) {
            if (d.Category == category) {
                var date = new Date(d.Deadline);
                var yearMonthStr = date.getFullYear() + '-' + (date.getMonth() + 1);
                var status = d.Status;
                if (status == 'undefined')
                    // status = '';
                    return;
                if (temp[yearMonthStr] == null) {
                    temp[yearMonthStr] = {};
                    temp[yearMonthStr][status] = 1;
                } else {
                    if (temp[yearMonthStr][status] == null) {
                        temp[yearMonthStr][status] = 1;
                    } else {
                        temp[yearMonthStr][status]++;
                    }
                }
            }
        })

        //flat map
        var data = [];
        var dates = Object.keys(temp);
        for (var i in dates) {
            var dateStr = dates[i];
            var date = new Date(dateStr);
            var singleRecord = {
                date: date
            }
            var total = 0;
            for (var j = 0; j < categories.length; j++) {
                if (temp[dateStr][categories[j]] != null) {
                    total += temp[dateStr][categories[j]];
                }
            }

            for (var j = 0; j < categories.length; j++) {
                var cat = categories[j];
                singleRecord[cat] = temp[dateStr][cat] == null || total == 0 ? '0' : temp[dateStr][cat] / total * 100.0 + '';
            }
            data.push(singleRecord);
        }

        data.sort(function (a, b) {
            return a.date.getTime() - b.date.getTime();
        })

        data.forEach(function (d) {
            d.date = d.date.getFullYear().toString().substring(2) + '-' + months[d.date.getMonth()] + '-' + 1;
        })
        //data should be ready by now
        color.domain(d3.keys(data[0]).filter(function (key) {
            return key !== "date";
        }));

        data.forEach(function (d) {
            d.date = parseDate(d.date);
        });

        var browsers = stack(color.domain().map(function (name) {
            return {
                name: name,
                values: data.map(function (d) {
                    return {
                        date: d.date,
                        y: d[name] / 100
                    };
                })
            };
        }));


        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var browser = svg.selectAll(".browser")
            .data(browsers)
            .enter().append("g")
            .attr("class", "browser");


        browser.append("path")
            .attr("class", "area")
            .attr("d", function (d) {
                return area(d.values);
            })
            .style("fill", function (d) {
                return color(d.name);
            });

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Project status over time for " + category);

        browser.append("text")
            .datum(function (d) {
                return {
                    name: d.name,
                    value: d.values[d.values.length - 1]
                };
            })
            .attr("transform", function (d) {
                return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")";
            })
            .attr("x", -6)
            .attr("dy", ".35em")
            .attr("z-index", 100)
            .text(function (d) {
                return d.name;
            });

        // Tooltip
        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5);

        focus.append("text")
            .attr("x", 9)
            .attr("dy", ".35em")
            .style("font-size", 15);

        var focus2 = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus2.append("circle")
            .attr("r", 5);

        focus2.append("text")
            .attr("x", 9)
            .attr("dy", ".35em")
            .style("font-size", 15);

        var focus3 = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus3.append("circle")
            .attr("r", 5);

        focus3.append("text")
            .attr("x", 9)
            .attr("dy", ".35em")
            .style("font-size", 15);

        var focus4 = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus4.append("circle")
            .attr("r", 5);

        focus4.append("text")
            .attr("x", 9)
            .attr("dy", ".5em")
            .style("font-size", 15);

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function () {
                focus.style("display", null);
                focus2.style("display", null);
                focus3.style("display", null);
                focus4.style("display", null);
            })
            .on("mouseout", function () {
                focus.style("display", "none");
                focus2.style("display", "none");
                focus3.style("display", "none");
                focus4.style("display", "none");
            })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            var depl = parseFloat(d['suspended']) + parseFloat(d['']) + parseFloat(d['canceled']);
            var depl2 = parseFloat(d['suspended']) + parseFloat(d['']);
            var depl3 = parseFloat(d['suspended']) + parseFloat(d['']) + parseFloat(d['canceled']) +
                parseFloat(d['failed']);
            var depl4 = parseFloat(d['']);
            focus.attr("transform", "translate(" + x(d.date) + "," + (500 - margin.top - margin.bottom) *
                depl / 100 + ")");
            focus2.attr("transform", "translate(" + x(d.date) + "," + (500 - margin.top - margin.bottom) *
                depl2 / 100 + ")");
            focus3.attr("transform", "translate(" + x(d.date) + "," + (500 - margin.top - margin.bottom) *
                depl3 / 100 + ")");
            focus4.attr("transform", "translate(" + x(d.date) + "," + (500 - margin.top - margin.bottom) *
                depl4 / 100 + ")");
            focus.select("text").text(d3.round(100 - depl, 1) + "%");
            focus2.select("text").text(d3.round(100 - depl2, 1) + "%");
            focus3.select("text").text(d3.round(100 - depl3, 1) + "%");
            focus4.select("text").text(d3.round(100 - depl4, 1) + "%");
        }

    });
}