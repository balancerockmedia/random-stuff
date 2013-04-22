<?php

setlocale(LC_MONETARY, 'en_US');

/**
 * calculate discount rate
 *
 * @param array $products 
 * @param string $product 
 * @param string $discount 
 * @param bool $all_products 
 * @return string
 */
function discount($products, $product, $discount, $all_products) {
    $new_prices = '';
    
    if ($all_products === TRUE) {
        foreach ($products as $key => $value) {
            $orig_price = $value['price'];
            $new_price = $orig_price - ($orig_price * ($discount * .01));
            $new_prices .= '<p><strong>'.$key.'</strong>: '.money_format('%n', $new_price).'</p>';
        }
    } else {
        foreach ($products as $key => $value) {
            if ($product === $key) {
                $orig_price = $value['price'];
                $new_price = $orig_price - ($orig_price * ($discount * .01));
                $new_prices .= '<p><strong>'.$key.'</strong>: '.money_format('%n', $new_price) .'</p>';
                break;
            }
        }
    }
    
    return $new_prices;
}

// discount rate dropdown
$rates = '';
$count = 1;
while ($count <= 99) {
    $rates .= '<option value="'.$count.'">'.$count.'</option>';
    $count++;
}

// products
$products = array(
    'iPhone' => array('condition' => 'new', 'price' => '199.00'),
    'MacBook' => array('condition' => 'used', 'price' => '525.00'),
    'iMac' => array('condition' => 'new', 'price' => '1799.00')
);

// data for product dropdown
$product_options = '';
foreach($products as $key => $value) {
    $product_options .= '<option value="'.$key.'">'.$key.': $'.$value['price'].'</option>';
}
$product_options .= '<option value="all">All Products</option>';

// decide what to do if it's one product or all products
if (isset($_POST['submit'])) {
    if ($_POST['product'] == 'all') {
        $new_prices = discount($products, $_POST['product'], $_POST['rate'], TRUE);
    } else {
        $new_prices = discount($products, $_POST['product'], $_POST['rate'], FALSE);
    }
}

?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Discount Rate</title>
<style type="text/css">

#container { width: 300px; margin: 20px auto; }

form label { font: 14px arial; display: block; margin-bottom: 2px; }

select { width: 150px; }

</style>
</head>
<body>

<div id="container">
    
    <form id="my_form" method="post" action="discount_rate.php"> 
        <p><label for="product">Product:</label>
        <select name="product" id="product">
            <option value="null">Select One</option>
            <?php echo $product_options; ?>
        </select></p>
        
        <p><label for="rate">Discount Rate:</label>
        <select name="rate" id="rate">
            <option value="null">Select One</option>
            <?php echo $rates; ?>
        </select></p>

        <p><input type="submit" name="submit" value="Submit" /></p>
    </form>
    
    <?php 
    
    if (isset($new_prices)) { 
        echo $new_prices;
    }
    
    ?>
</div>

</body>
</html>