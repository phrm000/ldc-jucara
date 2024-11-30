#!/bin/bash

# Check if the name input is provided
if [ -z "$INPUT_NAME" ]; then
  echo "Hello, World!"
else
  echo "Hello, $INPUT_NAME!"
fi