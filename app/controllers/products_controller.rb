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


  def show
    product = Product.find(params[:id])
    render json: {product: product}
  end

  def update
    product = Product.find(params[:id])
    product.update(product_params)
    render json: {product: product, message: "quantity has been updated"}
  end

  def destroy
    product = Product.find(params[:id])
    product.destroy
    render json: {message: "Product has been deleted"}
  end


  private

  def product_params
    params.require(:product).permit(:name, :brand, :description, :price, :quantity, :cost, :size, :image, :seller_id)

  end
end
