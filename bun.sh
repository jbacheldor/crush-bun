#!/bin/bash
# aws lambda deployment !!
# https://bun.com/docs/guides/deployment/aws-lambda

# build docker file
docker build --provenance=false --platform linux/amd64 -t crush-bun-docker-aws:latest .

# create ecr repository in us-east-1
export ECR_URI=$(aws ecr create-repository --repository-name crush-bun-docker-aws --region us-east-1 --query 'repository.repositoryUri' --output text)
echo $ECR_URI

# log into ecr
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_URI

# tag docker image locally
docker tag crush-bun-docker-aws:latest ${ECR_URI}:latest

# push docker image url to aws
docker push ${ECR_URI}:latest

#then after go and do a bunch of things in aws