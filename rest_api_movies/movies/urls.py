from django.urls import path
# from movies import views
from .views import MovieList, MovieDetail, ActorList, ReviewAddView

# define the urls
urlpatterns = [
    path('movies/', MovieList.as_view(), name='movie-list'),
    path('movies/<int:movie_id>/', MovieDetail.as_view(), name='movie-detail'),
    path('actors/', ActorList.as_view(), name='actor-list'),
    path('reviews/add/', ReviewAddView.as_view(), name='review-add'),
]