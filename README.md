# gokit-todo TodoMVC Example

![GitHub Workflow Status](https://github.com/cage1016/gokit-todo-frontend/workflows/ci/badge.svg)

This is a sample project how to use [cage1016/gokit-todo](https://github.com/cage1016/gokit-todo) as a generic Back End for any prototype or any Front End that needs a simple Back End.

This is a modified version of original [ttu/todomvc-fake-server: Redux TodoMVC example converted to use Fake JSON Server as a Back End](https://github.com/ttu/todomvc-fake-server).

## Get started

1. Clone source code from github
    ```
    git clone https://github.com/cage1016/gokit-todo-frontend.git
    cd gokit-todo-frontend
    ```
2. Prepare backend api
    ```sh
    cat <<EOF >> docker-compose.yaml
    version: '3.1'
    
    networks:
      todo:
        driver: bridge
    
    services:
      todo:
        image: index.docker.io/cage1016/gokit-todo:latest
        depends_on:
          - db
        ports:
          - "10120:10120"
        environment:
          QS_DB_HOST: db
          QS_DB_PORT: 5432
          QS_DB_USER: postgres
          QS_DB_PASS: password
          QS_DB: todo
        restart: on-failure
        networks:
          - todo
      db:
        image: postgres:latest
        restart: always
        environment:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
          POSTGRES_DB: todo
        networks:
          - todo
    EOF

    docker-compose up -d
    ```
3. Start frontend
    ```
    yarn && yarn start
    ```
4. Open [http://localhost:3000](http://localhost:3000)
5. Clear backend API
    ```
    docker-compose down --volumes
    ```