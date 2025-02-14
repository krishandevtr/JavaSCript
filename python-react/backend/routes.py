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
        print("starting to create new friend")
        print(request.get_json())
        data = request.get_json()
        print(data)

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
        print("Internal server Error:", str(e))
        return jsonify({"Internal server Error": str(e)}), 500
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
        
@app.route("/api/friends/<int:id>", methods=["PATCH"])
def update_friend(id):
    print("Hit the Update route")
    friend = Friends.query.get(id)
    
    if friend is None:
        print("Not found the friend")
        return jsonify({"msg": "Friend not found"}), 404
    else:
        print("Found friend, proceeding with update")
        data = request.json
        # Update fields only if provided
        print("Updating friend fields")
        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        
        db.session.commit()
        print("Committed the changes")
        
        # Refresh friend from database after commit to get updated values
        updated_friend = Friends.query.get(id)
        
        # Return updated friend data in JSON format
        return jsonify(updated_friend.to_json()), 200

@app.route("/api/friends/*",methods=["GET","POST","DELETE","PATCH"])
def error():
    return jsonify({"msg":"Invalid Request"}),400
    
    
    