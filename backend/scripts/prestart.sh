#! /usr/bin/env bash

set -e
set -x

# Establish ollama connection and pull model
python app/pre_start.py