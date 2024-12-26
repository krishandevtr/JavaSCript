from app import db
class Friends(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100),nullable=False)
    email = db.Column(db.String(100),nullable=False)
   # date_of_birth = db.Column(db.String(10))
    description = db.Column(db.Text,nullable=False)
    gender = db.Column(db.String(10),nullable=False)
    img_url = db.Column(db.String(200),nullable=True)
    role = db.Column(db.String(100),nullable=False)

    def to_json(self):
        return {
            "id":self.id,
            "role":self.role,
            "gender":self.gender,
            "imgUrl":self.img_url,
            "name":self.name,
            "description":self.description,
            "email":self.email
            
        }
