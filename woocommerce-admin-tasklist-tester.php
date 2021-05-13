<?php
/**
 * Plugin Name: WooCommerce Admin Tasklist tester
 * Description: A helper plugin to assist with testing WooCommerce Admin task list items
 * Author: louwie17
 * Version: 1.0.0
 *
 * @package WooCommerce\Admin\TasklistTester
 */

/**
 * Register the JS.
 */
function wc_admin_tasklist_tester_add_register_script() {
	if ( ! class_exists( 'Automattic\WooCommerce\Admin\Loader' ) || ! \Automattic\WooCommerce\Admin\Loader::is_admin_or_embed_page() ) {
		return;
	}
	
	$script_path       = '/build/index.js';
	$script_asset_path = dirname( __FILE__ ) . '/build/index.asset.php';
	$script_asset      = file_exists( $script_asset_path )
		? require( $script_asset_path )
		: array( 'dependencies' => array(), 'version' => filemtime( $script_path ) );
	$script_url = plugins_url( $script_path, __FILE__ );

	wp_register_script(
		'wc-admin-tasklist-tester',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_register_style(
		'wc-admin-tasklist-tester',
		plugins_url( '/build/index.css', __FILE__ ),
		// Add any dependencies styles may have, such as wp-components.
		array(),
		filemtime( dirname( __FILE__ ) . '/build/index.css' )
	);

	wp_enqueue_script( 'wc-admin-tasklist-tester' );
	wp_enqueue_style( 'wc-admin-tasklist-tester' );
}

add_action( 'admin_enqueue_scripts', 'wc_admin_tasklist_tester_add_register_script' );
