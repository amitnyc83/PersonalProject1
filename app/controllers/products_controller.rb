class ProductsController < ApplicationController

  def index
    # byebug
    product = Product.all
    render json: product
  end

  def create
    # byebug
    product = Product.create(product_params)
    render json: {name: product.name, brand: product.brand, description: product.description, price: product.price, quantity: product.quantity, image: product.image, seller_id: product.seller_id, cost: product.cost }

  end


  

  private

  def product_params
    params.require(:product).permit(:name, :brand, :descripton, :price, :quantity, :cost, :size, :image, :seller_id)

  end
end
