# step 1 - Infra setup
1. installing minikube with: `brew install minikube`
2. ensure docker is running on the machine, and set minikube to use docker as its driver: `minikube config set driver docker`
3. the last command makes k8s run inside a container in docker. then start it with: `minikube start` 
4. now that minikube started, we use kubectl to talk to our cluster - run `kubectl get nodes` 
5. run `kubectl config get-contexts` to ensure that our kubectl is talking to the minikube cluster we installed (check where * is pointing at) 

# step 2 - installing DB 
1. 
