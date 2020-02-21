#!/bin/bash

jquery='vendors/jquery.min.js'
ui_kit_js='bootcamp-ui-kit.min.js'
ui_kit_css='bootcamp-ui-kit.min.css'

npm run dist
mkdir -p dependencies
cp ../dist/{$jquery,$ui_kit_js,$ui_kit_css} ./dependencies
python3 -m http.server 1337