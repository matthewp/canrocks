#!/bin/sh
COMMIT=`git rev-list -n1 master`
ssh -i key.priv $SERVER -oStrictHostKeyChecking=no bin/update_canrocks $COMMIT
