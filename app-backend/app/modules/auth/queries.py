from app.core.database import fetch_one

async def get_usuario_by_email(email: str):
    return await fetch_one(
        """
        select
            u.cusuario,
            u.nombre,
            u.apellido,
            u.identificacion,
            u.email,
            u.password_hash,
            u.estado,
            r.nombre as rol
        from usuario u
        inner join usuario_rol ur on ur.cusuario = u.cusuario
        inner join rol r on r.crol = ur.crol and r.estado=1
        where u.email = %s
        """,
        (email,)
    )
