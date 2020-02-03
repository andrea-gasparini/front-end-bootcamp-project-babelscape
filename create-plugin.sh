#!/bin/bash

plugin=$1

if [ -z "$plugin" ]
then
      echo "Missing plugin name."
      exit -1;
fi

plugin=`echo "$plugin" | tr '[:upper:]' '[:lower:]'`
className=${plugin[@]^}
mkdir src/$plugin

touch src/$plugin/$plugin.ts
echo "export default class $className{}" > src/$plugin/$plugin.ts

touch src/$plugin/$plugin-configuration.ts
echo "export default class ${className}Configuration{}" > src/$plugin/$plugin-configuration.ts

touch src/$plugin/$plugin.scss