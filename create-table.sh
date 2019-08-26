#! /bin/bash

aws dynamodb create-table \
   --table-name atlas-production \
   --attribute-definitions AttributeName=experiment,AttributeType=S AttributeName=status,AttributeType=S \
   --key-schema AttributeName=experiment,KeyType=HASH AttributeName=status,KeyType=RANGE \

aws dynamodb create-table \
   --table-name atlas-development \
   --attribute-definitions AttributeName=experiment,AttributeType=S AttributeName=status,AttributeType=S \
   --key-schema AttributeName=experiment,KeyType=HASH AttributeName=status,KeyType=RANGE \
