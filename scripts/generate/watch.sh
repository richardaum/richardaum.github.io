#!/usr/bin/env sh

graphql-codegen --require dotenv/config --config codegen.yml --silent --watch "src/**/*.graphql"