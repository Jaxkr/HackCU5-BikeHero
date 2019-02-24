import falcon
import requests
import json


url = 'https://twist.com/api/v3/integration_incoming/post_data?install_id=89452&install_token=89452_8ebd08efb318171f88204d65ef536dbe'
class NotifyParents(object):
    def on_post(self, req, resp):
        request_data = json.loads(req.stream.read())

        r = requests.post(url, json= {"content": request_data['content']})
        print(r)

        resp.body = 'hi'



        

# Middleware
class RequireJSON(object):
    def process_request(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.content_type = 'application/json'


app = falcon.API(middleware=[RequireJSON()])
app.add_route('/notify', NotifyParents())