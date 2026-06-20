from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from .db import get_users_collection
from bson import ObjectId

class MongoJWTAuthentication(JWTAuthentication):
    """
    Custom JWT authentication class that validates users against MongoDB
    instead of the default Django User model.
    """
    def get_user(self, validated_token):
        try:
            user_id = validated_token.get('user_id')
            if not user_id:
                raise AuthenticationFailed('Token contained no recognizable user identification')
                
            users = get_users_collection()
            user = users.find_one({'_id': ObjectId(user_id)})
            
            if not user:
                raise AuthenticationFailed('User not found', code='user_not_found')
                
            # Create a minimal user object compatible with DRF
            class MongoUser:
                def __init__(self, id_val):
                    self.id = id_val
                    self.pk = id_val          # DRF uses pk in some checks
                    self.is_authenticated = True
                    self.is_active = True     # Required by DRF permission checks
                    self.is_staff = False
                    self.is_anonymous = False

            return MongoUser(user_id)
            
        except Exception as e:
            raise AuthenticationFailed(str(e))
