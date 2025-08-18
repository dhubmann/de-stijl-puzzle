# De Stijl Puzzle

A minimalist **grid-based puzzle game** inspired by the De Stijl art movement.  
The goal: turn all colored cells white by rotating them and their neighbors in a specific sequence.

---

## Gameplay

- **Grid**: adjustable from 4×4 to 9x9
- **Colors**: Red → Blue → Yellow → White  
- **Click mechanics**: Clicking a cell rotates the color of that cell and its four neighbors (up, down, left, right).  
- **Goal**: Make all cells white.

---

## Project Architecture

This project is structured as a set of microservices (for personal practice purposes).

- **Frontend (port 3000)** → Game UI  
- **User Service (port 3001)** → Handles registration & login 
- **Game Service (port 3002)** → Handles game logic 
- *(Further services can be added later)*

---

## Run with Docker

Make sure Docker and Docker Compose are installed. Then:

git clone https://github.com/dhubmann/de-stijl-puzzle.git

cd de-stijl-puzzle

# Build and start all services
docker-compose up --build
