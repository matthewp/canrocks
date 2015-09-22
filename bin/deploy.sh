#!/bin/sh
COMMIT=`git rev-list -n1 master`
chmod 0600 key.priv
ssh -i key.priv matthew@$SERVER -oStrictHostKeyChecking=no bin/update_canrocks $COMMIT
