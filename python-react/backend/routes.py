from app import app,db
from flask import request,jsonify
from model import Friends
from helper import validate_required_fields

@app.route('/api/friends',methods=["GET"])
def get_friends():
    friends = Friends.query.all();
    result = [friend.to_json()for friend in friends]#list comprehension
    return jsonify(result),200

@app.route('/api/friends', methods=["POST"])
def create_friends():
    try:
        print("starting to create new friend")
        data = request.json

        # Validate required fields
        is_valid, error_message = validate_required_fields(data)
        if not is_valid:
            return jsonify({"msg": error_message}), 400


        name = data.get("name")
        email = data.get("email")
        gender = data.get("gender")
        description = data.get("description")
        role = data.get("role")

        if gender == "male":
            img_url = f"https://avater.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avater.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        print("img_url:", img_url)

        # Create new friend
        new_friend = Friends(
            name=name,
            email=email,  # Include the email field here
            gender=gender,
            role=role,
            description=description,
            img_url=img_url
        )

        db.session.add(new_friend)
        db.session.commit()

        print("new friend created")
        return jsonify(new_friend.to_json()), 201
    except Exception as e:
        db.session.rollback()
        print("error:", str(e))
        return jsonify({"error": str(e)}), 500
@app.route("/api/friends/<int:id>",methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friends.query.get(id)
        if friend is None:
            return jsonify({"msg":"No such Friend"}),404
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg":"Friend deleted successfully"})
            
            
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg":"Internal server Error"})
        
@app.route("/api/friends/<int:id>",methods=["PUT"])
def update_friend(id):
    friend = Friends.query.get(id)
    if(friend is None):
        return jsonify({"msg":"No Such friend found"}),404
    else:
        data = request.json
        is_valid, error_message = validate_required_fields(data)
        if not is_valid:
            return jsonify({"msg": error_message}), 400
        
        friend.name = data.get("name",friend.name)
        friend.email = data.get("email",friend.email)
        friend.gender = data.get("gender",friend.gender)
        friend.role = data.get("role",friend.role)
        friend.description = data.get("description",friend.description)
        db.session.commit()
        return jsonify({"msg":"Friend Updated Successfully"})
        
    
    
    