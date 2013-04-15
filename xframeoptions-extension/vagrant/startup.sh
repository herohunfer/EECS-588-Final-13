#!/bin/bash

# install useful packages
apt-get -y install vim curl make

#install xdebug
tar -xvzf /vagrant/vagrant/xdebug-2.2.1.tgz -C ~/.
cd ~/xdebug-2.2.1
phpize
./configure
make
cp modules/xdebug.so /usr/lib/php5/20090626
echo "zend_extension = /usr/lib/php5/20090626/xdebug.so" >> /etc/php5/apache2/php.ini
apachectl restart