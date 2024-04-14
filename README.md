# Bloak


## All command to create this project 

```shell
composer create-project laravel/laravel bloak
composer require laravel/breeze --dev
php artisan breeze:install react
composer require laravel/sail --dev
php artisan sail:install
./vendor/bin/sail up
./vendor/bin/sail artisan sail:publish
```
Add ```php8.3-gmp``` in Dockerfile (/docker/8.3/Dockerfile)
```shell
./vendor/bin/sail build
./vendor/bin/sail up -d
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
./vendor/bin/sail php artisan migrate
./vendor/bin/sail php artisan db:seed
```
### Libraries 

```shell
npm i @web3modal/ethers ethers
npm i @web3modal/siwe siwe
```
