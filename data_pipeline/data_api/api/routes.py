from flask import Blueprint, jsonify, request

import api.tests.fake_data as fake_data
import redis
from api.errors import error_response
from api.models import Candidate, db

data_bp = Blueprint("data_bp", "api", url_prefix="/open-disclosure/api/v1.0")
r = redis.Redis()
r.mset({"total_contributions": 10000})


@data_bp.route("/", methods=["GET"])
def home():
    return "<h1>Welcome to the Open Disclosure API</p>"


@data_bp.route("/scrape", methods=["GET"])
def init_scraper():
    from data_pipeline.scraper import scraper

    return jsonify("scraper process finished")


@data_bp.route("/total-contributions", methods=["GET"])
def get_total_contributions():
    return jsonify(r.get("total_contributions").decode("utf-8"))


@data_bp.route("/candidates", methods=["GET"])
def get_candidates():
    candidates = Candidate.query.all()
    # return jsonify(candidate_list=[i.serialize() for i in candidates])
    return jsonify(fake_data.get_candidates_shape())


@data_bp.route("/committees", methods=["GET"])
def get_committees():
    return jsonify(fake_data.get_committees_shape())


@data_bp.route("/elections", methods=["GET"])
def get_elections():
    return jsonify(fake_data.get_elections_shape())


@data_bp.route("/referendums", methods=["GET"])
def get_referendums():
    return jsonify(fake_data.get_referendums_shape())


@data_bp.route("/metadata", methods=["GET"])
def get_metadata():
    return jsonify(fake_data.get_metadata_shape())


@data_bp.route("/candidates", methods=["POST"])
def create_candidate():
    data = request.get_json()
    if "name" not in data:
        return error_response(400, "Name not found")
    candidate_name = data["name"]
    candidate = Candidate.query.filter_by(name=candidate_name).first()
    status_code = 200
    if not candidate:
        candidate = Candidate(name=candidate_name)
        db.session.add(candidate)
        db.session.commit()
        status_code = 201
    return jsonify(candidate.serialize()), status_code


@data_bp.route("/candidates/<string:candidate_name>", methods=["GET"])
def get_by_candidate(candidate_name):
    candidate = Candidate.query.filter_by(name=candidate_name).first()
    if not candidate:
        return error_response(404, "Candidate not found")
    return jsonify(candidate.serialize()), 200
