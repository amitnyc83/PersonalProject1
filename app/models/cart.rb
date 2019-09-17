class Cart < ApplicationRecord

  belongs_to :user
  belongs_to :sneaker, optional: true

end
