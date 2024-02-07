@echo off
rmdir /S /Q src
mkdir src
docker run --rm -v "%CD%":/local swaggerapi/swagger-codegen-cli-v3:3.0.27 generate -i /local/openapi.json -l typescript-angular -o /local/src --additional-properties ngVersion=16.2.0
