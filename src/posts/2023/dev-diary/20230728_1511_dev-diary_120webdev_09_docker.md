---
title: "[Dev Diary] 120 Days of WebDev - 9. Docker"
date: 2023-07-28T15:11
thumb: "docker-logo.png"
tags: 
    - ❮Dev Diary❯
    - web development
    - containerization
    - virtualization
---

Since I have studied and covered theoretical background knowledge about containerization, virtualization, and Docker in a DevOps study note already, this will be mostly about an introductory hands-on experience and knowledge.

---

# 1. Docker 

## 1-1. Introduction

### Prerequisites
1. Install [Docker Engine](https://docs.docker.com/engine/install/ubuntu/).
2. Install [Docker Desktop](https://docs.docker.com/desktop/install/linux-install/) for GUI convenience.

### Pull and Run a Docker Image

1. Pull a sample image from Docker Hub.
    ```
    $ docker pull docker/getting-started
    ```
2. Run the image as a container.
    ```
    $ docker run -d -p 80:80 docker/getting-started
    ```
3. Access to the running container.
    - Go to http://localhost:80 then you'll see Getting Started website running locally.
    - Run `curl http://localhost:80` to see the actual data.

### Docker Commands
- `docker images`
    - List all installed Docker images.
- `docker ps` 
    - = `docker container`
    - List running Docker containers.
    - Options
        - `-a`  
            - List all containers.
- `docker create [OPTIONS] [IMAGE] [COMMAND]`
    - Docker create command creates a fresh new container from a docker image. However, it doesn’t run it immediately.
- `docker start [OPTIONS] [CONTAINER]`
    - Docker start command will start any stopped container. If you used docker create command to create a container, you can start it with this command.
- `docker run [OPTIONS] [IMAGE] [COMMAND]`
    - Docker run command is a combination of create and start as it creates a new container and starts it immediately. 
    - The docker run command can even pull an image from Docker Hub if it doesn’t find the mentioned image on your system.
    - Options
        - `--detach` 
            - = `-d`
            - Run container in background and print container ID
        - `--publish [host_port]:[container_port]` 
            - = `-p [host_port]:[container_port]`
            - Publish a container’s port(s) to the host
            - e.g. If we wanted to expose port 8080 inside the container to port 3000 outside the container, we would pass 3000:8080 to the --publish flag.
        - `--interactive` 
            - = `-it`
            - This command it takes you straight inside the container.
        - `--name [container_name]`
            - Name the container.
        - `--env`
            - = `-e`
            - Set environment variables.
- `docker restart [OPTIONS] [CONTAINER]`
    - Restart the container.
- `docker rm [CONTAINER]` 
    - = `docker container rm [CONTAINER]`
    - Remove the container.
- `docker rmi [IMAGE]` 
    - = `docker image rm [IMAGE]`
    - Removes (and un-tags) one or more images from the host node.
    - If `Error response from daemon: conflict: unable to remove repository reference "image_name"` happens,
        - List all containers by using `docker container ls -a`.
        - Remove all idle containers that are using the image, one-by-one.
        - Remove the image.
- `docker stop [OPTIONS] [CONTAINER]`
    - The docker stop commands issue the SIGTERM signal.
        - SIGTERM gracefully terminates a process rather than killing it immediately.
        - SIGTERM allows a child process or parent process the opportunity to send information to other processes.
    - If the command fails to terminate a process within the specified timeout, the Docker issues a kill command implicitly and immediately. 
- `docker kill [OPTIONS] [CONTAINER]`
    - The docker kill commands sends the SIGKILL signal.
        - It is not possible to handle, ignore or block a SIGKILL signal
        - The killed child process doesn't get to notify its parent that it received the kill signal. 
            - It might create zombie processes.
    - The docker kill command causes an unsafe exit.
    - The container needs some time to shut down completely.
- `docker exec [OPTIONS] [CONTAINER] [COMMAND]`
    - The docker exec command runs a new command in a running container.
    - e.g. `docker exec -it my-container /bin/sh`
- `docker build [OPTIONS] [PATH] [URL]`
    - The docker build command builds Docker images from a Dockerfile and a “context”. 
        - A build’s context is the set of files located in the specified PATH or URL.
- `docker push [OPTIONS] [NAME][:TAG]`
    - Upload an image to a registry
    - To build and push an image,
        1. `docker build -t [user_name]/[image_name][:version]`
        2. `docker push [user_name]/[image_name][:version]`

## 1-2. Dockerfile

### Build a Docker Image using Dockerfile
- Dockerfile instruction components
    - `#`
        - Comment
    - `FROM`
        - Set the base image
    - `MAINTAINER`
        - Image creator description
    - `LABEL`
        - Metadata in key-value pairs
    - `RUN`
        - Execution commands for building a container
    - `COPY`
        - Copy host files upon building a container
    - `ADD`
        - Copy files from the local storage to a destination in the Docker image. 
        - Copy a tarball from the local storage and extract it automatically inside a destination in the Docker image.
        - Copy files from a URL to a destination inside the Docker image.
    - `WORKDIR`
        - The working directory for commands to be fired upon building a container
    - `ENV`
        - Environment variables
    - `USER`
        - Set the user for container and commands, root by default
    - `VOLUME`
        - Mount a specific directory inside the container, to the external path
    - `EXPOSE`
        - Set a port exposed outside the container
    - `CMD`
        - Services and scripts to run automatically upon running a container
    - `ENTRYPOINT`
        - Configure the executables that will always run after the container is initiated

## 1-3. Docker-compose
- Build multiple Docker images and run multiple Docker containers at once
- Configure multiple containers by using *docker-compose.yaml* file

## 1-4. Hands-on 

### Build and Run a Flask App
1. Write a Dockerfile.
    ```
    # Uses a minimal "alpine" Docker image based on Alpine Linux,
    # with a complete package index and only 5 MB in size
    FROM python:3.8-alpine

    # Copy all files into /app
    COPY . /app
    
    # Working directory would be /app
    WORKDIR /app

    # Install Flask upon building the container
    RUN pip3 install flask

    # Also, give app.py an execution permission
    RUN chmod +x /app/app.py

    # When the container runs, execute app.py
    CMD ["python3", "app.py"]
    ```
2. Build an image using Dockerfile.
    ```
    $ docker build -t flask-app
    ```
3. Run the image as container.
    ```
    $ docker run –d –p 5000:5000 flask-app
    ```

### Pull MySQL 8.0 from Docker Hub and Run
1. Search MySQL.
    ```
    $ docker search mysql --limit 5
    ```
2. Pull MySQL automatically and run.
    ```
    $ docker run -d -p 3306:3306 \
        --name docker-mysql \
        mysql:8.0 \
        -e MYSQL_ALLOW_EMPTY_PASSWORD=true
    ```
    - The docker run command can even pull an image from Docker Hub if it doesn’t find the mentioned image on your system.
3. Check the status.
    ```
    $ docker images
    $ docker ps
    ```
4. Run Bash inside the container. Alternatively you can use Docker Desktop GUI as well.
    ```
    $ docker exec -it docker-mysql bash
    ```
5. Run MySQL.
    ```
    $ mysql -u root -p
    ```

## 1-5. Protips

### Making Docker Image Compact
- Pick the most lightweight base image.
    - e.g.
        - Alpine
        - Debian slim
        - Debian buster
- Minimize image layer count.
    - A Docker build consists of a series of ordered build instructions. 
    - Each instruction in a Dockerfile roughly translates to an image layer.
    - Less layers, more compact.
- Reorder Dockerfile instructions efficiently.
    - The order of Dockerfile instructions matter.
        - When you run a build, the builder attempts to reuse layers from earlier builds by caching layers.
    - Ordering your Dockerfile instructions appropriately helps you avoid unnecessary work at build time.
        - e.g. 
            - Copy dependency tracker first, and then run download, and then copy all files. So that only actual changes in dependencies are performed.
            - Put frequently-changing instructions and operations at the bottom of the Dockerfile.
- Download, keep, and use necessary dependencies only.
    - e.g. Remove unused dependencies using `npm prune`
- Use multi-stage build.
    - In a Dockerfile, a build stage is represented by a FROM instruction. 
        - One build stage means that the final image is bloated with resources used to compile the program.
    - Using multi-stage builds, you can choose to use different base images for your build and runtime environments.
        - You can copy build artifacts from the build stage over to the runtime stage.