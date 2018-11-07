npm run build
cd www
Compress-Archive -Path * -DestinationPath pomice.zip
az webapp deployment source config-zip --resource-group pomice --name pomice --src pomice.zip
