from flask import Flask, jsonify
import detect

# Create a Flask app instance
app = Flask(__name__)

# Define a route that will return the num_persons variable
@app.route('/get_num_persons', methods=['GET'])
def get_num_persons():
    with open("num_persons.txt", "r") as f:
        num_persons = f.read()
    return jsonify({'num_persons': num_persons})


# Run the Flask app
if __name__ == '__main__':
    app.run(port=5000)