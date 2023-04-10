import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rest_api_movies.settings")
app = Celery("rest_api_movies")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
