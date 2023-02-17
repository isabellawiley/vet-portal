from flask import render_template
import config
from models import Owner, Pet, Vet, Appointment, owner_schema
from flask_cors import CORS, cross_origin
import json
from flask import request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

app = config.connex_app
app.add_api(config.basedir / "swagger.yml")
CORS(app.app)
app.app.config['CORS_HEADERS'] ='Content-Type'

@app.app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    owner = Owner.query.filter("email" == email)
    print("owner" , owner_schema.dump(owner))
    ow2 = Owner.query.get(1)
    print("owner2" , owner_schema.dump(ow2))
    # owner_obj = owner_schema.dump(owner)
    if email != "iw@gmail.com" or password != "pass123":
        return {"msg": "Wrong email or password"}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response

@app.route('/logout', methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/')
@jwt_required()
@cross_origin()
def home():
    owners = Owner.query.all()
    pets = Pet.query.all()
    vets = Vet.query.all()
    appointments = Appointment.query.all()
    response_body = {
        "owners": owners,
        "pets": pets,
        "vets": vets,
        "appointments": appointments
    }
    return jsonify(response_body)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)