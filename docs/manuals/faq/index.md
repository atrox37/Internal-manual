---
outline: deep
---

# FAQ and Troubleshooting

## The page has no data and device Update Time does not change

Please check in order:

1. Refresh the page (F5)
2. Switch to another menu and switch back
3. Check whether the top bar can jump to the alarm page (verifies base routing)
4. Ask the administrator to check:
   - Whether the backend service is normal
   - Whether the WebSocket push source is normal
   - Whether devices/channels are online

It is recommended to provide the administrator with:

- The page where the issue occurs (e.g., Devices > PV > Value Monitoring)
- The time the issue occurred
- Whether all devices have no data or only a specific type has no data

## After logging in, you are redirected back to the login page

Possible causes:

- Account expired or password incorrect
- Token refresh failed Suggestions:
- Log in again
- If it still fails, contact the administrator to reset the account
