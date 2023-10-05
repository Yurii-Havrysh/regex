function myJSONParse(jsonString) {
//creating regEx (pattern which helps me find string and parse it into json object)
    const regex = /(".*?"|\d+|\[|\]|\{|\}|\:|\,|true|false|null)/g; 
    const tokens = jsonString.match(regex); 
    let index = 0;
   
    function parseValue() {
        const token = tokens[index++];
//algorithms that parse objects
        if (token === "{") {
            const obj = {};
            let key = parseString();
            while (tokens[index] !== "}") {
                expect(":");
                obj[key] = parseValue();
                if (tokens[index] === ",") {
                    index++;
                    key = parseString();
                }
            }
            index++; 
            return obj;
        }
//algorithms that parse arrays
        if (token === "[") {
            const arr = [];
            while (tokens[index] !== "]") {
                arr.push(parseValue());
                if (tokens[index] === ",") {
                    index++;
                }
            }
            index++; 
            return arr;
        } 
//conditions for different data types
        if (/^"\S*"$/.test(token)) {
            return token.slice(1, -1);
        }

        if (/^true$/.test(token)) {
            return true;
        }

        if (/^false$/.test(token)) {
            return false;
        }

        if (/^null$/.test(token)) {
            return null;
        }

        if (/^-?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(token)) {
            return parseFloat(token);
        }
        throw new SyntaxError("Unexpected token: " + token); //error handle
    } 
//creating string parse function
    function parseString() {
        const token = tokens[index++];
        if (/^"\S*"$/.test(token)) {
            return token.slice(1, -1);
        }
        throw new SyntaxError("Invalid string: " + token); //error handle
    }
//expected tokens. If token is suitable, than we continue walk through array. 
//If not, there is error pointing to unexpected token
    function expect(expectedToken) {
        const token = tokens[index++];
        if (token !== expectedToken) {
            throw new SyntaxError("Expected " + expectedToken + " but found " + token); 
        } ////error handle
    }

    return parseValue();
}
//testing
const jsonString = '{"name": "Dariusz", "surname": "Zieliński", "age": 46, "city": "Gdynia", "married": true}';
const jsonObject = myJSONParse(jsonString);

console.log(jsonObject);




