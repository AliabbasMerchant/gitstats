rm -rf build/
npm install
npm run build
chmod 600 key.pem
ssh -o StrictHostKeyChecking=no -i key.pem -p 65002 $USER@$SERVER "rm -rf /domains/gitstats.me/public_html/*;" -p 65002 
scp -o StrictHostKeyChecking=no -i key.pem -p 65002 -r build/* $USER@$SERVER:/domains/gitstats.me/public_html/ -p 65002 
