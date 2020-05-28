import hashlib
import requests


def get_gravatar_image_url(email):
    # Set your variables here
    default = "https://www.gravatar.com/avatar/5e8ad5373a9845922914fbbf9bb2e8e0?s=200"
    size = 200
    base_url = "https://www.gravatar.com/avatar/"

    # construct the url
    email_hash = hashlib.md5(email.lower().encode('utf-8')).hexdigest()
    gravatar_url = f"{base_url}{email_hash}?s={size}"

    url_request = requests.get(gravatar_url, params={
        'd': 404,
        's': str(size)
    })

    if url_request.status_code != 200:
        return default

    return gravatar_url
