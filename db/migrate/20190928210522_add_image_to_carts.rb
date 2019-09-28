class AddImageToCarts < ActiveRecord::Migration[6.0]
  def change
    add_column :carts, :image, :string
  end
end
