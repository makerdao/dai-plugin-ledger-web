#!/usr/bin/env bash

rm -rf dist/*
babel -d dist src
cp package.json dist
