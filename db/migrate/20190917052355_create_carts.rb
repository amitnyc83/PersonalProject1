class CreateCarts < ActiveRecord::Migration[6.0]
  def change
    create_table :carts do |t|
      t.string :name
      t.string :quantity
      t.string :total_price
      t.boolean :ordered
      t.bigint :user_id
      t.bigint :sneaker_id

      t.timestamps
    end
  end
end
