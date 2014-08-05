var diner;

(function(diner) {

// When diner opens, output the current inventory
diner.open();


diner.addToInventory({
  eggs: 35,
  bread: 40,
  butter: 50,
  pancakes: 10,
  coffee: 50,
  juice: 10
});


// An order can be placed by special number
// #1: Eggs over easy - Eggs (2) and Toast (1) with Butter (1)
// #2: Scrambled Eggs - Eggs  (3) and Toast (1) with Butter (1)
// #3: French Toast - Eggs (2) and Toast (2) with Butter (2)
// Every special comes with coffee (1)
diner.newOrder('#3');
diner.newOrder('#2');
diner.newOrder('#3');
diner.newOrder('#1');

// An order can be placed a la carte with a single ingredient
diner.newOrder('coffee');
diner.newOrder('coffee');
diner.newOrder('juice');

// An order can be placed a la carte with an array of ingredients
diner.newOrder(['egg', 'egg', 'pancake', 'bread', 'butter', 'coffee']);

// When diner closes, output the day's orders and the reminaing inventory
diner.close();

}(diner));
