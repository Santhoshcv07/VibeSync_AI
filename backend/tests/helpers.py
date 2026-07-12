import json

async def asgi_request(app, method: str, path: str, headers: dict = None, body: bytes = b""):
    if headers is None:
        headers = {}
    
    # ASGI headers are list of tuples of bytes
    asgi_headers = [(k.lower().encode('latin-1'), v.encode('latin-1')) for k, v in headers.items()]
    
    scope = {
        "type": "http",
        "method": method.upper(),
        "path": path,
        "headers": asgi_headers,
        "query_string": b"",
        "server": ("127.0.0.1", 80),
        "client": ("127.0.0.1", 1234),
        "scheme": "http",
    }
    
    response = {}
    body_chunks = []
    
    async def receive():
        return {"type": "http.request", "body": body}
        
    async def send(message):
        if message["type"] == "http.response.start":
            response["status"] = message["status"]
            # Convert response headers back to dict of strings for easy assertion
            res_headers = {}
            for k, v in message["headers"]:
                res_headers[k.decode('latin-1')] = v.decode('latin-1')
            response["headers"] = res_headers
        elif message["type"] == "http.response.body":
            body_chunks.append(message.get("body", b""))
            
    await app(scope, receive, send)
    
    response_body = b"".join(body_chunks)
    if response_body:
        try:
            response["json"] = json.loads(response_body.decode('utf-8'))
        except json.JSONDecodeError:
            pass
    response["body"] = response_body
    return response
