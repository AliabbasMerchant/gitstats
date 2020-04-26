rm -rf build/
npm install
npm run build
chmod 600 key.pem
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf /domains/gitstats.me/public_html/*;"
scp -o StrictHostKeyChecking=no -i key.pem -r build/* $USER@$SERVER:/domains/gitstats.me/public_html/
