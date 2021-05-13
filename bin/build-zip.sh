#!/bin/sh

rm woocommerce-admin-tasklist-tester.zip

echo "Building"
npm run build

echo "Creating archive... 🎁"
zip -r "woocommerce-admin-tasklist-tester.zip" \
	woocommerce-admin-tasklist-tester.php \
	build/ \
	README.md