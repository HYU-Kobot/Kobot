from django.shortcuts import render
from django.http import HttpResponse

def index(request):
	message = request.GET.get('abc')
	print(message)

	return HttpResponse("backtest")


# Create your views here.
