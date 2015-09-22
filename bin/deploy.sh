#!/bin/sh
COMMIT=`git rev-list -n1 master`
ssh -i key.priv $SERVER bin/update_canrocks $COMMIT
