class RenameSneakerIdToProductId < ActiveRecord::Migration[6.0]
  def change
    rename_column :carts, :sneaker_id, :product_id
  end
end
