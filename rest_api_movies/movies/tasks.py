from celery import shared_task
import time

@shared_task
def my_task():
    time.sleep(10)
    # do some long-running task here