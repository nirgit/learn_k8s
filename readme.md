# Step 1 - Infra setup
1. installing minikube with: `brew install minikube`
2. ensure docker is running on the machine, and set minikube to use docker as its driver: `minikube config set driver docker`
3. the last command makes k8s run inside a container in docker. then start it with: `minikube start` 
4. now that minikube started, we use kubectl to talk to our cluster - run `kubectl get nodes` 
5. run `kubectl config get-contexts` to ensure that our kubectl is talking to the minikube cluster we installed (check where * is pointing at) 

# Step 2 - installing DB 
1. setting up a secret
2. setting a PVC (claiming space on HDD that survives in case of pod crashing/restarting)
3. setting up StatefulSet to run the PGDB container and link it to the PVC

## Secret
1. create the secret with kubectl: `kubectl create secret generic db-secret --from-literal=username=admin --from-literal=password=SuperSecret123`
2. creating PVC with: `kubectl get pvc` to check if there is anything
3. create 1GB file for disk space by creating a new file called `postgres-pvc.yaml` 
4. run the command `kubectl apply -f postgres-pvc.yaml` 
5. run `kubectl get pvc` to make sure it was created

## StatefulSet
this is the actual controller that will run the PGSQL container, fetch the pswd from the secret and plug in the storage from the PVC
- a controller is a background process watching the cluster state making changes to ensure actual state matches desired state
1. creae a file called `postgres-statefulset.yaml`
2. apply the statefulset config with: `kubectl apply -f postgres-statefulset.yaml`
- this tells kubernetes to use posgres:16 image from docker hub (default settings), look in db-secret to set the env vars for the DB, mount the posgres-pvc storage to the exact folder where PG stores its data /var/lib/posgresql/data 
3. lets apply the statefulset config, and run: `kubectl apply -f posgres-statefulset.yaml` 
4. watch the progress with: `kubectl get pods -w`  (should see its READY and STATUS change)
5. verify the connecting to the DB by running `kubectl exec postgres-0 -- env | grep POSTGRES` 
6. congrats you now have a running Posgres DB in your K8S cluster!

## The DB Service
1. create a file called `postgres-service.yaml`
2. apply the config with: `kubectl apply -f postgres-service.yaml` 
3. congrats now you have a postgres service that talks to the DB other Services can connect to
4. you can see it by running: `kubectl get services` (postgres-service should be listed)


# Step 3 - the BE
this is where our application code lives. most importantly we need our BE in K8S know how to talk to our DB serice.
we use service name in order to do that (postgres-service)
we'll thus configure a BE service deployment config.

1. create a file named: `backend-deployment.yaml` 
2. apply the BE deployment: `kubectl apply -f backend-deployment.yaml` 
3. make sure the pod is up (kubectl get pods)
4. once READY you should check if the BE service can reach the DB, run: `kubectl exec <your-backend-pod-name> -- curl -v postgres-service:5432`
5. if postgres answers then everything is working right :)






### links
Gemini converation: https://gemini.google.com/app/6d9520626a6818c5

