from flask import render_template
import config
from models import Owner, Pet, Vet, Appointment
from flask_cors import CORS, cross_origin

app = config.connex_app
app.add_api(config.basedir / "swagger.yml")
CORS(app.app)
app.app.config['CORS_HEADERS'] ='Content-Type'

@app.route('/')
@cross_origin()
def home():
    owners = Owner.query.all()
    pets = Pet.query.all()
    vets = Vet.query.all()
    appointments = Appointment.query.all()
    return {owners, pets, vets, appointments}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)