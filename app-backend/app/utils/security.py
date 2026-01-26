import bcrypt

def verify_password(password_plain: str, password_hash: str) -> bool:
    return bcrypt.checkpw(
        password_plain.encode(),
        password_hash.encode()
    )
