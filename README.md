# itss-japanese-2
## Cách chạy project
**Cài đặt xampp rồi clone project vào thư mục htdocs của xampp**

**Cài đặt thư viện npm**
```sh
npm install
```
**Cài đặt thư viện composer**
```sh
composer install
```
**Tạo file .env trong thư mục gốc rồi coppy đoạn này vào và thay đổi thông tin db, username, password của mysql**
```sh
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:GWvo9frlJ6/FOxSitpHBXUzcrYyd94Q0mOY7BI/Ujvw=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT= thường là 3306
DB_DATABASE= cái này là tên db
DB_USERNAME= tên người dùng thường là root
DB_PASSWORD= mật khẩu

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

JWT_SECRET=XaXeFxNDPDGOQJuNUdN1ePg3J4RBxE3J4WSqJN2sK0tIUClY2Nday5PXV8RH61CC

```
**Chaỵ server**
```sh
php artisan serve
```
**Chaỵ react**
```sh
npm run watch
```
**Sau đó truy cập vào**
```sh
http://127.0.0.1:8000/
```
**Nếu gặp lỗi như này**
```sh
Notifications are disabled
Reason: DisabledForApplication Please make sure that the app id is set correctly.
```
**Cách fix**
- Thay đổi appID từ 'Laravel Mix' sang 'Laravel Mix Plus' trong file node_modules\laravel-mix\src\components\Notifications.js
