# Group Purchasing
The concept of group purchasing, also known as collective buying, is an online shopping model where a group of buyers come together to purchase a product or service at the same time, thereby securing a discount. This popular e-commerce strategy not only offers cost savings for the buyers but also boosts sales volume for the sellers. It's a win-win situation for both parties involved.
Here's a more refined translation of the system scenario:

Before accessing the system, users must authenticate by logging in. Once authenticated, the system identifies the user's role. There are five types of users in the system:
- **Salesman**: This is the original seller, the one who directly creates the products. They have the right to list products for sale, set product prices, and request auctions for their products.
- **Level-1-Customer**: This is the highest level buyer, who has the privilege to purchase directly from the salesman. They can buy products at the original price set by the salesman and also have the right to sell the same product to lower-level buyers.
- **Level-2-Customer**: This is the second-highest level buyer, who can only purchase products from Level-1-Customers and sell the same product to lower-level buyers. This level of buyer incurs a commission fee, which is paid to the Level-1-Customer and the salesman. The commission fee is agreed upon and decided by the Level-1-Customer and the salesman, and is added directly to the price of each product that the Level-2-Customer buys.
- **Level-3-Customer**: This is the lowest level buyer, who can only purchase products from Level-2-Customers and use them for personal use. This level of buyer also incurs a commission fee, which is paid to the Level-1-Customer, Level-2-Customer, and the salesman. The commission fee is agreed upon and decided by the Level-1-Customer, Level-2-Customer, and the salesman, and is added directly to the price of each product that the Level-3-Customer buys.
- **Admin**: This is the system administrator, who organizes the auctions. The admin determines the base price of the product based on the price set by the salesman, and adds certain fees (such as auction organization fees) to decide the floor price of the product. The admin also has the right to consider which products should be auctioned and which should be rejected.

For buyers at all levels: After logging in, they have the right to view and search for products provided by the seller. After finding a desired product, they can add their favorite products to the shopping cart. They can review their shopping cart to verify the products they are buying. After finalizing the shopping cart, they start the payment process. The price they have to pay depends on their level, delivery fee, and discounts from the system and the seller.

For the salesman and all levels of buyers who have the right to sell: After logging in, they have the right to add products for sale to their own shop. They have the right to determine the price of their product based on the original price, commission fee, and discount vouchers.

For the admin: After logging in, they will see a list of products that sellers have requested for auction. The admin has the right to accept or reject these products. If accepted, they will have to decide information such as the starting price, scale, etc., to complete the auction setup. In addition, they also have the right to decide to create system vouchers and delivery fees.