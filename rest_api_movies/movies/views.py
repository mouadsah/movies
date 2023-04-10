from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from movies.models import Movie, Review, Actor
from .serializers import MovieSerializer, ActorSerializer
from .tasks import my_task

class MovieList(APIView):
    def get(self, request):
        """
        List all movies.
        """
        movies      = Movie.objects.all().order_by('id')
        paginator   = Paginator(movies, 4)
        page_number = request.GET.get('page')
        page_obj    = paginator.get_page(page_number)
        serializer  = MovieSerializer(page_obj, many=True)
        data = {
            "page": page_obj.number,
            "movies": serializer.data,
            "pages": paginator.num_pages,
            "total": paginator.count
        }
        return Response(data)

class MovieDetail(APIView):
    def get(self, request, movie_id):
        """
        Retrieve a movie instance.
        """
        movie       = get_object_or_404(Movie, pk=movie_id)
        serializer  = MovieSerializer(movie)
        return Response(serializer.data)

    def put(self, request, movie_id):
        """
        Update a movie instance.
        """
        movie = get_object_or_404(Movie, pk=movie_id)
        movie.title = request.data.get('title', movie.title)
        movie.description = request.data.get('description', movie.description)
        movie.actors.set(request.data.get('actors', movie.actors))
        movie.save()
        return Response({'success': True, 'message': 'Movie updated successfully.'})

class ReviewAddView(APIView):
    def post(self, request):
        """
        Add a review for a movie.
        """
        # call the Celery task asynchronously
        my_task.delay()
        data = request.data
        movie_id = data.get('id')
        rate = data.get('rate')
        movie = get_object_or_404(Movie, pk=movie_id)
        review = Review.objects.create(grade=rate, movie=movie)
        response_data = {
            'success': True,
            'message': 'Review added successfully.',
            'review': {'id': review.id, 'grade': review.grade, 'movie': review.movie.id}
        }
        return Response(response_data, status=201)

class ActorList(APIView):
    def get(self, request):
        """
        List all actors.
        """
        actors = Actor.objects.all()
        serializer = ActorSerializer(actors, many=True)
        return Response(serializer.data)

class PageNotFound(APIView):
    def get(self, request):
        """
        Return a 404 error response.
        """
        return Response({'code': '404'}, status=404)
