import json

from api.main import app

print(json.dumps(app.openapi(), indent=2, ensure_ascii=False))
