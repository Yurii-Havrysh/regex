function myJSONParse(jsonString) {
    const stack = [];
    let currentObject = null;
    let key = null;

    const regex = /(".*?"|\d+|\[|\]|\{|\}|\:|\,|true|false|null)/g;
    const tokens = jsonString.match(regex) || [];

    tokens.forEach(token => {
        if (token === '{') {
            if (currentObject) {
                stack.push(currentObject);
                stack.push(key);
            }
            currentObject = {};
            key = null;
        } else if (token === '}') {
            const prevKey = stack.pop();
            const prevObject = stack.pop();

            if (prevObject instanceof Array) {
                prevObject.push(currentObject);
                currentObject = prevObject;
            } else if (prevObject) {
                prevObject[prevKey] = currentObject;
                currentObject = prevObject;
            }
        } else if (token === '[') {
            if (currentObject) {
                stack.push(currentObject);
                stack.push(key);
            }
            currentObject = [];
            key = null;
        } else if (token === ']') {
            const prevKey = stack.pop();
            const prevObject = stack.pop();

            if (prevObject) {
                prevObject[prevKey] = currentObject;
                currentObject = prevObject;
            }
        } else if (token === ':') {
        } else if (token === ',') {
        } else {
            const parsedValue = JSON.parse(token);
            if (key === null) {
                key = parsedValue;
            } else {
                if (currentObject instanceof Array && typeof key === 'string') {
                    const obj = {};
                    obj[key] = parsedValue;
                    currentObject.push(obj);
                } else if (key) {
                    currentObject[key] = parsedValue;
                    key = null;
                }
            }
        }
    });

    if (currentObject === null) {
        throw new SyntaxError('Unexpected end of input');
    }

    return currentObject;
}

const jsonString = `{
    "id": "647ceaf3657eade56f8224eb",
    "index": 10,
    "negativeIndex": -10,
    "anEmptyArray": [],
    "notEmptyArray": [1, 2, 3,"string", true, null],
    "boolean": true,
    "nullValue": null,
    "nestedObject": {
        "nestedString": "Hello World",
        "nestedNumber": 42,
        "nestedArray": [true, false]
    },
    "complexArray": [
        {
            "name": "Alice Alice",
            "age": 28,
            "hobbies": ["Reading", "Painting"]
        },
        {
            "name": "Bob Bob",
            "age": 32,
            "hobbies": ["Gaming", "Cooking"]
        }
    ]
}`;

try {
    const jsonObject = myJSONParse(jsonString);
    console.log(jsonObject);
} catch (error) {
    console.error(error.message);
}




