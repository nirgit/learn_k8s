# this command sets up your shell to use the Docker daemon inside Minikube, 
# allowing you to build and push images directly to Minikube's Docker registry
# without needing to push them to an external registry first (Docker Hub).
eval $(minikube docker-env)