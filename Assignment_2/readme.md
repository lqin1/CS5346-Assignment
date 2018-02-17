# CS5346 Assignment 2 - Data Visualisation for Kickstarter Projects

### How to run the code
1. `cd` into this directory
2. Start a server by executing `python -m SimpleHTTPServer 8080` in cmd
3. Navigate to following directories to view the graphs

    `http://localhost:8080/Q1/`,

    `http://localhost:8080/Q2/`, 

    `http://localhost:8080/Q3/`, 

    `http://localhost:8080/Q1/` 


### Graph explaination
1. Graph 1 shows change in categories over time

    Multi-line chart is selected because it's advantages of displaying change more intuitively. Color coding is used to better distinguish categories.

    From the graph, it is clearly indicated that before year 2013, the kickstarter project development is very slow, and it reached its peak in year 2015, then started to decline.

2.  Graph 2 shows average amount pledged per project by categories. 

    Bar chart is selected sinces it shows numbers better.

    It is clearly indicated that sound project has the highest average amount pledged, while Apps, Web have relatievly low amount.

3. Graph 3 shows project status change over time.

    Stacked area chart is selected to better display the change of each status, including successful, failed, etc. Since all status add up to 100%, stacked area chart is a good fit. However, due to the lack of continuitity of data, it does not as well as expected.

    The grapsh allows user to choose didderent category for viewing. Eg. for Hardware, it is obvious that most projects ended up unsuccessful. There is no significant relationship w.r.t time.

4.  Graph 4 shows average number of backers vs success rate per project by category.

    Dual-axes bar-line chart is used to unveil the relationship between popularity and success rate among projects.

    The chart indicates sound project is most popular amount all categories. However, its success rate is below average, at 9.6 percent only. At the other hand, makerspaces projects have relatively low popularity, while its success rate is as high as 49.4%. We can conclude that there is no direct relationship between popularity and successrate among all projects.