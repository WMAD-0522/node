- Install Docker: To use Docker, you first need to install it on your computer. The installation process depends on your operating system, but there are detailed instructions available on the Docker website.

- Pull a Node image: Docker images are pre-configured environments that you can use to run your applications. To run a Node environment, you need to pull a Node image from a registry such as Docker Hub. For example, to pull the latest version of the Node image, you can run the following command:

```bash
docker pull node
```

- Run a Container: After you have the Node image, you can use it to run a Docker container. The following command will run a container in the background and map port 8080 on the host to port 8080 in the container:

```bash
docker run -d -p 8080:8080 node
```
- Start a Shell in the Container: To start a shell in the container, you can use the following command:

```bash
docker exec -it <container_id> /bin/bash
```
This will give you a command-line interface to the container where you can run Node commands, install packages, and run your application.

- Stop the Container: To stop the container, you can use the following command:

```bash
docker stop <container_id>
```

- Remove the Container: To remove the container, you can use the following command:

```bash
docker rm <container_id>
```
