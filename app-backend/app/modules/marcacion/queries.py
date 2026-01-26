from app.core.database import fetch_all, execute

async def get_marcacion(cusuario: int, finicio: str, ffin: str):
    return await fetch_all(
        """
        select
            date_format(m.fecha, '%%Y-%%m-%%d') as fecha,
            date_format(m.fecha, '%%H:%%i:%%s') as hora
        from marcacion m
        where m.cusuario = %s
        and date(m.fecha) between date(%s) and date(%s)
        order by m.fecha asc
        """,
        (cusuario, finicio, ffin)
    )

async def insertar_marcacion(cusuario: int):
    return await execute(
        """
        insert into marcacion (cusuario, fecha)
        values (%s, now())
        """,
        (cusuario,)
    )

async def actualizar_marcacion(cusuario: int, fecha_anterior: str, fecha_nueva: str):
    return await execute(
        """
        update marcacion
        set fecha = %s
        where cusuario = %s
          and fecha = %s
        """,
        (fecha_nueva, cusuario, fecha_anterior)
    )

async def eliminar_marcacion(cusuario: int, fecha: str, hora: str):
    return await execute(
        """
        delete from marcacion
        where cusuario = %s
          and date_format(fecha, '%%Y-%%m-%%d') = %s
          and date_format(fecha, '%%H:%%i:%%s') = %s
        """,
        (cusuario, fecha, hora)
    )
