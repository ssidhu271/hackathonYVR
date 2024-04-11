from flask import Flask, jsonify
from flask_cors import CORS

# Create a Flask app instance
app = Flask(__name__)

# Create a Flask app instance
app = Flask(__name__)
CORS(app)

# Define a route that will return the num_persons variable
@app.route('/get_counts', methods=['GET'])
def get_counts():
    counts = {}
    with open("stream_counts.txt", "r") as f:
        for line in f:
            stream_id, objects_count_str = line.strip().split(': ', 1)
            counts[stream_id] = eval(objects_count_str)
    return jsonify(counts)


# Run the Flask app
if __name__ == '__main__':
    app.run(port=5000)