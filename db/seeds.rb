# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   user = User.create( name: 'tester1', username: 'testuser1', password_digest: 'password' )
#   Character.create(name: 'Luke', movie: movies.first)

#
User.destroy_all
Cart.destroy_all
#
# testuser = User.create!(username: "test1user", password_digest:BCrypt::Password.create('password'), name: "steven", type:)
# testuser2 = User.create!(username: "test2user", password_digest:BCrypt::Password.create('password'), name: "steven2")
# #
# cart1 = Cart.create!(name: "testcart", quantity: 2, total_price: 15, ordered: false, user: testuser)
# cart2 = Cart.create!(name: "testcart2", quantity: 1, total_price: 5, ordered: false, user: testuser2)

# product1 = Product.create(image: "https://stockx-360.imgix.net/Nike-Air-Max-90-Mars-Landing/Images/Nike-Air-Max-90-Mars-Landing/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1553006663&w=1000", name: "Air Max 90 Mars Landing", brand: "Nike", description: "You can finally reach new levels of galactical swag after buying the Air Max 90 Mars Landing. This AM 90 comes with an orange upper, orange Nike “Swoosh”, black midsole, and a grey sole. These sneakers released in March 2019 and retailed for $160. Create more problems for Houston and place a Bid for these on StockX today.", price: 170, quantity: 10, )
# product1 = Product.create(image: "https://stockx-360.imgix.net/Air-Jordan-1-Retro-High-Off-White-University-Blue/Images/Air-Jordan-1-Retro-High-Off-White-University-Blue/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1538080256&w=1000", name: "Jordan 1 Retro", brand: "Nike", description: "Jordan Brand adds a new colorway to it’s hot streak of Jordan 1 releases with the Air Jordan 1 “Obsidian / University Blue”, now available on StockX. Since its debut in 1985, the Air Jordan 1 has been a cultural monument, breaking barriers between the court and the streets. Jordan Brand has continued to shed new light on this timeless silhouette and does so with this release.
# This AJ 1 features a similar design to the “UNC Patent” 1s that released in February of 2019, only this time the colorway receives a full leather treatment. This sneaker released in August of 2019 and retails for $160.", price: 200, quantity: 15 )
# product1 = Product.create(name: "Adidas Nizza Lo", brand: "Adidas", description: "Stan Smith Classic", price: 100, quantity: 100 )
