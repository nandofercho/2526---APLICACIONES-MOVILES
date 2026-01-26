import aiomysql
from typing import Optional

_pool: Optional[aiomysql.Pool] = None

async def init_db_pool(host, port, user, password, db):
    global _pool
    _pool = await aiomysql.create_pool(
        host=host,
        port=port,
        user=user,
        password=password,
        db=db,
        autocommit=True,
        charset="utf8mb4",
        minsize=1,
        maxsize=10
    )

async def close_db_pool():
    global _pool
    if _pool:
        _pool.close()
        await _pool.wait_closed()
        _pool = None


async def fetch_one(query: str, params: tuple = ()):
    if not _pool:
        raise RuntimeError("pool no inicializado")

    async with _pool.acquire() as conn:
        async with conn.cursor(aiomysql.DictCursor) as cur:
            await cur.execute(query, params)
            return await cur.fetchone()
