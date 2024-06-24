FROM python:3.11

WORKDIR /

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
RUN ["python"."authtutorial/manage.py","migrate"]
CMD ["python", "authtutorial/manage.py", "runserver"]
