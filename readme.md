# Cheko Tech Assessment 

This project is a Spring Boot application connected to a PostgreSQL database, exposed by a React frontend with VITE, and containerized using Docker Compose.

## How to Run

### Prerequisites
- Docker
- Docker Compose

### Setup

1. add .env file with the following environment variables:

POSTGRES_PASSWORD=
POSTGRES_USER=
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/sdaiaDB


2. Start the containers:

docker-compose up --build

3. Access the application at:

FE: http://localhost:80  
BE: http://localhost:8081  
Api documentation (Swagger): http://localhost:8081/swagger-ui/index.html  

## Notes
The PostgreSQL container automatically imports the SQL dump file from dump.sql on first run.

Ensure ports 80, 5431 and 8081 are available on your machine.

## Resetting
To remove containers and volumes, then rebuild:

docker-compose down -v
docker-compose up --build


## Assumptions
### 1- This is a single restaurant system only that doesn't support multiple restaurants
### 2- The backend is suppose to contain all business logic from filtering locations, to search functionality.  
### 3- The figma design shows an "orders" card, but that seems out of the project scope, so it has been replaced with "others".
### 4- The figma design also show the category count cards to be used as filters, but this differ from the written requirements, and the shown filter button would be considered redundant, so I made the count cards for showing count only.

## Challenges 
### 1- Delivering a complete full-stack application within less than a week while managing a full-time job (9 AM – 6 PM) schedule.

## Implementation Notes
### 1- Due to the tight schedule, I prioritized functionality and frontend design over strict adherence to best practices (FE specially) and NFRs such as performance optimizations.
