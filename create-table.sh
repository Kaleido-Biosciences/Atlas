#! /bin/bash

aws dynamodb create-table \
   --table-name atlas-production2 \
   --attribute-definitions AttributeName=experiment_status,AttributeType=S AttributeName=version,AttributeType=N \
   --key-schema AttributeName=experiment_status,KeyType=HASH AttributeName=version,KeyType=RANGE \

aws dynamodb create-table \
   --table-name atlas-staging \
   --attribute-definitions AttributeName=experiment_status,AttributeType=S AttributeName=version,AttributeType=N \
   --key-schema AttributeName=experiment_status,KeyType=HASH AttributeName=version,KeyType=RANGE \
