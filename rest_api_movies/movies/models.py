from django.db import models

# Create your models here.

class Movie(models.Model):
    title       = models.CharField(max_length=100)
    image       = models.CharField(max_length=100, null=True)
    description = models.TextField(blank=True, null=True) #description
    actors      = models.ManyToManyField('Actor', related_name='movies')
    release_date  = models.CharField(max_length=100)

    def __str__(self):
        #return the movie title
        return self.title
    

class Actor(models.Model):
    first_name = models.CharField(max_length=100)
    last_name  = models.CharField(max_length=100)
    
    def __str__(self):
        #return the actor first_name
        return self.first_name
    

class Review(models.Model):
    grade = models.FloatField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    
    def __str__(self):
        #return the review grade
        return str(self.grade)
    
