class CreateSneakers < ActiveRecord::Migration[6.0]
  def change
    create_table :sneakers do |t|
      t.string :name
      t.string :image
      t.string :description
      t.string :price
      t.string :quantity
      t.string :size
      t.string :cost
      t.string :brand
      t.bigint :seller_id

      t.timestamps
    end
  end
end
