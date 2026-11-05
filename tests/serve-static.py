"""Serve the built export during browser tests; Playwright owns its lifetime."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class StaticServer(ThreadingHTTPServer):
    # Browser cold loads request many fonts and script chunks at once.
    request_queue_size = 128


class StaticHandler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, format, *args):
        pass


root = Path(__file__).resolve().parent.parent / "out"
if not (root / "index.html").is_file():
    raise SystemExit("Build the static export first: corepack yarn build")

handler = partial(StaticHandler, directory=str(root))
with StaticServer(("127.0.0.1", 4173), handler) as server:
    server.serve_forever()
