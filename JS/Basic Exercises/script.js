function loopsAndFunctionBasics(param) {
    let str = "";
    for (let i = param; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            str += "*";
        }
        str += "\n";
    }
    console.log(str);
}

function objectsFirst() {
    let obj = {
        name: "Binit Ghimire",
        address: "Bharatpur-9, Chitwan",
        emails: "hello@whoisbinit.me",
        interests: ["Programming", "Security Research"],
        education: [
            {
                name: "Sun-Rise English School",
                enrolledDate: 2010
            },
            {
                name: "Aroma English Secondary School",
                enrolledDate: 2016
            },
            {
                name: "United Technical College",
                enrolledDate: 2018
            }
        ]
    };

    let str = "";
    let keys = Object.keys(obj);
    for (i = 0; i < keys.length; i++) {
        if (keys[i] == "education") {
            obj[keys[i]].forEach(function (e) {
                let innerKeys = Object.keys(e);
                str += "Name: " + e[innerKeys[0]] + ", Date: " + e[innerKeys[1]] + "\n";
            });
        }
    }
    console.log(str);
}

function objectsSecond() {
    var fruits = [
        { id: 1, name: 'Banana', color: 'Yellow' },
        { id: 2, name: 'Apple', color: 'Red' }
    ]

    function searchByName(arr, name) {
        arr.forEach(function (e) {
            if (e.name == name) console.log(e);
        })
    }
    console.log("Now, executing searchByName()!");
    searchByName(fruits, 'Apple');

    function searchByKey(arr, key, name) {
        arr.forEach(function (e) {
            if (e[key] == name) console.log(e);
        })
    }
    console.log("Now, executing searchByKey()!");
    searchByKey(fruits, 'name', 'Apple');
}

function functions() {
    var numbers = [1, 2, 3, 4];

    function transform(collection, transFunc) {
        return collection.map(e => transFunc(e));
    }

    var output = transform(numbers, function (num) {
        return num * 2;
    })

    console.log("Original Array:");
    console.log(numbers);
    console.log("New Array");
    console.log(output);
}

function sorting() {
    var arr = [{
        id: 1,
        name: 'John',
    }, {
        id: 2,
        name: 'Mary',
    }, {
        id: 3,
        name: 'Andrew',
    }];

    function sortBy(array, key) {
        if (key == 'name') return array.sort(function (a, b) {
            if (a.name < b.name) return -1;
            else return 1;
        })
        else return array.sort(function (a, b) { return b.key - a.key });
    }

    var sorted = sortBy([...arr], 'name');
    console.log("Displaying arr variable!");
    console.log(arr);
    console.log("Displaying sorted variable!");
    console.log(sorted);
}

function normalization() {
    // Input Object
    var input = {
        '1': {
            id: 1,
            name: 'John',
            children: [
                { id: 2, name: 'Sally' },
                { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
            ]
        },
        '5': {
            id: 5,
            name: 'Mike',
            children: [{ id: 6, name: 'Peter' }]
        }
    };

    function normalizer(inputObject) {
        let obj = Object.values(inputObject);
        return obj.reduce(function (accumulator, item) {
            if (item.children) { // if an element consists of children
                return {
                    ...accumulator, [item.id]: {
                        id: item.id,
                        name: item.name,
                        children: item.children.map(e => e.id)
                    }, ...normalizer(item.children)
                }
            } else return { ...accumulator, [item.id]: item } // if an element doesn't consist of children, then there is no need to run the normalizer on it.
        }, {})
    }

    var output = normalizer(input);

    console.log("Input Object:");
    console.log(input);
    console.log("Output Object:");
    console.log(output);
}

function scatter() {
    var canvas = document.getElementById("scatterPlot");
    canvas.style.display = "block";

    var points = [
        { x: 10, y: 20 },
        { x: 40, y: 40 },
        { x: 60, y: 20 },
        { x: 30, y: 50 },
        { x: 70, y: 60 },
        { x: 10, y: 50 },
        { x: 100, y: 100 },
        { x: 100, y: 30 },
        { x: 180, y: 70 },
        { x: 200, y: 80 }
    ];

    var context = canvas.getContext("2d");
    context.fillStyle = "#db1818";

    points.forEach(function (e) {
        context.beginPath();
        context.arc(e.x, e.y, 4, 0, 2 * Math.PI, true);
        context.fill();
    })
}

function animations() {
    var canvas = document.getElementById("DOManimations");
    canvas.style.display = "block";
    var context = canvas.getContext("2d");
    context.fillStyle = "#db1818";

    var y = 3;
    var direction = 0;
    function drawCircle() {
        if (y >= canvas.height-2) {
            direction = 1;
        }
        if (y <= 2) direction = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(canvas.width / 2, y, 8, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
        if (direction) y -= 1;
        else y += 1;
    }

    setInterval(drawCircle, 20);
}