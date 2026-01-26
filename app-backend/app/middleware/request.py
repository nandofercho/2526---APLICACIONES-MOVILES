from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

class LogRequestMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):

        body = None

        if request.method in ("POST", "PUT", "PATCH"):
            try:
                body_bytes = await request.body()
                if body_bytes:
                    body = body_bytes.decode("utf-8")
            except Exception:
                body = "no se pudo leer body"

        print("---- REQUEST ----")
        print("method:", request.method)
        print("url:", request.url.path)
        if body:
            print("body:", body)
        print("-----------------")

        response = await call_next(request)
        return response
