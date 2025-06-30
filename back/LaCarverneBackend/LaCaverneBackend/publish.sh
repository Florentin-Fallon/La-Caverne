#!/bin/sh

dotnet publish -r linux-x64 --sc -p:PublishSingleFile=True -o Output
scp Output/LaCaverneBackend vps:/srv/lacaverne/LaCaverneBackend