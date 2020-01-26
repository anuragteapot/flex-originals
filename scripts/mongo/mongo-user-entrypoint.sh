#!/bin/bash
set -e;
echo '-------------------------Creating new user.---------------------'

# a default non-root role
MONGO_NON_ROOT_ROLE="${MONGO_NON_ROOT_ROLE:-readWrite}"

if [ -n "${APP_MONGO_USER:-}" ] && [ -n "${APP_MONGO_PASS:-}" ]; then
	"${mongo[@]}" "$APP_MONGO_DB" <<-EOJS
		db.createUser({
			user: $(_js_escape "$APP_MONGO_USER"),
			pwd: $(_js_escape "$APP_MONGO_PASS"),
			roles: [ { role: $(_js_escape "$MONGO_NON_ROOT_ROLE"), db: $(_js_escape "$APP_MONGO_DB") } ]
			})
	EOJS
else
	# print warning or kill temporary mongo and exit non-zero
fi