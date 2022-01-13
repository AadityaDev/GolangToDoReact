# GolangToDoReact TodoMVC Example

## Get started

1. Clone source code from github
    ```
    git clone https://github.com/AadityaDev/GolangToDoReact
    cd GolangToDoReact

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
    npm install
    npm run start
    ```
4. Open [http://localhost:3000](http://localhost:3000)
5. Clear backend API
    ```
    docker-compose down --volumes
    ```