from notification import notification_system as NS
from flask import Flask, jsonify, request
from flask_cors import CORS
import ast

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


# For notifying staff
email_notifier = NS.NotificationManager()


@app.route('/send_notification', methods=['POST'])
def send_notification():
    try:
        data = request.json
        staff_id = data.get('staff_id')  # Used to get email in practice, maybe?
        staff_email = data.get('email_address')
        # Depends on how location is determined in the map
        location = {
            "latitude": data.get('latitude'),
            "longitude": data.get('longitude')
        }
        message_type = data.get("message_type")
        subject = f"Alert: {message_type}"
        message = f"An event of type '{message_type}' requires attention at latitude {location['latitude']} and longitude {location['longitude']}."
        response_message = email_notifier.send_email(subject, message, staff_email)
        return jsonify({'message': response_message}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# For populating the pie chart
@app.route('/get_issue_counts', methods=['GET'])
def get_issue_counts():
    issue_counts = {
        'Unattended Baggage': 0,
        'Waste and Clutter': 0,
        'Cleanliness': 0
    }

    with open("stream_counts.txt", "r") as f:
        for line in f:
            _, objects_count_str = line.strip().split(': ', 1)
            objects_count = ast.literal_eval(objects_count_str)
            issue_counts['Unattended Baggage'] += objects_count.get('unattended-baggage', 0)
            issue_counts['Waste and Clutter'] += objects_count.get('waste', 0)
            issue_counts['Cleanliness'] += objects_count.get('debris', 0)

    return jsonify(issue_counts)


# Run the Flask app
if __name__ == '__main__':
    app.run(port=5000)
