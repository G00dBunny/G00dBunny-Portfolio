echo 'The following "npm" command runs your Node.js app'

set -x
npm run dev &
sleep 1
echo $! > .pidfile
set +x

echo 'Now you can'
echo 'Visit  http://localhost:5173/ to see your Node.js App'