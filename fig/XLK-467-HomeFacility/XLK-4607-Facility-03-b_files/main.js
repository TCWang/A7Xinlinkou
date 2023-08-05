jQuery(document).ready(function ($) {

    /* Change price range to selected variation price */
    if ($('.et_pb_woopro_price.change_to_variation_price').length > 0) {
        var variations_price_range = $('.et_pb_woopro_price.change_to_variation_price .price'),
            selected_variation_price = $('.et_pb_woopro_price.change_to_variation_price .wcbd_selected_variation_price'),
            variations_form = $('.wcbd_module .variations_form');


        variations_form.on('show_variation', function (event, variation) {
            if (typeof variation !== 'undefined' && variation.is_purchasable === true && variation.price_html !== "") {
                variations_price_range.hide();
                selected_variation_price.html(variation.price_html);
                selected_variation_price.show();
            } else {
                variations_price_range.show();
                selected_variation_price.hide();
            }

        });

        variations_form.on('reset_data', function () {
            variations_price_range.show();
            selected_variation_price.hide();
        });
    }


    // gallery shortcode lightbox
    $('.wcbd_gallery_shortcode.lightbox .gallery-icon').addClass('et_pb_gallery_image');

    // fix reviews rating issue if the module used twice or more
    if ($('.woo_product_divi_layout select[id="rating"]').length > 1) {
        // Star ratings for comments
        $('select[name="rating"]').each(function (index) {

            // to fix the repeated stars p for the first module
            if (index == 0) {
                var starsP = $(this).siblings('p.stars');
                if (starsP.length > 1) {
                    starsP.not(starsP[0]).remove();
                };
            }
            if (index > 0) {
                $(this).hide().before('<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>');
            }
        });
    }

	/**
	 * Perform some actions on page load
	 * @since 2.2.0
	 */
    function WCBD_On_Page_Load() {

		/**
		 * cart module
		 */
        if ($('.et_pb_wcbd_cart_products').length) {
            $('.et_pb_wcbd_cart_products .cart-collaterals').remove();

            // hide items
            $('.et_pb_wcbd_cart_products.no_x_icon .product-remove, .et_pb_wcbd_cart_products.no_thumb .product-thumbnail, .et_pb_wcbd_cart_products.no_title .product-name, .et_pb_wcbd_cart_products.no_price .product-price, .et_pb_wcbd_cart_products.no_qty .product-quantity, .et_pb_wcbd_cart_products.no_subtotal .product-subtotal, .et_pb_wcbd_cart_products.no_coupon .actions .coupon, .et_pb_wcbd_cart_products.no_update_cart .actions .button[name="update_cart"], .et_pb_wcbd_cart_products.no_coupon.no_update_cart .actions').remove();
        }

		/**
		 * checkout classic module
		 */
        if ($('.et_pb_wcbd_checkout_classic').length) {
            // hide items
            $('.chechout_no_coupoun .woocommerce-form-coupon-toggle, .chechout_no_coupoun .checkout_coupon, .chechout_no_shipping .woocommerce-shipping-fields, .chechout_no_order_notes .woocommerce-additional-fields, #order_review_heading, .chechout_no_summary .woocommerce-checkout-review-order-table').remove();
        }

		/**
		 * cart totals module
		 */
        if ($('.et_pb_wcbd_cart_totals').length) {
            $(".et_pb_wcbd_cart_totals .cart_totals > h2").remove();
        }

		/**
		 * cart cross-sells module
		 */
        if ($('.et_pb_wcbd_cart_cross_sells').length) {
            $(".et_pb_wcbd_cart_cross_sells .cross-sells > h2").remove();
        }
    }
    WCBD_On_Page_Load();

	/**
	 * Perform some actions on cart update
	 * @since 2.2.0
	 */
    function WCBD_On_Cart_Update() {

        // Remove cart form and messages
        if ($('.et_pb_wcbd_cart_products .woocommerce-cart-form').length > 1) {

            // remove the repeated cart table
            $('.et_pb_wcbd_cart_products .woocommerce-cart-form').not(':first-of-type').remove();

            // remove the repeated messages
            $('.et_pb_wcbd_cart_products .woocommerce-message').not(':first-of-type').remove();
            $('.et_pb_wcbd_cart_products .woocommerce-error').not(':first-of-type').remove();
        }

        // Remove repeated cart totals if the module used more than once
        if ($('.et_pb_wcbd_cart_totals').length > 1) {
            $('.et_pb_wcbd_cart_totals .cart_totals').not(':nth-child(2)').remove();
        }

        // remove things if the cart is empty & show the message
        var emptyCart = $('.woocommerce-cart .cart-empty').length > 0 ? true : false;

        if (emptyCart) {

            $('body').addClass('wcbd_cart_cleared');

            $('.et_pb_wcbd_cart_products .et_pb_module_inner .woocommerce, .et_pb_wcbd_cart_products .woocommerce-notices-wrapper, .et_pb_wcbd_cart_totals, .et_pb_wcbd_cart_cross_sells, .remove_on_empty_cart').remove();

            // display the back to shop button
            $('.et_pb_wcbd_cart_products .empty_cart_message, .et_pb_wcbd_cart_products.stay .return-to-shop, .display_on_empty_cart').fadeIn();

            // reload the page
            if ($('.et_pb_wcbd_cart_products.reload').length > 0) {
                location.reload();
            }

            // redirect the page		
            if ($('.et_pb_wcbd_cart_products.redirect .redirection_url').length > 0) {
                window.location = $('.redirection_url').data('redirect-to');
            }

        }

		/**
		 * Show the notices if hidden and there are notices to display
		 */
        if ($('.et_pb_woopro_notices.no_content .woocommerce-notices-wrapper').children().length > 0) {
            $('.et_pb_woopro_notices.no_content').removeClass('no_content');
        }
    }

    $(document).on('updated_wc_div', function () {
        WCBD_On_Cart_Update();
    });

	/**
	 * Collect Notices on ajax requests
	 */
    function WCBD_On_Ajax_Notices() {

        if ($('.et_pb_woopro_notices .woocommerce-notices-wrapper').length > 0) {

            var pageNotices = $('.et_pb_wcbd_checkout_classic .woocommerce-error, .et_pb_wcbd_checkout_classic .woocommerce-message');

            // add them to the notices module
            var noticesModule = $('.et_pb_woopro_notices .woocommerce-notices-wrapper');

            if (pageNotices.length > 0) {

                // remove them from the page
                $('.woocommerce-NoticeGroup, .woocommerce-error, .woocommerce-message').remove();

                noticesModule.empty();

                pageNotices.each(function (i) {
					/**
					 * adding the class woocommerce-NoticeGroup-checkout to the notice because WooCommerce is looking for
					 * it to scroll the page to the notice.
					 */
                    noticeContent = pageNotices[i].outerHTML;
                    noticesModule.append(noticeContent).hide().fadeIn();
                });
                // display the module if hidden
                $('.et_pb_woopro_notices').removeClass('no_content');
            }

        }
    }

	/**
	 * This will apply to the checkout page only
	 * The Cart append the notices to the notices module automatically using show_notice()
	 * @see /woocommerce/assets/js/frontend/cart.js
	 */
    $(document).on('checkout_error updated_checkout update_checkout', function () {
        WCBD_On_Ajax_Notices();
    });

	/**
	 * on adding product to the cart
	 */
    function WCBD_On_Adding_To_Cart() {

        // fade these module out case of ajax adding products from the cross sells to the cart
        if ($('.et_pb_wcbd_cart_cross_sells .ajax_add_to_cart').length) {
            $('body').addClass('wcbd_adding_to_cart');
        }
    }
    $(document).on('adding_to_cart', function () {
        WCBD_On_Adding_To_Cart();
    });

	/**
	 * AFTER adding product to the cart
	 * @since 2.2.0
	 */
    function WCBD_After_Adding_To_Cart() {

        if ($('body.wcbd_adding_to_cart .et_pb_wcbd_cart_cross_sells .ajax_add_to_cart').length) {
            $('body').removeClass('wcbd_adding_to_cart');
        }
    }
    $(document).on('cart_page_refreshed', function () {
        WCBD_After_Adding_To_Cart();
    });
    $(document).on('added_to_cart', function () {
        // refresh the page if it is the empty cart layout
        if ($('body').hasClass('wcbd_empty_cart')) {
            window.location.reload();
        }
    });

	/**
	 * Fix some VB JS events issues
	 * @since 2.2.0
	 */
    function WCBD_fix_vb_js_events() {
        // account form
        $('body.et-fb').on('click', '.et_pb_wcbd_checkout_classic a.showlogin', function () {
            $('.et_pb_wcbd_checkout_classic .woocommerce-form-login').slideToggle(400);
        });
        // coupon form
        $('body.et-fb').on('click', '.et_pb_wcbd_checkout_classic a.showcoupon', function () {
            $('.et_pb_wcbd_checkout_classic .checkout_coupon').slideToggle(400);
        });
        // shipping details
        $('body.et-fb').on('change', '.et_pb_wcbd_checkout_classic #ship-to-different-address input', function () {
            if ($(this).is(":checked")) {
                $("div.shipping_address").slideDown();
            } else {
                $("div.shipping_address").slideUp();
            }
        });
        // cart totals' update shipping
        $('body.et-fb').on('click', '.et_pb_wcbd_cart_totals .shipping-calculator-button', function () {
            $('.shipping-calculator-form').slideToggle(400);
        });
    }
    WCBD_fix_vb_js_events();

	/**
	 * Ajax my account tabs
	 * @since 2.2.0
	 */
    function WCBD_MyAccount_Ajax_Tabs() {

        // don't do anything if in the vb and the user clicked the logout link
        $('body.et-fb').on('click', '.wcbd_myaccount_ajax_tabs .woocommerce-MyAccount-navigation ul li.woocommerce-MyAccount-navigation-link--customer-logout a', function (e) {
            e.preventDefault();
        });

		/**
		 * all my account links that we will load their content with ajax
		 * ajaxLinks = navigation links, edit address, order link, view order button
		 */
        var ajaxLinks = '.wcbd_myaccount_ajax_tabs .woocommerce-MyAccount-navigation ul li:not(.woocommerce-MyAccount-navigation-link--customer-logout) a, .wcbd_myaccount_ajax_tabs .woocommerce-Address .edit, .wcbd_myaccount_ajax_tabs .woocommerce-orders-table__row a, .wcbd_myaccount_ajax_tabs .woocommerce-orders-table__row a.view';

        $('body').on('click', ajaxLinks, function (e) {
            e.preventDefault();
            var clickedLink = $(this);

            // prevent clicking on the same link again
            if (clickedLink.hasClass('wcbd-active')) return;

            // prevent repeated clicks while performing an ajax request
            if ($('body').hasClass('wcbd_myaccount_loading_tab')) return;

            // just in case
            var linkURL = $(this).attr('href');
            if (!linkURL.length) return;

            // current menu li
            var menuItem = $(this).parent($('li'));

            // there is a running ajax call
            $('body').addClass('wcbd_myaccount_loading_tab');
            // append the spinner
            $('.wcbd_myaccount_ajax_tabs .woocommerce-MyAccount-content').append('<div class="preloader_container"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>');

            $.get(linkURL, function (result) {
                //var content = $(result).find('.wcbd_myaccount_ajax_tabs .woocommerce-MyAccount-content');
                var content = $(result).find('.et_pb_wcbd_myaccount_classic .woocommerce-MyAccount-content'); // temporary for the vb

                if (content.length) {

					/**
					 * remove the active class from all links to prepare for another ajax call
					 */
                    $(ajaxLinks).removeClass('wcbd-active');

					/**
					 * add the active class to the real active link so it can't be clicked again 
					 */
                    clickedLink.addClass('wcbd-active');

					/**
					 * update the page link in the browser
					 * This is important for the edit address/account forms to work
					 */
                    if (!$('body').hasClass('et-fb')) {
                        history.pushState({}, '', linkURL);
                    }

                    // load the new content
                    $('.wcbd_myaccount_ajax_tabs .woocommerce-MyAccount-content').hide().html(content.html()).fadeIn();

                    // activate the active menu item
                    menuItem.siblings().removeClass('is-active');
                    menuItem.addClass('is-active');
                }

            })
                .always(function () {
                    // remove the loading class from body
                    $('body').removeClass('wcbd_myaccount_loading_tab');
                });
        });
    }
    WCBD_MyAccount_Ajax_Tabs();

	/**
	 * Login tabs
	 * @since 2.2
	 */
    $('body').on('click', '.wcbd_login_tabs .tabs .tab_heading', function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        var target = $($(this).data('target'));

        if (target.length) {
            target.fadeIn();
            target.siblings().hide();
        }
    });

	/**
	 * Fix: If the contact module is used on archive layouts, it will have the wrong action attribute
	 * Removing the action will make the form use the current page url
	 * @since 2.1.8
	 */
    if ($('body.wcbd_archive_layout form.et_pb_contact_form').length) {
        var currentURL = window.location.href;
        var formAction = $('body.wcbd_archive_layout form.et_pb_contact_form').attr('action');

        if (currentURL !== formAction) {
            $('body.wcbd_archive_layout form.et_pb_contact_form').attr('action', '');
        }
    }

	/**
	 * Collect Notices into the notices module, this is useful if the nmodule outputs its own notices,
	 * so, we can collect all of them in one place ( the notices module )
	 * @since 2.2
	 */
    // modules to collect their notices
    var modules = $('.et_pb_wcbd_order_tracking, .et_pb_wcbd_myaccount_login, .et_pb_wcbd_cart_products');
    var noticesModule = $('.et_pb_woopro_notices .woocommerce-notices-wrapper');
    if (modules.length && noticesModule.length) {
        var notices = modules.find('.woocommerce-error, .woocommerce-message, .woocommerce-info');
        if (notices.length) {
            noticesModule.html(notices);
            $('.et_pb_woopro_notices').removeClass('no_content');
        }
    }

	/**
	 * Fix: if the tabs module used twice, the first description tab will be closed
	 */
    var desc_tab = $('body.woo_product_divi_layout .et_pb_woopro_tabs .description_tab a');
    if (desc_tab.length > 1) {
        desc_tab.trigger('click');
    }

	/**
	 * Fix: a conflict with Yith Zoom
	 */
    $(document).one('yith_magnifier_after_init_zoom', function () {
        var yith_zoom = $('.et_pb_woopro_images_slider');
        if (yith_zoom.length) {
            yith_zoom.parent('.et_pb_column').addClass('wcbd_yith_magnifier_zoom');
        }
    });

	/**
	 * Add +/- to the quantity input
	 */
    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.qty-pm.style_1 input.qty');

    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div></div>').insertAfter('.qty-pm.style_2 input.qty');

    $('<div class="quantity-nav"><div class="quantity-button quantity-down">-</div></div>').insertBefore('.qty-pm.style_2 input.qty');

    $('.qty-pm').each(function () {
        var spinner = $(this),
            input = spinner.find('input.qty');

        // change the input type to text to remove the default controllers
        //input.attr('type', 'text');

        input.each(function () {
            var input = $(this),
                nav = input.siblings('.quantity-nav'),
                btnUp = nav.find('.quantity-up'),
                btnDown = nav.find('.quantity-down'),
                min = input.attr('min'),
                max = input.attr('max'),
                step = input.attr('step') ? parseFloat(input.attr('step')) : 1;

            btnUp.click(function () {

                var oldValue = parseFloat(input.val());

                if (max && oldValue >= max) {
                    newVal = oldValue;
                } else {
                    newVal = oldValue + step;
                }

                $(this).parent().siblings("input.qty").val(newVal);
                $(this).parent().siblings("input.qty").trigger("change");
            });

            btnDown.click(function () {
                oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    newVal = oldValue;
                } else {
                    newVal = oldValue - step;
                }
                $(this).parent().siblings("input.qty").val(newVal);
                $(this).parent().siblings("input.qty").trigger("change");
            });
        });

    });

    // flip shop image
    $('body').on('mouseenter', '.wcbd_flip li.product', function () {
        var flip = $(this).find('.et_shop_image.flip_image');
        var orig = $(this).find('.et_shop_image:not(.flip_image)');
        if (flip.length) {
            flip.css('opacity', 1);
            orig.css('opacity', 0);
        }
    });
    $('body').on('mouseleave', '.wcbd_flip li.product', function () {
        var flip = $(this).find('.et_shop_image.flip_image');
        var orig = $(this).find('.et_shop_image:not(.flip_image)');
        if (flip.length) {
            flip.css('opacity', 0);
            orig.css('opacity', 1);
        }
    });
});

/**
 * set buttons styles in the vb
 * @since 2.2.0
 */
function WCBD_Set_Button_Style(custom_button, button_bg_color, button_selector, button_icon, button_icon_placement, button_use_icon) {

    var additionalCss = [];
    var utils = window.ET_Builder.API.Utils;

    if (custom_button === 'on' && typeof utils !== 'undefined') {

        if (button_bg_color !== '') {
            additionalCss.push([{
                selector: button_selector,
                declaration: 'background:' + button_bg_color + ' !important;',
            }]);
        }

        if (button_icon !== '' && button_use_icon === 'on') {
            if (button_icon_placement === 'left') {
                additionalCss.push([{
                    selector: button_selector + ":before",
                    declaration: 'content:"' + utils.processFontIcon(button_icon) + '"!important;',
                }]);
            }

            if (button_icon_placement === 'right') {
                additionalCss.push([{
                    selector: button_selector + ":after",
                    declaration: 'content:"' + utils.processFontIcon(button_icon) + '";font-family: ETmodules!important;',
                }]);
            }

        }
    }

    return additionalCss;
}