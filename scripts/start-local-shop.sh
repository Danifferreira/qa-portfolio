#!/usr/bin/env bash
# Starts the private copy of the demo shop and waits until the API and the site answer.
# Exit code 0 means the shop is ready for the tests.
set -u

COMPOSE="docker compose -f docker/shop-compose.yml"

wait_for() {
  local url="$1" label="$2" tries="$3"
  for attempt in $(seq 1 "$tries"); do
    code=$(curl -s -o /dev/null -w "%{http_code}" -m 10 "$url" || echo 000)
    if [ "$code" = "200" ]; then
      echo "$label ready (HTTP 200, attempt $attempt)"
      return 0
    fi
    sleep 5
  done
  echo "$label did not answer at $url (last HTTP $code)"
  return 1
}

$COMPOSE up -d --quiet-pull || exit 1

# The database needs a few seconds before the API can create the tables and the demo data.
for attempt in $(seq 1 24); do
  if $COMPOSE exec -T laravel-api php artisan migrate:fresh --seed --force; then
    seeded=true
    break
  fi
  echo "Database not ready yet (attempt $attempt)"
  sleep 5
done
if [ "${seeded:-false}" != "true" ]; then
  echo "Could not load the demo data"
  $COMPOSE logs --tail 50
  exit 1
fi

wait_for "http://localhost:8091/products?page=1" "API" 36 || { $COMPOSE logs --tail 50; exit 1; }
wait_for "http://localhost:4200/" "Site" 60 || { $COMPOSE logs --tail 50 angular-ui; exit 1; }
