#!/bin/sh
touch .env
echo "GITHUB_CLI_ID=$GITHUB_CLI_ID" > .env
echo "GITHUB_CLI_SEC=$GITHUB_CLI_SEC" >> .env