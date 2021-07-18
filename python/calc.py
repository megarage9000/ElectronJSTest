
# Testing python scripts here
import json
from sys import argv
from calculator.simple import SimpleCalculator

def calc(text):
    """based on the input text, return operational result"""
    try:
        c = SimpleCalculator();
        c.run(text);
        result = str(c.log[-1])
        randomJson = {
            "Name": "John",
            "Occupation": "Petty Crimes",
            "Origin" : "COD lobbies"
        }
        # return json.dumps(randomJson)\
        return c.log[-1]
    except Exception as e:
        print(e)
        return 0.0

if __name__ == '__main__':
    print(calc(argv[1]))