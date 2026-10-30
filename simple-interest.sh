#!/usr/bin/env bash

set -euo pipefail

read -r -p "Principal: " principal
read -r -p "Rate of Interest (%): " rate
read -r -p "Time Period: " time

if ! awk -v principal="$principal" -v rate="$rate" -v time="$time" 'BEGIN {
    number = "^[0-9]+([.][0-9]*)?$|^[.][0-9]+$"
    if (principal !~ number || rate !~ number || time !~ number) {
        exit 1
    }
    printf "Simple Interest: %.2f\n", (principal * rate * time) / 100
}'; then
    printf '%s\n' "Error: principal, rate, and time must be non-negative numbers." >&2
    exit 1
fi
