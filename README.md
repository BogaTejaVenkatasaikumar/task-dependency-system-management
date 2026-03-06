Task Dependency System Management

A full-stack task management system that allows users to create tasks and define dependencies between them. The system represents tasks as a directed graph and determines the correct execution order using topological sorting while preventing circular dependencies.

Tech Stack

- Backend: Django / Django REST Framework
- Frontend: React / JavaScript
- Database: SQLite

Features

- Create and manage tasks
- Define task dependencies
- Detect circular dependencies
- Visualize task relationships

Run the Project

Backend:

python manage.py runserver

Frontend:

cd task-frontend
npm install
npm start
