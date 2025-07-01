@echo off

dotnet publish -r linux-x64 --sc -p:PublishSingleFile=True -o Output
ssh multicrabe sudo systemctl stop lacaverne.service
scp Output/LaCaverneBackend multicrabe:/srv/lacaverne/LaCaverneBackend
ssh sudo chmod +x /srv/lacaverne/LaCaverneBackend
ssh multicrabe sudo systemctl enable --now lacaverne.service