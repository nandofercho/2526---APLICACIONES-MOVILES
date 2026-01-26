import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # BASE DATOS
    db_host = os.getenv("db_host")
    db_port = int(os.getenv("db_port", 3306))
    db_user = os.getenv("db_user")
    db_password = os.getenv("db_password")
    db_name = os.getenv("db_name")

    # JWT TOKEN
    jwt_secret = os.getenv("jwt_secret")
    jwt_algorithm = os.getenv("jwt_algorithm", "HS256")
    jwt_exp_minutes = int(os.getenv("jwt_exp_minutes", 60))

settings = Settings()
