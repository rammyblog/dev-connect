import hashlib
import requests


def get_gravatar_image_url(email):
    # Set your variables here
    default = "https://res.cloudinary.com/rammy/image/upload/ar_4:3,c_fill/c_scale,w_auto,dpr_auto/v1589578218/default_avatar.png"
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
