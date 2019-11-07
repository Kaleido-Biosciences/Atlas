#! /bin/bash

aws dynamodb create-table \
   --table-name atlas-production \
   --attribute-definitions AttributeName=experiment_status,AttributeType=S AttributeName=version,AttributeType=N \
   --key-schema AttributeName=experiment_status,KeyType=HASH AttributeName=version,KeyType=RANGE \

# Uncomment below if using a staging environment
# aws dynamodb create-table \
#   --table-name atlas-staging \
#   --attribute-definitions AttributeName=experiment_status,AttributeType=S AttributeName=version,AttributeType=N \
#   --key-schema AttributeName=experiment_status,KeyType=HASH AttributeName=version,KeyType=RANGE \
