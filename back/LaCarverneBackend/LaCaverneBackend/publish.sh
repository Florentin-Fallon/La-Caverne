#!/bin/sh

dotnet publish -r linux-x64 --sc -p:PublishSingleFile=True -o Output
ssh vps sudo systemctl stop lacaverne.service
scp Output/LaCaverneBackend vps:/srv/lacaverne/LaCaverneBackend
ssh vps sudo systemctl enable --now lacaverne.service