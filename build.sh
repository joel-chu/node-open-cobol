#!/usr/bin/env bash

# Build docker image script 

read -p 'Enter the username: ' username 
read -p 'enter the dockerfile name: ' dockerfile 

if [ -z username ] || [ -z dockerfile ]; then
	echo "We need to know your username and the target dockerfile name"
	exit 1
else 
	echo "docker build -i $username/ubuntu-node-open-cobol ./$dockerfile . (For reference only)"
fi


# if [ -z $1 ] || [ -z $2 ]; then 
#	echo "Expect two parameter"
#	exit 1
#else
#	echo "$1 and $2"
#fi

# docker build -t joeljiezhu/$1 ./$2 .
